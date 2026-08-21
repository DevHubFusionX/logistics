import { Truck, Thermometer, ShieldCheck, Share2, Compass, AlertTriangle, FileText } from 'lucide-react'
import DashboardImg from './Dashboard.png'

export default function PlatformCapabilities() {
  return (
    <section className="bg-white py-24 text-left overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Headline */}
        <div className="max-w-3xl mb-16">
          <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-4xl lg:text-[42px] leading-tight tracking-tight">
            The core software system for modern cold-chain operations
          </h2>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-8">
          
          {/* Card 1: Full Width (Unified Fleet & Consignment Control) */}
          <div className="bg-slate-50/60 border border-slate-200/50 rounded-[32px] p-8 sm:p-12 lg:flex lg:items-center lg:justify-between gap-12 relative overflow-hidden transition-all hover:shadow-sm">
            <div className="max-w-lg flex flex-col items-start z-10">
              {/* Badge header */}
              <div className="flex items-center gap-3 mb-8">
                <span className="w-10 h-10 rounded-xl bg-[#0056B8]/10 text-[#0056B8] flex items-center justify-center">
                  <Truck className="w-5 h-5" />
                </span>
                <div>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-sm">DaraOS Core</h4>
                  <p className="text-[11px] text-slate-500 font-body-unique mt-0.5">A complete platform to run cold-chain operations</p>
                </div>
              </div>

              <h3 className="font-heading-unique font-extrabold text-slate-900 text-2xl sm:text-3.5xl leading-tight mb-4 tracking-tight">
                All your cold-chain workflows in a single place
              </h3>
              <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed mb-6">
                Manage shipments, optimize fleet capacity, track temperature compliance, and orchestrate routes from one unified operating system. Built for dispatcher and manager efficiency.
              </p>
            </div>

            {/* Right mockup: Unified dashboard image */}
            <div className="w-full lg:w-[500px] rounded-2xl overflow-hidden shadow-md border border-slate-200/50 shrink-0 mt-8 lg:mt-0 select-none z-10">
              <img
                src={DashboardImg}
                alt="DaraOS Dashboard"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>

          {/* Cards 2 & 3: Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Card 2: Telemetry & GPS Visibility */}
            <div className="bg-slate-50/60 border border-slate-200/50 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all hover:shadow-sm">
              <div className="max-w-md flex flex-col items-start mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl bg-[#0056B8]/10 text-[#0056B8] flex items-center justify-center">
                    <Compass className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-heading-unique font-bold text-slate-900 text-sm">IoT Telemetry</h4>
                    <p className="text-[11px] text-slate-500 font-body-unique mt-0.5">Real-time coordinates & cargo health</p>
                  </div>
                </div>

                <h3 className="font-heading-unique font-extrabold text-slate-900 text-xl sm:text-2xl leading-snug mb-4 tracking-tight">
                  Real-time temperature telemetry and location visibility
                </h3>
                <p className="font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Continuous sensor logging and high-fidelity GPS tracking ensure absolute visibility of temperature compliance and vehicle coordinates at every mile of the journey.
                </p>
              </div>

              {/* Bottom Visual Mockup: Live temperature chart */}
              <div className="w-full bg-white border border-slate-200/60 rounded-2xl shadow-md p-5 flex flex-col gap-4 relative select-none">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[11px] font-bold text-slate-800 font-body-unique">GPS & Temp Active</span>
                  </div>
                  <span className="text-[10px] text-slate-450 font-body-unique">Last ping: 2s ago</span>
                </div>

                <div className="flex items-end justify-between h-20 pt-4 px-2 border-b border-slate-100">
                  {/* Visual mockup graph bars */}
                  {[40, 45, 42, 38, 44, 46, 42, 45, 41, 40].map((h, i) => (
                    <div key={i} className="w-6 bg-slate-100 rounded-t flex flex-col justify-end" style={{ height: '100%' }}>
                      <div 
                        className={`w-full rounded-t ${i === 9 ? 'bg-[#0056B8]' : 'bg-[#0056B8]/40'}`} 
                        style={{ height: `${h}%` }} 
                      />
                    </div>
                  ))}
                </div>

                <div className="flex justify-between text-[11px] font-body-unique text-slate-600">
                  <span>Target: 2.0°C - 8.0°C</span>
                  <span className="font-bold text-slate-900">Current: 4.5°C</span>
                </div>
              </div>
            </div>

            {/* Card 3: Operational Integrity & Alerts */}
            <div className="bg-slate-50/60 border border-slate-200/50 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all hover:shadow-sm">
              <div className="max-w-md flex flex-col items-start mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="w-10 h-10 rounded-xl bg-[#0056B8]/10 text-[#0056B8] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                  </span>
                  <div>
                    <h4 className="font-heading-unique font-bold text-slate-900 text-sm">Security & Compliance</h4>
                    <p className="text-[11px] text-slate-500 font-body-unique mt-0.5">Automated compliance certification</p>
                  </div>
                </div>

                <h3 className="font-heading-unique font-extrabold text-slate-900 text-xl sm:text-2xl leading-snug mb-4 tracking-tight">
                  Instant status alerts and automated delivery compliance
                </h3>
                <p className="font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed">
                  Never miss a deviation. Get instant alerts for excursions or delays, and download compliance logs for pharma or food safety regulations upon delivery.
                </p>
              </div>

              {/* Bottom Visual Mockup: Compliance badge & notification alert */}
              <div className="w-full space-y-3 relative select-none">
                {/* Alert Card Mockup */}
                <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 shadow-sm flex items-start gap-3">
                  <span className="w-8 h-8 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center shrink-0">
                    <AlertTriangle className="w-4.5 h-4.5" />
                  </span>
                  <div>
                    <span className="font-bold text-slate-800 text-[11px] block font-heading-unique">TEMPERATURE NOTICE</span>
                    <span className="text-[10px] text-slate-500 font-body-unique block mt-0.5">Reefer compartment 2 climbed to 7.8°C (near threshold).</span>
                  </div>
                </div>

                {/* Success Card Mockup */}
                <div className="bg-white border border-slate-200/60 rounded-xl p-3.5 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-500 flex items-center justify-center">
                      <FileText className="w-4.5 h-4.5" />
                    </span>
                    <div>
                      <span className="font-bold text-slate-800 text-[11px] block font-heading-unique">COMPLIANCE CERTIFICATE</span>
                      <span className="text-[10px] text-slate-400 font-body-unique block">SHA-256 Verified delivery proof</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#0056B8] hover:underline cursor-pointer font-body-unique">
                    Download
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  )
}
