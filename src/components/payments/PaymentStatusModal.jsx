import { CheckCircle, XCircle, Clock, Loader, AlertTriangle } from 'lucide-react'

export default function PaymentStatusModal({ status, onRetry, onCancel, onClose }) {
  const statusConfig = {
    processing: {
      icon: Loader,
      iconClass: 'text-blue-600 animate-spin',
      bgClass: 'bg-blue-100',
      title: 'Processing Payment',
      message: 'Please wait while we verify your payment...',
      showActions: false
    },
    success: {
      icon: CheckCircle,
      iconClass: 'text-green-600',
      bgClass: 'bg-green-100',
      title: 'Payment Successful!',
      message: 'Your payment has been confirmed.',
      showActions: true,
      primaryAction: { label: 'Continue', onClick: onClose, class: 'bg-green-600 hover:bg-green-700' }
    },
    failed: {
      icon: XCircle,
      iconClass: 'text-red-600',
      bgClass: 'bg-red-100',
      title: 'Payment Failed',
      message: 'We couldn\'t process your payment. Please try again.',
      showActions: true,
      primaryAction: { label: 'Retry Payment', onClick: onRetry, class: 'bg-blue-600 hover:bg-blue-700' },
      secondaryAction: { label: 'Cancel', onClick: onCancel }
    },
    timeout: {
      icon: Clock,
      iconClass: 'text-orange-600',
      bgClass: 'bg-orange-100',
      title: 'Payment Timeout',
      message: 'Payment verification is taking longer than expected. Please check your payment status or try again.',
      showActions: true,
      primaryAction: { label: 'Check Status', onClick: onRetry, class: 'bg-blue-600 hover:bg-blue-700' },
      secondaryAction: { label: 'Cancel', onClick: onCancel }
    },
    cancelled: {
      icon: AlertTriangle,
      iconClass: 'text-yellow-600',
      bgClass: 'bg-yellow-100',
      title: 'Payment Cancelled',
      message: 'You cancelled the payment process.',
      showActions: true,
      primaryAction: { label: 'Try Again', onClick: onRetry, class: 'bg-blue-600 hover:bg-blue-700' },
      secondaryAction: { label: 'Close', onClick: onCancel }
    }
  }

  const config = statusConfig[status] || statusConfig.processing
  const Icon = config.icon

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-md w-full p-6 text-center">
        <div className={`w-16 h-16 ${config.bgClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <Icon className={`w-8 h-8 ${config.iconClass}`} />
        </div>
        
        <h2 className="text-xl font-bold text-gray-900 mb-2">{config.title}</h2>
        <p className="text-gray-600 mb-6">{config.message}</p>
        
        {config.showActions && (
          <div className="flex flex-col sm:flex-row gap-3">
            {config.secondaryAction && (
              <button
                onClick={config.secondaryAction.onClick}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium"
              >
                {config.secondaryAction.label}
              </button>
            )}
            {config.primaryAction && (
              <button
                onClick={config.primaryAction.onClick}
                className={`flex-1 px-4 py-3 text-white rounded-lg font-medium ${config.primaryAction.class}`}
              >
                {config.primaryAction.label}
              </button>
            )}
          </div>
        )}
        
        {status === 'processing' && (
          <p className="text-xs text-gray-500 mt-4">
            This may take a few moments. Please don't close this window.
          </p>
        )}
      </div>
    </div>
  )
}
