import { PaystackPayment, BankTransferComplete, CashPaymentConfirm, WalletPayment } from '../../payments'
import { PAYMENT_METHODS } from '../../../utils/paymentValidation'
import toast from 'react-hot-toast'

export default function PaymentMethodContent({ 
  paymentMethod, 
  estimatedCost, 
  email, 
  bookingId, 
  loading,
  onPaystackSuccess,
  onPaystackClose,
  onPaymentTimeout,
  onCashConfirm,
  onPayLater,
  onWalletError
}) {
  if (paymentMethod === PAYMENT_METHODS.CARD) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>🔒 Secure Payment:</strong> You'll be redirected to Paystack to complete your payment securely.
          </p>
        </div>
        <PaystackPayment
          amount={estimatedCost}
          email={email}
          bookingId={bookingId}
          onSuccess={onPaystackSuccess}
          onClose={onPaystackClose}
          onTimeout={onPaymentTimeout}
        />
      </div>
    )
  }

  if (paymentMethod === PAYMENT_METHODS.WALLET) {
    return (
      <WalletPayment
        bookingId={bookingId}
        amount={estimatedCost}
        onSuccess={onPaystackSuccess}
        onError={onWalletError}
      />
    )
  }

  if (paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
    return (
      <BankTransferComplete
        bookingId={bookingId}
        amount={estimatedCost}
        onSuccess={() => {
          toast.success('Bank transfer submitted successfully')
          onPayLater()
        }}
      />
    )
  }

  if (paymentMethod === PAYMENT_METHODS.CASH) {
    return (
      <CashPaymentConfirm
        bookingId={bookingId}
        amount={estimatedCost}
        onConfirm={onCashConfirm}
        onCancel={() => {}}
        loading={loading}
      />
    )
  }

  if (paymentMethod === PAYMENT_METHODS.PAY_LATER) {
    return (
      <div className="space-y-4">
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Pay Later:</strong> An invoice will be sent to your email. Payment is due within 7 days.
          </p>
        </div>
        <button
          onClick={onPayLater}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold active:scale-95 transition-all"
        >
          Confirm Booking
        </button>
      </div>
    )
  }

  return null
}
