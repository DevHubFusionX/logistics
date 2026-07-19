import { useState } from 'react'
import { X, AlertTriangle, Loader } from 'lucide-react'
import { bookingService } from '@/features/booking'
import toast from 'react-hot-toast'

const REASONS = [
  'Change of plans',
  'Found alternative service',
  'Incorrect booking details',
  'Delivery no longer needed',
  'Price too high',
  'Other',
]

export default function BookingCancellation({ booking, onSuccess, onClose }) {
  const [reason, setReason]   = useState('')
  const [other, setOther]     = useState('')
  const [loading, setLoading] = useState(false)

  const handleCancel = async () => {
    const finalReason = reason === 'Other' ? other.trim() : reason
    if (!finalReason) {
      toast.error('Please select a cancellation reason')
      return
    }
    setLoading(true)
    try {
      await bookingService.cancelBooking(booking._id || booking.id)
      toast.success('Booking cancelled')
      onSuccess?.()
    } catch (err) {
      toast.error(err.message || 'Failed to cancel booking')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <h2 className="font-heading font-bold text-gray-900">Cancel booking</h2>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Warning */}
          <div className="flex items-start gap-3 p-4 bg-red-50 rounded-xl border border-red-100">
            <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">This cannot be undone</p>
              <p className="text-xs text-red-600 mt-0.5">Any payments made will be processed for refund.</p>
            </div>
          </div>

          {/* Booking info */}
          <div className="flex items-center justify-between px-1">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Booking ID</p>
              <p className="text-sm font-mono font-bold text-gray-900">{booking._id || booking.id}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Amount</p>
              <p className="text-sm font-bold text-gray-900">₦{(booking.amount || 0).toLocaleString()}</p>
            </div>
          </div>

          {/* Reason */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason</label>
            <div className="grid grid-cols-2 gap-2">
              {REASONS.map(r => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setReason(r)}
                  className={`px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all border ${
                    reason === r
                      ? 'border-red-400 bg-red-50 text-red-700'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
            {reason === 'Other' && (
              <textarea
                value={other}
                onChange={e => setOther(e.target.value)}
                rows={2}
                placeholder="Please specify…"
                className="w-full mt-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 focus:border-red-400 focus:ring-2 focus:ring-red-100 outline-none transition-all resize-none"
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-3 px-5 pb-5">
          <button
            onClick={onClose}
            className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors"
          >
            Keep booking
          </button>
          <button
            onClick={handleCancel}
            disabled={loading || !reason}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-50"
          >
            {loading ? <Loader className="w-4 h-4 animate-spin" /> : <AlertTriangle className="w-4 h-4" />}
            {loading ? 'Cancelling…' : 'Cancel booking'}
          </button>
        </div>
      </div>
    </div>
  )
}
