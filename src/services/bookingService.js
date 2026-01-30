import httpClient from './httpClient'

const bookingService = {
  createBooking: (bookingData) =>
    httpClient.request('/shipments', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),

  getBookings: (params = { limit: 100, page: 1 }) => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    return httpClient.request(`/users/${user.id}/shipments`, {}, params)
  },

  getAllBookings: (params = { limit: 100, page: 1 }) =>
    httpClient.request('/shipments', {}, params),

  getBookingById: (id) =>
    httpClient.request(`/shipments/${id}`),

  trackShipment: (trackingNumber) =>
    httpClient.request(`/tracking/${trackingNumber}`),

  getPrices: (data) =>
    httpClient.request('/pricing/calculate', {
      method: 'POST',
      body: JSON.stringify(data)
    }),

  updateBooking: (id, bookingData) => {
    return httpClient.request(`/shipments/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookingData)
    })
  },

  cancelBooking: (id, reason) =>
    httpClient.request(`/shipments/${id}/cancel`, {
      method: 'POST',
      body: JSON.stringify({ reason })
    }),

  deleteBooking: (id) =>
    httpClient.request(`/shipments/${id}`, {
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
