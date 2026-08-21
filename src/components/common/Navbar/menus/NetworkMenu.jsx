import { Link } from 'react-router-dom'
import { LayoutDashboard, Truck, Warehouse, Map, Handshake, Activity } from 'lucide-react'

const items = [
  { icon: LayoutDashboard, label: 'Network Overview', desc: 'Pan-Nigeria cold chain at a glance.',       path: '/network#hero',     color: 'bg-[#0056B8] text-white' },
  { icon: Truck,           label: 'Reefer Capacity',   desc: 'Refrigerated vehicles for every cargo type.', path: '/network#reefer',   color: 'bg-slate-900 text-white' },
  { icon: Warehouse,       label: 'Cold Storage',      desc: 'Multi-chamber hubs with live monitoring.',   path: '/network#storage',  color: 'bg-slate-100 text-slate-900' },
  { icon: Map,             label: 'Coverage Map',      desc: 'Pan-Nigeria transit routes & hubs.',          path: '/network#coverage', color: 'bg-slate-100 text-slate-900' },
  { icon: Handshake,       label: 'Partners',          desc: 'Strategic 3PL and carrier integrations.',     path: '/network#partners', color: 'bg-slate-900 text-white' },
  { icon: Activity,        label: 'Network Operations',desc: 'Live telemetry and uptime statistics.',       path: '/network#glance',   color: 'bg-[#0056B8] text-white' },
]

function NetworkMenu({ onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Network</p>
        <Link to="/network" onClick={onClose} className="text-[11px] font-bold text-[#0056B8] hover:underline transition-colors">
          Go to Network Page →
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

NetworkMenu.menuWidth = 'max-w-2xl'
export default NetworkMenu
