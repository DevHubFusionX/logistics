import { Link } from 'react-router-dom'
import { LayoutDashboard, Thermometer, MapPin, BarChart3, Play, Plug } from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Platform Overview', desc: 'The cold-chain intelligence layer.',       path: '/platform#hero',     color: 'bg-[#0056B8] text-white' },
  { icon: MapPin,          label: 'GPS & Fleet',        desc: 'Live location and route management.',     path: '/platform#capabilities', color: 'bg-slate-900 text-white' },
  { icon: Thermometer,     label: 'Temp Monitoring',    desc: 'Real-time alerts and telemetry.',         path: '/platform#temperature', color: 'bg-slate-100 text-slate-900' },
  { icon: BarChart3,       label: 'Analytics',          desc: 'Insight-driven operational decisions.',   path: '/platform#capabilities', color: 'bg-slate-100 text-slate-900' },
  { icon: Plug,            label: 'Integrations',       desc: 'Connect your ERP, WMS and TMS.',          path: '/platform#onboarding', color: 'bg-slate-900 text-white' },
  { icon: Play,            label: 'Interactive Demo',   desc: 'See DaraOS in action.',                   path: '/demo',     color: 'bg-[#0056B8] text-white' },
]

function PlatformMenu({ onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Platform</p>
        <Link to="/platform" onClick={onClose} className="text-[11px] font-bold text-[#0056B8] hover:underline transition-colors">
          Go to Platform Page →
        </Link>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {items.map(({ icon: Icon, label, desc, path, color }) => {
          const isLight = color.includes('slate-100')
          return (
            <Link key={label} to={path} onClick={onClose}
              className={`flex flex-col justify-between p-5 rounded-2xl transition-opacity hover:opacity-90 group min-h-[140px] ${color}`}
            >
              <Icon className={`w-5 h-5 ${isLight ? 'text-slate-400' : 'text-white/70'}`} />
              <div className="mt-8">
                <p className={`text-sm font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>{label}</p>
                <p className={`text-[11px] mt-1 leading-snug ${isLight ? 'text-slate-400' : 'text-white/60'}`}>{desc}</p>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

PlatformMenu.menuWidth = 'max-w-2xl'
export default PlatformMenu
