import authService from './authService'
import bookingService from './bookingService'

// Main API service that combines all services
class ApiService {
  // Auth methods
  register = authService.register.bind(authService)
  login = authService.login.bind(authService)
  getProfile = authService.getProfile.bind(authService)
  forgotPassword = authService.forgotPassword.bind(authService)
  resetPassword = authService.resetPassword.bind(authService)

  // Booking methods
  createBooking = bookingService.createBooking.bind(bookingService)
  getBookings = bookingService.getBookings.bind(bookingService)
  getBooking = bookingService.getBooking.bind(bookingService)
}

export default new ApiService()
export { authService, bookingService }