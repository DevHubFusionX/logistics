import { Link } from 'react-router-dom'
import { Snowflake, Warehouse, Map } from 'lucide-react'

const items = [
  { icon: Snowflake, label: 'Reefer Capacity', desc: 'Temperature-controlled vehicles for every cargo type.', path: '/network', color: 'bg-[#0056B8] text-white' },
  { icon: Warehouse, label: 'Cold Storage',    desc: 'Multi-chamber facilities with live monitoring.',        path: '/network', color: 'bg-slate-900 text-white' },
  { icon: Map,       label: 'Coverage',        desc: 'Pan-Nigeria distribution across all 36 states.',       path: '/network', color: 'bg-slate-100 text-slate-900' },
  // { icon: Handshake, label: 'Partners', desc: 'Strategic 3PL and carrier partnerships.', path: '/network', color: 'bg-slate-900 text-white' },
]

function NetworkMenu({ onClose }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-5">Network</p>
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

NetworkMenu.menuWidth = 'max-w-xl'
export default NetworkMenu
