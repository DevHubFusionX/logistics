import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, LayoutDashboard, ArrowRight } from 'lucide-react'
import { useAuth } from '../../hooks'
import { AnimatedLogo } from './'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'About us', path: '/about' },
  { label: 'Services', path: '/services' },
  { label: 'Tracking', path: '/tracking' },
  { label: 'Contact', path: '/contact' },
]


// Framer Motion Variants for mobile navigation stagger
const mobileContainerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.08
    }
  }
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 25 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 280,
      damping: 24
    }
  }
}


export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const lastScrollY = useRef(0)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isDarkLogoText = location.pathname !== '/' || scrolled

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setScrolled(currentScrollY > 20)

      if (currentScrollY < 10) {
        setVisible(true)
      } else if (currentScrollY > lastScrollY.current) {
        setVisible(false)
      } else {
        setVisible(true)
      }
      lastScrollY.current = currentScrollY
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLogout = useCallback(() => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }, [logout, navigate])

  // Memoized Header Transition settings
  const headerAnimation = useMemo(() => ({
    y: visible ? 0 : -90
  }), [visible])


  // Memoized Mobile Action buttons
  const mobileActions = useMemo(() => {
    if (user) {
      return (
        <>
          <Link
            to="/my-bookings"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-slate-200 bg-white text-slate-700 rounded-sm text-sm font-semibold transition-all shadow-sm"
          >
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-slate-200 bg-white text-slate-700 rounded-sm text-sm font-semibold transition-all shadow-sm cursor-pointer"
          >
            Logout
          </button>
        </>
      )
    }

    return (
      <>
        <Link
          to="/auth/login"
          className="block w-full py-3 text-center border border-slate-300 hover:border-slate-800 hover:bg-slate-50 text-slate-800 rounded-sm text-sm font-semibold transition-all shadow-sm"
        >
          Login
        </Link>
        <Link
          to="/booking/request"
          className="block w-full py-3 text-center border border-[#0056B8]/40 hover:border-[#0056B8] text-[#0056B8] rounded-sm text-sm font-bold transition-all shadow-sm"
        >
          Book a demo
        </Link>
        <Link
          to="/booking/request"
          className="w-full py-3 bg-[#0056B8] hover:bg-[#004cba] text-white rounded-sm text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 group"
        >
          <span>Book</span>
          <span className="flex-shrink-0 bg-white text-[#0056B8] rounded-full p-1 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </Link>
      </>
    )
  }, [user, handleLogout])

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={headerAnimation}
        transition={{ type: 'spring', stiffness: 280, damping: 28 }}
        className={`fixed top-0 left-0 right-0 z-50 select-none transition-all duration-300 ${scrolled
            ? 'py-3 bg-white/10 backdrop-blur-md border-b border-white/5 shadow-sm'
            : 'py-5 bg-transparent'
          }`}
      >
        <nav className="mx-auto max-w-7xl w-full px-6 md:px-12">
          <div className="flex items-center justify-between h-14">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <AnimatedLogo className="h-10 sm:h-12 transition-all duration-300" isDarkText={isDarkLogoText} />
            </Link>

            {/* Desktop Navigation & Actions */}
            <div className="hidden lg:flex items-center bg-[#f1f3f4]/95 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgb(0,0,0,0.06)] rounded-sm p-1.5 pl-7 gap-6">

              {/* Navigation Links */}
              <div className="flex items-center gap-5">
                {navLinks.map(({ label, path }) => {
                  const isActive = location.pathname === path
                  return (
                    <Link
                      key={path}
                      to={path}
                      className={`font-body-unique text-[11px] font-semibold tracking-[0.12em] uppercase transition-colors duration-200 ${isActive
                          ? 'text-[#0056B8]'
                          : 'text-slate-650 hover:text-slate-900'
                        }`}
                    >
                      {label}
                    </Link>
                  )
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pr-0.5">
                {user ? (
                  <>
                    <Link
                      to="/my-bookings"
                      className="px-5 py-2.5 bg-[#1b2327] hover:bg-black text-white font-body-unique text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm transition-all active:scale-97 shadow-sm flex items-center gap-2"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5" />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="px-4 py-2 hover:bg-red-50 hover:text-red-650 text-slate-700 font-body-unique text-[11px] font-semibold tracking-[0.12em] uppercase rounded-sm transition-all cursor-pointer flex items-center gap-1.5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="px-4.5 py-2.5 border border-slate-300 hover:border-slate-800 hover:bg-white text-slate-800 font-body-unique text-[11px] font-bold tracking-[0.12em] uppercase rounded-sm transition-all active:scale-97 shadow-sm"
                    >
                      Login
                    </Link>
                    <Link
                      to="/booking/request"
                      className="px-6 py-2.5 bg-[#0056B8] hover:bg-[#004cba] text-white font-body-unique text-[11px] font-bold tracking-[0.12em] uppercase rounded-sm transition-all active:scale-97 shadow-md hover:shadow-lg border border-[#0056B8] flex items-center gap-2 group"
                    >
                      <span>Book</span>
                      <span className="flex-shrink-0 bg-white text-[#0056B8] rounded-full p-1 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                        <ArrowRight className="w-2.5 h-2.5" />
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Hamburger menu */}
            <div className="lg:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle Menu"
                className="p-3 rounded-full bg-[#f1f3f4]/95 backdrop-blur-md border border-white/20 text-slate-700 hover:text-slate-900 shadow-sm transition-all cursor-pointer flex items-center justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 20 20" className="text-current">
                  <motion.path
                    fill="transparent"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    variants={{
                      closed: { d: "M 2 5 L 18 5" },
                      open: { d: "M 4.5 15.5 L 15.5 4.5" }
                    }}
                    animate={menuOpen ? "open" : "closed"}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  />
                  <motion.path
                    fill="transparent"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    d="M 2 10 L 18 10"
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    animate={menuOpen ? "open" : "closed"}
                    transition={{ duration: 0.12 }}
                  />
                  <motion.path
                    fill="transparent"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    strokeLinecap="round"
                    variants={{
                      closed: { d: "M 2 15 L 18 15" },
                      open: { d: "M 4.5 4.5 L 15.5 15.5" }
                    }}
                    animate={menuOpen ? "open" : "closed"}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                  />
                </svg>
              </button>
            </div>

          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMenuOpen(false)}
            />
            {/* Drawer Container */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="fixed top-0 right-0 h-full w-full max-w-sm bg-white border-l border-slate-100 z-50 lg:hidden flex flex-col shadow-2xl text-slate-800"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                <AnimatedLogo className="h-8" isDarkText={true} />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-xl border border-slate-200 text-slate-600 hover:text-slate-900 cursor-pointer flex items-center justify-center"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" className="text-current">
                    <path
                      fill="transparent"
                      strokeWidth="2.5"
                      stroke="currentColor"
                      strokeLinecap="round"
                      d="M 4.5 15.5 L 15.5 4.5 M 4.5 4.5 L 15.5 15.5"
                    />
                  </svg>
                </button>
              </div>

              {/* Links with staggered entrance */}
              <motion.div
                variants={mobileContainerVariants}
                initial="hidden"
                animate="show"
                className="flex-1 overflow-y-auto px-4 py-6 space-y-1"
              >
                {navLinks.map(({ label, path }) => (
                  <motion.div key={path} variants={mobileItemVariants}>
                    <Link
                      to={path}
                      className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${location.pathname === path
                          ? 'bg-blue-50/50 text-[#0056B8]'
                          : 'text-slate-600 hover:text-[#0056B8] hover:bg-slate-50'
                        }`}
                    >
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              {/* Actions */}
              <div className="p-6 border-t border-slate-100 space-y-3 bg-slate-50/50">
                {mobileActions}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
