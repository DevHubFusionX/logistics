import { useState, useMemo } from 'react'
import { PageHeader } from '../components/dashboard'
import { useNavigate } from 'react-router-dom'
import { 
  BookingCard, 
  BookingStats, 
  BookingFilters, 
  EmptyBookings, 
  BookingDetailsModal, 
  BookingModification,
  BookingCancellation 
} from '../components/bookings'
import { useBookings } from '../hooks/useBookings'
import { getStatusBadge, getStatusText, calculateBookingPrice, getBookingStats } from '../utils/bookingUtils'

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [cancelBookingModal, setCancelBookingModal] = useState(null)
  const { bookings, loading, refetch } = useBookings()

  const filteredBookings = useMemo(() => 
    filter === 'all' ? bookings : bookings.filter(b => b.status === filter),
    [bookings, filter]
  )

  const stats = useMemo(() => getBookingStats(bookings), [bookings])

  const handlePayNow = (booking) => {
    navigate('/booking/payment', { 
      state: { 
        bookingId: booking._id || booking.bookingId, 
        amount: booking.calculatedPrice || booking.totalCost || booking.estimatedCost,
        email: booking.email
      } 
    })
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
        <div className="grid gap-3 sm:gap-4">
          {filteredBookings.map((booking, index) => (
            <BookingCard
              key={booking._id || booking.bookingId || index}
              booking={{...booking, calculatedPrice: calculateBookingPrice(booking)}}
              onViewDetails={setSelectedBooking}
              onEdit={setEditBooking}
              onCancel={setCancelBookingModal}
              onPayNow={handlePayNow}
              getStatusBadge={getStatusBadge}
              getStatusText={getStatusText}
            />
          ))}
        </div>
      )}

      <BookingDetailsModal
        booking={selectedBooking ? {...selectedBooking, calculatedPrice: calculateBookingPrice(selectedBooking)} : null}
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
    </div>
  )
}
