import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { useNavigate } from 'react-router-dom'
import paymentService from '../../services/paymentService'
import toast from 'react-hot-toast'
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

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [cancelBookingModal, setCancelBookingModal] = useState(null)
  const [paymentBooking, setPaymentBooking] = useState(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const { user } = useAuthState()
  // TanStack Query automatically handles caching, background refetching, and loading states
  const { data: bookings = [], isLoading: loading, refetch } = useBookingsQuery()

  const filteredBookings = useMemo(() =>
    filter === 'all' ? bookings : bookings.filter(b => b.status === filter),
    [bookings, filter]
  )

  const stats = useMemo(() => getBookingStats(bookings), [bookings])

  const handlePayNow = (booking) => {
    setPaymentBooking(booking)
  }

  const handlePaymentSuccess = () => {
    setPaymentBooking(null)
    refetch()
    toast.success('Payment completed successfully!')
  }

  if (loading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
      <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />
      <BookingStats stats={stats} />
      <BookingFilters filter={filter} setFilter={setFilter} />

      {filteredBookings.length === 0 ? (
        <EmptyBookings />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
          {filteredBookings.map((booking, index) => (
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
