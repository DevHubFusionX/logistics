import { useState, useEffect } from 'react'
import { WifiOff, Wifi } from 'lucide-react'

export default function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showReconnected, setShowReconnected] = useState(false)

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowReconnected(true)
      setTimeout(() => setShowReconnected(false), 3000)
    }

    const handleOffline = () => {
      setIsOnline(false)
      setShowReconnected(false)
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  if (isOnline && !showReconnected) return null

  return (
    <div className={`fixed top-4 left-1/2 -translate-x-1/2 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 z-50 ${
      isOnline ? 'bg-green-600' : 'bg-red-600'
    } text-white`}>
      {isOnline ? (
        <>
          <Wifi className="w-5 h-5" />
          <span className="font-medium text-sm">Back online</span>
        </>
      ) : (
        <>
          <WifiOff className="w-5 h-5" />
          <span className="font-medium text-sm">No internet connection</span>
        </>
      )}
    </div>
  )
}
