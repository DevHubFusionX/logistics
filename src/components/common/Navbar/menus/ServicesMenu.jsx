import { Link } from 'react-router-dom'
import { Thermometer, Snowflake, Truck, Warehouse, FileText, Phone } from 'lucide-react'

const items = [
  { icon: Thermometer, label: 'Pharma Logistics',       desc: 'GDP-compliant vaccine & medicine cold chain.', path: '/services#pharma-logistics',             color: 'bg-[#0056B8] text-white' },
  { icon: Snowflake,   label: 'Frozen Food Transport',   desc: 'Continuous -18°C sub-zero reefer logistics.',  path: '/services#frozen-food-transport',       color: 'bg-slate-900 text-white' },
  { icon: Truck,       label: 'Refrigerated Transport',  desc: 'Farm-fresh transit covering all 36 states.',   path: '/services#refrigerated-transport',      color: 'bg-slate-100 text-slate-900' },
  { icon: Warehouse,   label: 'Enterprise Haulage',      desc: 'High-volume dry & temp-controlled contracts.', path: '/services#enterprise-haulage-services', color: 'bg-slate-100 text-slate-900' },
  { icon: FileText,    label: 'Request a Quote',         desc: 'Obtain an instant freight & route quote.',     path: '/booking/request',                      color: 'bg-slate-900 text-white' },
  { icon: Phone,       label: 'Support & Operations',    desc: 'Connect with our 24/7 dispatch desk.',         path: '/contact',                              color: 'bg-[#0056B8] text-white' },
]

function ServicesMenu({ onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Services</p>
        <Link to="/services" onClick={onClose} className="text-[11px] font-bold text-[#0056B8] hover:underline transition-colors">
          Go to Services Page →
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

ServicesMenu.menuWidth = 'max-w-2xl'
export default ServicesMenu
