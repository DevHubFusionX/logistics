import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LogOut, LayoutDashboard, ArrowRight, Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react'
import { useAuth } from '../../hooks'
import { AnimatedLogo } from './'
import { motion, AnimatePresence } from 'framer-motion'
import { ScheduleDemoModal } from '../../features/landing/components/landing/demo'

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
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
}

const mobileItemVariants = {
  hidden: { opacity: 0, x: 20 },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 26
    }
  }
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [visible, setVisible] = useState(true)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
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

  // Mobile Action buttons synchronized with Hero CTAs
  const mobileActions = useMemo(() => {
    if (user) {
      return (
        <div className="space-y-2">
          <Link
            to="/my-bookings"
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-slate-200 bg-white text-slate-700 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-sm font-body-unique hover:bg-slate-50 cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-red-100 bg-red-50/30 hover:bg-red-50 text-red-650 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-sm font-body-unique cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </div>
      )
    }

    return (
      <div className="space-y-3">
        <Link
          to="/auth/login"
          className="block w-full py-3 text-center border border-slate-300 hover:border-slate-800 hover:bg-slate-50 text-slate-850 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-sm font-body-unique"
        >
          Login
        </Link>
        <button
          onClick={() => {
            setMenuOpen(false)
            setIsDemoOpen(true)
          }}
          className="block w-full py-3 text-center border border-[#0056B8]/40 hover:border-[#0056B8] hover:bg-blue-50/20 text-[#0056B8] rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-sm font-body-unique cursor-pointer"
        >
          Schedule a Consultation
        </button>
        <Link
          to="/booking/request"
          className="w-full py-3 bg-[#0056B8] hover:bg-[#004cba] text-white rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center justify-center gap-2 group font-body-unique"
        >
          <span>Book a Shipment</span>
          <span className="flex-shrink-0 bg-white text-[#0056B8] rounded-full p-1 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
            <ArrowRight className="w-2.5 h-2.5" />
          </span>
        </Link>
      </div>
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
                      className="px-6 py-2.5 bg-[#0056B8] hover:bg-[#004cba] text-white font-body-unique text-[11px] font-bold tracking-[0.12em] uppercase rounded-sm transition-all active:scale-97 shadow-md hover:shadow-lg border border-[#0056B8] flex items-center gap-2 group cursor-pointer"
                    >
                      <span>Book a Shipment</span>
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
                <motion.div
                  animate={{ rotate: menuOpen ? 90 : 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="w-[18px] h-[18px] flex items-center justify-center"
                >
                  {menuOpen ? (
                    <svg width="16" height="16" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <path d="M 4.5 15.5 L 15.5 4.5 M 4.5 4.5 L 15.5 15.5" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" className="text-current">
                      <rect x="2" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
                      <rect x="11" y="2" width="7" height="7" rx="1.5" fill="currentColor" />
                      <rect x="2" y="11" width="7" height="7" rx="1.5" fill="currentColor" />
                      <rect x="11" y="11" width="7" height="7" rx="1.5" fill="currentColor" />
                    </svg>
                  )}
                </motion.div>
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

              {/* Drawer Main Scrollable Area */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-8">
                
                {/* 1. Staggered Navigation Links */}
                <motion.div
                  variants={mobileContainerVariants}
                  initial="hidden"
                  animate="show"
                  className="flex flex-col gap-1.5"
                >
                  {navLinks.map(({ label, path }) => (
                    <motion.div key={path} variants={mobileItemVariants}>
                      <Link
                        to={path}
                        className={`block px-4 py-3 rounded-md text-sm font-semibold transition-all ${location.pathname === path
                            ? 'bg-blue-50/50 text-[#0056B8]'
                            : 'text-slate-600 hover:text-[#0056B8] hover:bg-slate-50'
                          }`}
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>

                {/* Divider */}
                <div className="h-[1px] bg-slate-100" />

                {/* 2. Footer-inspired Office/Contact Details */}
                <div className="space-y-4 text-left">
                  <p className="text-slate-400 text-[10px] font-bold tracking-[0.18em] uppercase font-body-unique">
                    Contact Us
                  </p>
                  <ul className="space-y-3.5 font-body-unique">
                    <li className="flex items-start gap-3">
                      <Phone className="w-4 h-4 text-[#0056B8] mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-slate-600 space-y-0.5 font-light">
                        <p>+234 811 577 9007</p>
                        <p>+234 912 116 8485</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <Mail className="w-4 h-4 text-[#0056B8] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-600 font-light">hello@daraexpress.com</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-[#0056B8] mt-0.5 flex-shrink-0" />
                      <p className="text-xs text-slate-600 font-light leading-relaxed">
                        MJS House, 366 Murtala Muhammed Road, Yaba, Lagos
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Divider */}
                <div className="h-[1px] bg-slate-100" />

                {/* 3. Follow Us social links */}
                <div className="space-y-3.5 text-left">
                  <p className="text-slate-400 text-[10px] font-bold tracking-[0.18em] uppercase font-body-unique">
                    Follow Us
                  </p>
                  <div className="flex gap-4 font-body-unique">
                    <a
                      href="https://www.linkedin.com/company/darafort-global-services/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-[#0056B8] transition-colors font-light"
                    >
                      <Linkedin className="w-4 h-4 text-[#0056B8]" />
                      LinkedIn
                    </a>
                    <a
                      href="https://instagram.com/dara.express"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-[#0056B8] transition-colors font-light"
                    >
                      <Instagram className="w-4 h-4 text-[#0056B8]" />
                      Instagram
                    </a>
                  </div>
                </div>

              </div>

              {/* Sticky Actions Area */}
              <div className="p-6 border-t border-slate-100 bg-slate-50/50">
                {mobileActions}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
