import { Link } from 'react-router-dom'
import { LogOut, LayoutDashboard, ArrowRight } from 'lucide-react'
import LanguageToggle from './LanguageToggle'

/**
 * NavActions — desktop right-side actions.
 * Shows: Language toggle + (Login / Book a Demo) for guests,
 *         or (Dashboard / Logout) for authenticated users.
 *
 * Props:
 *  - user        {object|null}
 *  - lightNav    {boolean}
 *  - onDemoOpen  {() => void}
 *  - onLogout    {() => void}
 */
export default function NavActions({ user, lightNav, onDemoOpen, onLogout }) {
  return (
    <div className="hidden lg:flex items-center gap-4">
      <LanguageToggle lightNav={lightNav} />

      {user ? (
        <>
          <Link
            to="/my-bookings"
            className={`flex items-center gap-1.5 px-4 py-2 font-body-unique text-[11px] font-semibold tracking-wide rounded transition-all shadow-sm ${
              lightNav
                ? 'bg-white hover:bg-blue-50 text-[#0056B8]'
                : 'bg-slate-900 hover:bg-black text-white'
            }`}
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            Dashboard
          </Link>

          <button
            onClick={onLogout}
            className={`flex items-center gap-1.5 text-[11px] font-semibold font-body-unique tracking-wide transition-colors cursor-pointer ${
              lightNav
                ? 'text-white/80 hover:text-white'
                : 'text-slate-500 hover:text-red-600'
            }`}
          >
            <LogOut className="w-3.5 h-3.5" />
            Logout
          </button>
        </>
      ) : (
        <>
          <Link
            to="/auth/login"
            className={`text-[11px] font-semibold font-body-unique tracking-wide transition-colors ${
              lightNav
                ? 'text-white/90 hover:text-white'
                : 'text-slate-600 hover:text-[#0056B8]'
            }`}
          >
            Login
          </Link>

          <button
            onClick={onDemoOpen}
            className={`flex items-center gap-2 px-5 py-2.5 font-body-unique text-[11px] font-bold tracking-wide rounded transition-all shadow-md hover:shadow-lg cursor-pointer group ${
              lightNav
                ? 'bg-white hover:bg-blue-50 text-[#0056B8]'
                : 'bg-[#0056B8] hover:bg-[#004aad] text-white'
            }`}
          >
            <span>Book a Demo</span>
            <span
              className={`flex-shrink-0 rounded-full p-0.5 flex items-center justify-center group-hover:translate-x-0.5 transition-transform ${
                lightNav ? 'bg-[#0056B8] text-white' : 'bg-white text-[#0056B8]'
              }`}
            >
              <ArrowRight className="w-2.5 h-2.5" />
            </span>
          </button>
        </>
      )}
    </div>
  )
}
