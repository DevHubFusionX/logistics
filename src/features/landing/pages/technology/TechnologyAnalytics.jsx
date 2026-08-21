import { BarChart3, Clock, TrendingUp, Thermometer, Truck } from 'lucide-react'

export default function TechnologyAnalytics() {
  const metrics = [
    { label: 'On-Time Rate', value: '96%', delta: '+4%', isGreen: true },
    { label: 'Temp Excursions', value: '1.2%', delta: '-0.8%', isGreen: true },
    { label: 'Fleet Utilisation', value: '83%', delta: '+11%', isGreen: true },
    { label: 'Avg Transit Time', value: '6.4h', delta: '-0.5h', isGreen: true }
  ]

  const bars = [42, 58, 48, 65, 54, 70, 62, 78, 68, 85, 76, 92]
  const months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']

  const points = [
    { icon: TrendingUp, title: 'Trip Intelligence', desc: 'Continuous route optimization, transit delay analysis and fuel audits.' },
    { icon: Truck, title: 'Fleet Utilisation', desc: 'Real-time asset tracking, predictive maintenance alerts and driver dispatch matching.' },
    { icon: Clock, title: 'Delivery Performance', desc: 'Historical on-time metrics, warehouse wait times, and shipper SLA compliance.' }
  ]

  return (
    <section className="py-20 sm:py-28 bg-white border-t border-slate-100 overflow-hidden text-left select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Copy & Highlights */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Analytics
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Operational intelligence across every dimension.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Trip, fleet, delivery and temperature data — surfaced automatically so your team acts on insight, not guesswork.
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

          {/* Right Column: Light-Themed Dashboard & Charts Panel Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-slate-50 border border-slate-200/60 rounded-sm p-6 md:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.01)] text-left">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/60 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Dashboard Summary</span>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-sm">DaraOS Insights & Analytics</h4>
                </div>
                <span className="flex items-center gap-1.5 text-[10px] text-[#0056B8] font-bold bg-blue-50 px-2 py-0.5 rounded-sm border border-blue-100/50">
                  Monthly View
                </span>
              </div>

              {/* KPI Cards Row */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                {metrics.map((m, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/60 rounded-sm p-3.5">
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wide block mb-1">
                      {m.label}
                    </span>
                    <span className="font-heading-unique font-bold text-slate-900 text-xl block">
                      {m.value}
                    </span>
                    <span className="text-[9px] font-medium text-emerald-600 mt-1 block">
                      {m.delta} vs last month
                    </span>
                  </div>
                ))}
              </div>

              {/* Monthly Trip Volume Bar Chart */}
              <div className="bg-white border border-slate-200/60 rounded-sm p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BarChart3 size={14} className="text-[#0056B8]" />
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Trip Volume</span>
                  </div>
                  <span className="text-[8px] text-slate-400 font-body-unique">12-Month Trend</span>
                </div>

                {/* SVG Bar Chart Columns */}
                <div className="flex items-end gap-2.5 h-20 mb-2">
                  {bars.map((h, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center">
                      <div 
                        className="w-full rounded-t-sm transition-all hover:opacity-80" 
                        style={{ 
                          height: `${h}%`, 
                          backgroundColor: idx === 11 ? '#0056B8' : '#E2E8F0' 
                        }}
                      />
                    </div>
                  ))}
                </div>
                
                {/* Horizontal Month Labels */}
                <div className="flex justify-between border-t border-slate-100 pt-1">
                  {months.map((m, idx) => (
                    <span 
                      key={idx} 
                      className={`text-[8px] font-bold font-body-unique ${idx === 11 ? 'text-[#0056B8]' : 'text-slate-400'}`}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
