import { useState, useEffect } from 'react'
import { usePaystackPayment } from 'react-paystack'
import { Lock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import paymentService from '../../services/paymentService'

const PAYMENT_TIMEOUT = 10 * 60 * 1000 // 10 minutes

export default function PaystackPayment({ amount, email, bookingId, onSuccess, onClose, onTimeout }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [timeoutId, setTimeoutId] = useState(null)
  const [paymentConfig, setPaymentConfig] = useState(null)
  const [initError, setInitError] = useState(null)

  // Validate Paystack key
  const paystackKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY

  if (!paystackKey || paystackKey === 'pk_test_xxxxxxxxxxxxx') {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900">Payment Configuration Error</p>
            <p className="text-xs text-red-700 mt-1">
              Paystack public key is not configured. Please contact support.
            </p>
          </div>
        </div>
      </div>
    )
  }

  const config = paymentConfig ? {
    reference: paymentConfig.reference,
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: paystackKey,
    currency: 'NGN',
    metadata: {
      bookingId,
      custom_fields: []
    }
  } : null

  const initializePayment = usePaystackPayment(config || {})

  const handleSuccess = (reference) => {
    setIsProcessing(false)
    if (timeoutId) clearTimeout(timeoutId)
    onSuccess(reference)
  }

  const handleClose = () => {
    setIsProcessing(false)
    if (timeoutId) clearTimeout(timeoutId)
    toast.error('Payment cancelled')
    onClose()
  }

  const handlePayment = async () => {
    setIsProcessing(true)
    setInitError(null)

    try {
      // Call backend to initialize payment
      const response = await paymentService.initializePayment(bookingId)

      if (response.error) {
        throw new Error(response.message || 'Failed to initialize payment')
      }

      const { authorization_url, access_code, reference } = response.data

      // Store payment config
      setPaymentConfig({
        authorization_url,
        access_code,
        reference
      })

      // Set payment timeout
      const id = setTimeout(() => {
        setIsProcessing(false)
        toast.error('Payment timeout. Please try again.')
        if (onTimeout) onTimeout()
      }, PAYMENT_TIMEOUT)

      setTimeoutId(id)

      // Initialize Paystack with backend reference
      initializePayment(handleSuccess, handleClose)

    } catch (error) {
      console.error('Payment initialization error:', error)
      setInitError(error.message || 'Failed to initialize payment')
      toast.error(error.message || 'Failed to initialize payment')
      setIsProcessing(false)
    }
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [timeoutId])

  if (initError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900">Payment Initialization Failed</p>
            <p className="text-xs text-red-700 mt-1">{initError}</p>
            <button
              onClick={() => {
                setInitError(null)
                handlePayment()
              }}
              className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      <button
        onClick={handlePayment}
        type="button"
        disabled={isProcessing}
        className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock className="w-5 h-5" />
        {isProcessing ? 'Initializing Payment...' : `Pay ₦${amount?.toLocaleString()}`}
      </button>

      {isProcessing && (
        <p className="text-xs text-center text-gray-600">
          Please wait while we initialize your payment...
        </p>
      )}
    </div>
  )
}

PaystackPayment.propTypes = {
  amount: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  bookingId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  onTimeout: PropTypes.func
}
