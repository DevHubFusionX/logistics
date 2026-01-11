import { useState, useEffect } from 'react'
import { Settings } from 'lucide-react'

export default function RoleSwitcherRestore() {
  const [showRestore, setShowRestore] = useState(false)

  useEffect(() => {
    const checkVisibility = () => {
      const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development' || localStorage.getItem('showRoleSwitcher') === 'true'
      const isVisible = localStorage.getItem('roleSwitcherVisible') !== 'false'
      setShowRestore(isDev && !isVisible)
    }

    checkVisibility()
    
    // Check every 100ms for immediate response
    const interval = setInterval(checkVisibility, 100)
    
    return () => clearInterval(interval)
  }, [])

  const handleRestore = () => {
    localStorage.setItem('roleSwitcherVisible', 'true')
    setShowRestore(false)
    setTimeout(() => window.location.reload(), 100)
  }

  if (!showRestore) return null

  return (
    <button
      onClick={handleRestore}
      className="fixed bottom-4 right-4 z-[9998] bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-lg transition-colors"
      title="Show Role Switcher (Ctrl+Shift+R or Triple Tap)"
    >
      <Settings className="w-4 h-4" />
    </button>
  )
}