import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar, Footer, LoadingScreen } from './components/common'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks'
import { Toaster } from 'react-hot-toast'
import './utils/devTools' // Import dev tools for development

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
    location.pathname.startsWith('/clients') || 
    location.pathname.startsWith('/drivers') || 
    location.pathname.startsWith('/trips') || 
    location.pathname.startsWith('/analytics') || 
    location.pathname.startsWith('/alerts') || 
    location.pathname.startsWith('/tasks') || 
    location.pathname.startsWith('/temperature') || 
    location.pathname.startsWith('/payments') || 
    location.pathname.startsWith('/pricing-management') || 
    location.pathname.startsWith('/bookings-management') || 
    location.pathname.startsWith('/driver-app') || 
    location.pathname.startsWith('/reports') || 
    location.pathname.startsWith('/integrations') || 
    location.pathname.startsWith('/settings') || 
    location.pathname.startsWith('/setting') || 
    location.pathname.startsWith('/help') || 
    location.pathname.startsWith('/booking') || 
    location.pathname.startsWith('/invoice') || 
    location.pathname.startsWith('/profile') || 
    (location.pathname.startsWith('/tracking') && location.pathname !== '/tracking') || 
    location.pathname.startsWith('/my-bookings') || 
    location.pathname.startsWith('/payment-history') || 
    location.pathname.startsWith('/my-temperature') || 
    location.pathname.startsWith('/my-analytics') || 
    location.pathname.startsWith('/support') || 
    location.pathname.startsWith('/booking-status-guide') || 
    location.pathname.startsWith('/address-book') || 
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
      <Toaster position="top-right" />
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
