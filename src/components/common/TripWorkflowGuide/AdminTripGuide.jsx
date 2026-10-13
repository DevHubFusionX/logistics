import { useState } from 'react'
import {
  ShieldAlert, Truck, Navigation, CheckCircle2,
  FileCode, Layers, Link2, AlertTriangle, Users,
  MapPin, Clock, ArrowRight, Terminal, Activity
} from 'lucide-react'

const ADMIN_PIPELINE = [
  {
    phase: 'Phase 1',
    title: 'Booking Triage & Validation',
    badge: 'Triage',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    icon: Layers,
    summary: 'Evaluate customer cargo requirements, temperature class, and route feasibility.',
    endpoints: ['GET /admin/bookings/', 'GET /bookings/users'],
    tasks: [
      'Inspect incoming requests in Bookings Management or Admin Trips.',
      'Verify destination accessibility, vehicle capacity (Van, 5-ton, 10-ton, Refrigerated).',
      'Confirm temperature setpoint (-18°C frozen, 2°C to 8°C chilled, ambient).',
      'Check payment settlement or credit terms status.'
    ]
  },
  {
    phase: 'Phase 2',
    title: 'Trip V2 Generation (POST /tripsV2/)',
    badge: 'Trip Creation',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    icon: Truck,
    summary: 'Bind the confirmed booking to an official Trip V2 dispatch dispatch record.',
    endpoints: ['POST /tripsV2/'],
    tasks: [
      'Click "+ New Trip" in Admin Trips or use the fast-dispatch modal.',
      'Select the Booking ID and specify origin GPS coordinates { lat, lng }.',
      'Optionally attach initial Driver ID if known in advance.',
      'System establishes the Trip V2 instance with initial status "pending".'
    ]
  },
  {
    phase: 'Phase 3',
    title: 'Driver & Fleet Allocation',
    badge: 'Assignment',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    icon: Users,
    summary: 'Assign or reassign an active driver and pre-cooled refrigerated vehicle.',
    endpoints: ['PATCH /tripsV2/assign/:id'],
    tasks: [
      'Select from available active drivers in the driver dropdown.',
      'Assigned driver receives immediate dispatch notification in the Driver App.',
      'System links driver profile and phone number to the customer-facing booking.',
      'Allows seamless driver reassignment at any point prior to trip start.'
    ]
  },
  {
    phase: 'Phase 4',
    title: 'Telematics & Live GPS Tracking',
    badge: 'Telemetry',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: Link2,
    summary: 'Configure live IoT telematics or GPS map tracking URL for the shipment.',
    endpoints: ['PATCH /tripsV2/tracking/:id'],
    tasks: [
      'Input the active GPS tracking link (e.g., IoT telematics URL, tracker link).',
      'Validated for safe HTTP/HTTPS format via getSafeTrackingUrl helper.',
      'Synchronizes instantly to the customer’s dashboard card and order details.',
      'Allows both admin and customer to trace precise coordinates in real-time.'
    ]
  },
  {
    phase: 'Phase 5',
    title: 'Driver App Lifecycle & Monitoring',
    badge: 'In Transit',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    icon: Activity,
    summary: 'Driver triggers start and completion; operations monitors active transit.',
    endpoints: ['PATCH /tripsV2/start/:id', 'PATCH /tripsV2/end/:id'],
    tasks: [
      'Driver taps "Start Trip" → Status automatically transitions to "in_transit".',
      'Monitor cold-chain sensor levels, waypoint progress, and route adherence.',
      'On arrival, driver taps "End Trip" and collects Proof of Delivery (POD).',
      'Status transitions to "delivered" / "completed" across all platform portals.'
    ]
  }
]

