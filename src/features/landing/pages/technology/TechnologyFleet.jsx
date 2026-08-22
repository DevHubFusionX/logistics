import { MapPin, Gauge, Thermometer } from 'lucide-react'

const features = [
  {
    icon: MapPin,
    title: 'Live Location, Every 15 Seconds',
    desc: 'Geofenced corridors alert dispatchers the moment a driver deviates from the optimized route.',
  },
  {
    icon: Gauge,
    title: '300+ Reefer & 500+ Dry Trucks',
    desc: 'Full fleet visibility in one dashboard — speed, heading, fuel, and availability at a glance.',
  },
  {
    icon: Thermometer,
    title: 'Compartment Temperature Monitoring',
    desc: 'Continuous in-transit readings ensure cargo stays within spec from pickup to delivery.',
  },
]

export default function TechnologyFleet() {
  return (
    <section className="py-28 border-t border-slate-100" style={{ backgroundColor: '#f7f7f5' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Left: label + headline + image bottom */}
          <div className="flex flex-col justify-between gap-12">
            <div>
              <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-5">
                Fleet Intelligence
              </span>
              <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-[42px] leading-[1.15] tracking-tight max-w-sm">
                Every truck. Every second.
              </h2>
            </div>

            {/* Image — bottom left, smaller, rounded */}
            <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden flex-shrink-0">
              <img
                src="/assets/img/enterprise.jpg"
                alt="Darafort reefer fleet"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.parentElement.style.background = '#e2e8f0'
                  e.target.style.display = 'none'
                }}
              />
            </div>
          </div>

          {/* Right: stacked feature cards */}
          <div className="flex flex-col gap-3">
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-slate-200/70 rounded-2xl p-5"
              >
                {/* Icon on its own line */}
                <span className="w-9 h-9 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center mb-4">
                  <Icon className="w-4 h-4" />
                </span>
                <h3 className="font-heading-unique font-bold text-slate-900 text-sm mb-1.5">
                  {title}
                </h3>
                <p className="font-body-unique text-slate-400 text-xs leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
