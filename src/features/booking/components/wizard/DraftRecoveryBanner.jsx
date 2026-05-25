import { AlertCircle, X, Clock } from 'lucide-react'

export default function DraftRecoveryBanner({ draftAge, onRestore, onDiscard }) {
  if (!draftAge) return null

  const timeAgo = draftAge.hours > 0 
    ? `${draftAge.hours}h ${draftAge.minutes}m ago`
    : `${draftAge.minutes}m ago`

  return (
    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 rounded-r-lg">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-blue-900 mb-1">
            Draft Booking Found
          </h3>
          <p className="text-sm text-blue-700 mb-3">
            You have an unfinished booking from <span className="font-semibold">{timeAgo}</span>. 
            Would you like to continue where you left off?
          </p>
          <div className="flex gap-2">
            <button
              onClick={onRestore}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Restore Draft
            </button>
            <button
              onClick={onDiscard}
              className="px-4 py-2 bg-white border border-blue-300 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-50 transition-colors"
            >
              Start Fresh
            </button>
          </div>
        </div>
        <button
          onClick={onDiscard}
          className="p-1 hover:bg-blue-100 rounded transition-colors"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4 text-blue-600" />
        </button>
      </div>
    </div>
  )
}
