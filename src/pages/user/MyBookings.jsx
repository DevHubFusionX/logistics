import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import {
  Truck, Package, DollarSign, CheckCircle,
  ArrowUpRight, ArrowRight, Plus, MoreHorizontal,
  CreditCard, ChevronLeft, ChevronRight, MapPin,
  Search, SlidersHorizontal, Phone, User, History, ChevronDown
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

const STATUS_COLORS = {
  pending:    { text: 'text-amber-700 bg-amber-50 border-amber-100', dot: 'bg-amber-500' },
  confirmed:  { text: 'text-sky-700 bg-sky-50 border-sky-100', dot: 'bg-sky-500' },
  processing: { text: 'text-sky-700 bg-sky-50 border-sky-100', dot: 'bg-sky-500' },
  in_transit: { text: 'text-indigo-700 bg-indigo-50 border-indigo-100', dot: 'bg-indigo-500' },
  delivered:  { text: 'text-emerald-700 bg-emerald-50 border-emerald-100', dot: 'bg-emerald-500' },
  cancelled:  { text: 'text-rose-700 bg-rose-50 border-rose-100', dot: 'bg-rose-500' },
}

export default function MyBookings() {
  const navigate = useNavigate()
  const { user } = useAuthState()
  
  // State variables
  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchAllLocations, setSearchAllLocations] = useState(false)
  const [tablePage, setTablePage] = useState(1)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [cancelBookingModal, setCancelBookingModal] = useState(null)
  const [paymentBooking, setPaymentBooking] = useState(null)

  // Fetch bookings data
  const { data: bookingsData = [], isLoading: loading, refetch } = useBookingsQuery({ limit: 100 })
  const bookings = Array.isArray(bookingsData) ? bookingsData : []

  // Compute stats for tabs and cards
  const totalSpend = useMemo(() =>
    bookings.reduce((sum, b) => sum + (b.price || b.shipping_fee || b.amount || 0), 0)
  , [bookings])

  const bookingStats = useMemo(() => getBookingStats(bookings), [bookings])

  const stats = useMemo(() => {
    return {
      all: bookings.length,
      scheduled: bookings.filter(b => b.status === 'confirmed' || b.status === 'processing').length,
      pending: bookings.filter(b => b.status === 'pending').length,
      inProgress: bookings.filter(b => b.status === 'in_transit').length,
      delivered: bookings.filter(b => b.status === 'delivered').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
    }
  }, [bookings])

  // Filter based on active tab
  const tabFilteredBookings = useMemo(() => {
    switch (activeTab) {
      case 'scheduled':
        return bookings.filter(b => b.status === 'confirmed' || b.status === 'processing')
      case 'pending':
        return bookings.filter(b => b.status === 'pending')
      case 'in_progress':
        return bookings.filter(b => b.status === 'in_transit')
      case 'delivered':
        return bookings.filter(b => b.status === 'delivered')
      case 'cancelled':
        return bookings.filter(b => b.status === 'cancelled')
      default:
        return bookings
    }
  }, [bookings, activeTab])

  // Filter based on search query
  const searchedBookings = useMemo(() => {
    if (!searchQuery.trim()) return tabFilteredBookings
    const query = searchQuery.toLowerCase().trim()
    
    return tabFilteredBookings.filter(b => {
      const id = (b._id || b.tracking_number || b.id || '').toLowerCase()
      const goodsType = (b.goodsType || b.package_type || b.cargoType || '').toLowerCase()
      const origin = (typeof b.pickupLocation === 'string' ? b.pickupLocation : (b.pickupLocation?.city || '')).toLowerCase()
      const destination = (typeof b.dropoffLocation === 'string' ? b.dropoffLocation : (b.dropoffLocation?.city || '')).toLowerCase()
      const senderName = (b.pickupLocation?.contactName || '').toLowerCase()
      const receiverName = (b.dropoffLocation?.contactName || '').toLowerCase()

      return (
        id.includes(query) ||
        goodsType.includes(query) ||
        origin.includes(query) ||
        destination.includes(query) ||
        senderName.includes(query) ||
        receiverName.includes(query)
      )
    })
  }, [tabFilteredBookings, searchQuery])

  // Pagination calculations
  const PER_PAGE = 10
  const totalPages = Math.ceil(searchedBookings.length / PER_PAGE)
  const paginatedRows = useMemo(() => {
    const start = (tablePage - 1) * PER_PAGE
    return searchedBookings.slice(start, start + PER_PAGE)
  }, [searchedBookings, tablePage])

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
    <div className="w-full space-y-6 py-2">
        
        {/* Header Title Section */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Home Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Manage, monitor, and place temperature-controlled shipments</p>
          </div>
          <button
            onClick={() => navigate('/booking/request')}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-600 hover:to-sky-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-800/10 hover:shadow-lg hover:shadow-sky-800/20 active:scale-[0.98]"
          >
            <Plus className="w-4.5 h-4.5" /> Book a shipment
          </button>
        </div>

        {/* 1. Stat Cards Container */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-white rounded-2xl border border-slate-100 animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                     {/* Card 1: Completed shipments */}
            <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 border border-sky-600/30 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex justify-between items-start z-10 relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Truck className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-5 z-10 relative">
                <h3 className="text-3xl font-black text-white tracking-tight">{bookingStats.deliveredThisMonth}</h3>
                <p className="text-sm text-sky-100 font-semibold mt-1.5">Completed deliveries</p>
              </div>
              {/* Subtle Grid Background Pattern */}
              <div className="absolute right-3 bottom-3 opacity-[0.05] pointer-events-none">
                <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 100 100">
                  <circle cx="15" cy="15" r="3"/>
                  <circle cx="35" cy="15" r="3"/>
                  <circle cx="55" cy="15" r="3"/>
                  <circle cx="75" cy="15" r="3"/>
                  <circle cx="15" cy="35" r="3"/>
                  <circle cx="35" cy="35" r="3"/>
                  <circle cx="55" cy="35" r="3"/>
                  <circle cx="75" cy="35" r="3"/>
                  <circle cx="15" cy="55" r="3"/>
                  <circle cx="35" cy="55" r="3"/>
                  <circle cx="55" cy="55" r="3"/>
                  <circle cx="75" cy="55" r="3"/>
                </svg>
              </div>
            </div>

            {/* Card 2: Total spend */}
            <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 border border-sky-600/30 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex justify-between items-start z-10 relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="px-2 py-0.5 text-[10px] font-extrabold text-white bg-white/20 border border-white/25 rounded-md tracking-wider">NGN</span>
              </div>
              <div className="mt-5 z-10 relative">
                <h3 className="text-3xl font-black text-white tracking-tight">
                  ₦{totalSpend.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h3>
                <p className="text-sm text-sky-100 font-semibold mt-1.5">Total spend</p>
              </div>
            </div>

            {/* Card 3: Active shipments */}
            <div className="bg-gradient-to-br from-sky-700 via-sky-800 to-sky-900 border border-sky-600/30 rounded-2xl p-6 relative overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
              <div className="flex justify-between items-start z-10 relative">
                <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-white">
                  <Package className="w-5 h-5" />
                </div>
                <button
                  onClick={() => navigate('/booking-status-guide')}
                  className="px-2.5 py-1 text-[11px] font-bold text-white bg-white/15 hover:bg-white/25 border border-white/20 rounded-lg transition-all flex items-center gap-1.5"
                >
                  Guide <ArrowUpRight className="w-3 h-3" />
                </button>
              </div>
              <div className="mt-5 z-10 relative">
                <h3 className="text-3xl font-black text-white tracking-tight">
                  {bookingStats.pendingCount + bookingStats.activeCount}
                </h3>
                <p className="text-sm text-sky-100 font-semibold mt-1.5">Active shipments</p>
              </div>
            </div>
          </div>
        )}

        {/* 2. Interactive Navigation Tabs */}
        <div className="border-b border-slate-200">
          <div className="flex items-center gap-6 overflow-x-auto scrollbar-none pb-0.5">
            {[
              { id: 'all', label: 'All', count: stats.all },
              { id: 'scheduled', label: 'Scheduled', count: stats.scheduled },
              { id: 'pending', label: 'Pending', count: stats.pending },
              { id: 'in_progress', label: 'In-Progress', count: stats.inProgress },
              { id: 'delivered', label: 'Delivered', count: stats.delivered },
              { id: 'cancelled', label: 'Cancelled', count: stats.cancelled },
            ].map(tab => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id)
                    setTablePage(1)
                  }}
                  className={`relative pb-4 text-sm font-semibold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                    isActive 
                      ? 'text-sky-700 font-bold' 
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {tab.label}
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isActive ? 'bg-sky-100 text-sky-800' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {tab.count}
                  </span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-sky-700 rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Search and Action Row */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white border border-slate-100 p-4 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.015)]">
          <div className="flex flex-wrap items-center gap-4 flex-1">
            {/* Search Location Toggle */}
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-3 py-2 rounded-lg">
              <span className="text-xs font-semibold text-slate-600">Search all location</span>
              <button
                type="button"
                onClick={() => setSearchAllLocations(!searchAllLocations)}
                className={`w-9 h-5 rounded-full p-0.5 transition-colors focus:outline-none ${
                  searchAllLocations ? 'bg-sky-600' : 'bg-slate-300'
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  searchAllLocations ? 'translate-x-4' : 'translate-x-0'
                }`} />
              </button>
            </div>

            {/* Input Search Field */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  setTablePage(1)
                }}
                placeholder="Search by order no. or customer's details"
                className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm text-slate-700 bg-slate-55 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 transition-colors"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 text-sm font-semibold rounded-lg transition-colors">
              Group by <ChevronDown className="w-4 h-4 text-slate-400" />
            </button>
            <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-600 hover:text-slate-800 text-sm font-semibold rounded-lg transition-colors">
              <SlidersHorizontal className="w-4 h-4" /> Filter
            </button>
          </div>
        </div>

        {/* 4. Data Table Section */}
        {searchedBookings.length === 0 ? (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] py-20 px-6 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-6 shadow-inner">
              <Package className="w-10 h-10 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 tracking-tight">There are no orders to process</h3>
            <p className="text-sm text-slate-400 mt-2 max-w-[340px] leading-relaxed">
              You can easily create and assign new orders to your riders.
            </p>
            <button
              onClick={() => navigate('/booking/request')}
              className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-all shadow-md shadow-sky-800/10 hover:shadow-lg hover:shadow-sky-800/20 active:scale-[0.98]"
            >
              <Plus className="w-4.5 h-4.5" /> Book a shipment
            </button>
          </div>
        ) : (
          <div className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
            
            {/* Desktop Table View (visible on md and larger) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                    <th className="px-6 py-4 w-12 text-center">
                      <input
                        type="checkbox"
                        className="rounded border-slate-200 text-sky-600 focus:ring-sky-500"
                      />
                    </th>
                    <th className="px-6 py-4">Order No</th>
                    <th className="px-6 py-4">Sender</th>
                    <th className="px-6 py-4">Receiver</th>
                    <th className="px-6 py-4">Tags</th>
                    <th className="px-6 py-4">Partner</th>
                    <th className="px-6 py-4">Delivery Fee</th>
                    <th className="px-6 py-4">Rider</th>
                    <th className="px-6 py-4 w-16 text-center">Call</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    Array.from({ length: 4 }).map((_, idx) => (
                      <tr key={idx} className="animate-pulse">
                        <td className="px-6 py-4"><div className="w-4 h-4 bg-slate-100 rounded mx-auto" /></td>
                        {Array.from({ length: 9 }).map((_, j) => (
                          <td key={j} className="px-6 py-4"><div className="h-4 bg-slate-100 rounded" /></td>
                        ))}
                        <td className="px-6 py-4"><div className="h-8 w-16 bg-slate-100 rounded ml-auto" /></td>
                      </tr>
                    ))
                  ) : (
                    paginatedRows.map((booking, idx) => {
                      const bookingId = booking._id || booking.tracking_number || booking.id || 'N/A'
                      const displayId = bookingId.slice(-8).toUpperCase()
                      const goodsType = booking.goodsType || booking.package_type || booking.cargoType || 'General'
                      
                      const origin = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || 'Lagos')
                      const senderName = booking.pickupLocation?.contactName || 'Client'
                      
                      const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || '—')
                      const receiverName = booking.dropoffLocation?.contactName || 'Recipient'
                      
                      const amount = booking.price || booking.shipping_fee || booking.amount || calculateBookingPrice(booking) || 0
                      const payStatus = booking.paymentStatus || booking.payment_status || 'unpaid'
                      
                      const sc = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
                      const canPayNow = booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')

                      const riderName = booking.driver?.name || booking.driverName || 'Rider unassigned'
                      const riderPhone = booking.driver?.phone || booking.driverPhone

                      return (
                        <tr key={bookingId + idx} className="hover:bg-slate-50/50 transition-colors group">
                          <td className="px-6 py-4 text-center">
                            <input
                              type="checkbox"
                              className="rounded border-slate-200 text-sky-600 focus:ring-sky-500"
                            />
                          </td>
                          <td className="px-6 py-4 font-mono text-xs font-bold text-slate-800">
                            #{displayId}
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-800 font-semibold">{senderName}</div>
                            <div className="text-slate-400 text-[10px] mt-0.5">{origin}</div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-slate-800 font-semibold">{receiverName}</div>
                            <div className="text-slate-400 text-[10px] mt-0.5">{destination}</div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-[10px] font-semibold bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                              {goodsType}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-xs font-semibold text-slate-500">
                            Dara Express
                          </td>
                          <td className="px-6 py-4 font-bold text-slate-800">
                            ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                          </td>
                          <td className="px-6 py-4">
                            {riderPhone ? (
                              <span className="inline-flex items-center gap-1.5 text-xs text-slate-700 font-medium bg-slate-50 border border-slate-100 px-2 py-1 rounded">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                {riderName}
                              </span>
                            ) : (
                              <span className="text-slate-400 text-xs">
                                {riderName}
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 text-center">
                            {riderPhone ? (
                              <a
                                href={`tel:${riderPhone}`}
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-500 hover:text-sky-700 transition-colors"
                                title={`Call ${riderName}`}
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                            ) : (
                              <button
                                disabled
                                className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-300 cursor-not-allowed"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 border rounded-full ${sc.text}`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                              {getStatusText(booking.status)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => setSelectedBooking({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
                                className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition-colors"
                              >
                                Details
                              </button>
                              {canPayNow && (
                                <button
                                  onClick={() => setPaymentBooking(booking)}
                                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-100/30 px-3 py-1.5 rounded-lg transition-all"
                                >
                                  <CreditCard className="w-3.5 h-3.5" /> Pay
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards List View (visible below md) */}
            <div className="md:hidden p-4 space-y-4">
              {loading ? (
                Array.from({ length: 3 }).map((_, idx) => (
                  <div key={idx} className="bg-white border border-slate-100 rounded-xl p-4 animate-pulse space-y-3">
                    <div className="flex justify-between">
                      <div className="h-4 w-20 bg-slate-100 rounded" />
                      <div className="h-4 w-16 bg-slate-100 rounded" />
                    </div>
                    <div className="h-4 w-full bg-slate-100 rounded" />
                    <div className="h-4 w-2/3 bg-slate-100 rounded" />
                  </div>
                ))
              ) : (
                paginatedRows.map((booking, idx) => {
                  const bookingId = booking._id || booking.tracking_number || booking.id || 'N/A'
                  const displayId = bookingId.slice(-8).toUpperCase()
                  const goodsType = booking.goodsType || booking.package_type || booking.cargoType || 'General'
                  
                  const origin = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || 'Lagos')
                  const senderName = booking.pickupLocation?.contactName || 'Client'
                  
                  const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || '—')
                  const receiverName = booking.dropoffLocation?.contactName || 'Recipient'
                  
                  const amount = booking.price || booking.shipping_fee || booking.amount || calculateBookingPrice(booking) || 0
                  const payStatus = booking.paymentStatus || booking.payment_status || 'unpaid'
                  
                  const sc = STATUS_COLORS[booking.status] || STATUS_COLORS.pending
                  const canPayNow = booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')

                  const riderName = booking.driver?.name || booking.driverName || 'Rider unassigned'
                  const riderPhone = booking.driver?.phone || booking.driverPhone

                  return (
                    <div key={bookingId + idx} className="bg-white border border-slate-100 rounded-xl p-4 space-y-4 shadow-sm hover:border-sky-200 transition-all duration-200">
                      {/* Header row */}
                      <div className="flex justify-between items-center pb-3 border-b border-slate-50">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Order No</span>
                          <p className="font-mono text-xs font-bold text-sky-700 mt-0.5">#{displayId}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 border rounded-full ${sc.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                          {getStatusText(booking.status)}
                        </span>
                      </div>

                      {/* Route/Locations row */}
                      <div className="space-y-3">
                        <div className="flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-sky-600 mt-1 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Sender</span>
                            <span className="text-xs font-bold text-slate-800">{senderName}</span>
                            <span className="text-slate-500 text-[10px] ml-1.5">{origin}</span>
                          </div>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-600 mt-1 flex-shrink-0" />
                          <div>
                            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Receiver</span>
                            <span className="text-xs font-bold text-slate-800">{receiverName}</span>
                            <span className="text-slate-500 text-[10px] ml-1.5">{destination}</span>
                          </div>
                        </div>
                      </div>

                      {/* Info tags row */}
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-50">
                        <span className="text-[9px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded uppercase tracking-wider">
                          {goodsType}
                        </span>
                        <span className="text-[9px] font-bold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded uppercase tracking-wider">
                          Dara Express
                        </span>
                      </div>

                      {/* Rider & Pricing info */}
                      <div className="flex justify-between items-center pt-3 border-t border-slate-50">
                        <div>
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Rider</span>
                          {riderPhone ? (
                            <div className="flex items-center gap-1.5 mt-1">
                              <span className="text-xs font-semibold text-slate-700">{riderName}</span>
                              <a
                                href={`tel:${riderPhone}`}
                                className="w-6 h-6 rounded-full bg-slate-100 hover:bg-sky-50 text-slate-500 hover:text-sky-700 flex items-center justify-center transition-colors"
                              >
                                <Phone className="w-3 h-3" />
                              </a>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs mt-1 block">{riderName}</span>
                          )}
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Delivery Fee</span>
                          <span className="font-extrabold text-slate-900 text-sm mt-0.5 block">
                            ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                          </span>
                        </div>
                      </div>

                      {/* Actions row */}
                      <div className="flex items-center gap-2 pt-3 border-t border-slate-50">
                        <button
                          onClick={() => setSelectedBooking({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
                          className="flex-grow text-xs font-bold text-slate-600 hover:text-slate-900 py-2.5 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-center"
                        >
                          Details
                        </button>
                        {canPayNow && (
                          <button
                            onClick={() => setPaymentBooking(booking)}
                            className="flex-grow text-xs font-bold text-white bg-sky-700 hover:bg-sky-600 py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1"
                          >
                            <CreditCard className="w-3.5 h-3.5" /> Pay
                          </button>
                        )}
                      </div>

                    </div>
                  )
                })
              )}
            </div>

            {/* 5. Pagination Footer */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 bg-slate-50/30">
                <p className="text-xs text-slate-400 font-medium">
                  Page {tablePage} of {totalPages}
                </p>
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setTablePage(p => Math.max(1, p - 1))}
                    disabled={tablePage === 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setTablePage(p => Math.min(totalPages, p + 1))}
                    disabled={tablePage === totalPages}
                    className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Booking Modal Components */}
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
