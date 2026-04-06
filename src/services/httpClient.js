import { ApiError, handleApiError } from '../utils/errorHandler'
import { useAuthStore } from '../stores/authStore'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

const ALLOWED_ENDPOINTS = ['/auth', '/user', '/users', '/addresses', '/shipments', '/drivers', '/driver', '/truck', '/fleet', '/trips', '/bookings', '/analytics', '/payments', '/payment', '/pricing', '/tracking', '/admin']

class HttpClient {
  validateEndpoint(endpoint) {
    if (!endpoint.startsWith('/')) return false
    return ALLOWED_ENDPOINTS.some(allowed => {
      return endpoint === allowed || endpoint.startsWith(allowed + '/')
    })
  }

  buildUrl(endpoint, params = {}) {
    if (!params || Object.keys(params).length === 0) return endpoint
    const cleanParams = Object.entries(params).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        acc[key] = value
      }
      return acc
    }, {})
    if (Object.keys(cleanParams).length === 0) return endpoint
    const query = new URLSearchParams(cleanParams).toString()
    return `${endpoint}?${query}`
  }

  async request(endpoint, options = {}, params = {}) {
    if (!this.validateEndpoint(endpoint)) {
      throw new ApiError('Invalid endpoint', 400, null)
    }
    const url = `${BASE_URL}${this.buildUrl(endpoint, params)}`

    // URL Validation
    const baseUrlObj = new URL(BASE_URL, window.location.origin)
    const finalUrlObj = new URL(url, window.location.origin)
    if (finalUrlObj.origin !== baseUrlObj.origin || !finalUrlObj.pathname.startsWith(baseUrlObj.pathname)) {
      throw new ApiError('Invalid URL', 400, null)
    }

    const { token, logout } = useAuthStore.getState()

    const isFormData = options.body instanceof FormData
    const isGetOrDelete = !options.method || options.method === 'GET' || options.method === 'DELETE'

    const config = {
      ...options,
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
        ...(!isFormData && !isGetOrDelete && { 'Content-Type': 'application/json' }),
        ...options.headers,
      }
    }

    // Clean up Content-Type if it was explicitly set to undefined or if it's FormData
    if (isFormData || config.headers['Content-Type'] === undefined) {
      delete config.headers['Content-Type']
    }

    try {
      console.debug(`[HTTP_CLIENT] Requesting: ${config.method || 'GET'} ${url}`)
      const response = await fetch(url, config)

      // Validate redirect origin
      const responseUrlObj = new URL(response.url)
      if (responseUrlObj.origin !== baseUrlObj.origin || !responseUrlObj.pathname.startsWith(baseUrlObj.pathname)) {
        throw new ApiError('Invalid redirect detected', 400, null)
      }

      const data = await response.json()
      console.debug(`[HTTP_CLIENT] Response from ${url}:`, { status: response.status, data })

      if (!response.ok) {
        if (response.status === 401) {
          logout()
        }
        const errorMsg = data.msg || data.message || 'Request failed'
        console.error(`[HTTP_CLIENT] Error ${response.status}: ${errorMsg}`, data)
        const error = new ApiError(errorMsg, response.status, data)
        handleApiError(error)
        throw error
      }

      return { data, status: response.status }
    } catch (error) {
      if (error instanceof ApiError) throw error
      const apiError = new ApiError(error.message, 0, null)
      handleApiError(apiError)
      throw apiError
    }
  }
}

export default new HttpClient()