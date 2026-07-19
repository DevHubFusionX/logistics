import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Plus, Package } from 'lucide-react'
import {
  BookingDetailsModal, BookingModification, BookingCancellation,
  PaymentSelectionModal, useBookingsQuery, getBookingStats, calculateBookingPrice,
  getStatusText
} from '@/features/booking'
import { useAuthState } from '@/features/auth'
import BookingStatsCards from './BookingStatsCards'
import BookingTabs from './BookingTabs'
import BookingSearchBar from './BookingSearchBar'
import BookingTable from './BookingTable'
import BookingMobileCard from './BookingMobileCard'
import BookingPagination from './BookingPagination'

const PER_PAGE = 10

export default function MyBookings() {
  const navigate = useNavigate()
  const { user } = useAuthState()

  const [activeTab, setActiveTab] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchAllLocations, setSearchAllLocations] = useState(false)
  const [tablePage, setTablePage] = useState(1)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [cancelBookingModal, setCancelBookingModal] = useState(null)
  const [paymentBooking, setPaymentBooking] = useState(null)

  // Grouping & Filtering States
  const [groupBy, setGroupBy] = useState('none')
  const [filters, setFilters] = useState({
    paymentStatus: 'all',
    isFragile: 'all',
    isPerishable: 'all',
    truckSize: 'all'
  })

  const { data: bookingsData = [], isLoading: loading, refetch } = useBookingsQuery({ limit: 100 })
  const bookings = Array.isArray(bookingsData) ? bookingsData : []

  const totalSpend = useMemo(() =>
    bookings.reduce((sum, b) => sum + (b.price || b.shipping_fee || b.amount || 0), 0)
  , [bookings])

  const bookingStats = useMemo(() => getBookingStats(bookings), [bookings])

  const stats = useMemo(() => ({
    all:        bookings.length,
    scheduled:  bookings.filter(b => b.status === 'confirmed' || b.status === 'processing').length,
    pending:    bookings.filter(b => b.status === 'pending').length,
    inProgress: bookings.filter(b => b.status === 'in_transit').length,
    delivered:  bookings.filter(b => b.status === 'delivered').length,
    cancelled:  bookings.filter(b => b.status === 'cancelled').length,
  }), [bookings])

  // 1. Tab Filtering
  const tabFiltered = useMemo(() => {
    switch (activeTab) {
      case 'scheduled':   return bookings.filter(b => b.status === 'confirmed' || b.status === 'processing')
      case 'pending':     return bookings.filter(b => b.status === 'pending')
      case 'in_progress': return bookings.filter(b => b.status === 'in_transit')
      case 'delivered':   return bookings.filter(b => b.status === 'delivered')
      case 'cancelled':   return bookings.filter(b => b.status === 'cancelled')
      default:            return bookings
    }
  }, [bookings, activeTab])

  // 2. Dropdown Filters
  const dropdownFiltered = useMemo(() => {
    return tabFiltered.filter(b => {
      // Payment status filter
      if (filters.paymentStatus !== 'all') {
        const payStatus = b.paymentStatus || b.payment_status || 'unpaid'
        if (payStatus !== filters.paymentStatus) return false
      }

      // Fragility filter
      if (filters.isFragile !== 'all') {
        const isFragile = b.isFragile === true
        if (filters.isFragile === 'fragile' && !isFragile) return false
        if (filters.isFragile === 'non_fragile' && isFragile) return false
      }

      // Perishability filter
      if (filters.isPerishable !== 'all') {
        const isPerishable = b.isPerishable === true
        if (filters.isPerishable === 'perishable' && !isPerishable) return false
        if (filters.isPerishable === 'non_perishable' && isPerishable) return false
      }

      // Vehicle Capacity filter
      if (filters.truckSize !== 'all') {
        const size = String(b.truckSize)
        if (size !== filters.truckSize) return false
      }

      return true
    })
  }, [tabFiltered, filters])

  // 3. Search filter
  const searched = useMemo(() => {
    if (!searchQuery.trim()) return dropdownFiltered
    const q = searchQuery.toLowerCase().trim()
    return dropdownFiltered.filter(b => {
      const id = (b._id || b.tracking_number || b.id || '').toLowerCase()
      const goods = (b.goodsType || b.cargoType || '').toLowerCase()

      const customerName = (b.fullNameOrBusiness || b.name || '').toLowerCase()
      const senderName = (b.pickupPerson?.name || '').toLowerCase()
      const receiverName = (b.receiverPerson?.name || '').toLowerCase()
      const customerPhone = (b.contactPhone || b.pickupPerson?.phone || b.receiverPerson?.phone || '').toLowerCase()
      const customerEmail = (b.email || b.pickupPerson?.email || b.receiverPerson?.email || '').toLowerCase()

      const matchesDetails = id.includes(q) ||
                             goods.includes(q) ||
                             customerName.includes(q) ||
                             senderName.includes(q) ||
                             receiverName.includes(q) ||
                             customerPhone.includes(q) ||
                             customerEmail.includes(q)

      if (searchAllLocations) {
        const originAddr = (typeof b.pickupLocation === 'string'
          ? b.pickupLocation
          : [b.pickupLocation?.address, b.pickupLocation?.city, b.pickupLocation?.state].filter(Boolean).join(', ')
        ).toLowerCase()

        const destAddr = (typeof b.dropoffLocation === 'string'
          ? b.dropoffLocation
          : [b.dropoffLocation?.address, b.dropoffLocation?.city, b.dropoffLocation?.state].filter(Boolean).join(', ')
        ).toLowerCase()

        return matchesDetails || originAddr.includes(q) || destAddr.includes(q)
      }

      return matchesDetails
    })
  }, [dropdownFiltered, searchQuery, searchAllLocations])

  // 4. Grouping Data
  const groupedData = useMemo(() => {
    if (groupBy === 'none') {
      return [{ key: 'all', label: 'All Bookings', items: searched }]
    }

    const groups = {}
    searched.forEach(b => {
      let key = ''
      if (groupBy === 'status') {
        key = b.status || 'pending'
      } else if (groupBy === 'goodsType') {
        key = b.goodsType || b.cargoType || 'General'
      } else if (groupBy === 'destination') {
        key = typeof b.dropoffLocation === 'string' ? b.dropoffLocation : b.dropoffLocation?.city || 'Other'
      }

      if (!groups[key]) groups[key] = []
      groups[key].push(b)
    })

    return Object.entries(groups).map(([key, items]) => {
      let label = key
      if (groupBy === 'status') {
        label = getStatusText(key)
      }
      return { key, label, items }
    })
  }, [searched, groupBy])

  const totalPages = Math.ceil(searched.length / PER_PAGE)
  const paginatedRows = useMemo(() => {
    const start = (tablePage - 1) * PER_PAGE
    return searched.slice(start, start + PER_PAGE)
  }, [searched, tablePage])

  const handleTabChange = (tab) => { setActiveTab(tab); setTablePage(1) }
  const handleSearchChange = (val) => { setSearchQuery(val); setTablePage(1) }
  const handlePaymentSuccess = () => { setPaymentBooking(null); refetch(); toast.success('Payment completed!') }

  return (
    <div className="w-full space-y-6 py-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Home Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Manage, monitor, and place temperature-controlled shipments</p>
        </div>
        <button
          onClick={() => navigate('/booking/request')}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-600 hover:to-sky-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md"
        >
          <Plus className="w-4 h-4" /> Book a shipment
        </button>
      </div>

      <BookingStatsCards bookingStats={bookingStats} totalSpend={totalSpend} loading={loading} />

      <BookingTabs activeTab={activeTab} stats={stats} onTabChange={handleTabChange} />

      <BookingSearchBar
        searchQuery={searchQuery}
        searchAllLocations={searchAllLocations}
        onSearchChange={handleSearchChange}
        onToggleSearchAll={() => setSearchAllLocations(v => !v)}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        filters={filters}
        onFiltersChange={setFilters}
      />

      {/* Table / Empty state */}
      {searched.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl py-20 px-6 text-center flex flex-col items-center justify-center">
          <div className="w-20 h-20 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 mb-6">
            <Package className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold text-slate-800">There are no orders to process</h3>
          <p className="text-sm text-slate-400 mt-2 max-w-[340px]">You can easily create and assign new orders to your riders.</p>
          <button
            onClick={() => navigate('/booking/request')}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-all"
          >
            <Plus className="w-4 h-4" /> Book a shipment
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {groupedData.map((group) => {
            const rowsToShow = groupBy === 'none' ? paginatedRows : group.items

            return (
              <div key={group.key} className="bg-white border border-slate-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.015)] overflow-hidden">
                {groupBy !== 'none' && (
                  <div className="flex items-center gap-2 px-6 py-3.5 bg-slate-50/80 border-b border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{group.label}</span>
                    <span className="text-[10px] font-bold text-sky-700 bg-sky-50 px-2 py-0.5 rounded-full border border-sky-100/30">
                      {group.items.length} {group.items.length === 1 ? 'order' : 'orders'}
                    </span>
                  </div>
                )}

                <BookingTable
                  rows={rowsToShow}
                  loading={loading}
                  onViewDetails={setSelectedBooking}
                  onPay={setPaymentBooking}
                />

                <div className="md:hidden p-4 space-y-4">
                  {rowsToShow.map((booking, idx) => (
                    <BookingMobileCard
                      key={(booking._id || booking.id) + idx}
                      booking={booking}
                      onViewDetails={(b) => setSelectedBooking({ ...b, calculatedPrice: calculateBookingPrice(b) })}
                      onPay={setPaymentBooking}
                    />
                  ))}
                </div>

                {groupBy === 'none' && totalPages > 1 && (
                  <BookingPagination page={tablePage} totalPages={totalPages} onPageChange={setTablePage} />
                )}
              </div>
            )
          })}
        </div>
      )}

      {/* Modals */}
      <BookingDetailsModal booking={selectedBooking} onClose={() => setSelectedBooking(null)} />
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
