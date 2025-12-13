import { useState } from 'react'
import { Lock, AlertCircle } from 'lucide-react'
import toast from 'react-hot-toast'
import PropTypes from 'prop-types'
import paymentService from '../../services/paymentService'

export default function PaystackPayment({ amount, email, bookingId, onSuccess, onClose, onTimeout }) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [initError, setInitError] = useState(null)

  const handlePayment = async () => {
    setIsProcessing(true)
    setInitError(null)

    try {
      console.log('Initializing payment for booking:', bookingId)
      const response = await paymentService.initializePayment(bookingId)
      console.log('Payment initialization response:', response)

      if (response.error) {
        throw new Error(response.message || 'Failed to initialize payment')
      }

      if (!response.data || !response.data.authorization_url) {
        throw new Error('Invalid payment response from server')
      }

      const { authorization_url, reference } = response.data
      console.log('Payment reference:', reference)
      console.log('Redirecting to:', authorization_url)

      // Redirect to Paystack payment page
      window.location.href = authorization_url

    } catch (error) {
      console.error('Payment initialization error:', error)
      setInitError(error.message || 'Failed to initialize payment')
      toast.error(error.message || 'Failed to initialize payment')
      setIsProcessing(false)
    }
  }

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
