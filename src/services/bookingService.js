import httpClient from './httpClient'

class BookingService {
  async createBooking(bookingData) {
    return httpClient.request('/api/bookings', {
      method: 'POST',
      body: JSON.stringify(bookingData),
    })
  }

  async getAllBookings(params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return httpClient.request(`/api/bookings${queryString ? '?' + queryString : ''}`)
  }

  async getBooking(id) {
    return httpClient.request(`/api/bookings/${id}`)
  }

  async updateBooking(id, updateData) {
    return httpClient.request(`/api/bookings/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(updateData),
    })
  }

  async cancelBooking(id) {
    return httpClient.request(`/api/bookings/${id}`, {
      method: 'DELETE',
    })
  }

  async getBookingStatus(id) {
    return httpClient.request(`/api/bookings/${id}/status`)
  }

  async trackBooking(trackingNumber) {
    return httpClient.request(`/api/bookings/track/${trackingNumber}`)
  }
}

export default new BookingService()