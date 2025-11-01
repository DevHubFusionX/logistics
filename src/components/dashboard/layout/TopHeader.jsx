import { useState, useEffect, useRef } from 'react'
import { Search, Bell, Plus, Menu, HelpCircle, Globe, User, Settings, LogOut, Package, Truck } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function TopHeader({ onToggleSidebar, sidebarCollapsed }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout, hasPermission } = useAuth()
  const navigate = useNavigate()

  const userMenuRef = useRef(null)
  const quickAddRef = useRef(null)
  const notificationsRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false)
      }
      if (quickAddRef.current && !quickAddRef.current.contains(event.target)) {
        setShowQuickAdd(false)
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      console.log('Searching for:', searchQuery)
    }
  }

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shadow-sm">
      {/* Left Section */}
      <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        {/* Logo */}
        <div className="flex-shrink-0 hidden sm:block">
          <img
            src="/assets/img/dara_logo.svg"
            alt="Dara Express"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </div>

        {/* Global Search */}
        <form onSubmit={handleSearch} className="hidden md:flex relative flex-1 max-w-xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shipments, customers, routes..."
            className="pl-10 pr-4 py-2.5 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-gray-50 focus:bg-white transition-colors"
          />
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {/* Timezone */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 rounded-lg text-sm text-gray-700">
          <Globe className="w-4 h-4" />
          <span className="font-medium">WAT</span>
        </div>

        {/* Quick Add */}
        {hasPermission(['Super Admin', 'Support', 'Fleet Officer']) && (
          <div className="relative" ref={quickAddRef}>
            <button
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800 transition-all shadow-sm hover:shadow"
              aria-label="Quick add"
            >
              <Plus className="w-5 h-5" />
            </button>

            {showQuickAdd && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
                <div className="px-3 py-2 border-b border-gray-100">
                  <p className="text-xs font-semibold text-gray-500 uppercase">Quick Actions</p>
                </div>
                {hasPermission(['Super Admin', 'Support']) && (
                  <button
                    onClick={() => { navigate('/booking/request'); setShowQuickAdd(false); }}
                    className="w-full px-4 py-2.5 text-left hover:bg-blue-50 text-sm flex items-center gap-3 transition-colors"
                  >
                    <Package className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">New Shipment</span>
                  </button>
                )}
                {hasPermission(['Super Admin', 'Fleet Officer']) && (
                  <button
                    onClick={() => { navigate('/fleet'); setShowQuickAdd(false); }}
                    className="w-full px-4 py-2.5 text-left hover:bg-blue-50 text-sm flex items-center gap-3 transition-colors"
                  >
                    <Truck className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">Add Vehicle</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Notifications */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all relative"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="font-semibold text-gray-900">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <p className="text-sm font-medium text-gray-900">New shipment assigned</p>
                  <p className="text-xs text-gray-500 mt-1">Shipment #SH-2024-001 needs attention</p>
                  <p className="text-xs text-gray-400 mt-1">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-gray-50 border-b border-gray-100 cursor-pointer">
                  <p className="text-sm font-medium text-gray-900">Vehicle maintenance due</p>
                  <p className="text-xs text-gray-500 mt-1">Vehicle ABC-123 requires service</p>
                  <p className="text-xs text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="px-4 py-2 border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* Help */}
        <button className="hidden lg:flex p-2 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all">
          <HelpCircle className="w-5 h-5 text-gray-700" />
        </button>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-lg hover:bg-gray-100 active:bg-gray-200 transition-all"
          >
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-semibold text-sm">
                {user?.firstName?.[0]?.toUpperCase() || 'U'}
              </span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-sm font-medium text-gray-900 leading-tight">
                {user?.firstName || 'User'}
              </p>
              <p className="text-xs text-gray-500 leading-tight">
                {user?.role || 'Member'}
              </p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-14 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fadeIn">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                <span className="inline-block mt-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-medium rounded">
                  {user?.role || 'Member'}
                </span>
              </div>
              <button
                onClick={() => { navigate('/user'); setShowUserMenu(false); }}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm flex items-center gap-3 transition-colors"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="font-medium">My Profile</span>
              </button>
              <button
                onClick={() => { navigate('/user'); setShowUserMenu(false); }}
                className="w-full px-4 py-2.5 text-left hover:bg-gray-50 text-sm flex items-center gap-3 transition-colors"
              >
                <Settings className="w-4 h-4 text-gray-600" />
                <span className="font-medium">Settings</span>
              </button>
              <hr className="my-2" />
              <button
                onClick={logout}
                className="w-full px-4 py-2.5 text-left hover:bg-red-50 text-sm flex items-center gap-3 text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}