import { MapPin, Navigation } from 'lucide-react'

export default function NetworkCoverage() {
  const routes = [
    { from: 'Lagos', to: 'Abuja', time: '14 - 18 Hours', dist: '750 km', type: 'Primary Transit Route' },
    { from: 'Kano', to: 'Lagos', time: '24 - 28 Hours', dist: '1,000 km', type: 'Agricultural Cargo Corridor' },
    { from: 'Port Harcourt', to: 'Enugu', time: '6 - 8 Hours', dist: '230 km', type: 'Regional Distribution Route' }
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Routes and Coverage Text */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Coverage Map
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Across all 36 states, without friction.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              We connect physical supply nodes nationwide. Our trucks move along pre-mapped transit corridors, backed by local geo-fencing, road hazards tracking, and continuous GPS signal recovery.
            </p>

            <div className="w-full space-y-4">
              {routes.map((route, idx) => (
                <div key={idx} className="bg-white rounded-xl border border-slate-100 p-5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.01)] hover:scale-[1.01] transition-transform">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-[#0056B8]">
                      <Navigation size={16} />
                    </div>
                    <div>
                      <h5 className="font-heading-unique font-bold text-slate-900 text-sm sm:text-base">
                        {route.from} → {route.to}
                      </h5>
                      <p className="font-body-unique text-slate-400 text-xs mt-0.5">{route.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-heading-unique font-bold text-slate-900 text-xs sm:text-sm block">{route.time}</span>
                    <span className="font-body-unique text-slate-500 text-[10px] sm:text-xs mt-0.5 block">{route.dist}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: High-Tech Route Network Map Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-[400px] aspect-[4/3] bg-white rounded-3xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.02)] relative overflow-hidden flex items-center justify-center p-6 select-none">
              
              {/* Custom SVG Route Connections Visualizer */}
              <svg viewBox="0 0 300 220" className="w-full h-full text-slate-300">
                {/* Simulated map boundary / contour lines */}
                <path d="M 20 60 Q 60 40, 110 50 T 210 30 T 280 60" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 10 110 Q 70 90, 120 120 T 220 100 T 290 130" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />
                <path d="M 30 160 Q 80 150, 130 170 T 230 150 T 270 170" fill="none" stroke="#F1F5F9" strokeWidth="1.5" />

                {/* Major routes connector lines */}
                <path d="M 50 160 L 150 100 L 250 40" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5 3" />
                <path d="M 150 100 L 250 150" fill="none" stroke="#E2E8F0" strokeWidth="2" strokeDasharray="5 3" />

                {/* Main active corridor highlighting */}
                <path 
                  d="M 50 160 L 150 100 L 250 40" 
                  fill="none" 
                  stroke="#0056B8" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                  className="opacity-75"
                />

                {/* Route Stops Nodes */}
                {/* Lagos stop */}
                <g>
                  <circle cx="50" cy="160" r="5" fill="#0056B8" />
                  <circle cx="50" cy="160" r="10" stroke="#0056B8" strokeWidth="1.5" fill="none" className="animate-ping" />
                  <text x="50" y="180" textAnchor="middle" className="font-heading-unique text-[9px] font-bold fill-slate-700">Lagos Hub</text>
                </g>
                {/* Abuja stop */}
                <g>
                  <circle cx="150" cy="100" r="5" fill="#E05A2B" />
                  <circle cx="150" cy="100" r="9" stroke="#E05A2B" strokeWidth="1.5" fill="none" className="animate-pulse" />
                  <text x="162" y="103" className="font-heading-unique text-[9px] font-bold fill-slate-700">Abuja Depot</text>
                </g>
                {/* Kano stop */}
                <g>
                  <circle cx="250" cy="40" r="5" fill="#0056B8" />
                  <circle cx="250" cy="40" r="10" stroke="#0056B8" strokeWidth="1.5" fill="none" className="animate-ping" />
                  <text x="250" y="25" textAnchor="middle" className="font-heading-unique text-[9px] font-bold fill-slate-700">Kano Depot</text>
                </g>
                {/* Port Harcourt stop */}
                <g>
                  <circle cx="250" cy="150" r="5" fill="#0056B8" />
                  <text x="250" y="168" textAnchor="middle" className="font-heading-unique text-[9px] font-bold fill-slate-700">Port Harcourt</text>
                </g>

                {/* Simulated transit icon / GPS Marker on path */}
                <g transform="translate(110, 124)">
                  <circle cx="0" cy="0" r="6" fill="#0056B8" />
                  <circle cx="0" cy="0" r="12" stroke="#0056B8" strokeWidth="1" fill="none" className="animate-pulse" />
                  <MapPin size={10} className="text-white -mt-[5px] -ml-[5px] absolute" />
                </g>
              </svg>

              {/* Decorative route path glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-slate-100/30 blur-[80px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
