import httpClient from '@/services/httpClient'

const bookingService = {
  createBooking: (bookingData) =>
    httpClient.request('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),

  getBookings: (params = { limit: 10, page: 1 }) =>
    httpClient.request('/bookings/users', {}, params),

  getAdminBookings: (params = { limit: 10, page: 1 }) =>
    httpClient.request('/admin/bookings/', {}, params),

  getUserBookingsForAdmin: (userId, params = { limit: 10, page: 1 }) =>
    httpClient.request(`/admin/bookings/users/${userId}`, {}, params),

  getBookingById: (id) =>
    httpClient.request(`/bookings/${id}`),

  getAdminBookingById: (id) =>
    httpClient.request(`/admin/bookings/${id}`),

  trackShipment: (trackingNumber) =>
    httpClient.request(`/tracking/${trackingNumber}`),

  // NOTE: Price fetching is the authority of pricingService.calculatePrice()
  // This wrapper is kept for backward compat with useBookingFlow
  getPrices: (destination, weight, isAdmin = false) => {
    const path = isAdmin ? '/admin/bookings/prices' : '/bookings/prices'
    return httpClient.request(`${path}/${encodeURIComponent(destination)}/${encodeURIComponent(weight)}`)
  },

  updateBooking: (id, bookingData) => {
    return httpClient.request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookingData)
    })
  },

  updateAdminBooking: (id, bookingData) => {
    return httpClient.request(`/admin/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookingData)
    })
  },

  cancelBooking: (id) =>
    httpClient.request(`/bookings/cancel/${id}`, {
      method: 'PATCH'
    }),

  deleteBooking: (id) =>
    httpClient.request(`/bookings/${id}`, {
      method: 'DELETE'
    })
}

export default bookingService
