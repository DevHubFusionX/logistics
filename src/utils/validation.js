/**
 * Canonical validation module for the Dara Express application.
 * 
 * All validation logic is consolidated here. Other modules should import
 * from this file instead of re-implementing validation rules.
 * 
 * Phone validation is Nigeria-focused (+234 / 0-prefixed numbers).
 */

// ─── Email ──────────────────────────────────────────────────────
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export const validateEmail = (email) => EMAIL_REGEX.test(email)

/** @deprecated Use validateEmail instead */
export const isValidEmail = validateEmail

// ─── Phone (Nigeria-focused) ────────────────────────────────────
// Matches +234XXXXXXXXXX or 0XXXXXXXXXX (Nigerian mobile)
const NIGERIAN_PHONE_REGEX = /^(\+234|0)[7-9][0-1]\d{8}$/

export const validatePhone = (phone) => {
  if (!phone) return false
  return NIGERIAN_PHONE_REGEX.test(phone.replace(/[\s-]/g, ''))
}

/** @deprecated Use validatePhone instead */
export const isValidPhone = validatePhone

/**
 * Normalize a phone number to E.164 Nigerian format (+234...).
 * Returns the original value if it already starts with +.
 */
export const normalizePhone = (phone) => {
  if (!phone) return phone
  const p = phone.replace(/\s+/g, '')
  if (p.startsWith('+')) return p
  if (p.startsWith('0')) return '+234' + p.slice(1)
  if (p.startsWith('234')) return '+' + p
  return '+234' + p
}

// ─── Password ───────────────────────────────────────────────────
export const isStrongPassword = (password) => {
  if (!password || password.length < 8) return false
  if (!/[A-Z]/.test(password)) return false
  if (!/[a-z]/.test(password)) return false
  if (!/[0-9]/.test(password)) return false
  return true
}

const STRENGTH_LEVELS = [
  { level: 0, label: 'None' },
  { level: 1, label: 'Weak' },
  { level: 2, label: 'Fair' },
  { level: 3, label: 'Good' },
  { level: 4, label: 'Strong' },
  { level: 5, label: 'Very Strong' }
]

export const getPasswordStrength = (password) => {
  if (!password) return STRENGTH_LEVELS[0]

  let strength = 0
  if (password.length >= 8) strength++
  if (password.length >= 12) strength++
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
  if (/[0-9]/.test(password)) strength++
  if (/[^A-Za-z0-9]/.test(password)) strength++

  return STRENGTH_LEVELS[strength]
}

// ─── Cargo / Booking ────────────────────────────────────────────
export const validateWeight = (weight) => {
  const num = parseFloat(weight)
  return !isNaN(num) && num >= 0.1 && num <= 50000
}

export const validateQuantity = (quantity) => {
  const num = parseInt(quantity)
  return !isNaN(num) && num >= 1 && num <= 1000
}

export const validateDate = (dateString) => {
  const date = new Date(dateString)
  const now = new Date()
  const maxDate = new Date()
  maxDate.setFullYear(maxDate.getFullYear() + 1)
  return date > now && date < maxDate
}

export const validateBusinessHours = (dateString) => {
  const date = new Date(dateString)
  const hours = date.getHours()
  const day = date.getDay()
  // Monday-Saturday, 6 AM - 8 PM
  return day !== 0 && hours >= 6 && hours <= 20
}

export const validateAddress = (address) => {
  return address && address.trim().length >= 10
}

// ─── Booking ID ─────────────────────────────────────────────────
const BKG_PATTERN = /^BKG-\d{4}-\d{3,}$/
const OBJECT_ID_PATTERN = /^[a-f\d]{24}$/i
const UUID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export const validateBookingId = (bookingId) => {
  if (!bookingId) return false
  return BKG_PATTERN.test(bookingId) || OBJECT_ID_PATTERN.test(bookingId) || UUID_PATTERN.test(bookingId)
}

// ─── Payment ────────────────────────────────────────────────────
export const validatePaymentReference = (reference) => {
  if (!reference || typeof reference !== 'string') return false
  return /^[a-zA-Z0-9_-]{10,}$/.test(reference)
}

export const verifyPaymentAmount = (expectedAmount, actualAmount) => {
  const expected = parseFloat(expectedAmount)
  const actual = parseFloat(actualAmount)
  return Math.abs(expected - actual) <= 0.01
}

// ─── General ────────────────────────────────────────────────────
export const isValidUrl = (url) => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const isEmpty = (value) =>
  value === null || value === undefined || value === '' ||
  (Array.isArray(value) && value.length === 0) ||
  (typeof value === 'object' && Object.keys(value).length === 0)
