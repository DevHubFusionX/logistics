import { BrowserRouter as Router, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Navbar, Footer, LoadingScreen } from './components/common'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './hooks'
import { Toaster } from 'react-hot-toast'

function AppContent() {
  const [isLoading, setIsLoading] = useState(() => {
    return !sessionStorage.getItem('hasVisited')
  })

  useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        setIsLoading(false)
        sessionStorage.setItem('hasVisited', 'true')
      }, 3500)
      return () => clearTimeout(timer)
    }
  }, [isLoading])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" />
      <AppRoutes />
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
