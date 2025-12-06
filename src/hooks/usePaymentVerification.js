import { useState, useCallback } from 'react'
import paymentService from '../services/paymentService'
import { validatePaymentReference, verifyPaymentAmount, isDuplicatePayment, markPaymentProcessed } from '../utils/paymentVerification'

export const usePaymentVerification = (bookingId, expectedAmount) => {
  const [verifying, setVerifying] = useState(false)
  const [error, setError] = useState(null)

  const verify = useCallback(async (reference) => {
    setVerifying(true)
    setError(null)

    try {
      if (!validatePaymentReference(reference)) {
        throw new Error('Invalid payment reference')
      }

      if (isDuplicatePayment(reference)) {
        throw new Error('Payment already processed')
      }

      const response = await paymentService.verifyPayment(bookingId)
      const actualAmount = response.data?.amount || response.amount

      if (!verifyPaymentAmount(expectedAmount, actualAmount)) {
        throw new Error('Payment amount mismatch')
      }

      markPaymentProcessed(reference)
      return response
    } catch (err) {
      setError(err.message)
      throw err
    } finally {
      setVerifying(false)
    }
  }, [bookingId, expectedAmount])

  return { verify, verifying, error }
}
