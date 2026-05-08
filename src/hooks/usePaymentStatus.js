import { useState, useEffect, useCallback, useRef } from 'react'
import paymentService from '../services/paymentService'

const PAYMENT_TIMEOUT = 10 * 60 * 1000 // 10 minutes
const POLL_INTERVAL = 5000 // 5 seconds

export const usePaymentStatus = (paymentRef, bookingId) => {
  const [status, setStatus] = useState('pending') // pending, processing, success, failed, timeout
  const [isPolling, setIsPolling] = useState(false)
  const [error, setError] = useState(null)
  const pollIntervalRef = useRef(null)
  const timeoutRef = useRef(null)

  const stopPolling = useCallback(() => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current)
      pollIntervalRef.current = null
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
      timeoutRef.current = null
    }
    setIsPolling(false)
  }, [])

  const checkPaymentStatus = useCallback(async () => {
    if (!paymentRef || !bookingId) return

    try {
      const response = await paymentService.verifyPayment(bookingId)
      
      if (response.status === 'success' || response.data?.status === 'success') {
        setStatus('success')
        stopPolling()
        return true
      } else if (response.status === 'failed' || response.data?.status === 'failed') {
        setStatus('failed')
        stopPolling()
        return false
      }
      
      setStatus('processing')
      return null
    } catch (err) {
      setError(err)
      return null
    }
  }, [paymentRef, bookingId, stopPolling])

  const startPolling = useCallback(() => {
    if (isPolling) return

    setIsPolling(true)
    setStatus('processing')
    setError(null)

    // Initial check
    checkPaymentStatus()

    // Set up polling
    pollIntervalRef.current = setInterval(checkPaymentStatus, POLL_INTERVAL)

    // Set up timeout
    timeoutRef.current = setTimeout(() => {
      setStatus('timeout')
      stopPolling()
    }, PAYMENT_TIMEOUT)
  }, [isPolling, checkPaymentStatus, stopPolling])

  const reset = useCallback(() => {
    stopPolling()
    setStatus('pending')
    setError(null)
  }, [stopPolling])

  useEffect(() => {
    return () => {
      stopPolling()
    }
  }, [stopPolling])

  return {
    status,
    isPolling,
    error,
    startPolling,
    stopPolling,
    reset,
    checkPaymentStatus
  }
}
