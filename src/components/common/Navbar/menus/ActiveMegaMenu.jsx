import { motion } from 'framer-motion'
import PlatformMenu from './PlatformMenu'
import SolutionsMenu from './SolutionsMenu'
import NetworkMenu from './NetworkMenu'
import TechnologyMenu from './TechnologyMenu'
import ResourcesMenu from './ResourcesMenu'

const menuMap = {
  platform:   PlatformMenu,
  solutions:  SolutionsMenu,
  network:    NetworkMenu,
  technology: TechnologyMenu,
  resources:  ResourcesMenu,
}

/**
 * ActiveMegaMenu — animated panel rendered inside the fixed header.
 * Positioned `absolute top-full left-0 right-0` so it appears directly
 * below the navbar regardless of scroll position.
 *
 * Props:
 *  - menuKey      {string}
 *  - onMouseEnter {() => void}  cancel close timer
 *  - onMouseLeave {() => void}  schedule close
 *  - onDemoOpen   {() => void}
 */
export default function ActiveMegaMenu({ menuKey, onMouseEnter, onMouseLeave, onDemoOpen }) {
  const MenuComponent = menuMap[menuKey]
  if (!MenuComponent) return null

  return (
    <motion.div
      key={menuKey}
      initial={{ opacity: 0, y: -6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.16, ease: 'easeOut' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute top-full left-0 right-0 bg-white border-t border-slate-100 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.14)] z-50"
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-7">
        <MenuComponent onDemoOpen={onDemoOpen} />
      </div>
      {/* Bottom fade line */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-[#0056B8]/20 to-transparent" />
    </motion.div>
  )
}
