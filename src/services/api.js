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
  getAllBookings = bookingService.getAllBookings.bind(bookingService)
  getBooking = bookingService.getBooking.bind(bookingService)
  updateBooking = bookingService.updateBooking.bind(bookingService)
  cancelBooking = bookingService.cancelBooking.bind(bookingService)
  getBookingStatus = bookingService.getBookingStatus.bind(bookingService)
  trackBooking = bookingService.trackBooking.bind(bookingService)
}

export default new ApiService()
export { authService, bookingService }