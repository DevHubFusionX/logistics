import { Navigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../../stores/authStore'
import { ShieldAlert } from 'lucide-react'

/**
 * Protected Route Component
 * Enforces authentication and role-based access control
 */
export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const { user, isLoading, isAuthenticated } = useAuthStore()
  const location = useLocation()

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50/50">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-sky-100 border-t-sky-600 rounded-full animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-sky-600 rounded-full opacity-20 animate-pulse" />
          </div>
        </div>
        <p className="mt-4 text-sm font-bold text-gray-500 uppercase tracking-widest animate-pulse">
          Securing Session...
        </p>
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    // Determine where to redirect based on the intended path
    const path = location.pathname
    const adminPathPrefixes = [
      '/dashboard', '/shipments', '/admin', '/fleet', '/routes', 
      '/warehouses', '/orders', '/customers', '/drivers', '/trips',
      '/reports', '/alerts', '/tasks', '/temperature', '/payments',
      '/pricing-management', '/bookings-management', '/settings', '/user'
    ]
    const isAdminPath = adminPathPrefixes.some(prefix => path.startsWith(prefix))

    return <Navigate to={isAdminPath ? "/auth/admin/login" : "/auth/login"} state={{ from: location }} replace />
  }

  // Role-based authorization
  if (allowedRoles.length > 0) {
    const isAllowed = allowedRoles.some(role => 
      role.toLowerCase() === (user.role || '').toLowerCase()
    )
    
    if (!isAllowed) {
      return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
          <div className="max-w-md w-full text-center p-8 bg-white rounded-2xl shadow-xl border border-red-100">
            <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldAlert className="w-10 h-10 text-red-500" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
            <p className="text-gray-600 mb-8">
              You don't have the required permissions to access this administrative zone.
            </p>
            <button
              onClick={() => window.history.back()}
              className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-gray-800 transition-all"
            >
              Go Back
            </button>
          </div>
        </div>
      )
    }
  }

  return children
}