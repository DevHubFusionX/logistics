// Booking ID validation utilities

export const validateBookingId = (bookingId) => {
  if (!bookingId) return false

  // Check if it's a valid format (BKG-YYYY-XXX, MongoDB ObjectId, or UUID)
  const bkgPattern = /^BKG-\d{4}-\d{3,}$/
  const objectIdPattern = /^[a-f\d]{24}$/i
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

  return bkgPattern.test(bookingId) || objectIdPattern.test(bookingId) || uuidPattern.test(bookingId)
}

export const extractBookingId = (response) => {
  // Try nested DARA API structure first: { data: { error, message, data: { _id, ... } } }
  return (
    response?.data?.data?._id ||
    response?.data?.data?.id ||
    response?.data?.shipment?.id ||
    response?.data?.bookingId ||
    response?.data?._id ||
    response?.data?.id ||
    response?.shipment?.id ||
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
