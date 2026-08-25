import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../../../hooks'
import AnimatedLogo from '../AnimatedLogo'
import { ScheduleDemoModal } from '../../../features/landing/components/landing/demo'
import NavLinks from './NavLinks'
import NavActions from './NavActions'
import MobileMenuButton from './MobileMenuButton'
import MobileDrawer from './MobileDrawer'

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [visible, setVisible]         = useState(true)
  const [isDemoOpen, setIsDemoOpen]   = useState(false)
  const lastScrollY                   = useRef(0)

  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const location         = useLocation()

  // Close drawer on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Hide-on-scroll + frosted glass background
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 20)
      setVisible(y < 10 || y < lastScrollY.current)
      lastScrollY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = useCallback(() => {
    logout(); setMenuOpen(false); navigate('/')
  }, [logout, navigate])

  const lightNav   = false
  const headerAnim = useMemo(() => ({ y: visible ? 0 : -80 }), [visible])

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={headerAnim}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b border-slate-100 shadow-sm py-3'
            : 'bg-white border-b border-slate-100 py-4'
        }`}
      >
        <nav className="mx-auto max-w-7xl w-full px-6 md:px-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 h-14">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <AnimatedLogo
                className="h-5 sm:h-6 transition-all duration-300"
                isDarkText={!lightNav}
              />
            </Link>

            {/* Centered Nav Links */}
            <NavLinks lightNav={lightNav} />

            {/* Right Actions + Mobile Hamburger */}
            <div className="flex items-center justify-end w-full">
              <NavActions
                user={user}
                lightNav={lightNav}
                onDemoOpen={() => setIsDemoOpen(true)}
                onLogout={handleLogout}
              />
              <MobileMenuButton
                isOpen={menuOpen}
                scrolled={scrolled}
                onToggle={() => setMenuOpen((o) => !o)}
              />
            </div>

          </div>
        </nav>
      </motion.header>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={menuOpen}
        user={user}
        onClose={() => setMenuOpen(false)}
        onLogout={handleLogout}
        onDemoOpen={() => setIsDemoOpen(true)}
      />

      {/* Demo Modal */}
      <ScheduleDemoModal
        isOpen={isDemoOpen}
        onClose={() => setIsDemoOpen(false)}
      />
    </>
  )
}
