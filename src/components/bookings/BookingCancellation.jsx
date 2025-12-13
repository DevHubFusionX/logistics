import { useState } from 'react'
import { X, AlertTriangle, Loader } from 'lucide-react'
import { bookingService } from '@/services'
import toast from 'react-hot-toast'

export default function BookingCancellation({ booking, onSuccess, onClose }) {
  const [reason, setReason] = useState('')
  const [loading, setLoading] = useState(false)

  const cancellationReasons = [
    'Change of plans',
    'Found alternative service',
    'Incorrect booking details',
    'Delivery no longer needed',
    'Price too high',
    'Other'
  ]

  const handleCancel = async () => {
    if (!reason.trim()) {
      toast.error('Please select a cancellation reason')
      return
    }

    setLoading(true)
    try {
      await bookingService.cancelBooking(booking._id || booking.id, reason)
      toast.success('Booking cancelled successfully')
      onSuccess?.()
    } catch (error) {
      toast.error(error.message || 'Failed to cancel booking')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Cancel Booking</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-semibold text-red-900 mb-1">Warning</p>
              <p className="text-red-700">
                Cancelling this booking cannot be undone. Any payments made will be processed for refund.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Booking ID: <span className="font-mono font-semibold">{booking._id || booking.id}</span></p>
          <p className="text-sm text-gray-600">Amount: <span className="font-semibold">₦{booking.amount?.toLocaleString()}</span></p>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Cancellation
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select a reason...</option>
            {cancellationReasons.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>

          {reason === 'Other' && (
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 mt-2"
              placeholder="Please specify..."
            />
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Keep Booking
          </button>
          <button
            onClick={handleCancel}
            disabled={loading}
            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white py-2.5 rounded-lg hover:bg-red-700 transition-colors font-semibold disabled:opacity-50"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
            {loading ? 'Cancelling...' : 'Cancel Booking'}
          </button>
        </div>
      </div>
    </div>
  )
}
