// Error code definitions and user-friendly messages

export const ERROR_CODES = {
  // Network errors
  NETWORK_ERROR: 'NETWORK_ERROR',
  TIMEOUT_ERROR: 'TIMEOUT_ERROR',
  CONNECTION_LOST: 'CONNECTION_LOST',
  
  // Authentication errors
  UNAUTHORIZED: 'UNAUTHORIZED',
  TOKEN_EXPIRED: 'TOKEN_EXPIRED',
  INVALID_CREDENTIALS: 'INVALID_CREDENTIALS',
  
  // Booking errors
  BOOKING_NOT_FOUND: 'BOOKING_NOT_FOUND',
  BOOKING_CREATION_FAILED: 'BOOKING_CREATION_FAILED',
  INVALID_BOOKING_DATA: 'INVALID_BOOKING_DATA',
  BOOKING_ALREADY_EXISTS: 'BOOKING_ALREADY_EXISTS',
  
  // Payment errors
  PAYMENT_FAILED: 'PAYMENT_FAILED',
  PAYMENT_TIMEOUT: 'PAYMENT_TIMEOUT',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  
  // Validation errors
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  MISSING_REQUIRED_FIELD: 'MISSING_REQUIRED_FIELD',
  
  // Server errors
  SERVER_ERROR: 'SERVER_ERROR',
  SERVICE_UNAVAILABLE: 'SERVICE_UNAVAILABLE',
  RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
  
  // Unknown
  UNKNOWN_ERROR: 'UNKNOWN_ERROR'
}

export const ERROR_MESSAGES = {
  [ERROR_CODES.NETWORK_ERROR]: 'Unable to connect. Please check your internet connection.',
  [ERROR_CODES.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ERROR_CODES.CONNECTION_LOST]: 'Connection lost. Reconnecting...',
  
  [ERROR_CODES.UNAUTHORIZED]: 'You need to log in to continue.',
  [ERROR_CODES.TOKEN_EXPIRED]: 'Your session has expired. Please log in again.',
  [ERROR_CODES.INVALID_CREDENTIALS]: 'Invalid email or password.',
  
  [ERROR_CODES.BOOKING_NOT_FOUND]: 'Booking not found. Please check the booking ID.',
  [ERROR_CODES.BOOKING_CREATION_FAILED]: 'Failed to create booking. Please try again.',
  [ERROR_CODES.INVALID_BOOKING_DATA]: 'Invalid booking information. Please check your details.',
  [ERROR_CODES.BOOKING_ALREADY_EXISTS]: 'A booking with this information already exists.',
  
  [ERROR_CODES.PAYMENT_FAILED]: 'Payment failed. Please try again or use a different payment method.',
  [ERROR_CODES.PAYMENT_TIMEOUT]: 'Payment timed out. Please check your payment status.',
  [ERROR_CODES.INSUFFICIENT_FUNDS]: 'Insufficient funds. Please use a different payment method.',
  
  [ERROR_CODES.VALIDATION_ERROR]: 'Please check your input and try again.',
  [ERROR_CODES.MISSING_REQUIRED_FIELD]: 'Please fill in all required fields.',
  
  [ERROR_CODES.SERVER_ERROR]: 'Server error. Our team has been notified.',
  [ERROR_CODES.SERVICE_UNAVAILABLE]: 'Service temporarily unavailable. Please try again later.',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please wait a moment and try again.',
  
  [ERROR_CODES.UNKNOWN_ERROR]: 'Something went wrong. Please try again.'
}

export const getErrorCode = (error) => {
  // Network errors
  if (!navigator.onLine) return ERROR_CODES.CONNECTION_LOST
  if (error.name === 'TypeError' && error.message.includes('fetch')) return ERROR_CODES.NETWORK_ERROR
  if (error.name === 'AbortError') return ERROR_CODES.TIMEOUT_ERROR
  
  // HTTP status codes
  const status = error.status || error.response?.status
  if (status === 401) return ERROR_CODES.UNAUTHORIZED
  if (status === 403) return ERROR_CODES.TOKEN_EXPIRED
  if (status === 404) return ERROR_CODES.BOOKING_NOT_FOUND
  if (status === 409) return ERROR_CODES.BOOKING_ALREADY_EXISTS
  if (status === 422) return ERROR_CODES.VALIDATION_ERROR
  if (status === 429) return ERROR_CODES.RATE_LIMIT_EXCEEDED
  if (status >= 500) return ERROR_CODES.SERVER_ERROR
  if (status === 503) return ERROR_CODES.SERVICE_UNAVAILABLE
  
  // Error messages
  const message = error.message?.toLowerCase() || ''
  if (message.includes('network')) return ERROR_CODES.NETWORK_ERROR
  if (message.includes('timeout')) return ERROR_CODES.TIMEOUT_ERROR
  if (message.includes('booking')) return ERROR_CODES.BOOKING_CREATION_FAILED
  if (message.includes('payment')) return ERROR_CODES.PAYMENT_FAILED
  if (message.includes('validation')) return ERROR_CODES.VALIDATION_ERROR
  
  return ERROR_CODES.UNKNOWN_ERROR
}

export const getUserFriendlyMessage = (error) => {
  const code = getErrorCode(error)
  return ERROR_MESSAGES[code] || ERROR_MESSAGES[ERROR_CODES.UNKNOWN_ERROR]
}

export const isRetryableError = (error) => {
  const code = getErrorCode(error)
  return [
    ERROR_CODES.NETWORK_ERROR,
    ERROR_CODES.TIMEOUT_ERROR,
    ERROR_CODES.CONNECTION_LOST,
    ERROR_CODES.SERVER_ERROR,
    ERROR_CODES.SERVICE_UNAVAILABLE
  ].includes(code)
}
