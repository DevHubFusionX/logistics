// Payment verification utilities

export const validatePaymentReference = (reference) => {
  if (!reference || typeof reference !== 'string') return false
  const pattern = /^[a-zA-Z0-9_-]{10,}$/
  return pattern.test(reference)
}

export const verifyPaymentAmount = (expectedAmount, actualAmount) => {
  const expected = parseFloat(expectedAmount)
  const actual = parseFloat(actualAmount)
  return Math.abs(expected - actual) <= 0.01
}

const processedPayments = new Set()

export const isDuplicatePayment = (reference) => {
  return processedPayments.has(reference)
}

export const markPaymentProcessed = (reference) => {
  processedPayments.add(reference)
}

export const clearProcessedPayments = () => {
  processedPayments.clear()
}
