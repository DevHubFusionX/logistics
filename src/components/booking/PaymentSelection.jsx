import { useState, useEffect } from 'react'
import { PaymentStatusModal, PaymentRecovery } from '../payments'
import { PaymentSummary, PaymentMethodGrid, PaymentMethodContent } from './payment'
import { validatePaymentMethod } from '../../utils/paymentValidation'
import { usePaymentStatus } from '../../hooks/usePaymentStatus'
import { usePaymentVerification } from '../../hooks/usePaymentVerification'
import toast from 'react-hot-toast'

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
  const [loading, setLoading] = useState(false)
  const [paymentRef, setPaymentRef] = useState(null)
  const [showStatusModal, setShowStatusModal] = useState(false)
  const [modalStatus, setModalStatus] = useState('processing')
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryError, setRecoveryError] = useState('')
  
  const paymentStatus = usePaymentStatus(paymentRef, bookingId)
  const paymentVerification = usePaymentVerification(bookingId, estimatedCost)

  // Handle payment status changes
  useEffect(() => {
    if (paymentStatus.status === 'success') {
      setModalStatus('success')
      setShowStatusModal(true)
      setTimeout(() => {
        setShowStatusModal(false)
        onPaymentSuccess({ reference: paymentRef })
      }, 2000)
    } else if (paymentStatus.status === 'failed') {
      setModalStatus('failed')
      setShowStatusModal(true)
    } else if (paymentStatus.status === 'timeout') {
      setModalStatus('timeout')
      setShowStatusModal(true)
    }
  }, [paymentStatus.status, paymentRef, onPaymentSuccess])

  const handleMethodChange = (method) => {
    if (!validatePaymentMethod(method)) {
      toast.error('Invalid payment method selected')
      return
    }
    setPaymentMethod(method)
  }

  const handlePaystackSuccess = async (reference) => {
    setPaymentRef(reference.reference)
    setModalStatus('processing')
    setShowStatusModal(true)
    
    try {
      await paymentVerification.verify(reference.reference)
      paymentStatus.startPolling()
    } catch (err) {
      setModalStatus('failed')
      setRecoveryError(err.message)
      setShowRecovery(true)
    }
  }

  const handlePaystackClose = () => {
    setModalStatus('cancelled')
    setShowStatusModal(true)
  }

  const handlePaymentTimeout = () => {
    setModalStatus('timeout')
    setShowStatusModal(true)
  }

  const handleRetryPayment = () => {
    setShowStatusModal(false)
    setShowRecovery(false)
    paymentStatus.reset()
    setPaymentRef(null)
    setRecoveryError('')
    toast.info('Please try payment again')
  }

  const handleCancelPayment = () => {
    setShowStatusModal(false)
    paymentStatus.stopPolling()
    setPaymentRef(null)
    onPaymentClose()
  }

  const handleCloseModal = () => {
    setShowStatusModal(false)
  }

  const handleCashConfirm = async () => {
    setLoading(true)
    try {
      toast.success('Cash payment confirmed!')
      onPayLater()
    } catch (error) {
      toast.error('Failed to confirm cash payment')
    } finally {
      setLoading(false)
    }
  }

  const handleWalletError = (error) => {
    toast.error(error.message || 'Wallet payment failed')
    setShowRecovery(true)
    setRecoveryError(error.message)
  }
  return (
    <div className="space-y-4 sm:space-y-6 animate-fadeIn">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-lg">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Choose Payment Method</h3>
        
        <PaymentSummary bookingId={bookingId} amount={estimatedCost} />
        
        <PaymentMethodGrid 
          selectedMethod={paymentMethod} 
          onMethodChange={handleMethodChange} 
        />

        <PaymentMethodContent
          paymentMethod={paymentMethod}
          estimatedCost={estimatedCost}
          email={email}
          bookingId={bookingId}
          loading={loading}
          onPaystackSuccess={handlePaystackSuccess}
          onPaystackClose={handlePaystackClose}
          onPaymentTimeout={handlePaymentTimeout}
          onCashConfirm={handleCashConfirm}
          onPayLater={onPayLater}
          onWalletError={handleWalletError}
        />
      </div>

      {!paymentMethod && (
        <button 
          onClick={onBack} 
          className="px-6 py-3 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all font-semibold shadow-sm"
        >
          Back
        </button>
      )}
      
      {showRecovery && (
        <PaymentRecovery
          error={recoveryError}
          onRetry={handleRetryPayment}
          onCancel={handleCancelPayment}
        />
      )}
      
      {showStatusModal && (
        <PaymentStatusModal
          status={modalStatus}
          onRetry={handleRetryPayment}
          onCancel={handleCancelPayment}
          onClose={handleCloseModal}
        />
      )}
    </div>
  )
}
