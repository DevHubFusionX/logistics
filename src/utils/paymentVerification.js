// Payment verification utilities
// NOTE: validatePaymentReference and verifyPaymentAmount are also in utils/validation.js
// The canonical versions should be used for new code — these are kept for the
// existing callers that import from this module directly.

export { validatePaymentReference, verifyPaymentAmount } from './validation'

// ─── Processed-payment dedup Set with TTL eviction ─────────────────────────
// Stores { reference → expiresAt } so entries are automatically cleaned up
// instead of the Set growing without bound for the lifetime of the tab.

const PAYMENT_TTL_MS = 60 * 60 * 1000 // 1 hour

/** @type {Map<string, number>} reference → expiry timestamp */
const processedPayments = new Map()

/**
 * Remove all entries whose TTL has elapsed.
 * Called automatically on every read/write so the Map stays lean.
 */
function evictExpired() {
  const now = Date.now()
  for (const [ref, expiresAt] of processedPayments) {
    if (now >= expiresAt) processedPayments.delete(ref)
  }
}

export const isDuplicatePayment = (reference) => {
  evictExpired()
  return processedPayments.has(reference)
}

export const markPaymentProcessed = (reference) => {
  evictExpired()
  processedPayments.set(reference, Date.now() + PAYMENT_TTL_MS)
}

export const clearProcessedPayments = () => {
  processedPayments.clear()
}
