import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, X, User, LogOut } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold text-sky-600">Dara</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/services" className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium">
              Services
            </Link>
            <Link to="/pricing" className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium">
              Pricing
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium">
              About
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium">
                  Dashboard
                </Link>
                <Link to="/profile" className="flex items-center space-x-2 hover:text-sky-600 transition-colors">
                  <User className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{user.firstName}</span>
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-gray-700 hover:text-red-600 px-3 py-2 text-sm font-medium"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/auth/login" className="text-gray-700 hover:text-sky-600 px-3 py-2 text-sm font-medium">
                  Login
                </Link>
                <Link to="/auth/signup" className="bg-sky-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-sky-700">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-sky-600 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            <Link to="/services" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600">
              Services
            </Link>
            <Link to="/pricing" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600">
              Pricing
            </Link>
            <Link to="/about" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600">
              About
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600">
                  Dashboard
                </Link>
                <Link to="/profile" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-sky-600">
                  Login
                </Link>
                <Link to="/auth/signup" className="block px-3 py-2 text-base font-medium bg-sky-600 text-white rounded-md mx-3">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}