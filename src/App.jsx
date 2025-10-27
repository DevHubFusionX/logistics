import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks/useAuth.jsx'

function AppContent() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasVisited')
  })
  const isDashboardPage = location.pathname.startsWith('/dashboard') || 
    location.pathname.startsWith('/shipments') || 
    location.pathname.startsWith('/fleet') || 
    location.pathname.startsWith('/routes') || 
    location.pathname.startsWith('/warehouses') || 
    location.pathname.startsWith('/orders') || 
    location.pathname.startsWith('/customers') || 
    location.pathname.startsWith('/drivers') || 
    location.pathname.startsWith('/analytics') || 
    location.pathname.startsWith('/alerts') || 
    location.pathname.startsWith('/tasks') || 
    location.pathname.startsWith('/integrations') || 
    location.pathname.startsWith('/settings') || 
    location.pathname.startsWith('/help') || 
    location.pathname.startsWith('/booking') || 
    location.pathname.startsWith('/invoice') || 
    location.pathname.startsWith('/profile') || 
    location.pathname.startsWith('/reports') || 
    location.pathname.startsWith('/tracking') || 
    location.pathname.startsWith('/user')

  const isAuthPage = location.pathname.startsWith('/auth') || 
    location.pathname.startsWith('/onboarding')

  const hideNavbarAndFooter = isAuthPage || isDashboardPage

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('hasVisited', 'true')
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!hideNavbarAndFooter && <Navbar />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!hideNavbarAndFooter && <Footer />}
    </div>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  )
}

export default App
