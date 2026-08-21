import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { navLinks } from './navConfig'
import PlatformMenu   from './menus/PlatformMenu'
import SolutionsMenu  from './menus/SolutionsMenu'
import NetworkMenu    from './menus/NetworkMenu'
import TechnologyMenu from './menus/TechnologyMenu'
import ServicesMenu   from './menus/ServicesMenu'
import CompanyMenu    from './menus/CompanyMenu'

const MENUS = {
  platform:   PlatformMenu,
  solutions:  SolutionsMenu,
  network:    NetworkMenu,
  technology: TechnologyMenu,
  services:   ServicesMenu,
  company:    CompanyMenu,
}

export default function NavLinks({ lightNav = false }) {
  const location = useLocation()
  const [activeMenu, setActiveMenu] = useState(null)
  const navRef = useRef(null)

  const toggle = (key) => setActiveMenu(prev => prev === key ? null : key)
  const close  = ()    => setActiveMenu(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on route change
  useEffect(() => { close() }, [location.pathname])

  const isActive = (link) => {
    if (link.path === '/') return location.pathname === '/'
    return location.pathname === link.path || location.pathname.startsWith(link.path + '/')
  }

  const MenuComp = activeMenu ? MENUS[activeMenu] : null

  return (
    <>
      {/* Nav items row */}
      <div ref={navRef} className="hidden lg:flex items-center justify-center gap-0.5">
        {navLinks.map((link) => {
          const active  = isActive(link)
          const hasMega = !!link.megaMenu
          const isOpen  = activeMenu === link.megaMenu

          return (
            <div key={link.label} className="relative">
              {hasMega ? (
                <button
                  onClick={() => toggle(link.megaMenu)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-[11px] font-semibold tracking-wide transition-colors duration-150 font-body-unique cursor-pointer ${
                    active || isOpen ? 'text-[#0056B8]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#0056B8]' : ''}`} />
                </button>
              ) : (
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-[11px] font-semibold tracking-wide transition-colors duration-150 font-body-unique cursor-pointer ${
                    active ? 'text-[#0056B8]' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                </Link>
              )}

              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#0056B8] rounded-full"
                />
              )}
            </div>
          )
        })}
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {activeMenu && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="hidden lg:block fixed inset-0 top-[72px] z-40 backdrop-blur-sm bg-black/20"
            onClick={close}
          />
        )}
      </AnimatePresence>

      {/* Mega menu panel */}
      <AnimatePresence>
        {activeMenu && MenuComp && (
          <motion.div
            key={activeMenu}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="hidden lg:block fixed left-0 right-0 top-[72px] z-50 px-6 pt-2"
          >
            <div className={`mx-auto bg-white border border-slate-100 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.12)] p-6 ${ MenuComp.menuWidth ?? 'max-w-3xl' }`}>
              <MenuComp onClose={close} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
