import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Navbar, Footer, LoadingScreen, CookieConsent } from './components/common'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const location = useLocation()

  const [isLoading, setIsLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore')
    return !hasLoaded
  })

  // Scroll-to-top is handled by ScrollToTop component in AppRoutes

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('hasLoadedBefore', 'true')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a152a]">
      <Toaster position="top-right" />
      {!isLoading && <AppRoutes />}

      <AnimatePresence>
        {isLoading && <LoadingScreen key="loader" />}
      </AnimatePresence>

      <CookieConsent />
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
