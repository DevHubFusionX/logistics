import { useState } from 'react'
import {
  Search, MapPin, Package, Truck, CheckCircle,
  Clock, AlertCircle, ArrowRight, User, Phone,
  Calendar, RefreshCw, Loader2
} from 'lucide-react'
import { useTrackingQuery } from '../../hooks/queries/useTrackingQueries'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const STATUS_CONFIG = {
  pending:    { label: 'Pending',    pill: 'bg-amber-50 text-amber-700 border-amber-200'   },
  confirmed:  { label: 'Confirmed',  pill: 'bg-sky-50 text-sky-700 border-sky-200'         },
  processing: { label: 'Processing', pill: 'bg-sky-50 text-sky-700 border-sky-200'         },
  in_transit: { label: 'In Transit', pill: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  delivered:  { label: 'Delivered',  pill: 'bg-gray-100 text-gray-600 border-gray-200'     },
  cancelled:  { label: 'Cancelled',  pill: 'bg-red-50 text-red-600 border-red-200'         },
}

function InfoTile({ icon: Icon, label, value }) {
  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-1">
        <Icon className="w-3.5 h-3.5 text-sky-700" />
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{label}</p>
      </div>
      <p className="text-sm font-semibold text-gray-900">{value || '—'}</p>
    </div>
  )
}

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState('')
  const [searchId, setSearchId]     = useState('')

  const { data: shipment, isLoading, error, refetch } = useTrackingQuery(searchId, {
    enabled: !!searchId
  })

  const handleTrack = (e) => {
    e.preventDefault()
    const id = trackingId.trim()
    if (!id) { toast.error('Please enter a tracking ID'); return }
    if (id === searchId) { refetch(); return }
    setSearchId(id)
  }

  const sc = STATUS_CONFIG[shipment?.status] || STATUS_CONFIG.pending

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* ── Hero search ── */}
        <div className="bg-sky-800 rounded-2xl px-6 py-8 text-center">
          <p className="text-sky-300 text-xs font-semibold uppercase tracking-widest mb-2">Real-time tracking</p>
          <h1 className="font-heading font-black text-2xl text-white mb-1">Track your shipment</h1>
          <p className="text-sky-300 text-sm mb-6">Enter your booking ID or tracking number</p>

          <form onSubmit={handleTrack} className="flex gap-2 max-w-lg mx-auto">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={trackingId}
                onChange={e => setTrackingId(e.target.value)}
                placeholder="e.g. BK-1234567890"
                className="w-full pl-10 pr-4 py-3 bg-white rounded-xl text-sm font-medium text-gray-900 outline-none focus:ring-2 focus:ring-sky-300 placeholder:text-gray-400"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-3 bg-white text-sky-800 text-sm font-bold rounded-xl hover:bg-sky-50 transition-colors disabled:opacity-60 flex items-center gap-2 flex-shrink-0"
            >
              {isLoading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <Search className="w-4 h-4" />
              }
              {isLoading ? 'Tracking…' : 'Track'}
            </button>
          </form>
        </div>

        {/* ── Error ── */}
        {error && (
          <div className="flex items-start gap-3 bg-red-50 border border-red-100 rounded-2xl px-5 py-4">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-red-800">Shipment not found</p>
              <p className="text-xs text-red-600 mt-0.5">{error.message || 'Check your tracking ID and try again.'}</p>
            </div>
          </div>
        )}

        {/* ── Loading skeleton ── */}
        {isLoading && (
          <div className="space-y-4">
            <div className="h-24 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            <div className="h-40 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            <div className="h-32 bg-white rounded-2xl border border-gray-100 animate-pulse" />
          </div>
        )}

        {/* ── Result ── */}
        {shipment && !isLoading && (
          <div className="space-y-4">

            {/* Status header */}
            <div className="bg-white rounded-2xl border border-gray-100 px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Tracking ID</p>
                <p className="font-mono font-bold text-gray-900">{shipment.id}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full border ${sc.pill}`}>
                  {sc.label}
                </span>
                <button
                  onClick={() => refetch()}
                  className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
                  title="Refresh"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Route */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-heading font-bold text-sm text-gray-900 mb-4">Route</h2>
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">From</p>
                  <p className="text-sm font-bold text-gray-900">{shipment.origin}</p>
                </div>
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-sky-700" />
                  <div className="w-16 h-px bg-gray-300 relative">
                    <Truck className="w-4 h-4 text-sky-700 absolute -top-2 left-1/2 -translate-x-1/2 bg-white" />
                  </div>
                  <div className="w-2 h-2 rounded-full border-2 border-sky-700" />
                </div>
                <div className="flex-1 bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">To</p>
                  <p className="text-sm font-bold text-gray-900">{shipment.destination}</p>
                </div>
              </div>

              {shipment.currentLocation && shipment.currentLocation !== 'Tracking will be available once driver is assigned' && (
                <div className="mt-3 flex items-center gap-2 px-4 py-2.5 bg-sky-50 rounded-xl border border-sky-100">
                  <MapPin className="w-3.5 h-3.5 text-sky-700 flex-shrink-0" />
                  <p className="text-xs font-semibold text-sky-800">Current location: {shipment.currentLocation}</p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-heading font-bold text-sm text-gray-900 mb-5">Shipment timeline</h2>
              <div className="space-y-0">
                {shipment.timeline.map((event, i) => {
                  const isLast    = i === shipment.timeline.length - 1
                  const isCurrent = !event.completed && shipment.timeline[i - 1]?.completed
                  return (
                    <div key={i} className="flex gap-4">
                      {/* Dot + line */}
                      <div className="flex flex-col items-center flex-shrink-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center z-10 ${
                          event.completed ? 'bg-sky-700' :
                          isCurrent       ? 'bg-white border-2 border-sky-700' :
                                            'bg-gray-100'
                        }`}>
                          {event.completed
                            ? <CheckCircle className="w-4 h-4 text-white" />
                            : isCurrent
                              ? <Clock className="w-4 h-4 text-sky-700" />
                              : <Clock className="w-4 h-4 text-gray-300" />
                          }
                        </div>
                        {!isLast && (
                          <div className={`w-px flex-1 my-1 ${event.completed ? 'bg-sky-200' : 'bg-gray-100'}`}
                            style={{ minHeight: 24 }}
                          />
                        )}
                      </div>
                      {/* Content */}
                      <div className="pb-5 flex-1 min-w-0">
                        <p className={`text-sm font-semibold ${event.completed || isCurrent ? 'text-gray-900' : 'text-gray-400'}`}>
                          {event.status}
                        </p>
                        <p className={`text-xs mt-0.5 ${event.completed ? 'text-gray-500' : 'text-gray-300'}`}>
                          {event.date !== 'Pending' ? event.date : 'Pending'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Shipment details */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5">
              <h2 className="font-heading font-bold text-sm text-gray-900 mb-4">Shipment details</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <InfoTile icon={Calendar} label="Est. delivery" value={shipment.estimatedDelivery} />
                <InfoTile icon={Truck}    label="Driver"        value={shipment.driver !== 'Not assigned' ? shipment.driver : null} />
                <InfoTile icon={Package}  label="Vehicle"       value={shipment.vehicle !== 'Not assigned' ? shipment.vehicle : null} />
              </div>
            </div>

            {/* Help */}
            <div className="bg-sky-800 rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-white">Need help with this shipment?</p>
                <p className="text-xs text-sky-300 mt-0.5">Our support team is available 24/7</p>
              </div>
              <Link
                to="/support"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-sky-800 text-xs font-bold rounded-xl hover:bg-sky-50 transition-colors flex-shrink-0"
              >
                Get help <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {/* ── Empty state (no search yet) ── */}
        {!searchId && !isLoading && (
          <div className="bg-white rounded-2xl border border-gray-100 py-14 text-center">
            <div className="w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Package className="w-6 h-6 text-sky-700" />
            </div>
            <p className="font-heading font-bold text-gray-900 mb-1">Enter a tracking ID above</p>
            <p className="text-sm text-gray-400">Your booking ID can be found in your confirmation email or on the My Bookings page.</p>
            <Link to="/my-bookings" className="inline-flex items-center gap-1.5 mt-4 text-sm text-sky-700 font-semibold hover:underline">
              View my bookings <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        )}

      </div>
    </div>
  )
}
