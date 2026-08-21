import { ListFilter } from 'lucide-react'

export default function PlatformTemperature() {
  const logs = [
    { time: '01:14', text: 'Asset DRA-4821 temperature logged at +4.2°C', badge: 'Auto', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { time: '03:02', text: 'Asset DRA-4819 excursion alert (+8.5°C)', badge: 'Alert', badgeClass: 'bg-red-50 text-red-700 border-red-100' },
    { time: '03:03', text: 'Automated SMS & email notifications sent', badge: 'Auto', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { time: '06:45', text: 'Asset DRA-4819 stabilized to +3.8°C', badge: 'Auto', badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
    { time: '08:00', text: 'SHA-256 compliance report signed and locked', badge: 'Signed', badgeClass: 'bg-slate-50 text-slate-700 border-slate-100' }
  ]

  const bulletPoints = [
    {
      num: '1',
      title: '±0.1°C sensor precision',
      desc: 'Clinical-grade accuracy across all reefer compartments.'
    },
    {
      num: '2',
      title: 'Instant excursion alerts',
      desc: 'Push notifications the moment a threshold is breached.'
    },
    {
      num: '3',
      title: 'Tamper-proof compliance logs',
      desc: 'SHA-256 signed temperature records, downloadable on delivery.'
    }
  ]

  return (
    <section className="py-20 sm:py-28 bg-[#F8FAFC] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text & Features List */}
          <div className="lg:col-span-6 flex flex-col items-start text-left">
            <span className="text-[11px] font-bold tracking-widest text-[#0056B8] uppercase block mb-4">
              Temperature Intelligence
            </span>
            <h2 className="font-heading-unique font-bold text-slate-900 text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight mb-6">
              Real-time temperature monitoring, every 30 seconds.
            </h2>
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed mb-10">
              IoT sensors log temperature, humidity and door-open events continuously. Any excursion surfaces instantly — before cargo is compromised — with automated alerts sent to dispatchers and customers.
            </p>

            {/* Structured Numbered Highlights */}
            <div className="space-y-6 w-full">
              {bulletPoints.map((pt, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <span className="text-[#0056B8] font-heading-unique font-bold text-sm sm:text-base mt-0.5 select-none">
                    {pt.num}
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
              ))}
            </div>
          </div>

          {/* Right Column: High-Tech Activity Log Mockup */}
          <div className="lg:col-span-6 w-full flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-white rounded-2xl border border-slate-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-6 md:p-8 text-left select-none relative">
              
              {/* Card Header */}
              <div className="flex items-center justify-between pb-6 border-b border-slate-50 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#0056B8] block animate-pulse" />
                  <span className="font-heading-unique font-bold text-slate-800 text-sm tracking-tight">
                    Activity log
                  </span>
                </div>
                <button className="text-slate-400 hover:text-slate-600 transition-colors">
                  <ListFilter size={16} />
                </button>
              </div>

              {/* Log List */}
              <div className="space-y-5">
                {logs.map((log, idx) => (
                  <div key={idx} className="flex items-center justify-between gap-4 py-1">
                    <div className="flex items-start gap-4">
                      <span className="font-body-unique font-medium text-slate-400 text-xs mt-0.5">
                        {log.time}
                      </span>
                      <p className="font-body-unique text-slate-600 text-xs sm:text-sm leading-relaxed">
                        {log.text}
                      </p>
                    </div>
                    
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${log.badgeClass} select-none`}>
                      {log.badge}
                    </span>
                  </div>
                ))}
              </div>

              {/* Decorative side accent blur */}
              <div className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-slate-100/40 blur-3xl -z-10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
