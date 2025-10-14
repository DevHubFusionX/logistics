import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks/useAuth.jsx'

function AppContent() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const isAuthPage = location.pathname.startsWith('/auth') || location.pathname.startsWith('/onboarding') || location.pathname.startsWith('/dashboard') || location.pathname.startsWith('/booking') || location.pathname.startsWith('/invoice') || location.pathname.startsWith('/profile') || location.pathname.startsWith('/reports') ||location.pathname.startsWith('/tracking')

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 3500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex flex-col">
      {!isAuthPage && <Navbar />}
      <main className="flex-1">
        <AppRoutes />
      </main>
      {!isAuthPage && <Footer />}
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
