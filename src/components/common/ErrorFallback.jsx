import { AlertTriangle, RefreshCw, Home, WifiOff } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getErrorCode, getUserFriendlyMessage, ERROR_CODES } from '../../utils/errorCodes'

export default function ErrorFallback({ error, onRetry, onReset }) {
  const navigate = useNavigate()
  const errorCode = getErrorCode(error)
  const message = getUserFriendlyMessage(error)

  const isNetworkError = [
    ERROR_CODES.NETWORK_ERROR,
    ERROR_CODES.CONNECTION_LOST,
    ERROR_CODES.TIMEOUT_ERROR
  ].includes(errorCode)

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-xl border-2 border-red-200 p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          {isNetworkError ? (
            <WifiOff className="w-8 h-8 text-red-600" />
          ) : (
            <AlertTriangle className="w-8 h-8 text-red-600" />
          )}
        </div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          {isNetworkError ? 'Connection Problem' : 'Something Went Wrong'}
        </h2>

        <p className="text-gray-600 mb-6">{message}</p>

        {import.meta.env.DEV && error.message && (
          <div className="bg-gray-100 rounded-lg p-3 mb-6 text-left">
            <p className="text-xs font-mono text-gray-700 break-all">
              {error.message}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3">
          {onRetry && (
            <button
              onClick={onRetry}
              className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          )}

          {onReset && (
            <button
              onClick={onReset}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
            >
              Reset
            </button>
          )}

          <button
            onClick={() => navigate('/my-bookings')}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            <Home className="w-4 h-4" />
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}
