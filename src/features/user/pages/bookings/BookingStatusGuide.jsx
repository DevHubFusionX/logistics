import { useState, memo } from 'react'
import { Link } from 'react-router-dom'
import {
  CheckCircle, Clock, Truck, AlertTriangle, XCircle,
  ThermometerSnowflake, Package, ChevronDown, ArrowRight,
  MessageCircle, Mail, Info
} from 'lucide-react'

const STATUSES = [
  {
    id: 'pending',
    label: 'Pending',
    meaning: 'Awaiting confirmation',
    description: 'Your booking has been received and is being reviewed by our team. We will confirm availability and assign a driver shortly.',
    action: 'No action needed. You will be notified once confirmed.',
    icon: Clock,
    dot: 'bg-amber-400',
    badge: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'confirmed',
    label: 'Confirmed',
    meaning: 'Driver assigned',
    description: 'Your booking is confirmed. A truck and driver have been assigned. You will receive driver details and an estimated pickup time.',
    action: 'Prepare your cargo for pickup at the scheduled time.',
    icon: CheckCircle,
    dot: 'bg-sky-500',
    badge: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'in_transit',
    label: 'In Transit',
    meaning: 'Delivery underway',
    description: 'Your shipment is on the move. The driver has picked up your cargo and is en route to the delivery location. Track in real-time.',
    action: 'Track your shipment in real-time. Prepare to receive delivery.',
    icon: Truck,
    dot: 'bg-emerald-500',
    badge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'temp_alert',
    label: 'Temp Alert',
    meaning: 'Temperature warning',
    description: 'A temperature deviation has been detected for your cold chain shipment. Our team is monitoring and taking corrective action.',
    action: 'We are handling this. You will be updated on resolution.',
    icon: ThermometerSnowflake,
    dot: 'bg-orange-400',
    badge: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  {
    id: 'delivered',
    label: 'Delivered',
    meaning: 'Successfully completed',
    description: 'Your shipment has been delivered. Proof of delivery has been captured and your invoice will be generated and sent to you.',
    action: 'Download your invoice and share feedback on your experience.',
    icon: Package,
    dot: 'bg-gray-400',
    badge: 'bg-gray-100 text-gray-600 border-gray-200',
  },
  {
    id: 'cancelled',
    label: 'Cancelled',
    meaning: 'Booking cancelled',
    description: 'This booking has been cancelled. If you cancelled, no charges apply. If cancelled by us, you will be notified of the reason.',
    action: 'Contact support if you have questions about the cancellation.',
    icon: XCircle,
    dot: 'bg-red-400',
    badge: 'bg-red-50 text-red-600 border-red-200',
  },
  {
    id: 'failed',
    label: 'Failed',
    meaning: 'Delivery unsuccessful',
    description: 'The delivery attempt was unsuccessful — this may be due to address issues, recipient unavailable, or other obstacles.',
    action: 'Contact support to reschedule or resolve the delivery issue.',
    icon: AlertTriangle,
    dot: 'bg-red-500',
    badge: 'bg-red-50 text-red-700 border-red-200',
  },
]

const TIMELINE = [
  { num: 1, label: 'Pending Review',  desc: 'Usually 15–30 minutes',                     dot: 'bg-amber-400',   active: true  },
  { num: 2, label: 'Confirmed',       desc: 'Driver assigned, ready for pickup',          dot: 'bg-sky-500',     active: false },
  { num: 3, label: 'In Transit',      desc: 'Delivery in progress, track in real-time',   dot: 'bg-emerald-500', active: false },
  { num: 4, label: 'Delivered',       desc: 'Shipment complete, invoice generated',       dot: 'bg-gray-400',    active: false },
]

export default memo(function BookingStatusGuide() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-xl text-gray-900">Booking Status Guide</h1>
            <p className="text-sm text-gray-400 mt-0.5">Understand what each status means and what to do next</p>
          </div>
          <Link
            to="/my-bookings"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors flex-shrink-0"
          >
            My Bookings <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* ── Info banner ── */}
        <div className="flex items-start gap-3 bg-sky-50 border border-sky-100 rounded-2xl px-5 py-4">
          <Info className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-sky-800">
            Every booking moves through stages from creation to delivery. Status updates are automatic — you'll receive notifications at each stage.
          </p>
        </div>

        {/* ── Status cards grid ── */}
        <div>
          <h2 className="font-heading font-bold text-sm text-gray-900 mb-3">All Statuses</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {STATUSES.map(s => {
              const Icon = s.icon
              return (
                <div
                  key={s.id}
                  onClick={() => setExpanded(prev => prev === s.id ? null : s.id)}
                  className={`bg-white rounded-2xl border p-4 cursor-pointer transition-all hover:shadow-sm ${
                    expanded === s.id ? 'border-sky-700 ring-2 ring-sky-100' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                    expanded === s.id ? 'bg-sky-700' : 'bg-gray-50'
                  }`}>
                    <Icon className={`w-4 h-4 ${expanded === s.id ? 'text-white' : 'text-gray-500'}`} />
                  </div>
                  <p className="text-sm font-heading font-bold text-gray-900 leading-tight">{s.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{s.meaning}</p>
                  <span className={`inline-block mt-2 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${s.badge}`}>
                    {s.label}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Detail accordion ── */}
        <div>
          <h2 className="font-heading font-bold text-sm text-gray-900 mb-3">Status Details</h2>
          <div className="space-y-2">
            {STATUSES.map(s => {
              const Icon = s.icon
              const open = expanded === s.id
              return (
                <div
                  key={s.id}
                  className={`bg-white rounded-2xl border transition-all ${open ? 'border-sky-200' : 'border-gray-100'}`}
                >
                  <button
                    onClick={() => setExpanded(prev => prev === s.id ? null : s.id)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left"
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${s.dot}`} />
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${open ? 'bg-sky-700' : 'bg-gray-50'}`}>
                        <Icon className={`w-4 h-4 ${open ? 'text-white' : 'text-gray-400'}`} />
                      </div>
                      <div>
                        <p className="text-sm font-heading font-bold text-gray-900">{s.label}</p>
                        <p className="text-xs text-gray-400">{s.meaning}</p>
                      </div>
                    </div>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 flex-shrink-0 ${open ? 'rotate-180' : ''}`} />
                  </button>

                  {open && (
                    <div className="px-5 pb-5 space-y-3">
                      <p className="text-sm text-gray-600 leading-relaxed">{s.description}</p>
                      <div className="bg-sky-50 rounded-xl p-3 border border-sky-100">
                        <p className="text-xs font-semibold text-sky-800 mb-1">What you should do</p>
                        <p className="text-xs text-sky-700 leading-relaxed">{s.action}</p>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <h2 className="font-heading font-bold text-sm text-gray-900 mb-1">Typical Booking Timeline</h2>
          <p className="text-xs text-gray-400 mb-5">From booking to delivery</p>
          <div className="flex items-start gap-0">
            {TIMELINE.map((step, i) => (
              <div key={step.num} className="flex-1 flex flex-col items-center text-center relative">
                {/* Connector line */}
                {i < TIMELINE.length - 1 && (
                  <div className="absolute top-4 left-1/2 w-full h-px bg-gray-200" />
                )}
                {/* Step circle */}
                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 mb-3 ${
                  step.active
                    ? 'bg-sky-700 border-sky-700'
                    : 'bg-white border-gray-200'
                }`}>
                  <span className={`text-xs font-black ${step.active ? 'text-white' : 'text-gray-400'}`}>{step.num}</span>
                </div>
                <div className="flex items-center gap-1 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full ${step.dot}`} />
                  <p className="text-xs font-semibold text-gray-800">{step.label}</p>
                </div>
                <p className="text-[10px] text-gray-400 leading-tight px-1">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Help ── */}
        <div className="bg-sky-800 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="font-heading font-bold text-white">Need help with your booking?</h3>
            <p className="text-sky-300 text-sm mt-1">Our support team is available 24/7 to assist you.</p>
          </div>
          <div className="flex items-center gap-3 flex-shrink-0">
            <Link
              to="/support"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white text-sky-800 text-sm font-semibold rounded-xl hover:bg-sky-50 transition-colors"
            >
              <MessageCircle className="w-4 h-4" /> Open ticket
            </Link>
            <a
              href="mailto:support@daralogistics.com"
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-sky-600 text-white text-sm font-semibold rounded-xl hover:bg-sky-700 transition-colors"
            >
              <Mail className="w-4 h-4" /> Email us
            </a>
          </div>
        </div>

      </div>
    </div>
  )
})
