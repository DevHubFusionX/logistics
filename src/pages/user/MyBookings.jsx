import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Truck, Package, DollarSign, CheckCircle,
  ArrowUpRight, ArrowRight, Plus, MoreHorizontal,
  CreditCard, ChevronLeft, ChevronRight, MapPin
} from 'lucide-react'
import {
  BookingDetailsModal,
  BookingModification,
  BookingCancellation,
  PaymentSelectionModal,
  useBookingsQuery,
  getStatusBadge,
  getStatusText,
  calculateBookingPrice,
  getBookingStats
} from '@/features/booking'
import { useAuthState } from '@/features/auth'

const TABLE_FILTERS = ['All Shipments', 'Delivered', 'In transit', 'Pending', 'Processing']

const STATUS_COLORS = {
  pending:    { text: 'text-amber-600',   bg: 'bg-amber-50'   },
  confirmed:  { text: 'text-sky-600',     bg: 'bg-sky-50'     },
  processing: { text: 'text-sky-600',     bg: 'bg-sky-50'     },
  in_transit: { text: 'text-emerald-600', bg: 'bg-emerald-50' },
  delivered:  { text: 'text-gray-500',    bg: 'bg-gray-100'   },
  cancelled:  { text: 'text-red-500',     bg: 'bg-red-50'     },
}

