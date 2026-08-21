import { CheckCircle2, Link2, Plus } from 'lucide-react'

export default function NetworkPartners() {
  const integrations = [
    { name: 'Swift Reefer Logistics', assets: '18 Trucks Active', status: 'API Connected', icon: Link2 },
    { name: 'Nig-Express Coldways', assets: '12 Trucks Active', status: 'API Connected', icon: Link2 },
    { name: 'Prime Transit Carriers', assets: '25 Trucks Active', status: 'API Connected', icon: Link2 }
  ]

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Carrier Integrations Panel Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-start order-last lg:order-first">
            <div className="w-full max-w-lg bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 text-left select-none relative shadow-[0_20px_50px_rgba(0,0,0,0.01)]">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Telematics Bridge</span>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-base sm:text-lg">DaraOS Carrier Integrations</h4>
                </div>
                <button className="w-8 h-8 rounded-lg bg-white border border-slate-200/80 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors">
                  <Plus size={16} />
                </button>
              </div>

              {/* Integrations List */}
              <div className="space-y-4">
                {integrations.map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div 
                      key={idx} 
                      className="bg-white rounded-xl border border-slate-100 p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-lg bg-blue-50/50 text-[#0056B8] flex items-center justify-center">
                          <Icon size={16} />
                        </span>
                        <div>
                          <h5 className="font-heading-unique font-bold text-slate-900 text-xs sm:text-sm">
                            {item.name}
                          </h5>
                          <p className="font-body-unique text-slate-400 text-[10px] mt-0.5">{item.assets}</p>
                        </div>
                      </div>
                      
                      <span className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100/50">
                        <CheckCircle2 size={10} /> {item.status}
                      </span>
                    </div>
                  )
                })}
              </div>

              {/* API Heartbeat Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 flex items-center justify-between text-[10px] text-slate-400 font-body-unique">
                <span>Webhook endpoints: Active</span>
                <span className="text-[#0056B8] font-bold">API status: 200 OK (6ms)</span>
              </div>

            </div>
          </div>

          {/* Right Column: Text and Partners Copy */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Partners & Connected Infrastructure
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Empowering carriers. Protecting cargo.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Dara doesn't just hire trucks; we integrate them. Fleet owners and 3PL carriers link their assets directly via the DaraOS telematics bridge. This guarantees continuous visibility across mixed carrier networks while maintaining delivery protocols.
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0056B8] mt-2 shrink-0" />
                <p className="font-body-unique text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                  **SLA compliance checking:** Automated compliance verification for every carrier trip log.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0056B8] mt-2 shrink-0" />
                <p className="font-body-unique text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                  **Unified dispatcher view:** Dispatchers track third-party and owned assets in a single interface.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0056B8] mt-2 shrink-0" />
                <p className="font-body-unique text-slate-700 text-sm sm:text-[15px] leading-relaxed">
                  **Owner-operator onboarding:** Seamless integration for independent logistics operators.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
