// Booking ID validation utilities

export const validateBookingId = (bookingId) => {
  if (!bookingId) return false
  
  // Check if it's a valid format (BKG-YYYY-XXX or MongoDB ObjectId)
  const bkgPattern = /^BKG-\d{4}-\d{3,}$/
  const objectIdPattern = /^[a-f\d]{24}$/i
  
  return bkgPattern.test(bookingId) || objectIdPattern.test(bookingId)
}

export const extractBookingId = (response) => {
  // Try multiple possible locations for booking ID
  return (
    response?.data?.bookingId ||
    response?.data?._id ||
    response?.data?.id ||
    response?.bookingId ||
    response?._id ||
    response?.id ||
    null
  )
}

export const isValidBookingResponse = (response) => {
  const bookingId = extractBookingId(response)
  return validateBookingId(bookingId)
}
