import httpClient from './httpClient'

const bookingService = {
  createBooking: (bookingData) => 
    httpClient.request('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),

  getBookings: (params = { limit: 100, page: 1 }) => 
    httpClient.request('/bookings/users', {}, params),

  getBookingById: (id) => 
    httpClient.request(`/bookings/${id}/`),

  calculatePrice: (bookingData) => 
    httpClient.request('/bookings/calculate-price', {
      method: 'POST',
      body: JSON.stringify(bookingData)
    }),

  updateBooking: (id, bookingData) => 
    httpClient.request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookingData)
    }),

  cancelBooking: (id, reason) => 
    httpClient.request(`/bookings/cancel/${id}/`, {
      method: 'PATCH',
      body: JSON.stringify({ reason })
    }),

  deleteBooking: (id) => 
    httpClient.request(`/bookings/${id}/`, {
      method: 'DELETE'
    }),

  createMultiStopBooking: (bookingData, stops) => 
    httpClient.request('/bookings/multi-stop', {
      method: 'POST',
      body: JSON.stringify({ ...bookingData, stops })
    }),

  createRecurringBooking: (bookingData, schedule) => 
    httpClient.request('/bookings/recurring', {
      method: 'POST',
      body: JSON.stringify({ ...bookingData, schedule })
    }),

  getRecurringBookings: (params = { limit: 50, page: 1 }) => 
    httpClient.request('/bookings/recurring', {}, params),

  updateRecurringBooking: (id, schedule) => 
    httpClient.request(`/bookings/recurring/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ schedule })
    }),

  cancelRecurringBooking: (id) => 
    httpClient.request(`/bookings/recurring/${id}/cancel`, {
      method: 'PATCH'
    })
}

export default bookingService
