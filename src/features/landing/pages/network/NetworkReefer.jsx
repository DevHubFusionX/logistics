import { ShieldCheck, Snowflake, Thermometer } from 'lucide-react'

export default function NetworkReefer() {
  const capacities = [
    { title: 'Chilled Box Vans', cap: '5-Ton Capacity', temp: '2°C to 8°C Chilled', type: 'Pharma & Chilled Dairy' },
    { title: 'Mid-Size Reefers', cap: '10 to 15-Ton Capacity', temp: '-20°C to +10°C Chilled/Frozen', type: 'FMCG, Proteins & Ice Cream' },
    { title: 'Heavy Semi-Trailers', cap: '30-Ton Capacity', temp: 'Dual-Zone Compartment', type: 'Bulk Long-Haul Transport' }
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text & Bullet Highlights */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Reefer Network
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Refrigerated vehicles for every scale.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              From urban last-mile distribution to long-haul bulk supply, Dara connects you with validated refrigerated vehicles. Every asset is equipped with automated telemetry mapping real-time temperature fluctuations directly into DaraOS.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <span className="text-[#0056B8] mt-0.5 shrink-0"><Snowflake size={18} /></span>
                <span className="font-body-unique text-slate-700 text-sm sm:text-[15px]">Multi-zone refrigeration to transport chilled and frozen goods simultaneously.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#0056B8] mt-0.5 shrink-0"><Thermometer size={18} /></span>
                <span className="font-body-unique text-slate-700 text-sm sm:text-[15px]">Pre-cooled compartments before loading to guarantee cargo integrity.</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#0056B8] mt-0.5 shrink-0"><ShieldCheck size={18} /></span>
                <span className="font-body-unique text-slate-700 text-sm sm:text-[15px]">WHO & NAFDAC compliant transport standards for pharmaceuticals.</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Capacity Cards */}
          <div className="lg:col-span-6 w-full space-y-4 select-none">
            {capacities.map((item, idx) => (
              <div 
                key={idx} 
                className="bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.01)] p-6 flex flex-col sm:flex-row justify-between sm:items-center gap-4 text-left hover:scale-[1.01] transition-transform"
              >
                <div>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-base sm:text-lg mb-1">
                    {item.title}
                  </h4>
                  <p className="font-body-unique text-slate-400 text-xs sm:text-sm">
                    {item.type}
                  </p>
                </div>
                
                <div className="text-left sm:text-right border-t sm:border-t-0 pt-3 sm:pt-0 border-slate-50">
                  <span className="font-heading-unique font-bold text-[#0056B8] text-sm block">
                    {item.cap}
                  </span>
                  <span className="font-body-unique text-slate-500 text-xs mt-0.5 block">
                    {item.temp}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
