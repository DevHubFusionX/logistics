import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Menu, X, LogOut, LayoutDashboard, User } from 'lucide-react'
import { useAuth } from '../../hooks'
import { AnimatedLogo } from '.'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { label: 'Services',  path: '/services' },
  { label: 'About',     path: '/about' },
  { label: 'Tracking',  path: '/tracking' },
  { label: 'Contact',   path: '/contact' },
]

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLogout = () => {
    logout()
    setMenuOpen(false)
    navigate('/')
  }

  // on home: transparent until scrolled; on other pages: always solid
  const solid = !isHome || scrolled

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solid
          ? 'bg-[#1e3a5f]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/8'
          : 'bg-transparent'
      }`}>
        <div className="px-8 sm:px-14 lg:px-20">
          <div className="flex items-center justify-between h-18 py-4">

            {/* Logo */}
            <Link to="/">
              <AnimatedLogo className="h-8 sm:h-10 brightness-0 invert" />
            </Link>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                    location.pathname === path
                      ? 'text-white bg-white/10'
                      : 'text-white/60 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Desktop auth */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <Link
                    to="/my-bookings"
                    className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-white/60 hover:text-white text-sm font-semibold rounded-lg hover:bg-white/10 transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/auth/login"
                    className="text-white/60 hover:text-white text-sm font-semibold transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/booking/request"
                    className="px-5 py-2.5 bg-blue-500 hover:bg-blue-400 text-white text-sm font-bold rounded-xl transition-colors"
                  >
                    Ship Now
                  </Link>
                </>
              )}
            </div>

            {/* Mobile burger */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 h-full w-72 bg-[#1e3a5f] border-l border-white/10 z-50 md:hidden flex flex-col"
            >
              {/* header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
                <AnimatedLogo className="h-8 brightness-0 invert" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* links */}
              <div className="flex-1 overflow-y-auto px-4 py-6 space-y-1">
                {navLinks.map(({ label, path }) => (
                  <Link
                    key={path}
                    to={path}
                    className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                      location.pathname === path
                        ? 'bg-white/10 text-white'
                        : 'text-white/60 hover:text-white hover:bg-white/8'
                    }`}
                  >
                    {label}
                  </Link>
                ))}
              </div>

              {/* auth */}
              <div className="px-4 pb-8 pt-4 border-t border-white/8 space-y-3">
                {user ? (
                  <>
                    <Link
                      to="/my-bookings"
                      className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/8 transition-all"
                    >
                      <LayoutDashboard className="w-4 h-4" /> Dashboard
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/8 transition-all"
                    >
                      <LogOut className="w-4 h-4" /> Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/auth/login"
                      className="block w-full px-4 py-3 text-center text-white/60 hover:text-white border border-white/10 hover:border-white/20 rounded-xl text-sm font-semibold transition-all"
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/booking/request"
                      className="block w-full px-4 py-3 text-center bg-blue-500 hover:bg-blue-400 text-white rounded-xl text-sm font-bold transition-colors"
                    >
                      Ship Now
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
