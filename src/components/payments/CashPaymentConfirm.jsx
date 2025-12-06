import { Banknote, AlertCircle, CheckCircle } from 'lucide-react'

export default function CashPaymentConfirm({ bookingId, amount, onConfirm, onCancel, loading }) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-lg p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Banknote className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">Cash Payment</h3>
        <p className="text-gray-600 mb-4">Pay the driver in cash upon delivery</p>
        <div className="bg-white rounded-lg p-4 inline-block">
          <p className="text-sm text-gray-600">Amount to Pay</p>
          <p className="text-3xl font-bold text-green-600">₦{amount?.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-blue-800 space-y-2">
            <p><strong>Important Information:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Prepare exact amount if possible</li>
              <li>Request receipt from driver</li>
              <li>Driver will confirm payment in the system</li>
              <li>Payment must be made before goods are unloaded</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-green-800 space-y-2">
            <p><strong>What Happens Next:</strong></p>
            <ol className="list-decimal list-inside space-y-1 ml-2">
              <li>Your booking will be confirmed</li>
              <li>Driver will be assigned within 24 hours</li>
              <li>You'll receive driver contact details</li>
              <li>Pay cash upon successful delivery</li>
            </ol>
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
        <p className="text-xs text-yellow-800">
          <strong>Note:</strong> Cash payment option is subject to approval. We may contact you for verification.
        </p>
      </div>

      <div className="flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
          disabled={loading}
        >
          Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium disabled:opacity-50"
          disabled={loading}
        >
          {loading ? 'Confirming...' : 'Confirm Cash Payment'}
        </button>
      </div>
    </div>
  )
}
