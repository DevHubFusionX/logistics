import { ApiError, handleApiError } from '../utils/errorHandler'

const BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1'
const ALLOWED_ENDPOINTS = ['/auth/', '/user/', '/shipments/', '/drivers/', '/fleet/', '/trips/', '/bookings/', '/analytics/', '/payments/']

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
      const response = await fetch(url, config)
      const data = await response.json()
      
      if (!response.ok) {
        const error = new ApiError(data.msg || 'Request failed', response.status, data)
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