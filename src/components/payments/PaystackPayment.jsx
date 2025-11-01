import { usePaystackPayment } from 'react-paystack'
import { Lock } from 'lucide-react'

export default function PaystackPayment({ amount, email, bookingId, onSuccess, onClose }) {
  const config = {
    reference: `BK-${bookingId}-${Date.now()}`,
    email,
    amount: amount * 100, // Paystack expects amount in kobo
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_xxxxxxxxxxxxx',
    currency: 'NGN',
    metadata: {
      bookingId,
      custom_fields: []
    }
  }

  const initializePayment = usePaystackPayment(config)

  const handlePayment = () => {
    initializePayment(onSuccess, onClose)
  }

  return (
    <button
      onClick={handlePayment}
      type="button"
      className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm"
    >
      <Lock className="w-5 h-5" /> Pay ₦{amount?.toLocaleString()}
    </button>
  )
}
