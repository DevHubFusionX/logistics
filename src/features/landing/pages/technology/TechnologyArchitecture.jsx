import { Wifi, Navigation, ShieldCheck, Activity } from 'lucide-react'

const features = [
  {
    icon: Wifi,
    title: 'IoT Telemetry Integration',
    desc: 'Sensors stream temperature, humidity, and door-open events every 30 seconds — automatically.',
  },
  {
    icon: Navigation,
    title: 'Dynamic GPS Geofencing',
    desc: 'Corridor-based routing triggers instant dispatcher alerts the moment a truck deviates.',
  },
  {
    icon: ShieldCheck,
    title: 'Compliance Ledger',
    desc: 'Every event is SHA-256 signed and archived — audit-ready at any time.',
  },
  {
    icon: Activity,
    title: 'Real-time Excursion Alerts',
    desc: 'Temperature breaches surface instantly so action is taken before cargo is compromised.',
  },
]

export default function TechnologyArchitecture() {
  return (
    <section className="py-28 border-t border-slate-100 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Top: headline left, subtitle right */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full border border-slate-200 text-[11px] font-bold tracking-widest text-slate-500 uppercase mb-5">
              Orchestration Layer
            </span>
            <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-5xl leading-tight tracking-tight max-w-lg">
              Software that actively<br />safeguards cargo.
            </h2>
          </div>
          <p className="font-body-unique text-slate-400 text-sm leading-relaxed max-w-xs md:text-right">
            DaraOS connects every segment of your cold chain — from order to delivery — with zero manual intervention.
          </p>
        </div>

        {/* Feature cards — horizontal scroll on mobile, 4-col on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-100 border border-slate-100 rounded-2xl overflow-hidden">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="bg-white p-7 flex flex-col gap-10 hover:bg-slate-50 transition-colors group"
            >
              {/* Icon */}
              <span className="w-10 h-10 rounded-xl bg-[#0056B8]/8 text-[#0056B8] flex items-center justify-center">
                <Icon className="w-5 h-5" />
              </span>

              {/* Text */}
              <div className="space-y-2">
                <h3 className="font-heading-unique font-bold text-slate-900 text-sm sm:text-base leading-snug">
                  {title}
                </h3>
                <p className="font-body-unique text-slate-400 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
