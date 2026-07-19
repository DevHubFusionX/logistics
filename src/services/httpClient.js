import { ApiError, handleApiError } from '../utils/errorHandler'
import { useAuthStore, TOKEN_KEY } from '../stores/authStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const ALLOWED_ENDPOINTS = [
  '/auth', '/user', '/users', '/addresses', '/shipments',
  '/drivers', '/driver', '/truck', '/trucks', '/fleet', '/trips',
  '/bookings', '/analytics', '/payments', '/payment',
  '/pricing', '/tracking', '/admin'
]

// Queue of pending requests waiting for a token refresh
let isRefreshing = false
let failedQueue = []

const processQueue = (error) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve()
  })
  failedQueue = []
}

// Endpoints where a 401 should NOT trigger an automatic logout.
// The payment flow has its own error UI — we don't want users booted
// mid-payment just because the payment API returned a 401.
// Trips endpoints are admin-only and may return 401 for permission reasons
// unrelated to the user's session being expired.
const NO_AUTO_LOGOUT_ENDPOINTS = [
  '/payment',
  '/payments',
  '/trips',
]

class HttpClient {
  validateEndpoint(endpoint) {
    if (!endpoint.startsWith('/')) return false
    return ALLOWED_ENDPOINTS.some(a => endpoint === a || endpoint.startsWith(a + '/'))
  }

  buildUrl(endpoint, params = {}) {
    if (!params || Object.keys(params).length === 0) return endpoint
    const clean = Object.entries(params).reduce((acc, [k, v]) => {
      if (v !== undefined && v !== null && v !== '') acc[k] = v
      return acc
    }, {})
    if (Object.keys(clean).length === 0) return endpoint
    return `${endpoint}?${new URLSearchParams(clean)}`
  }

  getToken() {
    // Read directly from storage — not from Zustand state
    // so we always get the latest value even after a refresh
    return (
      sessionStorage.getItem(TOKEN_KEY) ||
      localStorage.getItem(TOKEN_KEY) ||
      null
    )
  }

  async request(endpoint, options = {}, params = {}) {
    if (!this.validateEndpoint(endpoint)) {
      throw new ApiError('Invalid endpoint', 400, null)
    }

    const url = `${BASE_URL}${this.buildUrl(endpoint, params)}`

    const baseUrlObj  = new URL(BASE_URL, window.location.origin)
    const finalUrlObj = new URL(url, window.location.origin)
    if (
      finalUrlObj.origin !== baseUrlObj.origin ||
      !finalUrlObj.pathname.startsWith(baseUrlObj.pathname)
    ) {
      throw new ApiError('Invalid URL', 400, null)
    }

    return this._execute(url, options, baseUrlObj, endpoint)
  }

  async _execute(url, options, baseUrlObj, endpoint) {
    const { logout, extendSession } = useAuthStore.getState()
    const token = this.getToken()

    const isFormData    = options.body instanceof FormData
    const isGetOrDelete = !options.method || options.method === 'GET' || options.method === 'DELETE'

    const config = {
      ...options,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!isFormData && !isGetOrDelete && { 'Content-Type': 'application/json' }),
        ...options.headers,
      }
    }

    if (isFormData || config.headers['Content-Type'] === undefined) {
      delete config.headers['Content-Type']
    }

    const timeoutMs  = options.timeout !== undefined ? options.timeout : 15000
    const controller = new AbortController()
    const timeoutId  = setTimeout(() => controller.abort(), timeoutMs)
    config.signal    = controller.signal

    try {
      if (typeof navigator !== 'undefined' && !navigator.onLine) {
        clearTimeout(timeoutId)
        throw new ApiError('No internet connection. Please check your network.', 0, null)
      }

      if (import.meta.env.DEV) {
        console.debug(`[HTTP] ${config.method || 'GET'} ${url}`)
      }

      const response = await fetch(url, config)
      clearTimeout(timeoutId)

      // Validate redirect origin
      const responseUrlObj = new URL(response.url)
      if (
        responseUrlObj.origin !== baseUrlObj.origin ||
        !responseUrlObj.pathname.startsWith(baseUrlObj.pathname)
      ) {
        throw new ApiError('Invalid redirect detected', 400, null)
      }

      let data = {}
      try {
        data = await response.json()
      } catch {
        if (!response.ok) throw new ApiError('Request failed with empty response', response.status, null)
      }

      if (import.meta.env.DEV) {
        console.debug(`[HTTP] ${response.status}`, { url, data })
      }

      if (!response.ok) {
        // 401 — token expired or revoked
        if (response.status === 401) {

          // Check if this is a payment endpoint — payment 401s should NOT
          // force a logout because the payment flow has its own error UI
          // and the user's main session token is still valid.
          const isPaymentEndpoint = NO_AUTO_LOGOUT_ENDPOINTS.some(
            (path) => endpoint === path || endpoint.startsWith(path + '/')
          )

          if (isPaymentEndpoint) {
            const errMsg = data.msg || data.message || 'Payment authorisation failed. Please try again.'
            throw new ApiError(errMsg, 401, data)
          }

          // If a refresh is already in progress, queue this request
          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueue.push({
                resolve: () => resolve(this._execute(url, options, baseUrlObj, endpoint)),
                reject
              })
            })
          }

          // No refresh endpoint available — log out cleanly
          isRefreshing = true
          processQueue(null)
          isRefreshing = false
          logout()
          throw new ApiError('Session expired. Please log in again.', 401, null)
        }

        const errorMsg = data.msg || data.message || `Request failed with status ${response.status}`
        if (import.meta.env.DEV) console.error(`[HTTP] Error ${response.status}: ${errorMsg}`, data)
        const error = new ApiError(errorMsg, response.status, data)
        handleApiError(error)
        throw error
      }

      // Extend session on every successful authenticated request
      if (token) extendSession()

      return { data, status: response.status }

    } catch (error) {
      clearTimeout(timeoutId)
      if (error instanceof ApiError) throw error

      if (error.name === 'AbortError') {
        const e = new ApiError('Request timed out. Please check your connection.', 408, null)
        handleApiError(e)
        throw e
      }

      const e = new ApiError(error.message || 'A network error occurred.', 0, null)
      handleApiError(e)
      throw e
    }
  }
  /**
   * Standardise the backend's nested { error, message, data: { ... } } envelope.
   *
   * Usage in query hooks:
   *   const response = await someService.getItems(params)
   *   const { records, pagination } = httpClient.extractList(response)
   *
   * The raw `response.data` object is still returned for cases that need it.
   */
  extractData(response) {
    // Support both { data: { data: payload } } and { data: payload }
    return response?.data?.data ?? response?.data ?? response ?? {}
  }

  /**
   * Extract a records array + pagination meta from a standard list response.
   * Falls back gracefully for older endpoints that return arrays directly.
   */
  extractList(response) {
    const payload = this.extractData(response)
    const records =
      payload?.records ??
      payload?.bookings ??
      payload?.data ??
      (Array.isArray(payload) ? payload : [])
    const pagination = payload?.pagination ?? {}
    return { records, pagination, total: pagination.totalRecords ?? records.length }
  }
}

export default new HttpClient()
