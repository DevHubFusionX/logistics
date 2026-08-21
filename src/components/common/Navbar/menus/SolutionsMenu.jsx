import { Link } from 'react-router-dom'
import { FlaskConical, Utensils, ShoppingBag, Leaf, Factory, LayoutGrid } from 'lucide-react'

const items = [
  { icon: FlaskConical, label: 'Pharmaceuticals', desc: 'GDP-compliant cold chain for medicines & vaccines.',    path: '/solutions', color: 'bg-[#0056B8] text-white' },
  { icon: Utensils,     label: 'Food & Beverage', desc: 'Farm-to-shelf freshness with real-time temp control.',  path: '/solutions', color: 'bg-slate-100 text-slate-900' },
  { icon: ShoppingBag,  label: 'FMCG',            desc: 'High-velocity distribution for consumer goods.',        path: '/solutions', color: 'bg-slate-900 text-white' },
  { icon: Leaf,         label: 'Agriculture',      desc: 'Post-harvest cold logistics to reduce spoilage.',       path: '/solutions', color: 'bg-slate-900 text-white' },
  { icon: Factory,      label: 'Manufacturing',    desc: 'Temperature-sensitive raw material logistics.',         path: '/solutions', color: 'bg-slate-100 text-slate-900' },
  { icon: LayoutGrid,   label: 'Other Verticals',  desc: 'Chemicals, cosmetics, and more.',                      path: '/solutions', color: 'bg-[#0056B8] text-white' },
]

function SolutionsMenu({ onClose }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-5">Solutions</p>
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

SolutionsMenu.menuWidth = 'max-w-2xl'
export default SolutionsMenu
