import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.jsx'

export default function ProtectedRoute({ children }) {
  // Temporarily disabled for development
  return children

  // const { user, loading } = useAuth()
  // if (loading) {
  //   return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  // }
  // if (!user) {
  //   return <Navigate to="/auth/login" replace />
  // }
  // return children
}