export default function AdminTripGuide() {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const currentPhase = ADMIN_PIPELINE[activePhaseIndex]
  const Icon = currentPhase.icon

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-2xl p-5 text-white relative overflow-hidden shadow-lg border border-indigo-900/40">
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-indigo-200 mb-3">
            <Terminal className="w-3.5 h-3.5 text-indigo-300" />
            <span>Admin & Dispatch Operations Guide</span>
          </div>
          <h3 className="text-xl font-bold tracking-tight">Trip V2 Operational Dispatch Pipeline</h3>
          <p className="text-sm text-slate-300 mt-1.5 max-w-2xl leading-relaxed">
            Standard operating procedure for creating, assigning, tracking, and completing cold-chain freight via the Trip V2 architecture.
          </p>
        </div>
        <div className="absolute -right-6 -bottom-6 w-44 h-44 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Status Lifecycle Map */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
        <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Trip V2 Status Progression Lifecycle</h4>
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span>Pending (Created)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200 text-indigo-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>Assigned (Driver paired)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span>In Transit (Driver started)</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 text-slate-300" />
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Delivered / Completed</span>
          </div>
          <div className="ml-auto text-[11px] text-slate-400 font-medium italic">
            * Or Cancelled if aborted prior to transit
          </div>
        </div>
      </div>

      {/* Phase Selection Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
        {ADMIN_PIPELINE.map((p, idx) => {
          const PhaseIcon = p.icon
          const isActive = idx === activePhaseIndex
          return (
            <button
              key={p.phase}
              onClick={() => setActivePhaseIndex(idx)}
              className={`p-3 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between cursor-pointer ${
                isActive
                  ? 'bg-indigo-50/90 border-indigo-500 ring-2 ring-indigo-500/20 shadow-sm'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              }`}
            >
              <div className="flex items-center justify-between w-full mb-2">
                <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                  isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-500'
                }`}>
                  {p.phase}
                </span>
                <PhaseIcon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
              </div>
              <p className={`text-xs font-bold line-clamp-1 ${isActive ? 'text-indigo-950' : 'text-slate-700'}`}>
                {p.title}
              </p>
            </button>
          )
        })}
      </div>

      {/* Active Phase Deep Dive */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-indigo-600 text-white shadow-sm">
              <Icon className="w-6 h-6" />
            </div>
            <div>
              <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentPhase.badgeColor}`}>
                {currentPhase.badge}
              </span>
              <h4 className="text-lg font-bold text-slate-900 mt-1">{currentPhase.title}</h4>
            </div>
          </div>
          <div className="sm:text-right">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Target Endpoints</p>
            <div className="flex flex-wrap sm:justify-end gap-1.5">
              {currentPhase.endpoints.map(ep => (
                <span key={ep} className="font-mono text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                  {ep}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Phase Details & Best Practices */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
          <div className="lg:col-span-7 space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-400">Dispatcher Operations Protocol</h5>
            <ul className="space-y-2.5">
              {currentPhase.tasks.map((task, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                  <span>{task}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-5 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-xl p-4 border border-slate-200 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operational Safety & Compliance</span>
              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5 shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-indigo-950">
                  <Activity className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Real-time Sync Rule</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  The moment driver or telematics tracking link updates are saved in Admin Trips, the customer’s user dashboard inherits the enriched status instantaneously.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1.5 shadow-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-900">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Exception Handling</span>
                </div>
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  If an emergency requires reassigning the driver or rerouting, update via <code className="bg-slate-100 px-1 py-0.5 rounded text-[10px]">PATCH /tripsV2/assign/:id</code> without canceling the customer booking.
                </p>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs">
              <span className="text-slate-500">Next Phase:</span>
              <button
                onClick={() => setActivePhaseIndex(prev => (prev + 1) % ADMIN_PIPELINE.length)}
                className="inline-flex items-center gap-1 font-bold text-indigo-700 hover:text-indigo-800"
              >
                <span>{ADMIN_PIPELINE[(activePhaseIndex + 1) % ADMIN_PIPELINE.length].phase}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Ops Links / Tips */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Link2 className="w-3.5 h-3.5 text-blue-600" />
            <span>Validating Telematics URLs</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Ensure GPS tracker links begin with <span className="font-mono text-[10px]">https://</span> to allow secured iframe/in-app opening for customers.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <Users className="w-3.5 h-3.5 text-indigo-600" />
            <span>Driver App Synchronization</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Drivers must execute <span className="font-mono text-[10px]">/tripsV2/start</span> when leaving departure hubs to trigger accurate ETA calculations.
          </p>
        </div>

        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-slate-900">
            <FileCode className="w-3.5 h-3.5 text-emerald-600" />
            <span>Audit Trail & Proof of Delivery</span>
          </div>
          <p className="text-slate-500 leading-relaxed">
            Digital signatures and receiver name timestamps are retained for HACCP and NAFDAC cold-chain compliance audits.
          </p>
        </div>
      </div>
    </div>
  )
}
