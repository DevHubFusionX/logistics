import { useState, useEffect, useRef } from 'react'
import { Search, Bell, Plus, Menu, User, Settings, LogOut, Package, Truck, Home } from 'lucide-react'
import { useAuth } from '@/features/auth'
import { useNavigate, Link } from 'react-router-dom'

export default function TopHeader({ onToggleSidebar }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const { user, logout, isSuperAdmin, hasPermission } = useAuth()
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

  // Helper to format name/initial safely
  const getUserDisplayName = () => {
    if (user?.firstName) return user.firstName
    if (user?.name) return user.name.split(' ')[0]
    return 'User'
  }

  const getUserInitials = () => {
    const first = user?.firstName?.[0] || user?.name?.[0] || 'U'
    return first.toUpperCase()
  }

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      {/* Left Section */}
      <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl hover:bg-gray-55 active:bg-gray-100 transition-all flex-shrink-0 cursor-pointer"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>

        {/* Logo */}
        <Link to="/" className="flex-shrink-0 hidden sm:block hover:opacity-85 transition-opacity">
          <img
            src="/assets/img/Dara.svg"
            alt="Dara Express"
            className="h-8 sm:h-10 w-auto object-contain"
          />
        </Link>

        {/* Global Search - Centered and Premium */}
        <form onSubmit={handleSearch} className="hidden md:flex relative flex-1 max-w-xl mx-auto">
          <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search shipments, customers, routes..."
            className="pl-10 pr-12 py-2.5 w-full border border-gray-200 rounded-xl focus:border-sky-450 focus:ring-4 focus:ring-sky-500/5 outline-none text-sm bg-gray-50/50 focus:bg-white transition-all duration-200"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 border border-gray-200/80 bg-white rounded-md text-[10px] text-gray-400 font-bold shadow-sm pointer-events-none select-none">
            <span>Ctrl</span>
            <span>K</span>
          </div>
        </form>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* New Booking Button */}
        {hasPermission(['Super Admin', 'Support']) && (
          <button
            onClick={() => navigate('/booking/request')}
            className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-750 hover:to-sky-800 text-white font-bold text-xs rounded-xl shadow-[0_4px_12px_rgba(14,165,233,0.15)] hover:shadow-[0_6px_20px_rgba(14,165,233,0.25)] transition-all duration-200 cursor-pointer active:scale-97"
          >
            <Plus className="w-4 h-4" />
            <span>New Booking</span>
          </button>
        )}

        {/* Quick Add (Mobile/Secondary) */}
        {hasPermission(['Super Admin', 'Support', 'Fleet Officer']) && (
          <div className="relative" ref={quickAddRef}>
            <button
              onClick={() => setShowQuickAdd(!showQuickAdd)}
              className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-all shadow-sm cursor-pointer"
              aria-label="Quick add"
            >
              <Plus className="w-5 h-5 text-gray-600" />
            </button>

            {showQuickAdd && (
              <div className="absolute right-0 top-14 w-56 bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2 border-b border-gray-50">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Quick Actions</p>
                </div>
                {hasPermission(['Super Admin', 'Support']) && (
                  <button
                    onClick={() => { navigate('/booking/request'); setShowQuickAdd(false) }}
                    className="w-full px-4 py-2.5 text-left hover:bg-sky-50/50 text-xs flex items-center gap-3 transition-colors cursor-pointer text-gray-700 font-semibold hover:text-sky-750"
                  >
                    <Package className="w-4 h-4 text-sky-600" />
                    <span>New Shipment</span>
                  </button>
                )}
                {hasPermission(['Super Admin', 'Fleet Officer']) && (
                  <button
                    onClick={() => { navigate('/fleet'); setShowQuickAdd(false) }}
                    className="w-full px-4 py-2.5 text-left hover:bg-sky-50/50 text-xs flex items-center gap-3 transition-colors cursor-pointer text-gray-700 font-semibold hover:text-sky-750"
                  >
                    <Truck className="w-4 h-4 text-sky-600" />
                    <span>Add Vehicle</span>
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
            className="p-2 rounded-xl border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-all relative cursor-pointer"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white" />
          </button>

          {showNotifications && (
            <div className="absolute right-0 top-14 w-80 bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-gray-100 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50 flex items-center justify-between">
                <h3 className="font-bold text-gray-950 text-sm">Notifications</h3>
                <span className="text-[10px] bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full font-bold">2 New</span>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-gray-50">
                <div className="px-4 py-3 hover:bg-sky-50/30 cursor-pointer transition-colors">
                  <p className="text-xs font-bold text-gray-900">New shipment assigned</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Shipment #SH-2024-001 needs attention</p>
                  <p className="text-[10px] text-gray-400 mt-1">2 minutes ago</p>
                </div>
                <div className="px-4 py-3 hover:bg-sky-50/30 cursor-pointer transition-colors">
                  <p className="text-xs font-bold text-gray-900">Vehicle maintenance due</p>
                  <p className="text-[11px] text-gray-500 mt-0.5">Vehicle ABC-123 requires service</p>
                  <p className="text-[10px] text-gray-400 mt-1">1 hour ago</p>
                </div>
              </div>
              <div className="px-4 py-2.5 border-t border-gray-100 bg-gray-50/50 text-center">
                <button className="text-xs text-sky-700 hover:text-sky-800 font-bold cursor-pointer">View all notifications</button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-gray-100 hover:bg-gray-50 active:bg-gray-100 transition-all cursor-pointer shadow-sm"
          >
            <div className="w-8 h-8 bg-sky-700 rounded-lg flex items-center justify-center flex-shrink-0 shadow-sm">
              <span className="text-white font-bold text-sm">
                {getUserInitials()}
              </span>
            </div>
            <div className="hidden lg:block text-left">
              <p className="text-xs font-bold text-gray-900 leading-tight">
                {getUserDisplayName()}
              </p>
              <p className="text-[10px] text-gray-400 font-medium leading-tight mt-0.5">
                {user?.role || 'Member'}
              </p>
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-14 w-64 bg-white rounded-xl shadow-[0_12px_36px_rgba(0,0,0,0.06)] border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-3 border-b border-gray-100 bg-gray-50/50">
                <p className="text-sm font-bold text-gray-955">{user?.firstName || 'User'} {user?.lastName || ''}</p>
                <p className="text-[11px] text-gray-400 mt-0.5 font-medium">{user?.email || 'user@dara.com'}</p>
                <span className="inline-block mt-2 px-2.5 py-0.5 bg-sky-50 text-sky-700 text-[10px] font-bold rounded-md">
                  {user?.role || 'Member'}
                </span>
              </div>
              <button
                onClick={() => { navigate('/'); setShowUserMenu(false) }}
                className="w-full px-4 py-2.5 text-left hover:bg-sky-50/50 text-xs flex items-center gap-3 text-gray-750 transition-colors cursor-pointer font-semibold hover:text-sky-750"
              >
                <Home className="w-4 h-4 text-gray-400" />
                <span>Homepage</span>
              </button>
              <button
                onClick={() => { navigate('/profile'); setShowUserMenu(false) }}
                className="w-full px-4 py-2.5 text-left hover:bg-sky-50/50 text-xs flex items-center gap-3 text-gray-750 transition-colors cursor-pointer font-semibold hover:text-sky-750"
              >
                <User className="w-4 h-4 text-gray-400" />
                <span>My Profile</span>
              </button>
              {isSuperAdmin && (
                <button
                  onClick={() => { navigate('/settings'); setShowUserMenu(false) }}
                  className="w-full px-4 py-2.5 text-left hover:bg-sky-50/50 text-xs flex items-center gap-3 text-gray-750 transition-colors cursor-pointer font-semibold hover:text-sky-750"
                >
                  <Settings className="w-4 h-4 text-gray-400" />
                  <span>Settings</span>
                </button>
              )}
              <hr className="my-1.5 border-gray-100" />
              <button
                onClick={() => { logout(); setShowUserMenu(false) }}
                className="w-full px-4 py-2.5 text-left hover:bg-rose-50 text-xs flex items-center gap-3 text-rose-600 transition-colors cursor-pointer font-bold"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
