import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks'
import { Shield, GripVertical, X } from 'lucide-react'

// Global toggle function for development
if (typeof window !== 'undefined') {
  window.toggleRoleSwitcher = () => {
    const current = localStorage.getItem('showRoleSwitcher') === 'true'
    localStorage.setItem('showRoleSwitcher', (!current).toString())
    localStorage.setItem('roleSwitcherVisible', 'true')
    window.location.reload()
  }
}

export default function RoleSwitcher() {
  const { user, setUser } = useAuth()
  const [isVisible, setIsVisible] = useState(true)
  const [position, setPosition] = useState(() => {
    const saved = localStorage.getItem('roleSwitcherPosition')
    return saved ? JSON.parse(saved) : { x: window.innerWidth - 220, y: 100 }
  })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  const roles = [
    { value: 'Super Admin', label: 'Super Admin', color: 'text-red-600' },
    { value: 'Fleet Officer', label: 'Fleet Officer', color: 'text-blue-600' },
    { value: 'Dispatcher', label: 'Dispatcher', color: 'text-green-600' },
    { value: 'Finance', label: 'Finance', color: 'text-purple-600' },
    { value: 'Support', label: 'Support', color: 'text-orange-600' },
    { value: 'Customer', label: 'Customer', color: 'text-gray-600' }
  ]

  const currentRole = roles.find(role => role.value === user?.role) || roles[0]

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        const newPosition = {
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 160))
        }
        setPosition(newPosition)
        localStorage.setItem('roleSwitcherPosition', JSON.stringify(newPosition))
      }
    }

    const handleMouseUp = () => setIsDragging(false)

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDragging, dragOffset])

  const handleMouseDown = (e) => {
    if (dragRef.current && dragRef.current.contains(e.target)) {
      setIsDragging(true)
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      })
    }
  }

  const handleRoleChange = (newRole) => {
    const updatedUser = { ...user, role: newRole }
    setUser(updatedUser)
    localStorage.setItem('user', JSON.stringify(updatedUser))
  }

  const handleClose = () => {
    setIsVisible(false)
    localStorage.setItem('roleSwitcherVisible', 'false')
  }

  // Show/hide based on environment or localStorage
  useEffect(() => {
    const isDev = import.meta.env.DEV || import.meta.env.MODE === 'development' || localStorage.getItem('showRoleSwitcher') === 'true'
    const wasVisible = localStorage.getItem('roleSwitcherVisible') !== 'false'
    setIsVisible(isDev && wasVisible)
  }, [])

  if (!isVisible || !user) return null

  return (
    <div 
      className="fixed z-[9999] bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px]"
      style={{ 
        left: `${position.x}px`, 
        top: `${position.y}px`, 
        cursor: isDragging ? 'grabbing' : 'default',
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
      }}
    >
      <div 
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className="flex items-center justify-between mb-2 cursor-grab active:cursor-grabbing"
      >
        <div className="flex items-center gap-2">
          <GripVertical className="w-3 h-3 text-gray-400" />
          <Shield className={`w-4 h-4 ${currentRole.color}`} />
          <span className="text-xs font-semibold text-gray-900">Role Switcher</span>
        </div>
        <button
          onClick={handleClose}
          className="text-gray-400 hover:text-gray-600 transition-colors"
          title="Close Role Switcher"
        >
          <X className="w-3 h-3" />
        </button>
      </div>
      
      <div className="mb-2">
        <div className="text-xs text-gray-500 mb-1">Current Role:</div>
        <div className={`text-sm font-medium ${currentRole.color}`}>
          {currentRole.label}
        </div>
      </div>

      <select
        value={user.role}
        onChange={(e) => handleRoleChange(e.target.value)}
        className="w-full text-xs border border-gray-300 rounded-md px-2 py-1.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
      >
        {roles.map(role => (
          <option key={role.value} value={role.value}>{role.label}</option>
        ))}
      </select>
      
      <p className="text-xs text-gray-400 mt-2 leading-tight">
        Switch roles to test different permissions
      </p>
    </div>
  )
}
