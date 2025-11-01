import httpClient from './httpClient'

export default {
  createBooking: (bookingData) => httpClient.request('/bookings/', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  }),

  getBookings: (params = { limit: 100, page: 1 }) => httpClient.request('/bookings/users', {}, params),

  getBookingById: (id) => httpClient.request(`/bookings/${id}/`),

  calculatePrice: (bookingData) => httpClient.request('/bookings/calculate-price', {
    method: 'POST',
    body: JSON.stringify(bookingData)
  }),

  updateBooking: (id, bookingData) => httpClient.request(`/bookings/${id}/`, {
    method: 'PUT',
    body: JSON.stringify(bookingData)
  }),

  cancelBooking: (id) => httpClient.request(`/bookings/cancel/${id}/`, {
    method: 'PATCH'
  }),

  deleteBooking: (id) => httpClient.request(`/bookings/${id}/`, {
    method: 'DELETE'
  })
}
