import { Link } from 'react-router-dom'
import { Info, Phone } from 'lucide-react'

const items = [
  { icon: Info,  label: 'About',   desc: 'Our mission, story and values.', path: '/about',   color: 'bg-slate-900 text-white' },
  // { icon: Users,     label: 'Team',    desc: 'The people building the platform.',     path: '/team',    color: 'bg-slate-100 text-slate-900' },
  { icon: Phone, label: 'Contact', desc: 'Get in touch with our team.',    path: '/contact', color: 'bg-[#0056B8] text-white' },
  // { icon: Briefcase, label: 'Careers', desc: 'Join us and help digitise cold chain.', path: '/contact', color: 'bg-slate-100 text-slate-900' },
]

function CompanyMenu({ onClose }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-5">Company</p>
      <div className="grid grid-cols-2 gap-3">
        {items.map(({ icon: Icon, label, desc, path, color }) => {
          const isLight = color.includes('slate-100')
          return (
            <Link key={label} to={path} onClick={onClose}
              className={`flex flex-col justify-between p-6 rounded-2xl transition-opacity hover:opacity-90 group min-h-[180px] ${color}`}
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

CompanyMenu.menuWidth = 'max-w-sm'
export default CompanyMenu
