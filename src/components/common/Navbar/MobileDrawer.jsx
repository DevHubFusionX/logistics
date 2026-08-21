import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, LogOut, LayoutDashboard, Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react'
import AnimatedLogo from '../AnimatedLogo'
import LanguageToggle from './LanguageToggle'
import { navLinks, mobileContainerVariants, mobileItemVariants } from './navConfig'

/**
 * MobileDrawer — full-screen slide-in drawer for mobile navigation.
 *
 * Props:
 *  - isOpen       {boolean}
 *  - user         {object|null}
 *  - onClose      {() => void}
 *  - onLogout     {() => void}
 *  - onDemoOpen   {() => void}
 */
export default function MobileDrawer({ isOpen, user, onClose, onLogout, onDemoOpen }) {
  const location = useLocation()

  const isActive = (link) => {
    if (link.path === '/') return location.pathname === '/'
    return location.pathname === link.path || location.pathname.startsWith(link.path + '/')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
            onClick={onClose}
          />

          {/* Drawer panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            className="fixed top-0 right-0 h-full w-full max-w-xs bg-white border-l border-slate-100 z-50 lg:hidden flex flex-col shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <AnimatedLogo className="h-8" isDarkText={true} />
              <button
                onClick={onClose}
                aria-label="Close menu"
                className="w-8 h-8 rounded-lg border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 cursor-pointer"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 1l12 12M13 1L1 13" />
                </svg>
              </button>
            </div>

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6">

              {/* Nav Links */}
              <motion.div
                variants={mobileContainerVariants}
                initial="hidden"
                animate="show"
                className="flex flex-col gap-0.5"
              >
                {navLinks.map((link) => (
                  <motion.div key={link.label} variants={mobileItemVariants}>
                    <Link
                      to={link.path}
                      onClick={onClose}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                        isActive(link)
                          ? 'bg-blue-50 text-[#0056B8] font-semibold'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      {link.label}
                      {isActive(link) && <ArrowRight className="w-3.5 h-3.5 text-[#0056B8]" />}
                    </Link>
                  </motion.div>
                ))}
              </motion.div>

              <div className="h-px bg-slate-100" />

              {/* Contact */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-body-unique">
                  Contact
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2.5">
                    <Phone className="w-3.5 h-3.5 text-[#0056B8] mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-slate-600 space-y-0.5">
                      <p>+234 811 577 9007</p>
                      <p>+234 912 116 8485</p>
                    </div>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <Mail className="w-3.5 h-3.5 text-[#0056B8] flex-shrink-0" />
                    <p className="text-xs text-slate-600">hello@daraexpress.com</p>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <MapPin className="w-3.5 h-3.5 text-[#0056B8] mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed">
                      MJS House, 366 Murtala Muhammed Road, Yaba, Lagos
                    </p>
                  </li>
                </ul>
              </div>

              <div className="h-px bg-slate-100" />

              {/* Socials */}
              <div className="space-y-3">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-body-unique">
                  Follow Us
                </p>
                <div className="flex gap-4">
                  <a
                    href="https://www.linkedin.com/company/darafort-global-services/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0056B8] transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-[#0056B8]" /> LinkedIn
                  </a>
                  <a
                    href="https://instagram.com/dara.express"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0056B8] transition-colors"
                  >
                    <Instagram className="w-3.5 h-3.5 text-[#0056B8]" /> Instagram
                  </a>
                </div>
              </div>

            </div>

            {/* Sticky footer actions */}
            <div className="p-5 border-t border-slate-100 bg-slate-50/60 space-y-3">
              <LanguageToggle isMobile />

              {user ? (
                <div className="space-y-2">
                  <Link
                    to="/my-bookings"
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-slate-900 hover:bg-black text-white rounded-lg text-xs font-bold tracking-wide font-body-unique transition-all"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    Dashboard
                  </Link>
                  <button
                    onClick={onLogout}
                    className="flex items-center justify-center gap-2 w-full py-2.5 border border-red-100 bg-red-50/40 hover:bg-red-50 text-red-600 rounded-lg text-xs font-bold tracking-wide font-body-unique cursor-pointer transition-all"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Logout
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/auth/login"
                    className="block w-full py-2.5 text-center border border-slate-300 hover:border-slate-700 text-slate-700 hover:bg-slate-50 rounded-lg text-xs font-bold tracking-wide font-body-unique transition-all"
                  >
                    Login
                  </Link>
                  <button
                    onClick={() => { onClose(); onDemoOpen() }}
                    className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#0056B8] hover:bg-[#004aad] text-white rounded-lg text-xs font-bold tracking-wide font-body-unique transition-all cursor-pointer"
                  >
                    <span>Book a Demo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
