import { useState, useMemo } from 'react'
import { PageHeader } from '../components/dashboard'
import { useNavigate } from 'react-router-dom'
import paymentService from '../services/paymentService'
import toast from 'react-hot-toast'
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

  const handlePayNow = async (booking) => {
    const bookingId = booking._id || booking.bookingId
    const amount = booking.calculatedPrice || booking.totalCost || booking.estimatedCost || booking.amount
    
    try {
      const response = await paymentService.initializePayment(bookingId)
      if (response.data && response.data.authorization_url) {
        localStorage.setItem('currentBookingId', bookingId)
        window.location.href = response.data.authorization_url
      } else {
        toast.error('Failed to initialize payment')
      }
    } catch (error) {
      if (error.message === 'Payment already processing') {
        toast.error('Payment session is active (expires in 15-30 min). Wait or contact support.', { duration: 8000 })
        setTimeout(() => {
          if (window.confirm('Payment is locked for this booking.\n\nOptions:\n1. Wait 15-30 minutes for it to expire\n2. Contact support to reset\n3. Create a new booking\n\nRefresh the page to check status?')) {
            window.location.reload()
          }
        }, 1000)
      } else {
        toast.error(error.message || 'Could not initialize payment')
      }
    }
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
