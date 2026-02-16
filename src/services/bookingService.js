import httpClient from './httpClient'

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

  trackShipment: (trackingNumber) =>
    httpClient.request(`/tracking/${trackingNumber}`),

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
    }),

  // Multi-stop and recurring not yet implemented in backend V1
  createMultiStopBooking: (bookingData, stops) =>
    Promise.reject(new Error('Feature not available locally')),

  createRecurringBooking: (bookingData, schedule) =>
    Promise.reject(new Error('Feature not available locally')),

  getRecurringBookings: (params = { limit: 50, page: 1 }) =>
    Promise.resolve({ data: [] }),

  updateRecurringBooking: (id, schedule) =>
    Promise.reject(new Error('Feature not available locally')),

  cancelRecurringBooking: (id) =>
    Promise.reject(new Error('Feature not available locally'))
}

export default bookingService
