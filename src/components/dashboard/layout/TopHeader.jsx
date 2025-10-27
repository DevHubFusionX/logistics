import { useState } from 'react'
import { Search, Bell, Plus, Menu, HelpCircle, Globe, User, Settings, LogOut } from 'lucide-react'
import { useAuth } from '../../../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

export default function TopHeader({ onToggleSidebar, sidebarCollapsed }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="h-14 sm:h-16 bg-white border-b border-gray-200 flex items-center justify-between px-3 sm:px-4 sticky top-0 z-40">
      {/* Left Section */}
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
          aria-label="Toggle sidebar"
        >
          <Menu className="w-5 h-5 text-gray-600" />
        </button>

        {/* Logo & App Name */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img 
            src="/assets/img/dara-logo.png" 
            alt="Dara Express" 
            className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
          />
          <span className="text-base sm:text-xl font-bold text-gray-900 truncate">Dara.Express</span>
        </div>

        {/* Global Search */}
        <div className="hidden lg:flex relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search shipments, customers, routes..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
        {/* Timezone */}
        <div className="hidden xl:flex items-center gap-1 text-sm text-gray-600">
          <Globe className="w-4 h-4" />
          <span>WAT</span>
        </div>

        {/* Quick Add */}
        <div className="relative">
          <button
            onClick={() => setShowQuickAdd(!showQuickAdd)}
            className="p-1.5 sm:p-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            aria-label="Quick add"
          >
            <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          
          {showQuickAdd && (
            <div className="absolute right-0 top-12 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                + New Shipment
              </button>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm">
                + New Vehicle
              </button>
            </div>
          )}
        </div>

        {/* Notifications */}
        <button className="p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors relative">
          <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          <span className="absolute top-0 right-0 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></span>
        </button>

        {/* Help */}
        <button className="hidden sm:flex p-1.5 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-1.5 sm:gap-2 p-1 sm:p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-600" />
            </div>
            <span className="hidden lg:block text-sm font-medium text-gray-700 truncate max-w-[100px]">
              {user?.firstName || 'User'}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 top-12 sm:top-14 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">{user?.firstName} {user?.lastName}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button 
                onClick={() => { navigate('/user'); setShowUserMenu(false); }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-2"
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button 
                onClick={() => { navigate('/user'); setShowUserMenu(false); }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-2"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <hr className="my-1" />
              <button 
                onClick={logout}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm flex items-center gap-2 text-red-600"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}