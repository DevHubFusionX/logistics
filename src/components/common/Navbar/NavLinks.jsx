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
    if (link.megaMenu === 'company') {
      return ['/about', '/contact', '/portfolio', '/blog'].some(
        (p) => location.pathname === p || location.pathname.startsWith(p + '/')
      )
    }
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

          const linkColorClass = active || isOpen
            ? lightNav
              ? 'text-white bg-white/15'
              : 'text-[#0056B8] bg-blue-50/70'
            : lightNav
              ? 'text-white/85 hover:text-white hover:bg-white/10'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'

          return (
            <div key={link.label} className="relative">
              {hasMega ? (
                <button
                  onClick={() => toggle(link.megaMenu)}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-[11px] font-semibold tracking-wide transition-colors duration-150 font-body-unique cursor-pointer ${linkColorClass}`}
                >
                  {link.label}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${isOpen ? (lightNav ? 'rotate-180 text-white' : 'rotate-180 text-[#0056B8]') : ''}`} />
                </button>
              ) : link.isExternal ? (
                <a
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-[11px] font-semibold tracking-wide transition-colors duration-150 font-body-unique cursor-pointer ${linkColorClass}`}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.path}
                  className={`flex items-center gap-1 px-3 py-2 rounded-md text-[11px] font-semibold tracking-wide transition-colors duration-150 font-body-unique cursor-pointer ${linkColorClass}`}
                >
                  {link.label}
                </Link>
              )}

              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className={`absolute bottom-0 left-3 right-3 h-[2px] rounded-full ${lightNav ? 'bg-white' : 'bg-[#0056B8]'}`}
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
            className="hidden lg:block fixed inset-0 top-[76px] z-40 backdrop-blur-sm bg-black/20"
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
            className="hidden lg:block fixed left-0 right-0 top-[76px] z-50 px-6 pt-2"
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