// ── Stat Card ──────────────────────────────────────────────────────────────
function StatCard({ label, value, icon: Icon, active, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-5 cursor-pointer transition-all border ${
        active
          ? 'bg-sky-800 border-sky-800 text-white shadow-lg shadow-sky-900/20'
          : 'bg-white border-gray-100 hover:border-sky-200 hover:shadow-sm'
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className={`text-xs font-semibold uppercase tracking-wider ${active ? 'text-sky-300' : 'text-gray-400'}`}>
            {label}
          </p>
          <p className={`text-2xl font-heading font-black mt-1 ${active ? 'text-white' : 'text-gray-900'}`}>
            {value}
          </p>
          <div className={`flex items-center gap-1 mt-1 text-xs font-semibold ${active ? 'text-sky-300' : 'text-gray-400'}`}>
            <span>vs Last Week</span>
          </div>
        </div>
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${active ? 'bg-sky-700' : 'bg-gray-50'}`}>
          <Icon className={`w-5 h-5 ${active ? 'text-sky-200' : 'text-gray-400'}`} />
        </div>
      </div>
      <div className={`flex items-center justify-between pt-3 border-t ${active ? 'border-sky-700' : 'border-gray-100'}`}>
        <span className={`text-xs font-semibold ${active ? 'text-sky-300' : 'text-sky-700'}`}>View Report</span>
        <ArrowRight className={`w-3.5 h-3.5 ${active ? 'text-sky-300' : 'text-sky-700'}`} />
      </div>
    </div>
  )
}

// ── Bar Chart ──────────────────────────────────────────────────────────────
function ShipmentChart({ bookings }) {
  const data = useMemo(() => {
    // Always build last 6 months regardless of data
    const months = Array.from({ length: 6 }, (_, i) => {
      const d = new Date()
      d.setDate(1)
      d.setMonth(d.getMonth() - (5 - i))
      return {
        key:   `${d.getFullYear()}-${d.getMonth()}`,
        label: d.toLocaleString('default', { month: 'short' }),
        shipments: 0,
        delivered: 0,
      }
    })

    bookings.forEach(b => {
      const d = new Date(b.createdAt || b.created_at || 0)
      const key = `${d.getFullYear()}-${d.getMonth()}`
      const slot = months.find(m => m.key === key)
      if (!slot) return
      slot.shipments++
      if (b.status === 'delivered') slot.delivered++
    })

    const maxVal = Math.max(...months.map(m => m.shipments), 1)
    return months.map(m => ({ ...m, maxVal }))
  }, [bookings])

  const hasData = data.some(m => m.shipments > 0)

  return (
    <div className="flex items-end gap-2 h-32">
      {data.map(({ label, shipments, delivered, maxVal }) => {
        const shipH    = hasData ? Math.max((shipments / maxVal) * 100, shipments > 0 ? 8 : 0) : 0
        const delivH   = hasData ? Math.max((delivered / maxVal) * 100, delivered > 0 ? 8 : 0) : 0
        const emptyH   = !hasData ? [35, 55, 45, 70, 50, 40][data.indexOf(data.find(d => d.label === label))] : 0
        return (
          <div key={label} className="flex flex-col items-center gap-1.5 flex-1">
            <div className="w-full flex gap-0.5 items-end" style={{ height: 96 }}>
              {hasData ? (
                <>
                  <div
                    className="flex-1 bg-sky-800 rounded-t-lg transition-all duration-500"
                    style={{ height: `${shipH}%`, minHeight: shipments > 0 ? 4 : 0 }}
                  />
                  <div
                    className="flex-1 bg-sky-300 rounded-t-lg transition-all duration-500"
                    style={{ height: `${delivH}%`, minHeight: delivered > 0 ? 4 : 0 }}
                  />
                </>
              ) : (
                <div
                  className="w-full bg-gray-100 rounded-t-lg"
                  style={{ height: `${emptyH}%` }}
                />
              )}
            </div>
            <span className="text-[10px] text-gray-400 font-medium">{label}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── Route Summary ──────────────────────────────────────────────────────────
function RouteSummary({ bookings }) {
  const routes = useMemo(() => {
    const map = {}
    bookings.forEach(b => {
      const from = typeof b.pickupLocation === 'string' ? b.pickupLocation : (b.pickupLocation?.city || 'Lagos')
      const to   = typeof b.dropoffLocation === 'string' ? b.dropoffLocation : (b.dropoffLocation?.city || '—')
      const key  = `${from}→${to}`
      map[key]   = (map[key] || 0) + 1
    })
    return Object.entries(map)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([route, count]) => {
        const [from, to] = route.split('→')
        return { from, to, count }
      })
  }, [bookings])

  return (
    <div className="space-y-3">
      {routes.length === 0 ? (
        <p className="text-sm text-gray-400 text-center py-8">No route data yet</p>
      ) : routes.map(({ from, to, count }, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-50 flex items-center justify-center flex-shrink-0">
            <MapPin className="w-3.5 h-3.5 text-sky-700" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-800">
              <span className="truncate">{from}</span>
              <ArrowRight className="w-3 h-3 text-gray-400 flex-shrink-0" />
              <span className="truncate">{to}</span>
            </div>
            <div className="mt-1 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-sky-700 rounded-full"
                style={{ width: `${Math.min((count / (routes[0]?.count || 1)) * 100, 100)}%` }}
              />
            </div>
          </div>
          <span className="text-xs font-bold text-gray-500 flex-shrink-0">{count}</span>
        </div>
      ))}
    </div>
  )
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function MyBookings() {
  const navigate = useNavigate()
  const [tableFilter, setTableFilter]               = useState('All Shipments')
  const [activeCard, setActiveCard]                 = useState(0)
  const [tablePage, setTablePage]                   = useState(1)
  const [selectedBooking, setSelectedBooking]       = useState(null)
  const [editBooking, setEditBooking]               = useState(null)
  const [cancelBookingModal, setCancelBookingModal] = useState(null)
  const [paymentBooking, setPaymentBooking]         = useState(null)
  const { user } = useAuthState()

  const { data: bookingsData = [], isLoading: loading, refetch } = useBookingsQuery({ limit: 100 })
  const bookings = Array.isArray(bookingsData) ? bookingsData : []
  const stats    = useMemo(() => getBookingStats(bookings), [bookings])

  const totalSpend = useMemo(() =>
    bookings.reduce((sum, b) => sum + (b.price || b.shipping_fee || b.amount || 0), 0)
  , [bookings])

  const STAT_CARDS = [
    { label: 'Total Shipments', value: bookings.length,              icon: Truck },
    { label: 'Total Orders',    value: stats.pendingCount + stats.activeCount, icon: Package },
    { label: 'Total Spend',     value: `₦${(totalSpend/1000).toFixed(1)}k`,   icon: DollarSign },
    { label: 'Delivered',       value: stats.deliveredThisMonth,     icon: CheckCircle },
  ]

  const filteredBookings = useMemo(() => {
    const statusMap = {
      'Delivered':  ['delivered'],
      'In transit': ['in_transit'],
      'Pending':    ['pending'],
      'Processing': ['processing', 'confirmed'],
    }
    const statuses = statusMap[tableFilter]
    return statuses
      ? bookings.filter(b => statuses.includes(b.status))
      : bookings
  }, [bookings, tableFilter])

  const PER_PAGE   = 10
  const totalPages = Math.ceil(filteredBookings.length / PER_PAGE)
  const pageRows   = filteredBookings.slice((tablePage - 1) * PER_PAGE, tablePage * PER_PAGE)

  const formatDate = (d) => {
    if (!d) return '—'
    const date = new Date(d)
    return isNaN(date) ? '—' : date.toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const handlePaymentSuccess = () => {
    setPaymentBooking(null)
    refetch()
    toast.success('Payment completed!')
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-50/50">
      <div className="px-4 sm:px-6 py-6 space-y-6">

        {/* ── Page title ── */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-heading font-bold text-xl text-gray-900">My Bookings</h1>
            <p className="text-xs text-gray-400 mt-0.5">Keep track of all your shipping activity</p>
          </div>
          <button
            onClick={() => navigate('/booking/request')}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" /> New booking
          </button>
        </div>

        {/* ── Stat cards ── */}
        {loading ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-36 bg-white rounded-2xl border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STAT_CARDS.map((card, i) => (
              <StatCard
                key={i}
                {...card}
                active={activeCard === i}
                onClick={() => setActiveCard(i)}
              />
            ))}
          </div>
        )}

        {/* ── Middle: chart + routes ── */}
        <div className="grid lg:grid-cols-5 gap-4">

          {/* Bar chart */}
          <div className="lg:col-span-3 bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-1">
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Shipments Statistics</h3>
                <p className="text-xs text-gray-400 mt-0.5">
                  Total number of bookings: {bookings.length}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-800 inline-block" /> Shipment
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-sm bg-sky-400 inline-block" /> Delivered
                  </span>
                </div>
              </div>
            </div>

            {/* Y-axis labels */}
            <div className="flex gap-3 mt-4">
              <div className="flex flex-col justify-between text-[10px] text-gray-300 pb-5 text-right w-6 flex-shrink-0" style={{ height: 112 }}>
                {['Max','','','0'].map((l, i) => <span key={i}>{l}</span>)}
              </div>
              <div className="flex-1">
                <ShipmentChart bookings={bookings} />
              </div>
            </div>
          </div>

          {/* Top routes */}
          <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Top Routes</h3>
                <p className="text-xs text-gray-400 mt-0.5">Most frequent destinations</p>
              </div>
              <MoreHorizontal className="w-4 h-4 text-gray-400" />
            </div>
            <RouteSummary bookings={bookings} />
          </div>
        </div>

        {/* ── Shipments activity table ── */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">

          {/* Table header */}
          <div className="px-5 pt-5 pb-4 border-b border-gray-100">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <h3 className="font-heading font-bold text-gray-900 text-sm">Shipments Activity</h3>
                <p className="text-xs text-gray-400 mt-0.5">Keep track of all your shipping activity</p>
              </div>
              <div className="text-xs text-gray-400 flex-shrink-0">
                {(tablePage - 1) * PER_PAGE + 1}–{Math.min(tablePage * PER_PAGE, filteredBookings.length)} of {filteredBookings.length}
              </div>
            </div>

            {/* Filter tabs */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
              {TABLE_FILTERS.map(f => (
                <button
                  key={f}
                  onClick={() => { setTableFilter(f); setTablePage(1) }}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap flex-shrink-0 transition-all ${
                    tableFilter === f
                      ? 'bg-sky-800 text-white'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* ── Desktop table ── */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Order ID', 'Category', 'Route', 'Arrival time', 'Price', 'Status', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 7 }).map((_, j) => (
                        <td key={j} className="px-5 py-3.5"><div className="h-3.5 bg-gray-100 rounded animate-pulse" /></td>
                      ))}
                    </tr>
                  ))
                ) : pageRows.length === 0 ? (
                  <tr><td colSpan={7} className="px-5 py-12 text-center text-sm text-gray-400">No shipments found</td></tr>
                ) : pageRows.map((booking, i) => {
                  const id          = booking._id || booking.tracking_number || booking.id || 'N/A'
                  const origin      = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || 'Lagos')
                  const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || '—')
                  const goodsType   = booking.goodsType || booking.package_type || booking.cargoType || 'General'
                  const amount      = booking.price || booking.shipping_fee || booking.amount || calculateBookingPrice(booking) || 0
                  const payStatus   = booking.paymentStatus || booking.payment_status || 'unpaid'
                  const eta         = formatDate(booking.estimatedDeliveryDate || booking.estimated_delivery || booking.pickupDate)
                  const sc          = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
                  const canPayNow   = booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')
                  return (
                    <tr key={id + i} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-2">
                          <div className="w-3.5 h-3.5 rounded border border-gray-200 flex-shrink-0" />
                          <span className="font-mono text-xs font-bold text-gray-700 truncate max-w-[120px]">#{id.slice(-8).toUpperCase()}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-600 font-medium">{goodsType}</td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5 text-xs text-gray-700 font-medium">
                          <span>{origin}</span>
                          <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                          <span>{destination}</span>
                        </div>
                      </td>
                      <td className="px-5 py-3.5 text-xs text-gray-500">{eta}</td>
                      <td className="px-5 py-3.5"><p className="text-xs font-bold text-gray-900">₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}</p></td>
                      <td className="px-5 py-3.5">
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${sc.bg} ${sc.text}`}>{getStatusText(booking.status)}</span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-1.5">
                          <button onClick={() => setSelectedBooking({ ...booking, calculatedPrice: calculateBookingPrice(booking) })} className="text-xs text-gray-400 hover:text-gray-700 font-medium px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">Details</button>
                          {canPayNow && (
                            <button onClick={() => setPaymentBooking(booking)} className="text-xs font-semibold text-sky-700 hover:bg-sky-50 px-2 py-1 rounded-lg transition-colors flex items-center gap-1">
                              <CreditCard className="w-3 h-3" /> Pay
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* ── Mobile cards ── */}
          <div className="md:hidden divide-y divide-gray-50">
            {loading ? (
              <div className="p-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : pageRows.length === 0 ? (
              <p className="py-10 text-center text-sm text-gray-400">No shipments found</p>
            ) : (
              <div className="p-4 space-y-3">
                {pageRows.map((booking, i) => {
                  const id          = booking._id || booking.tracking_number || booking.id || 'N/A'
                  const origin      = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || 'Lagos')
                  const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || '—')
                  const goodsType   = booking.goodsType || booking.package_type || booking.cargoType || 'General'
                  const amount      = booking.price || booking.shipping_fee || booking.amount || calculateBookingPrice(booking) || 0
                  const payStatus   = booking.paymentStatus || booking.payment_status || 'unpaid'
                  const eta         = formatDate(booking.estimatedDeliveryDate || booking.estimated_delivery || booking.pickupDate)
                  const sc          = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
                  const canPayNow   = booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')
                  return (
                    <div key={id + i} className="bg-gray-50 rounded-xl p-4 space-y-3">
                      {/* Card header */}
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="font-mono text-xs font-bold text-gray-900">#{id.slice(-8).toUpperCase()}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{goodsType}</p>
                        </div>
                        <span className={`text-[10px] font-semibold px-2.5 py-1 rounded-full flex-shrink-0 ${sc.bg} ${sc.text}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </div>
                      {/* Route */}
                      <div className="flex items-center gap-2 text-xs text-gray-700 font-medium">
                        <MapPin className="w-3 h-3 text-sky-700 flex-shrink-0" />
                        <span className="truncate">{origin}</span>
                        <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
                        <span className="truncate">{destination}</span>
                      </div>
                      {/* Footer */}
                      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                        <div>
                          <p className="text-sm font-heading font-black text-gray-900">₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}</p>
                          {eta && <p className="text-[10px] text-gray-400 mt-0.5">ETA {eta}</p>}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedBooking({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
                            className="text-xs font-semibold text-gray-500 bg-white border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors"
                          >
                            Details
                          </button>
                          {canPayNow && (
                            <button
                              onClick={() => setPaymentBooking(booking)}
                              className="text-xs font-semibold text-white bg-sky-700 hover:bg-sky-600 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                            >
                              <CreditCard className="w-3 h-3" /> Pay
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
              <p className="text-xs text-gray-400">
                Page {tablePage} of {totalPages}
              </p>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setTablePage(p => Math.max(1, p - 1))}
                  disabled={tablePage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setTablePage(p => Math.min(totalPages, p + 1))}
                  disabled={tablePage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        getStatusBadge={getStatusBadge}
        getStatusText={getStatusText}
      />
      {editBooking && (
        <BookingModification
          booking={editBooking}
          onSuccess={() => { setEditBooking(null); refetch() }}
          onClose={() => setEditBooking(null)}
        />
      )}
      {cancelBookingModal && (
        <BookingCancellation
          booking={cancelBookingModal}
          onSuccess={() => { setCancelBookingModal(null); refetch() }}
          onClose={() => setCancelBookingModal(null)}
        />
      )}
      {paymentBooking && (
        <PaymentSelectionModal
          booking={paymentBooking}
          user={user}
          onSuccess={handlePaymentSuccess}
          onClose={() => setPaymentBooking(null)}
        />
      )}
    </div>
  )
}
