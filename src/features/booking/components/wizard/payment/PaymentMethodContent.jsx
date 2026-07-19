import { PaystackPayment, BankTransferComplete, WalletPayment } from '@/features/admin/components/payments'
import { PAYMENT_METHODS } from '@/utils/paymentValidation'
import { Shield, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function PaymentMethodContent({
  paymentMethod,
  estimatedCost,
  email,
  bookingId,
  onPaystackSuccess,
  onPaystackClose,
  onPaymentTimeout,
  onPayLater,
  onWalletError
}) {
  if (!paymentMethod) return null

  if (paymentMethod === PAYMENT_METHODS.CARD) {
    return (
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-2.5 text-xs text-gray-400">
          <Shield className="w-4 h-4 flex-shrink-0 mt-0.5 text-sky-700" />
          <span>You'll be redirected to Paystack to complete payment securely. Your card details are never stored.</span>
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
      <div className="pt-4 border-t border-gray-100">
        <WalletPayment
          bookingId={bookingId}
          amount={estimatedCost}
          onSuccess={onPaystackSuccess}
          onError={onWalletError}
        />
      </div>
    )
  }

  if (paymentMethod === PAYMENT_METHODS.BANK_TRANSFER) {
    return (
      <div className="pt-4 border-t border-gray-100">
        <BankTransferComplete
          bookingId={bookingId}
          amount={estimatedCost}
          onSuccess={() => {
            toast.success('Bank transfer submitted!')
            onPayLater()
          }}
        />
      </div>
    )
  }

  if (paymentMethod === PAYMENT_METHODS.PAY_LATER) {
    return (
      <div className="space-y-3 pt-4 border-t border-gray-100">
        <div className="flex items-start gap-2.5 text-xs text-gray-400">
          <Clock className="w-4 h-4 flex-shrink-0 mt-0.5 text-sky-700" />
          <span>An invoice will be sent to your email. Payment is due within 7 days.</span>
        </div>
        <button
          onClick={onPayLater}
          className="w-full py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
        >
          Confirm booking
        </button>
      </div>
    )
  }

  return null
}
