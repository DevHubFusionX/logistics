import httpClient from './httpClient'

class BookingService {
  async createBooking(bookingData) {
    return httpClient.request('/bookings/', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }

  async getBookings(page = 1, limit = 10) {
    return httpClient.request(`/bookings/?limit=${limit}&page=${page}`)
  }

  async getBooking(id) {
    return httpClient.request(`/bookings/${id}`)
  }

  async updateBooking(id, bookingData) {
    return httpClient.request(`/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookingData),
    })
  }

  async cancelBooking(id) {
    return httpClient.request(`/bookings/cancel/${id}`, {
      method: 'PATCH',
    })
  }
}

export default new BookingService()