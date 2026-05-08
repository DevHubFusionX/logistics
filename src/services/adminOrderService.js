import httpClient from './httpClient'

/**
 * Admin Order Service
 * Handles all API interactions for the logistics dispatch management system.
 */
export default {
  /**
   * Fetch all dispatch orders with filtering and pagination
   */
  getOrders: (params = {}) => {
    return httpClient.request('/admin/order/', {}, params)
  },

  /**
   * Fetch a single dispatch order by ID
   */
  getOrder: (orderId) => {
    if (!orderId) throw new Error('orderId is required')
    return httpClient.request(`/admin/order/${encodeURIComponent(orderId)}`)
  },

  /**
   * Create a new dispatch record
   */
  createOrder: (orderData) => {
    return httpClient.request('/admin/order/', {
      method: 'POST',
      body: JSON.stringify(orderData)
    })
  },

  /**
   * Update an existing dispatch record
   */
  updateOrder: (orderId, orderData) => {
    if (!orderId) {
      throw new Error('orderId is required')
    }
    return httpClient.request(`/admin/order/${encodeURIComponent(orderId)}`, {
      method: 'PUT',
      body: JSON.stringify(orderData)
    })
  },

  /**
   * Delete a dispatch record
   */
  deleteOrder: (orderId) => {
    if (!orderId) throw new Error('orderId is required')
    return httpClient.request(`/admin/order/${encodeURIComponent(orderId)}`, {
      method: 'DELETE'
    })
  }
}
