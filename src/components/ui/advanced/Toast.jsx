import { useState, useEffect } from 'react'
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react'

const ToastContainer = ({ toasts, removeToast }) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 space-y-2"
      role="region"
      aria-label="Notifications"
    >
      {toasts.map(toast => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

const Toast = ({ 
  id, 
  type = 'info', 
  title, 
  message, 
  duration = 5000, 
  onClose,
  colorblindSafe = true 
}) => {
  const [isVisible, setIsVisible] = useState(true)
  
  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false)
        setTimeout(onClose, 300) // Wait for animation
      }, duration)
      
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])
  
  const config = {
    success: {
      icon: CheckCircle,
      colors: colorblindSafe 
        ? 'bg-blue-50 border-blue-200 text-blue-800'
        : 'bg-green-50 border-green-200 text-green-800',
      iconColor: colorblindSafe ? 'text-blue-600' : 'text-green-600'
    },
    error: {
      icon: AlertCircle,
      colors: colorblindSafe 
        ? 'bg-red-50 border-red-200 text-red-800'
        : 'bg-red-50 border-red-200 text-red-800',
      iconColor: 'text-red-600'
    },
    warning: {
      icon: AlertTriangle,
      colors: 'bg-orange-50 border-orange-200 text-orange-800',
      iconColor: 'text-orange-600'
    },
    info: {
      icon: Info,
      colors: 'bg-blue-50 border-blue-200 text-blue-800',
      iconColor: 'text-blue-600'
    }
  }
  
  const { icon: Icon, colors, iconColor } = config[type]
  
  return (
    <div
      className={`
        ${colors} border rounded-lg p-4 shadow-lg max-w-sm w-full
        transform transition-all duration-300 ease-out
        ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}
      role="alert"
      aria-live={type === 'error' ? 'assertive' : 'polite'}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 ${iconColor} flex-shrink-0 mt-0.5`} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className="font-medium text-sm mb-1">{title}</h4>
          )}
          <p className="text-sm">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="text-gray-400 hover:text-gray-600 flex-shrink-0"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}

// Toast hook for easy usage
export const useToast = () => {
  const [toasts, setToasts] = useState([])
  
  const addToast = (toast) => {
    const id = Date.now() + Math.random()
    setToasts(prev => [...prev, { ...toast, id }])
  }
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }
  
  const showToast = {
    success: (message, title) => addToast({ type: 'success', message, title }),
    error: (message, title) => addToast({ type: 'error', message, title }),
    warning: (message, title) => addToast({ type: 'warning', message, title }),
    info: (message, title) => addToast({ type: 'info', message, title })
  }
  
  return {
    toasts,
    showToast,
    removeToast,
    ToastContainer: () => <ToastContainer toasts={toasts} removeToast={removeToast} />
  }
}

export default Toast