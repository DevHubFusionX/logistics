import { AlertTriangle, RefreshCw } from 'lucide-react'

export default function PaymentRecovery({ error, onRetry, onCancel }) {
  return (
    <div className="bg-red-50 border-2 border-red-200 rounded-lg p-6">
      <div className="flex items-start gap-3 mb-4">
        <AlertTriangle className="w-6 h-6 text-red-600 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-red-900 mb-1">Payment Failed</h3>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-4 mb-4">
        <p className="text-sm font-semibold text-gray-900 mb-2">What you can do:</p>
        <ul className="text-sm text-gray-700 space-y-1 list-disc list-inside">
          <li>Check your internet connection</li>
          <li>Verify your card details</li>
          <li>Ensure sufficient funds</li>
          <li>Try a different payment method</li>
        </ul>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
        >
          Cancel
        </button>
        <button
          onClick={onRetry}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium"
        >
          <RefreshCw className="w-4 h-4" />
          Retry Payment
        </button>
      </div>
    </div>
  )
}
