import { RefreshCw } from 'lucide-react'

export default function RetryIndicator({ retryCount, retryDelay }) {
  if (!retryCount) return null

  return (
    <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-3 animate-pulse">
      <RefreshCw className="w-5 h-5 animate-spin" />
      <div>
        <p className="font-semibold text-sm">Retrying...</p>
        <p className="text-xs opacity-90">
          Attempt {retryCount} • Waiting {Math.round(retryDelay / 1000)}s
        </p>
      </div>
    </div>
  )
}
