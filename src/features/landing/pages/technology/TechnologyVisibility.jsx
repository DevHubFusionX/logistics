import { CheckCircle2, Clock, MapPin, Navigation, Package, Truck } from 'lucide-react'

export default function TechnologyVisibility() {
  const statusSteps = [
    { icon: Package,      label: 'Shipment Booked',    time: '08:14',  done: true },
    { icon: Truck,        label: 'Vehicle Assigned',   time: '08:31',  done: true },
    { icon: Navigation,   label: 'In Transit',         time: '09:05',  done: true, active: true },
    { icon: MapPin,       label: 'Approaching Dest.',  time: 'Est. 14:20', done: false },
    { icon: CheckCircle2, label: 'Delivered',          time: 'Est. 14:45', done: false },
  ]

  const points = [
    { icon: Navigation, title: 'Live GPS position', desc: 'Vehicle location updated every 15 seconds on a live map.' },
    { icon: Clock,      title: 'Real-time ETA',     desc: 'Dynamic arrival estimates recalculated as conditions change.' },
    { icon: Package,    title: 'End-to-end status', desc: 'Every milestone from booking to proof of delivery, visible in one timeline.' },
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] border-t border-slate-100 overflow-hidden text-left select-none">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

          {/* Left Column: Shipment Status Tracker Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-start order-last lg:order-first">
            <div className="w-full max-w-lg bg-white border border-slate-200/60 rounded-sm p-6 md:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.01)] text-left">
              
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Customer Portal</span>
                  <h4 className="font-heading-unique font-bold text-slate-900 text-sm">Shipment DRA-4821</h4>
                  <p className="font-body-unique text-slate-400 text-[10px] mt-0.5">Lagos → Abuja · Vaccines</p>
                </div>
                <span className="px-3 py-1 bg-[#0056B8]/5 text-[#0056B8] text-[10px] font-bold rounded-sm border border-blue-100/50">
                  In Transit
                </span>
              </div>

              {/* Status Timeline */}
              <div className="space-y-0 mb-6 pl-2">
                {statusSteps.map((step, idx) => {
                  const Icon = step.icon
                  return (
                    <div key={idx} className="flex items-start gap-4">
                      {/* Visual node and divider line */}
                      <div className="flex flex-col items-center">
                        <span className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 z-10 border ${
                          step.active ? 'bg-[#0056B8] border-[#0056B8] text-white shadow-sm shadow-blue-100' :
                          step.done   ? 'bg-emerald-50 border-emerald-100 text-emerald-600' :
                                        'bg-slate-50 border-slate-100 text-slate-300'
                        }`}>
                          <Icon size={14} />
                        </span>
                        {idx < statusSteps.length - 1 && (
                          <div className={`w-0.5 flex-1 my-1 ${step.done && !step.active ? 'bg-emerald-200' : 'bg-slate-100'}`} style={{ minHeight: '22px' }} />
                        )}
                      </div>
                      
                      {/* Timeline copy */}
                      <div className="pb-4">
                        <p className={`font-heading-unique text-xs sm:text-sm font-bold ${step.active ? 'text-[#0056B8]' : step.done ? 'text-slate-800' : 'text-slate-300'}`}>
                          {step.label}
                        </p>
                        <p className={`font-body-unique text-[9px] sm:text-[10px] mt-0.5 ${step.done ? 'text-slate-400' : 'text-slate-300'}`}>
                          {step.time}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Metric strip at the bottom */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
                {[
                  { label: 'Temperature', value: '4.2°C', color: 'text-emerald-600' },
                  { label: 'Calculated ETA', value: '14:45', color: 'text-slate-900' },
                  { label: 'Remaining Dist.', value: '142 km', color: 'text-slate-900' },
                ].map((m, idx) => (
                  <div key={idx} className="text-center">
                    <p className={`font-heading-unique font-bold text-sm sm:text-base ${m.color}`}>{m.value}</p>
                    <p className="font-body-unique text-[9px] text-slate-400 mt-0.5 uppercase tracking-wider">{m.label}</p>
                  </div>
                ))}
              </div>

            </div>
          </div>

          {/* Right Column: Copy & Highlights */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Shipment Visibility
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Full journey transparency, pickup to delivery.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Customers and operations teams see the same live picture — shipment status, GPS position, temperature reading and estimated arrival — updated continuously throughout the journey.
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

        </div>
      </div>
    </section>
  )
}
