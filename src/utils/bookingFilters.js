import { BOOKING_STATUS, PAYMENT_STATUS } from '../constants/bookingStatus'

export const filterBookings = (bookings, filter) => {
  if (filter === 'all') return bookings
  return bookings.filter(booking => booking.status === filter)
}

export const shouldShowDriverInfo = (booking) => {
  return booking.driver && 
    [BOOKING_STATUS.CONFIRMED, BOOKING_STATUS.IN_TRANSIT].includes(booking.status)
}

export const canPayBooking = (booking) => {
  return booking.paymentStatus === PAYMENT_STATUS.UNPAID
}

export const canTrackBooking = (booking) => {
  return Boolean(booking.trackingId)
}

export const canDownloadInvoice = (booking) => {
  return booking.status === BOOKING_STATUS.DELIVERED && 
         booking.paymentStatus === PAYMENT_STATUS.PAID
}

export const calculateBookingMetrics = (bookings) => {
  return {
    pending: bookings.filter(b => b.status === BOOKING_STATUS.PENDING).length,
    active: bookings.filter(b => 
      [BOOKING_STATUS.IN_TRANSIT, BOOKING_STATUS.CONFIRMED].includes(b.status)
    ).length,
    delivered: bookings.filter(b => b.status === BOOKING_STATUS.DELIVERED).length,
    outstanding: bookings.filter(b => b.paymentStatus === PAYMENT_STATUS.UNPAID).length
  }
}
