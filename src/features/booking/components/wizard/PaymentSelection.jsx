import { useState, useEffect } from 'react'
import { PaymentRecovery } from '@/features/billing/components/payments'
import { PaymentSummary, PaymentMethodGrid, PaymentMethodContent } from './payment'
import { validatePaymentMethod } from '@/utils/paymentValidation'
import { usePaymentStatus } from '@/hooks/usePaymentStatus'
import { usePaymentVerification } from '@/hooks/usePaymentVerification'
import { CheckCircle, XCircle, Loader2, RefreshCw, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

// Inline status screen — replaces the nested PaymentStatusModal
function StatusScreen({ status, onRetry, onCancel }) {
  const states = {
    processing: {
      icon: <Loader2 className="w-10 h-10 text-sky-700 animate-spin" />,
      title: 'Processing payment',
      desc:  'Please wait while we verify your payment…',
      actions: null,
    },
    success: {
      icon: <CheckCircle className="w-10 h-10 text-green-500" />,
      title: 'Payment successful!',
      desc:  'Your booking is confirmed. Redirecting…',
      actions: null,
    },
    failed: {
      icon: <XCircle className="w-10 h-10 text-red-500" />,
      title: 'Payment failed',
      desc:  'Something went wrong processing your payment.',
      actions: (
        <div className="flex gap-3 w-full">
          <button onClick={onCancel} className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button onClick={onRetry} className="flex-1 flex items-center justify-center gap-2 py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors">
            <RefreshCw className="w-4 h-4" /> Try again
          </button>
        </div>
      ),
    },
    cancelled: {
      icon: <XCircle className="w-10 h-10 text-gray-400" />,
      title: 'Payment cancelled',
      desc:  'You closed the payment window.',
      actions: (
        <button onClick={onRetry} className="w-full flex items-center justify-center gap-2 py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors">
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      ),
    },
    timeout: {
      icon: <XCircle className="w-10 h-10 text-orange-400" />,
      title: 'Payment timed out',
      desc:  'The payment session expired. Please try again.',
      actions: (
        <button onClick={onRetry} className="w-full flex items-center justify-center gap-2 py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors">
          <RefreshCw className="w-4 h-4" /> Try again
        </button>
      ),
    },
  }

  const s = states[status]
  if (!s) return null

  return (
    <div className="flex flex-col items-center text-center py-8 gap-4">
      {s.icon}
      <div>
        <p className="font-heading font-bold text-gray-900">{s.title}</p>
        <p className="text-sm text-gray-400 mt-1">{s.desc}</p>
      </div>
      {s.actions && <div className="w-full mt-2">{s.actions}</div>}
    </div>
  )
}

export default function PaymentSelection({
  bookingId,
  estimatedCost,
  email,
  paymentMethod,
  setPaymentMethod,
  onPaymentSuccess,
  onPaymentClose,
  onPayLater,
  onBack
}) {
  const [paymentRef, setPaymentRef]     = useState(null)
  const [status, setStatus]             = useState(null) // null | 'processing' | 'success' | 'failed' | 'cancelled' | 'timeout'
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryError, setRecoveryError] = useState('')

  const paymentStatus      = usePaymentStatus(paymentRef, bookingId)
  const paymentVerification = usePaymentVerification(bookingId, estimatedCost)

  useEffect(() => {
    if (paymentStatus.status === 'success') {
      setStatus('success')
      setTimeout(() => {
        setStatus(null)
        onPaymentSuccess({ reference: paymentRef })
      }, 1800)
    } else if (paymentStatus.status === 'failed') {
      setStatus('failed')
    } else if (paymentStatus.status === 'timeout') {
      setStatus('timeout')
    }
  }, [paymentStatus.status])

  const handleMethodChange = (method) => {
    if (!validatePaymentMethod(method)) { toast.error('Invalid payment method'); return }
    setPaymentMethod(method)
  }

  const handlePaystackSuccess = async (reference) => {
    setPaymentRef(reference.reference)
    setStatus('processing')
    try {
      await paymentVerification.verify(reference.reference)
      paymentStatus.startPolling()
    } catch (err) {
      setStatus('failed')
      setRecoveryError(err.message)
      setShowRecovery(true)
    }
  }

  const handleRetry = () => {
    setStatus(null)
    setShowRecovery(false)
    paymentStatus.reset()
    setPaymentRef(null)
    setRecoveryError('')
    toast.info('Please try again')
  }

  const handleCancel = () => {
    setStatus(null)
    paymentStatus.stopPolling()
    setPaymentRef(null)
    onPaymentClose()
  }

  // Show inline status screen when payment is in progress
  if (status) {
    return (
      <StatusScreen
        status={status}
        onRetry={handleRetry}
        onCancel={handleCancel}
      />
    )
  }

  return (
    <div className="space-y-4">
      <PaymentSummary bookingId={bookingId} amount={estimatedCost} />

      <div>
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Payment method</p>
        <PaymentMethodGrid
          selectedMethod={paymentMethod}
          onMethodChange={handleMethodChange}
        />
      </div>

      <PaymentMethodContent
        paymentMethod={paymentMethod}
        estimatedCost={estimatedCost}
        email={email}
        bookingId={bookingId}
        onPaystackSuccess={handlePaystackSuccess}
        onPaystackClose={() => setStatus('cancelled')}
        onPaymentTimeout={() => setStatus('timeout')}
        onPayLater={onPayLater}
        onWalletError={(err) => {
          toast.error(err.message || 'Wallet payment failed')
          setShowRecovery(true)
          setRecoveryError(err.message)
        }}
      />

      {!paymentMethod && onBack && (
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
      )}

      {showRecovery && (
        <PaymentRecovery
          error={recoveryError}
          onRetry={handleRetry}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}
