import { ApiError, handleApiError } from '../utils/errorHandler'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const ALLOWED_ENDPOINTS = ['/auth/', '/user/', '/shipments/', '/drivers/', '/fleet/', '/trips/', '/bookings/', '/analytics/', '/payments/', '/payment/']

class HttpClient {
  validateEndpoint(endpoint) {
    if (!endpoint.startsWith('/')) return false
    return ALLOWED_ENDPOINTS.some(allowed => endpoint.startsWith(allowed))
  }
  buildUrl(endpoint, params = {}) {
    if (!params || Object.keys(params).length === 0) return endpoint
    const query = new URLSearchParams(params).toString()
    return `${endpoint}?${query}`
  }

  async request(endpoint, options = {}, params = {}) {
    if (!this.validateEndpoint(endpoint)) {
      throw new ApiError('Invalid endpoint', 400, null)
    }
    const url = `${BASE_URL}${this.buildUrl(endpoint, params)}`
    
    // Prevent SSRF by validating the final URL
    const baseUrlObj = new URL(BASE_URL, window.location.origin)
    const finalUrlObj = new URL(url, window.location.origin)
    if (finalUrlObj.origin !== baseUrlObj.origin || !finalUrlObj.pathname.startsWith(baseUrlObj.pathname)) {
      throw new ApiError('Invalid URL', 400, null)
    }
    
    const token = localStorage.getItem('token')
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    }

    try {
      console.log('HTTP Request:', config.method || 'GET', url)
      console.log('Request body:', config.body)
      const response = await fetch(url, config)
      
      // Validate response URL to prevent SSRF via redirects
      const responseUrlObj = new URL(response.url)
      if (responseUrlObj.origin !== baseUrlObj.origin || !responseUrlObj.pathname.startsWith(baseUrlObj.pathname)) {
        throw new ApiError('Invalid redirect detected', 400, null)
      }
      
      const data = await response.json()
      console.log('Response status:', response.status)
      console.log('Response data:', JSON.stringify(data, null, 2))
      
      if (!response.ok) {
        console.error('API Error Response:', JSON.stringify(data, null, 2))
        const error = new ApiError(data.msg || data.message || 'Request failed', response.status, data)
        handleApiError(error)
        throw error
      }
      
      return data
    } catch (error) {
      if (error instanceof ApiError) throw error
      const apiError = new ApiError(error.message, 0, null)
      handleApiError(apiError)
      throw apiError
    }
  }
}

export default new HttpClient()