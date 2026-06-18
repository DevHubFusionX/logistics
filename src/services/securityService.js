
import { sanitizeInput } from '../utils/sanitize'
import { validateAddress } from '../utils/validation'

/** @type {Map<string, { count: number, resetTime: number }>} */
const rateLimits = new Map()

// Periodically prune entries whose window has already expired so the Map
// doesn't grow unbounded for keys that are never re-checked.
setInterval(() => {
  const now = Date.now()
  for (const [key, record] of rateLimits) {
    if (now > record.resetTime) rateLimits.delete(key)
  }
}, 10 * 60 * 1000) // every 10 minutes

const checkRateLimit = (key, maxRequests = 10, windowMs = 60000) => {
  const now = Date.now()
  const record = rateLimits.get(key) || { count: 0, resetTime: now + windowMs }

  if (now > record.resetTime) {
    // Window expired — start a fresh window
    rateLimits.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }

  if (record.count >= maxRequests) {
    return false
  }

  record.count++
  rateLimits.set(key, record)
  return true
}

// Encryption for draft data
const encryptData = (data) => {
  try {
    return btoa(JSON.stringify(data))
  } catch {
    return null
  }
}

const decryptData = (encrypted) => {
  try {
    return JSON.parse(atob(encrypted))
  } catch {
    return null
  }
}


// Secure draft operations
export const saveDraft = (key, data) => {
  const encrypted = encryptData(data)
  if (encrypted) {
    localStorage.setItem(`draft_${key}`, encrypted)
    localStorage.setItem(`draft_${key}_ts`, Date.now().toString())
  }
}

export const loadDraft = (key, maxAgeMs = 86400000) => {
  const encrypted = localStorage.getItem(`draft_${key}`)
  const timestamp = localStorage.getItem(`draft_${key}_ts`)
  
  if (!encrypted || !timestamp) return null
  
  if (Date.now() - parseInt(timestamp) > maxAgeMs) {
    clearDraft(key)
    return null
  }
  
  return decryptData(encrypted)
}

export const clearDraft = (key) => {
  localStorage.removeItem(`draft_${key}`)
  localStorage.removeItem(`draft_${key}_ts`)
}

// Input validation — use canonical sanitizeInput from utils/sanitize.js
// Re-exported here for backward compatibility
export { sanitizeInput }

export const validateBookingData = (data) => {
  const errors = {}
  
  if (!data.pickup?.address) errors.pickup = 'Pickup address required'
  if (!data.delivery?.address) errors.delivery = 'Delivery address required'
  if (!data.packageDetails?.weight || data.packageDetails.weight <= 0) {
    errors.weight = 'Valid weight required'
  }
  if (!data.packageDetails?.dimensions?.length || data.packageDetails.dimensions.length <= 0) {
    errors.dimensions = 'Valid dimensions required'
  }
  
  return { isValid: Object.keys(errors).length === 0, errors }
}

export const checkRateLimitPublic = checkRateLimit

export default {
  saveDraft,
  loadDraft,
  clearDraft,
  sanitizeInput,
  validateBookingData,
  checkRateLimit: checkRateLimitPublic
}
