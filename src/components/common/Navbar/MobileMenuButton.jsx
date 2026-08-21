import { motion } from 'framer-motion'

/**
 * MobileMenuButton — animated hamburger / close toggle.
 *
 * Props:
 *  - isOpen    {boolean}
 *  - scrolled  {boolean} — controls light/dark icon styling
 *  - onToggle  {() => void}
 */
export default function MobileMenuButton({ isOpen, scrolled, onToggle }) {
  return (
    <div className="lg:hidden flex items-center justify-end">
      <button
        onClick={onToggle}
        aria-label="Toggle Menu"
        className="w-10 h-10 rounded-lg flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer border bg-slate-50 border-slate-200/60 text-slate-700 hover:bg-slate-100"
      >
        <motion.span
          animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
          className="block w-5 h-[1.5px] bg-current rounded-full origin-center"
        />
        <motion.span
          animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
          className="block w-5 h-[1.5px] bg-current rounded-full"
        />
        <motion.span
          animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
          className="block w-5 h-[1.5px] bg-current rounded-full origin-center"
        />
      </button>
    </div>
  )
}
