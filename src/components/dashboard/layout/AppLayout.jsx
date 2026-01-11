import { useState, useEffect } from 'react'
import TopHeader from './TopHeader'
import Sidebar from './Sidebar'
import { RoleSwitcher, RoleSwitcherRestore } from '../../common'

export default function AppLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(false)
        setSidebarOpen(false)
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const handleToggleSidebar = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
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

      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Top Header */}
      <TopHeader
        onToggleSidebar={handleToggleSidebar}
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
      />

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Left Sidebar */}
        <Sidebar
          collapsed={sidebarCollapsed}
          isMobile={isMobile}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main
          id="main-content"
          className={`flex-1 transition-all duration-300 overflow-y-auto ${
            isMobile
              ? 'w-full ml-0'
              : sidebarCollapsed
                ? 'ml-[4.5rem]'
                : 'ml-72'
          }`}
        >
          <div className="p-3 sm:p-4 lg:p-6 min-h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Role Switcher for Development */}
      <RoleSwitcher />
      <RoleSwitcherRestore />
    </div>
  )
}