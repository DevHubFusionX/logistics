import { useState, useEffect } from 'react'
import { CreditCard, Truck, Wallet, Building2, Banknote } from 'lucide-react'
import { 
  PaystackPayment, 
  BankTransferComplete, 
  CashPaymentConfirm, 
  PaymentStatusModal, 
  PaymentRecovery,
  WalletPayment 
} from '../payments'
import { validatePaymentMethod, PAYMENT_METHODS } from '../../utils/paymentValidation'
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

  const handleBankTransferSubmit = async (data) => {
    setLoading(true)
    try {
      // Submit bank transfer proof
      // await paymentService.submitBankTransfer(data)
      toast.success('Payment proof submitted! Awaiting verification.')
      onPayLater() // Treat as pending payment
    } catch (error) {
      toast.error('Failed to submit payment proof')
    } finally {
      setLoading(false)
    }
  }

  const handleCashConfirm = async () => {
    setLoading(true)
    try {
      // Confirm cash payment option
      toast.success('Cash payment confirmed!')
      onPayLater()
    } catch (error) {
      toast.error('Failed to confirm cash payment')
    } finally {
      setLoading(false)
    }
  }
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Choose Payment Method</h3>
        
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-600">Booking ID</p>
              <p className="text-lg sm:text-xl font-bold text-blue-600 break-all">{bookingId}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs sm:text-sm text-gray-600">Amount Due</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₦{estimatedCost?.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-6">
          <button
            type="button"
            onClick={() => handleMethodChange(PAYMENT_METHODS.CARD)}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === PAYMENT_METHODS.CARD ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === PAYMENT_METHODS.CARD ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Card Payment</p>
            <p className="text-xs text-gray-500">Pay with Paystack</p>
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange(PAYMENT_METHODS.WALLET)}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === PAYMENT_METHODS.WALLET ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Wallet className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === PAYMENT_METHODS.WALLET ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Wallet</p>
            <p className="text-xs text-gray-500">Pay from balance</p>
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange(PAYMENT_METHODS.BANK_TRANSFER)}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === PAYMENT_METHODS.BANK_TRANSFER ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Building2 className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === PAYMENT_METHODS.BANK_TRANSFER ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Bank Transfer</p>
            <p className="text-xs text-gray-500">Upload proof</p>
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange(PAYMENT_METHODS.CASH)}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === PAYMENT_METHODS.CASH ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Banknote className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === PAYMENT_METHODS.CASH ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Cash Payment</p>
            <p className="text-xs text-gray-500">Pay on delivery</p>
          </button>

          <button
            type="button"
            onClick={() => handleMethodChange(PAYMENT_METHODS.PAY_LATER)}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === PAYMENT_METHODS.PAY_LATER ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Truck className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === PAYMENT_METHODS.PAY_LATER ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Pay Later</p>
            <p className="text-xs text-gray-500">Invoice payment</p>
          </button>
        </div>

        {paymentMethod === PAYMENT_METHODS.CARD && (
          <div className="space-y-4">
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>🔒 Secure Payment:</strong> You'll be redirected to Paystack to complete your payment securely with your debit/credit card.
              </p>
            </div>
            <PaystackPayment
              amount={estimatedCost}
              email={email}
              bookingId={bookingId}
              onSuccess={handlePaystackSuccess}
              onClose={handlePaystackClose}
              onTimeout={handlePaymentTimeout}
            />
          </div>
        )}

        {paymentMethod === PAYMENT_METHODS.WALLET && (
          <WalletPayment
            bookingId={bookingId}
            amount={estimatedCost}
            onSuccess={handlePaystackSuccess}
            onError={(error) => {
              toast.error(error.message || 'Wallet payment failed')
              setShowRecovery(true)
              setRecoveryError(error.message)
            }}
          />
        )}

        {paymentMethod === PAYMENT_METHODS.BANK_TRANSFER && (
          <BankTransferComplete
            bookingId={bookingId}
            amount={estimatedCost}
            onSuccess={(data) => {
              toast.success('Bank transfer submitted successfully')
              onPayLater()
            }}
          />
        )}

        {paymentMethod === PAYMENT_METHODS.CASH && (
          <CashPaymentConfirm
            bookingId={bookingId}
            amount={estimatedCost}
            onConfirm={handleCashConfirm}
            onCancel={() => handleMethodChange(PAYMENT_METHODS.CARD)}
            loading={loading}
          />
        )}

        {paymentMethod === PAYMENT_METHODS.PAY_LATER && (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Pay Later:</strong> An invoice will be sent to your email. Payment is due within 7 days.
              </p>
            </div>
            <button
              onClick={onPayLater}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>

      {!paymentMethod && (
        <div className="flex flex-col sm:flex-row gap-3">
          <button onClick={onBack} className="px-4 sm:px-6 py-3 border rounded-lg hover:bg-gray-50 text-sm sm:text-base">
            Back
          </button>
        </div>
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
