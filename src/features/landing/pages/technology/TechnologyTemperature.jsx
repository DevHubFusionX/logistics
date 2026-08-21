import { AlertTriangle, Bell, CheckCircle2, Thermometer } from 'lucide-react'

export default function TechnologyTemperature() {
  const readings = [
    { id: 'DRA-4821', cargo: 'Vaccines', temp: '4.2°C', range: '2–8°C', ok: true },
    { id: 'DRA-4819', cargo: 'Frozen Fish', temp: '7.8°C', range: '2–8°C', ok: false },
    { id: 'DRA-4815', cargo: 'Fresh Produce', temp: '3.1°C', range: '1–6°C', ok: true },
  ]

  const points = [
    { icon: Thermometer, title: '±0.1°C sensor precision', desc: 'Clinical-grade accuracy across all reefer compartments.' },
    { icon: Bell, title: 'Instant excursion alerts', desc: 'Push notifications the moment a threshold is breached.' },
    { icon: CheckCircle2, title: 'Tamper-proof compliance logs', desc: 'SHA-256 signed temperature records, downloadable on delivery.' },
  ]

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden text-left select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Copy & Highlights */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Temperature Intelligence
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Real-time temperature monitoring, every 30 seconds.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              IoT sensors log temperature, humidity and door-open events continuously. Any excursion surfaces instantly — before cargo is compromised — with automated alerts sent to dispatchers and customers.
            </p>

            <div className="space-y-5 w-full">
              {points.map((pt, idx) => {
                const Icon = pt.icon
                return (
                  <div key={idx} className="flex items-start gap-4">
                    <span className="w-8 h-8 rounded-sm bg-blue-50 text-[#0056B8] flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="font-heading-unique font-bold text-slate-900 text-sm sm:text-base">
                        {pt.title}
                      </h4>
                      <p className="font-body-unique text-slate-500 text-xs sm:text-sm mt-1 leading-relaxed">
                        {pt.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Right Column: Light-Themed Temperature Monitor Dashboard */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-slate-50 border border-slate-200/60 rounded-sm p-6 md:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.01)] text-left">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-5">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Telematics Feed</span>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-sm">IoT Temperature Monitor</h4>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-100/50">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" /> Live
                </span>
              </div>

              {/* Temperature Graph card */}
              <div className="bg-white border border-slate-200/60 rounded-sm p-4 mb-4">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-slate-400 font-body-unique">Asset: DRA-4821 · Zone 1</span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded-sm">4.2°C</span>
                </div>
                
                {/* SVG Graph */}
                <div className="flex items-end gap-1 h-14 mb-2">
                  {[48, 54, 52, 58, 55, 52, 56, 54, 52, 55, 53, 56, 52, 58, 54, 56, 52, 54].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-sm"
                      style={{
                        height: `${h}%`,
                        backgroundColor: i === 17 ? '#0056B8' : '#E2E8F0'
                      }}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-[9px] text-slate-400 font-body-unique pt-1 border-t border-slate-100">
                  <span>Min: 2.0°C</span>
                  <span className="text-slate-500">Target Range: 2°C – 8°C</span>
                  <span>Max: 8.0°C</span>
                </div>
              </div>

              {/* Readings list */}
              <div className="space-y-2 mb-4">
                {readings.map((r, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/60 rounded-sm px-4 py-2.5 flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-bold text-slate-800 font-heading-unique">{r.id} · {r.cargo}</p>
                      <p className="text-[9px] text-slate-400 font-body-unique mt-0.5">Range: {r.range}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold font-body-unique ${r.ok ? 'text-emerald-600' : 'text-amber-600'}`}>
                        {r.temp}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${r.ok ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                    </div>
                  </div>
                ))}
              </div>

              {/* Warning box */}
              <div className="bg-amber-50 border border-amber-200/80 rounded-sm p-3.5 flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-amber-800 font-heading-unique uppercase">Excursion Warning</p>
                  <p className="text-[9px] text-slate-500 mt-0.5 font-body-unique leading-relaxed">
                    DRA-4819 approaching threshold (7.8°C). Automated notification dispatched to carrier.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
