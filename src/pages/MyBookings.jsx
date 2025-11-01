import { useState, useMemo } from 'react'
import { PageHeader } from '../components/dashboard'
import { useNavigate } from 'react-router-dom'
import BookingCard from '../components/bookings/BookingCard'
import BookingStats from '../components/bookings/BookingStats'
import BookingFilters from '../components/bookings/BookingFilters'
import EmptyBookings from '../components/bookings/EmptyBookings'
import BookingDetailsModal from '../components/bookings/BookingDetailsModal'
import BookingEditModal from '../components/bookings/BookingEditModal'
import { useBookings } from '../hooks/useBookings'
import { getStatusBadge, getStatusText, calculateBookingPrice, getBookingStats } from '../utils/bookingUtils'

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const { bookings, loading, cancelBooking, updateBooking } = useBookings()

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
              onCancel={cancelBooking}
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

      <BookingEditModal
        booking={editBooking}
        onClose={() => setEditBooking(null)}
        onSave={async (updateData) => {
          await updateBooking(editBooking._id, updateData)
          setEditBooking(null)
        }}
      />
    </div>
  )
}
