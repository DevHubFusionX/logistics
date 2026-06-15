import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navbar, Footer, LoadingScreen } from './components/common'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, isLoading])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a152a]">
      <Toaster position="top-right" />
      <AppRoutes />

      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>
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
