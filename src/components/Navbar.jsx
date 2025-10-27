import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut, LayoutDashboard, Package, MapPin, FileText, CreditCard, HelpCircle, Mail, Phone, Clock } from 'lucide-react'
import { useAuth } from '../hooks/useAuth.jsx'

export default function Navbar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    logout()
    setIsSidebarOpen(false)
    navigate('/')
  }

  const isActive = (path) => location.pathname === path

  useEffect(() => {
    setIsSidebarOpen(false)
  }, [location.pathname])

  const navLinks = [
    { path: '/services', label: 'Services' },
    { path: '/tracking', label: 'Track Shipment' },
    { path: '/pricing', label: 'Pricing' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <nav role="navigation" aria-label="Main navigation" className="bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/src/assets/img/logo/DARA 1.png"
                alt="Dara Express Logo"
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-2">
              {navLinks.map(({ path, label }) => (
                <Link
                  key={path}
                  to={path}
                  aria-current={isActive(path) ? 'page' : undefined}
                  className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${isActive(path)
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-md'
                      : 'text-gray-700 hover:bg-sky-50 hover:text-sky-600'
                    }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-sky-600 rounded-lg hover:bg-gray-50 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span className="text-sm font-medium">Dashboard</span>
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                  >
                    <User className="w-4 h-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-700">{user.firstName}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="text-sm font-medium">Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="px-5 py-2.5 text-gray-700 hover:text-sky-600 rounded-lg hover:bg-sky-50 text-sm font-semibold transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/booking/request"
                    className="px-6 py-2.5 bg-gradient-to-r from-secondary-green to-accent-green  rounded-lg text-sm font-bold hover:shadow-lg transition-all"
                    aria-label="Book a shipment"
                  >
                    Ship Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isSidebarOpen}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-white to-gray-50 shadow-2xl z-50 transform transition-transform duration-300 lg:hidden ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="relative p-6 bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600">
            <button
              onClick={() => setIsSidebarOpen(false)}
              aria-label="Close navigation"
              className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/20 transition-all"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/src/assets/img/logo/DARA 1.png"
                alt="Dara Express Logo"
                className="h-10 w-auto object-contain filter brightness-0 invert"
              />
            </div>
            {user && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-white text-sm truncate">{user.firstName} {user.lastName}</div>
                    <div className="text-xs text-sky-100 truncate">{user.email}</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Content */}
          <div className="flex-1 overflow-y-auto p-5">
            {/* Quick Stats for Logged In Users */}
            {user && (
              <div className="mb-5 grid grid-cols-2 gap-2">
                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <div className="text-2xl font-bold text-sky-600">12</div>
                  <div className="text-xs text-gray-600">Active Shipments</div>
                </div>
                <div className="bg-white rounded-lg p-3 border border-gray-100 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">48</div>
                  <div className="text-xs text-gray-600">Delivered</div>
                </div>
              </div>
            )}

            {/* Main Menu */}
            {user && (
              <div className="mb-5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Main Menu</div>
                <div className="space-y-1">
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4 text-sky-600" />
                    Dashboard
                  </Link>
                  <Link
                    to="/bookings"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <Package className="w-4 h-4 text-sky-600" />
                    My Bookings
                  </Link>
                  <Link
                    to="/reports"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <FileText className="w-4 h-4 text-sky-600" />
                    Reports
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-white hover:shadow-sm transition-all"
                  >
                    <User className="w-4 h-4 text-sky-600" />
                    Profile
                  </Link>
                </div>
              </div>
            )}

            {/* Navigation Links */}
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Explore Services</div>
              <div className="space-y-1">
                {navLinks.map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    aria-current={isActive(path) ? 'page' : undefined}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${isActive(path)
                        ? 'bg-sky-50 text-sky-600 shadow-sm'
                        : 'text-gray-700 hover:bg-white hover:shadow-sm'
                      }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            {user && (
              <div className="mb-5">
                <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Quick Actions</div>
                <div className="space-y-2">
                  <Link
                    to="/booking/request"
                    className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <Package className="w-4 h-4" />
                    </div>
                    <span className="font-semibold">Book shipment</span>
                  </Link>
                  <Link
                    to="/tracking"
                    className="flex items-center gap-3 px-4 py-3 bg-white text-gray-700 rounded-xl hover:bg-gray-50 border border-gray-200 transition-all"
                  >
                    <div className="w-8 h-8 bg-sky-50 rounded-lg flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-sky-600" />
                    </div>
                    <span className="font-semibold">Track a shipment</span>
                  </Link>
                </div>
              </div>
            )}

            {/* Support Section */}
            <div className="mb-5">
              <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 px-2">Support</div>
              <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <HelpCircle className="w-5 h-5 text-sky-600" />
                  <span className="font-semibold text-gray-900 text-sm">Need help with shipping?</span>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>support@daraexpress.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    <span>24/7 availability</span>
                  </div>
                </div>
                <Link
                  to="/contact"
                  className="mt-3 block text-center px-3 py-2 bg-sky-50 text-sky-600 rounded-lg text-xs font-semibold hover:bg-sky-100 transition-all"
                >
                  Contact Support
                </Link>
              </div>
            </div>

            {/* Auth Buttons */}
            {!user && (
              <div className="space-y-3">
                <Link
                  to="/auth/login"
                  className="block w-full px-4 py-3 text-center text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-sky-300 hover:bg-sky-50 font-semibold transition-all"
                >
                  Sign in
                </Link>
                <Link
                  to="/booking/request"
                  className="block w-full px-4 py-3 text-center text-white bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl hover:from-sky-600 hover:to-blue-700 font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  Get a quote
                </Link>
                <div className="text-center text-xs text-gray-500 mt-2">
                  ✓ No credit card required
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Footer */}
          {user && (
            <div className="p-5 border-t border-gray-200 bg-white">
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 text-red-600 bg-red-50 rounded-xl hover:bg-red-100 font-semibold transition-all border border-red-100"
              >
                <LogOut className="w-5 h-5" />
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}