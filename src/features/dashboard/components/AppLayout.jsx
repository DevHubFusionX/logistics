import { useState, useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import useUiStore from '@/stores/uiStore'
import TopHeader from './TopHeader'
import Sidebar from './Sidebar'

export default function AppLayout({ children }) {
  const {
    sidebarCollapsed,
    setSidebarCollapsed,
    toggleSidebar,
    sidebarOpen,
    setMobileSidebar,
    toggleMobileSidebar
  } = useUiStore()

  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024)
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)

  useEffect(() => {
    let lastWidth = window.innerWidth
    const checkMobile = () => {
      const newWidth = window.innerWidth
      if (newWidth === lastWidth) return
      lastWidth = newWidth
      const mobile = newWidth < 1024
      setIsMobile(mobile)
      if (!mobile) {
        setMobileSidebar(false)
      }
    }

    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [setMobileSidebar])

  // Automatically close mobile sidebar ONLY when the route actually changes
  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname
      setMobileSidebar(false)
    }
  }, [location.pathname, setMobileSidebar])

  // Prevent background scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobile && sidebarOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobile, sidebarOpen])

  const handleToggleSidebar = () => {
    if (isMobile) {
      toggleMobileSidebar()
    } else {
      toggleSidebar()
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50"
      >
        Skip to main content
      </a>

      {/* Mobile Overlay (covers main area below header) */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed top-16 inset-x-0 bottom-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          onClick={() => setMobileSidebar(false)}
          aria-hidden="true"
        />
      )}

      {/* Top Header */}
      <TopHeader
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        isSidebarOpen={isMobile ? sidebarOpen : !sidebarCollapsed}
        isMobile={isMobile}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          onClose={() => setMobileSidebar(false)}
        />

        {/* Main Content Area */}
        <main
          id="main-content"
          className={`flex-1 transition-all duration-300 overflow-y-auto ${isMobile
            ? 'w-full ml-0'
            : sidebarCollapsed
              ? 'ml-16'
              : 'ml-64'
            }`}
        >
          <div className="p-3 sm:p-4 lg:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}
