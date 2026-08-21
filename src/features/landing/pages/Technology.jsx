import SEO from '@/components/common/SEO'
import { Wifi, Navigation, Activity, Database, Eye, BarChart2, Plug, AlertTriangle, ShieldCheck } from 'lucide-react'

export default function Technology() {
  return (
    <>
      <SEO
        title="DaraOS Technology Architecture — Cold-Chain Logistics"
        description="Explore the technology driving DaraOS. From IoT sensor integrations to fleet orchestration and geofenced routing, discover how we build modern cold chains."
        keywords="cold chain tech, IoT logistics, cargo monitoring, temperature routing, DaraOS architecture"
        canonical="/technology"
      />

      <div className="bg-white min-h-screen text-left">
        
        {/* 1. Hero Section */}
        <section className="pt-32 pb-20 bg-slate-50/50 relative overflow-hidden">
          <div className="absolute inset-0 z-0 opacity-[0.1] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
              backgroundSize: '24px 24px',
            }}
          />
          <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">
              Our Stack
            </span>
            <h1 className="font-heading-unique font-extrabold text-slate-900 leading-[1.1] tracking-tight mb-6 text-4xl sm:text-6xl max-w-4xl">
              Technology built for the complexity of cold-chain logistics
            </h1>
            <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed max-w-xl">
              DaraOS is an enterprise-grade orchestration and telemetry platform engineered to eliminate risk across Africa's temperature-sensitive supply chains.
            </p>
          </div>
        </section>

        {/* 2. Problem Section */}
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="max-w-3xl mb-16">
              <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">
                The Challenge
              </span>
              <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-[40px] leading-tight tracking-tight">
                Why traditional supply chain software fails cold storage
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: 'Fragmented Capacity',
                  desc: 'Uncoordinated reefer operators lead to high search costs and underutilized cold space.',
                },
                {
                  title: 'Limited Visibility',
                  desc: 'Traditional GPS systems trace vehicles but ignore environment health and cargo temperature.',
                },
                {
                  title: 'Temperature Risk',
                  desc: 'Without continuous IoT logging, temperature excursions go unnoticed until arrival, causing spoilage.',
                },
                {
                  title: 'Manual Coordination',
                  desc: 'Relying on calls, paper waybills, and offline loggers creates high operational overhead.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="p-6 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between">
                  <div>
                    <h3 className="font-heading-unique font-bold text-slate-900 text-base mb-3">{title}</h3>
                    <p className="font-body-unique text-slate-550 text-xs leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. DaraOS System Architecture */}
        <section className="py-24 bg-slate-50/50 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-5 flex flex-col items-start">
                <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">
                  Orchestration Layer
                </span>
                <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-[40px] leading-tight tracking-tight mb-6">
                  Software that actively safeguards cargo
                </h2>
                <p className="font-body-unique text-slate-500 text-sm leading-relaxed mb-8">
                  DaraOS coordinates and digitizes every segment of your cold chain. Our software connects order requests, routes vehicles based on geofences, monitors telemetry, and publishes compliance audits automatically.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Wifi, label: 'IoT Telemetry Integration' },
                    { icon: Navigation, label: 'Dynamic GPS Geofences' },
                    { icon: ShieldCheck, label: 'Compliant Ledger Archiving' }
                  ].map(({ icon: Icon, label }) => (
                    <div key={label} className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-lg bg-[#0056B8]/10 text-[#0056B8] flex items-center justify-center">
                        <Icon className="w-4 h-4" />
                      </span>
                      <span className="font-heading-unique font-bold text-slate-800 text-xs sm:text-sm">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Mockup Graphic */}
              <div className="lg:col-span-7 bg-slate-900 rounded-3xl p-8 border border-slate-800 shadow-xl relative overflow-hidden select-none">
                <span className="absolute top-6 left-6 text-[10px] font-bold tracking-widest text-slate-450 uppercase">DaraOS Core Engine</span>
                
                <div className="space-y-6 pt-10">
                  {/* Layer 1 */}
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-heading-unique font-bold text-slate-200 text-xs">Capacity Router</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Matching fleet setpoints with pharma bounds</p>
                    </div>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-900">Active</span>
                  </div>

                  {/* Layer 2 */}
                  <div className="bg-[#0056B8]/10 border border-[#0056B8]/30 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-heading-unique font-bold text-slate-200 text-xs">IoT Ingestion Pipeline</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">Continuous telemetry logs (30s intervals)</p>
                    </div>
                    <span className="text-[10px] text-blue-400 font-bold bg-[#0056B8]/20 px-2 py-0.5 rounded border border-blue-900">Processing</span>
                  </div>

                  {/* Layer 3 */}
                  <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <h4 className="font-heading-unique font-bold text-slate-200 text-xs">Security & Compliance Ledger</h4>
                      <p className="text-[10px] text-slate-400 mt-0.5">SHA-256 digital signature hashes</p>
                    </div>
                    <span className="text-[10px] text-indigo-400 font-bold bg-indigo-950/40 px-2 py-0.5 rounded border border-indigo-900">Synced</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* 4. Fleet Intelligence Dashboard */}
        <section className="py-24 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left visual: Interactive Dashboard Mockup */}
              <div className="bg-slate-50 border border-slate-200/60 p-6 rounded-2xl shadow-sm relative select-none">
                <div className="flex justify-between items-center border-b border-slate-200/50 pb-4 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="font-heading-unique font-bold text-slate-800 text-xs">Connected Reefer #12</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-body-unique">Live Coordinates</span>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white border border-slate-150 p-3.5 rounded-xl shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-body-unique">GPS Position</span>
                    <span className="text-slate-800 font-mono font-bold text-xs sm:text-sm mt-0.5 block">6.5244° N, 3.3792° E</span>
                  </div>
                  <div className="bg-white border border-slate-150 p-3.5 rounded-xl shadow-sm">
                    <span className="text-[10px] text-slate-400 block font-body-unique">Speed / Direction</span>
                    <span className="text-slate-800 font-bold text-xs sm:text-sm mt-0.5 block">58 km/h | Heading N</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-150 p-4 rounded-xl shadow-sm">
                  <span className="text-[10px] text-slate-450 block font-body-unique mb-2">Real-time Excursion Monitor</span>
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-750 font-body-unique">Compartment Temp</span>
                    <span className="text-sm font-extrabold text-emerald-500 font-heading-unique">3.8°C (Optimal)</span>
                  </div>
                </div>
              </div>

              {/* Right: Fleet intelligence description */}
              <div className="flex flex-col items-start">
                <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-3">
                  Fleet Intelligence
                </span>
                <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-[40px] leading-tight tracking-tight mb-6">
                  Continuous location tracking and availability mapping
                </h2>
                <p className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed">
                  Our system logs vehicle location every 15 seconds. Geographic corridors and geofencing triggers alert dispatchers instantly if a driver departs from the optimized travel corridor, preventing delays and saving fuel.
                </p>
              </div>

            </div>
          </div>
        </section>

      </div>
    </>
  )
}
