import { useState } from 'react'
import { AlertCircle, Send, X } from 'lucide-react'
import { paymentService } from '@/services'
import toast from 'react-hot-toast'

export default function RefundRequest({ paymentId, amount, onSuccess, onClose }) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const refundReasons = [
    'Service not delivered',
    'Damaged goods',
    'Wrong item delivered',
    'Delayed delivery',
    'Duplicate payment',
    'Other'
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!reason.trim()) {
      toast.error('Please provide a reason for refund')
      return
    }

    setLoading(true)
    try {
      const response = await paymentService.requestRefund(paymentId, reason)
      toast.success('Refund request submitted successfully')
      onSuccess?.(response.data)
    } catch (error) {
      toast.error(error.message || 'Failed to submit refund request')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Request Refund</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-blue-900 mb-1">Refund Amount</p>
              <p className="text-blue-700">₦{amount?.toLocaleString()}</p>
              <p className="text-xs text-blue-600 mt-2">
                Refunds are typically processed within 5-7 business days
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reason for Refund
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            >
              <option value="">Select a reason...</option>
              {refundReasons.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {reason === 'Other' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Details
              </label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Please provide more details..."
                required
              />
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4" />
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
