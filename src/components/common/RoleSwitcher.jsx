import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks'
import { Shield, GripVertical } from 'lucide-react'

export default function RoleSwitcher() {
  const { user, setUser } = useAuth()
  const [position, setPosition] = useState({ x: window.innerWidth - 220, y: window.innerHeight - 180 })
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const dragRef = useRef(null)

  const roles = ['Super Admin', 'Fleet Officer', 'Dispatcher', 'Finance', 'Support', 'Customer']

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (isDragging) {
        setPosition({
          x: Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200)),
          y: Math.max(0, Math.min(e.clientY - dragOffset.y, window.innerHeight - 160))
        })
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

  return (
    <div 
      className="fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4"
      style={{ left: `${position.x}px`, top: `${position.y}px`, cursor: isDragging ? 'grabbing' : 'default' }}
    >
      <div 
        ref={dragRef}
        onMouseDown={handleMouseDown}
        className="flex items-center gap-2 mb-3 cursor-grab active:cursor-grabbing"
      >
        <GripVertical className="w-4 h-4 text-gray-400" />
        <Shield className="w-4 h-4 text-blue-600" />
        <span className="text-sm font-semibold text-gray-900">Test Role</span>
      </div>
      <select
        value={user.role}
        onChange={(e) => setUser({ ...user, role: e.target.value })}
        className="w-full text-sm border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        {roles.map(role => (
          <option key={role} value={role}>{role}</option>
        ))}
      </select>
      <p className="text-xs text-gray-500 mt-2">Switch roles to test permissions</p>
    </div>
  )
}
