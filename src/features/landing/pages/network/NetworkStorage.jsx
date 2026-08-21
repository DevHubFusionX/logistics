import { Activity, ShieldCheck, Thermometer } from 'lucide-react'

export default function NetworkStorage() {
  const hubs = [
    { name: 'Lagos Main Hub', zone: 'South-West Regional Depot', temp: '-22°C Frozen / +4°C Chilled', cap: '4,500 Pallets' },
    { name: 'Kano Distribution Center', zone: 'Northern Regional Hub', temp: '-20°C Frozen / +4°C Chilled', cap: '3,000 Pallets' },
    { name: 'Abuja Cross-Dock', zone: 'Central Transit Hub', temp: '+2°C to +8°C Chilled Only', cap: '1,500 Pallets' }
  ]

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Visual Mockup of Chamber Monitor */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-start order-last lg:order-first">
            <div className="w-full max-w-lg bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-8 text-left select-none relative shadow-[0_20px_50px_rgba(0,0,0,0.01)]">
              
              {/* Facility Title */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-200/60 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Regional Facility</span>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-base sm:text-lg">Lagos Main Hub — Chamber 02</h4>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded border border-emerald-100/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Connected
                </span>
              </div>

              {/* Sensor Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Temperature</span>
                  <span className="font-heading-unique font-bold text-slate-950 text-2xl sm:text-3xl block">-18.4°C</span>
                  <span className="text-[9px] font-medium text-emerald-600 mt-1 block">Normal Range</span>
                </div>
                
                <div className="bg-white p-4 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide block mb-1">Humidity</span>
                  <span className="font-heading-unique font-bold text-slate-950 text-2xl sm:text-3xl block">62.8%</span>
                  <span className="text-[9px] font-medium text-emerald-600 mt-1 block">Optimal</span>
                </div>
              </div>

              {/* Heartbeat log */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200/40">
                  <span className="text-slate-400 font-body-unique flex items-center gap-2"><Thermometer size={14} className="text-slate-400" /> Sensor Calibration</span>
                  <span className="text-slate-600 font-body-unique font-medium">Valid (WHO Grade)</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200/40">
                  <span className="text-slate-400 font-body-unique flex items-center gap-2"><Activity size={14} className="text-slate-400" /> Latest telemetry ping</span>
                  <span className="text-slate-600 font-body-unique font-medium">14s ago</span>
                </div>
                <div className="flex items-center justify-between text-xs py-2">
                  <span className="text-slate-400 font-body-unique flex items-center gap-2"><ShieldCheck size={14} className="text-slate-400" /> Power source</span>
                  <span className="text-slate-600 font-body-unique font-medium">Main Grid (Aux Generator Auto-Ready)</span>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Text & Storage Locations */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Cold Storage Infrastructure
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Regional warehouses, continuously monitored.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
              Store your bulk inventories, vaccines, and frozen food raw materials in our partner multi-chamber storage facilities. Supported with blast freezing capabilities, automatic power backup systems, and round-the-clock temperature logging.
            </p>

            <div className="w-full space-y-4">
              {hubs.map((hub, idx) => (
                <div key={idx} className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0">
                  <div>
                    <h5 className="font-heading-unique font-bold text-slate-900 text-sm sm:text-base">{hub.name}</h5>
                    <p className="font-body-unique text-slate-400 text-xs mt-0.5">{hub.zone}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-heading-unique font-bold text-[#0056B8] text-xs sm:text-sm block">{hub.cap}</span>
                    <span className="font-body-unique text-slate-500 text-[10px] sm:text-xs mt-0.5 block">{hub.temp}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
