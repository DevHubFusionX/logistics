import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Search, SortAsc, SortDesc, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  BookingCard,
  BookingStats,
  BookingFilters,
  EmptyBookings,
  BookingDetailsModal,
  BookingModification,
  BookingCancellation,
  PaymentSelectionModal
} from '../../components/bookings'
import { useAuthState } from '../../hooks/useAuth'
import { useBookingsQuery } from '../../hooks/queries/useBookingQueries'
import { getStatusBadge, getStatusText, calculateBookingPrice, getBookingStats } from '../../utils/bookingUtils'
import { BookingCardSkeleton, StatCardSkeleton } from '../../components/common/SkeletonLoaders'

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortOrder, setSortOrder] = useState('newest')
  const [page, setPage] = useState(1)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [cancelBookingModal, setCancelBookingModal] = useState(null)
  const [paymentBooking, setPaymentBooking] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const { user } = useAuthState()

  const { data: bookingsData = [], isLoading: loading, refetch } = useBookingsQuery({ limit: 50, page })
  const bookings = Array.isArray(bookingsData) ? bookingsData : []

  // Search + Filter + Sort pipeline
  const processedBookings = useMemo(() => {
    let result = [...bookings]

    // Search by tracking number, destination, or name
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(b =>
        (b.tracking_number || '').toLowerCase().includes(q) ||
        (b.destination || b.dropoffLocation?.city || '').toLowerCase().includes(q) ||
        (b.origin || b.pickupLocation?.city || '').toLowerCase().includes(q) ||
        (b.fullNameOrBusiness || '').toLowerCase().includes(q)
      )
    }

    // Status filter
    if (filter !== 'all') {
      result = result.filter(b => b.status === filter)
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.created_at || 0)
      const dateB = new Date(b.createdAt || b.created_at || 0)
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB
    })

    return result
  }, [bookings, search, filter, sortOrder])

  const stats = useMemo(() => getBookingStats(bookings), [bookings])

  const handlePayNow = (booking) => {
    setPaymentBooking(booking)
  }

  const handlePaymentSuccess = () => {
    setPaymentBooking(null)
    refetch()
    toast.success('Payment completed successfully!')
  }

  // Skeleton loading state
  if (loading) {
    return (
      <div className="space-y-6 pb-6 px-4 sm:px-0">
        <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => <BookingCardSkeleton key={i} />)}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
      <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />
      <BookingStats stats={stats} />

      {/* Search + Sort + Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by tracking #, city, or name…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
          />
        </div>
        <button
          onClick={() => setSortOrder(prev => prev === 'newest' ? 'oldest' : 'newest')}
          className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors bg-white"
        >
          {sortOrder === 'newest' ? <SortDesc className="w-4 h-4" /> : <SortAsc className="w-4 h-4" />}
          {sortOrder === 'newest' ? 'Newest' : 'Oldest'}
        </button>
      </div>

      <BookingFilters filter={filter} setFilter={setFilter} />

      {processedBookings.length === 0 ? (
        search.trim() ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
            <Search className="w-10 h-10 text-gray-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No results found</h3>
            <p className="text-gray-500 text-sm">Try a different search term or clear your filters.</p>
            <button
              onClick={() => { setSearch(''); setFilter('all') }}
              className="mt-4 text-sm text-blue-600 font-semibold hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <EmptyBookings />
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {processedBookings.map((booking, index) => (
            <BookingCard
              key={booking.id || booking.tracking_number || booking._id || index}
              booking={{ ...booking, calculatedPrice: calculateBookingPrice(booking) }}
              onViewDetails={setSelectedBooking}
              onEdit={setEditBooking}
              onCancel={setCancelBookingModal}
              onPayNow={handlePayNow}
            />
          ))}
        </div>
      )}

      {/* Result count */}
      {processedBookings.length > 0 && (
        <div className="text-center text-xs font-medium text-gray-400">
          Showing {processedBookings.length} of {bookings.length} bookings
        </div>
      )}

      <BookingDetailsModal
        booking={selectedBooking ? { ...selectedBooking, calculatedPrice: calculateBookingPrice(selectedBooking) } : null}
        onClose={() => setSelectedBooking(null)}
        getStatusBadge={getStatusBadge}
        getStatusText={getStatusText}
      />

      {editBooking && (
        <BookingModification
          booking={editBooking}
          onSuccess={() => {
            setEditBooking(null)
            refetch()
          }}
          onClose={() => setEditBooking(null)}
        />
      )}

      {cancelBookingModal && (
        <BookingCancellation
          booking={cancelBookingModal}
          onSuccess={() => {
            setCancelBookingModal(null)
            refetch()
          }}
          onClose={() => setCancelBookingModal(null)}
        />
      )}

      {paymentBooking && (
        <PaymentSelectionModal
          booking={paymentBooking}
          user={user}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onSuccess={handlePaymentSuccess}
          onClose={() => setPaymentBooking(null)}
        />
      )}
    </div>
  )
}
