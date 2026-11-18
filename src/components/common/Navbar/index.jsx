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

const DARK_HERO_PATHS = new Set(['/', '/solutions', '/network', '/platform', '/technology'])

export default function Navbar() {
  const [menuOpen, setMenuOpen]       = useState(false)
  const [scrolled, setScrolled]       = useState(false)
  const [visible, setVisible]         = useState(true)
  const [isDemoOpen, setIsDemoOpen]   = useState(false)
  const lastScrollY                   = useRef(0)

  const { user, logout } = useAuth()
  const navigate         = useNavigate()
  const location         = useLocation()

  // Reset drawer, visibility, and scroll state on route change
  useEffect(() => {
    setMenuOpen(false)
    setVisible(true)
    const y = window.scrollY
    setScrolled(y > 20)
    lastScrollY.current = y
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

  const normalizedPath = location.pathname.replace(/\/+$/, '') || '/'
  const isDarkHeroPage = DARK_HERO_PATHS.has(normalizedPath)
  const lightNav       = isDarkHeroPage && !scrolled
  const headerAnim     = useMemo(() => ({ y: visible ? 0 : -80 }), [visible])

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={headerAnim}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2.5'
            : isDarkHeroPage
              ? 'bg-gradient-to-b from-slate-950/25 to-transparent border-b border-white/15 py-3.5'
              : 'bg-white/90 backdrop-blur-md border-b border-slate-200/60 py-3.5'
        }`}
      >
        <nav className="mx-auto max-w-7xl w-full px-6 md:px-10">
          <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 h-14">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <AnimatedLogo
                className="h-4 sm:h-5 transition-all duration-300"
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
                lightNav={lightNav}
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
