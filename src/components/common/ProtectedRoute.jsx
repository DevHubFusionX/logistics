import { Navigate } from 'react-router-dom'
import { useAuth } from '../../hooks'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    const path = window.location.pathname;
    const isAdminPath = path === '/dashboard' ||
      path.startsWith('/shipments') ||
      path.startsWith('/fleet') ||
      path.startsWith('/customers') ||
      path.startsWith('/drivers') ||
      path.startsWith('/reports') ||
      path.startsWith('/payments') ||
      path.startsWith('/pricing-management') ||
      path.startsWith('/bookings-management');

    return <Navigate to={isAdminPath ? "/auth/admin/login" : "/auth/login"} replace />
  }

  return children
}