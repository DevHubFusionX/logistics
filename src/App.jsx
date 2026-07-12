import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import LoadingScreen from './components/common/LoadingScreen'
import CookieConsent from './components/common/CookieConsent'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks'
import { Toaster } from 'react-hot-toast'
import { initGoogleTranslate, useTranslationStore } from './i18n'

function AppContent() {
  const location = useLocation()
  const isTranslating = useTranslationStore((s) => s.isTranslating)

  const [isLoading, setIsLoading] = useState(() => {
    const hasLoaded = sessionStorage.getItem('hasLoadedBefore')
    return !hasLoaded
  })

  // Scroll-to-top is handled by ScrollToTop component in AppRoutes

  useEffect(() => {
    initGoogleTranslate()
  }, [])

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('hasLoadedBefore', 'true')
      }, 400)
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

      {/* Translation Transition Overlay */}
      <AnimatePresence>
        {isTranslating && (
          <motion.div
            key="translate-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-[99999] flex items-center justify-center bg-[#0a152a]/60 backdrop-blur-md pointer-events-none"
          >
            <div className="text-center space-y-4">
              <div className="w-9 h-9 border-[3px] border-sky-400 border-t-transparent rounded-full animate-spin mx-auto" />
              <p className="text-white/90 text-[10px] font-bold tracking-[0.2em] uppercase">
                Translating / Traduction…
              </p>
            </div>
          </motion.div>
        )}
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
