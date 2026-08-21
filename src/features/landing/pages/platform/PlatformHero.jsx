import { Link } from 'react-router-dom'
import {
  Truck, Thermometer, MapPin, BarChart2,
  Bell, CheckCircle2, AlertTriangle, Clock
} from 'lucide-react'

const TempIcon = Thermometer
const TruckIcon = Truck
const ChartIcon = BarChart2
const PinIcon = MapPin

const kpis = [
  { label: 'Active Shipments', value: '1,284', sub: '+12% this week' },
  { label: 'Fleet Utilisation', value: '91%', sub: '48 of 53 trucks' },
  { label: 'On-Time Rate', value: '98.4%', sub: 'Last 30 days' },
  { label: 'Temp Compliance', value: '99.1%', sub: 'No breaches today' },
]

const shipments = [
  { id: 'SHP-4821', route: 'Lagos → Abuja', temp: '-18°C', status: 'In Transit', ok: true },
  { id: 'SHP-4820', route: 'Kano → Port Harcourt', temp: '2°C', status: 'Delivered', ok: true },
  { id: 'SHP-4819', route: 'Ibadan → Enugu', temp: '-20°C', status: 'Alert', ok: false },
]

const bars = [55, 60, 58, 52, 62, 65, 60, 58, 63, 61, 59, 64]
const months = ['J','F','M','A','M','J','J','A','S','O','N','D']


