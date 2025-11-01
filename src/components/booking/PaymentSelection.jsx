import { CreditCard, Truck } from 'lucide-react'
import PaystackPayment from '../payments/PaystackPayment'

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
            onClick={() => setPaymentMethod('card')}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === 'card' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <CreditCard className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === 'card' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Card Payment</p>
            <p className="text-xs text-gray-500">Pay with Paystack</p>
          </button>

          <button
            onClick={() => setPaymentMethod('later')}
            className={`p-4 border-2 rounded-lg transition-all ${
              paymentMethod === 'later' ? 'border-blue-600 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <Truck className={`w-8 h-8 mx-auto mb-2 ${
              paymentMethod === 'later' ? 'text-blue-600' : 'text-gray-400'
            }`} />
            <p className="font-semibold text-sm">Pay on Delivery</p>
            <p className="text-xs text-gray-500">Cash/Transfer</p>
          </button>
        </div>

        {paymentMethod === 'card' && (
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
              onSuccess={onPaymentSuccess}
              onClose={onPaymentClose}
            />
          </div>
        )}

        {paymentMethod === 'later' && (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-gray-700">
              <strong>Pay on Delivery:</strong> You can pay the driver in cash or via bank transfer when your shipment is delivered.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onBack} className="px-4 sm:px-6 py-3 border rounded-lg hover:bg-gray-50 text-sm sm:text-base">
          Back
        </button>
        {paymentMethod === 'later' && (
          <button onClick={onPayLater} className="flex-1 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 font-semibold text-sm sm:text-base">
            Confirm Booking
          </button>
        )}
      </div>
    </div>
  )
}
