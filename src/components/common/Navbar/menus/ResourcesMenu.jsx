import { Link } from 'react-router-dom'
import { Lightbulb, FileText, Video, BookOpen } from 'lucide-react'

const items = [
  { icon: Lightbulb, label: 'Insights',     desc: 'Industry trends and cold-chain intelligence.', path: '/blog', color: 'bg-slate-100 text-slate-900' },
  { icon: FileText,  label: 'Reports',      desc: 'In-depth research and market analysis.',        path: '/blog', color: 'bg-[#0056B8] text-white' },
  { icon: Video,     label: 'Webinars',     desc: 'Live and on-demand expert sessions.',           path: '/blog', color: 'bg-slate-900 text-white' },
  { icon: BookOpen,  label: 'Case Studies', desc: 'Real outcomes from our clients.',               path: '/blog', color: 'bg-slate-100 text-slate-900' },
]

function ResourcesMenu({ onClose }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">Resources</p>
        <Link to="/blog" onClick={onClose} className="text-[11px] font-bold text-[#0056B8] hover:underline transition-colors">
          Go to Resources Page →
        </Link>
      </div>
      <div className="grid grid-cols-4 gap-3">
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

ResourcesMenu.menuWidth = 'max-w-2xl'
export default ResourcesMenu
