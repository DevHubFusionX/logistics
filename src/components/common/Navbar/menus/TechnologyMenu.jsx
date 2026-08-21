import { Link } from 'react-router-dom'
import { Cpu, Navigation, Activity, Eye, BarChart2, Plug } from 'lucide-react'

const items = [
  { icon: Cpu,        label: 'Technology Overview', desc: 'Enterprise telemetry & cold-chain tech.',        path: '/technology#hero',        color: 'bg-slate-900 text-white' },
  { icon: Navigation, label: 'GPS Tracking',  desc: 'Live vehicle tracking with geofencing alerts.',         path: '/technology#fleet', color: 'bg-[#0056B8] text-white' },
  { icon: Activity,   label: 'Telemetry',     desc: 'Continuous data streams from vehicles and facilities.', path: '/technology#architecture', color: 'bg-slate-100 text-slate-900' },
  { icon: Eye,        label: 'Visibility',    desc: 'Full shipment transparency, pickup to delivery.',       path: '/technology#visibility', color: 'bg-slate-100 text-slate-900' },
  { icon: BarChart2,  label: 'Analytics',     desc: 'Dashboards to optimise performance over time.',         path: '/technology#analytics', color: 'bg-[#0056B8] text-white' },
  { icon: Plug,       label: 'Integrations',  desc: 'Open APIs for your ERP, WMS, and TMS.',                path: '/technology#architecture', color: 'bg-slate-900 text-white' },
]

function TechnologyMenu({ onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Technology</p>
        <Link to="/technology" onClick={onClose} className="text-[11px] font-bold text-[#0056B8] hover:underline transition-colors">
          Go to Technology Page →
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

TechnologyMenu.menuWidth = 'max-w-2xl'
export default TechnologyMenu