export default function PlatformHero({ onBookDemo }) {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden bg-[#0056B8]">
      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-white/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-white/5 blur-[100px] pointer-events-none" />

      {/* Dot grid */}
      <div
        className="absolute inset-0 z-0 opacity-20 pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.08) 1.2px, transparent 1.2px)', backgroundSize: '32px 32px' }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

        {/* ── Top row: Heading + Description ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pb-16">
          
          {/* Left col: Title and CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start pt-6">
            {/* Brand Title */}
            <div className="font-heading-unique font-extrabold text-white leading-none tracking-tight text-[56px] sm:text-[72px] lg:text-[84px] uppercase mb-1">
              DaraOS
            </div>
            <div className="font-heading-unique text-white/55 text-[26px] sm:text-[32px] lg:text-[36px] font-medium leading-none mb-8 tracking-tight">
              by Darafort
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3.5 w-full max-w-md">
              <button
                onClick={onBookDemo}
                className="font-body-unique px-8 py-3.5 bg-white text-[#0056B8] hover:bg-blue-50 hover:scale-[1.02] active:scale-[0.98] font-bold rounded-xl text-sm transition-all shadow-lg cursor-pointer text-center"
              >
                Book a Demo
              </button>
              <Link
                to="/technology"
                className="font-body-unique px-8 py-3.5 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-all border border-white/20 cursor-pointer text-center"
              >
                See how it works
              </Link>
            </div>
          </div>

          {/* Right col: Description */}
          <div className="lg:col-span-5 flex flex-col justify-start lg:pt-20">
            <p className="font-body-unique text-white text-[18px] sm:text-[21px] leading-snug tracking-tight font-semibold">
              The truth about your cold chain is already here. DaraOS connects shipments, telemetry, and operations —
            </p>
            <p className="font-body-unique text-white/70 text-[18px] sm:text-[21px] leading-snug tracking-tight font-medium mt-2">
              giving your team complete visibility and control from a single platform.
            </p>
          </div>

        </div>

        {/* ── Bottom row: Centered Dashboard Mockup ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="lg:col-span-10 lg:col-start-2 relative select-none lg:-mt-12 lg:translate-y-4">
            <div className="rounded-2xl border border-white/10 bg-white overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.12)]">

              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-200 bg-slate-50">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                  <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
                </div>
                <span className="text-[11px] font-semibold text-slate-500 tracking-wide">DaraOS — Operations Dashboard</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                  <span className="text-[10px] text-slate-500 font-medium">Live</span>
                </div>
              </div>

              <div className="p-4 grid grid-cols-12 gap-3 bg-slate-50/40">

                {/* KPI row */}
                <div className="col-span-12 grid grid-cols-4 gap-3">
                  {kpis.map((k, i) => (
                    <div key={i} className="border border-slate-200 rounded-xl p-3 bg-white flex flex-col gap-1 hover:border-slate-300 transition-all">
                      <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider leading-tight">{k.label}</span>
                      <span className="text-base font-bold text-slate-800 leading-tight">{k.value}</span>
                      <span className="text-[9px] text-slate-400 leading-tight">{k.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Shipments list */}
                <div className="col-span-7 border border-slate-200 rounded-xl bg-white overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2.5 border-b border-slate-100 bg-slate-50">
                    <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                      <TruckIcon size={11} className="text-slate-400" /> Active Shipments
                    </span>
                    <span className="text-[9px] text-[#0056B8] font-semibold cursor-pointer hover:text-[#004aad]">View all →</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {shipments.map((s, i) => (
                      <div key={i} className="flex items-center justify-between px-4 py-2.5 hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${s.ok ? 'bg-blue-50' : 'bg-red-50'}`}>
                            <TruckIcon size={11} className={s.ok ? 'text-[#0056B8]' : 'text-red-400'} />
                          </div>
                          <div>
                            <p className="text-[11px] font-bold text-slate-700">{s.id}</p>
                            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                              <PinIcon size={8} /> {s.route}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-slate-500 flex items-center gap-1">
                            <TempIcon size={9} /> {s.temp}
                          </span>
                          <span className={`text-[10px] font-bold ${
                            s.status === 'Delivered' ? 'text-green-600' :
                            s.status === 'Alert'     ? 'text-red-500' :
                            'text-[#0056B8]'
                          }`}>{s.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right col: chart + alerts */}
                <div className="col-span-5 flex flex-col gap-3">

                  {/* Bar chart */}
                  <div className="border border-slate-200 rounded-xl p-3.5 bg-white flex-1 flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                        <ChartIcon size={11} className="text-slate-400" /> Trip Volume
                      </span>
                      <span className="text-[9px] text-slate-400">2024</span>
                    </div>
                    <div className="flex items-end gap-0.5 h-12">
                      {bars.map((h, i) => (
                        <div key={i} className="flex-1 rounded-t bg-[#0056B8]/20 border border-[#0056B8]/25" style={{ height: `${h}%` }} />
                      ))}
                    </div>
                    <div className="flex">
                      {months.map((m, i) => (
                        <span key={i} className="flex-1 text-center text-[7px] text-slate-300 font-medium">{m}</span>
                      ))}
                    </div>
                  </div>

                  {/* Alert: temp excursion */}
                  <div className="border border-red-100 rounded-xl p-3 bg-red-50/60 flex items-start gap-2">
                    <div className="w-6 h-6 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                      <AlertTriangle size={11} className="text-red-500" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-red-700">Temp Excursion</p>
                      <p className="text-[10px] text-red-500 leading-tight mt-0.5">SHP-4819 exceeded –18°C threshold</p>
                    </div>
                  </div>

                  {/* Alert: ETA */}
                  <div className="border border-slate-200 rounded-xl p-3 bg-white flex items-start gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                      <Clock size={11} className="text-[#0056B8]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-700">ETA Updated</p>
                      <p className="text-[10px] text-slate-400 leading-tight mt-0.5">SHP-4821 arrives in 2h 14m</p>
                    </div>
                  </div>

                </div>

                {/* Status bar */}
                <div className="col-span-12 border border-slate-200 rounded-xl px-4 py-2.5 bg-white flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={12} className="text-green-500" />
                    <span className="text-[10px] font-semibold text-slate-600">All systems operational</span>
                  </div>
                  <div className="flex items-center gap-4">
                    {[
                      { dot: 'bg-green-400', label: '48 active' },
                      { dot: 'bg-blue-400',  label: '12 loading' },
                      { dot: 'bg-slate-300', label: '3 repair' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.dot}`} />
                        <span className="text-[10px] text-slate-400 font-medium">{item.label}</span>
                      </div>
                    ))}
                  </div>
                  <Bell size={11} className="text-slate-300" />
                </div>

              </div>
            </div>
          </div>

        </div>


      </div>
    </section>
  )
}
