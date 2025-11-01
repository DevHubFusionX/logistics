import { useState, useEffect } from 'react'
import { PageHeader } from '../components/dashboard'
import { Package, Clock, Info, TrendingUp, Truck, CheckCircle, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import bookingService from '../services/bookingService'
import toast from 'react-hot-toast'
import BookingCard from '../components/bookings/BookingCard'
import BookingDetailsModal from '../components/bookings/BookingDetailsModal'
import BookingEditModal from '../components/bookings/BookingEditModal'

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [editBooking, setEditBooking] = useState(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await bookingService.getBookings()
      setBookings(response.data?.records || [])
    } catch (error) {
      console.error('Error fetching bookings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateBooking = async () => {
    setSaving(true)
    try {
      await bookingService.updateBooking(editBooking._id, editBooking)
      toast.success('Booking updated successfully!')
      setEditBooking(null)
      fetchBookings()
    } catch (error) {
      toast.error('Failed to update booking')
    } finally {
      setSaving(false)
    }
  }

  const handleCancelBooking = async (bookingId) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    try {
      await bookingService.cancelBooking(bookingId)
      toast.success('Booking cancelled successfully!')
      fetchBookings()
    } catch (error) {
      toast.error('Failed to cancel booking')
    }
  }

  const filteredBookings = filter === 'all'
    ? bookings
    : bookings.filter(b => b.status === filter)

  const pendingCount = bookings.filter(b => b.status === 'pending').length
  const activeCount = bookings.filter(b => b.status === 'in_transit' || b.status === 'confirmed').length
  const deliveredThisMonth = bookings.filter(b => b.status === 'delivered').length
  const outstandingInvoices = bookings.filter(b => b.paymentStatus === 'unpaid').length

  const handlePayNow = (booking) => {
    navigate('/booking/payment', { state: { bookingId: booking.id, amount: booking.amount } })
  }

  const getStatusBadge = (status) => {
    const badges = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      in_transit: 'bg-green-100 text-green-700',
      delivered: 'bg-gray-100 text-gray-700',
      cancelled: 'bg-red-100 text-red-700'
    }
    return badges[status] || 'bg-gray-100 text-gray-700'
  }

  const getStatusText = (status) => {
    const texts = {
      pending: 'Pending Review',
      confirmed: 'Confirmed',
      in_transit: 'In Transit',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    }
    return texts[status] || status
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
    <div className="space-y-6 pb-6">
      <PageHeader title="My Bookings" subtitle="View and track all your shipment bookings" />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border border-yellow-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <span className="text-xs font-medium text-yellow-600">Pending</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{pendingCount}</p>
          <p className="text-sm text-gray-600 mt-1">Awaiting confirmation</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <span className="text-xs font-medium text-green-600">Active</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{activeCount}</p>
          <p className="text-sm text-gray-600 mt-1">In transit or confirmed</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-xs font-medium text-blue-600">Delivered</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{deliveredThisMonth}</p>
          <p className="text-sm text-gray-600 mt-1">This month</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 bg-orange-100 rounded-lg">
              <AlertCircle className="w-5 h-5 text-orange-600" />
            </div>
            <span className="text-xs font-medium text-orange-600">Outstanding</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{outstandingInvoices}</p>
          <p className="text-sm text-gray-600 mt-1">Pending invoices</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={() => navigate('/booking/request')} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm">
          + New Booking
        </button>
        <button onClick={() => navigate('/booking-status-guide')} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
          <Info className="w-4 h-4" />
          Status Guide
        </button>

        <div className="flex gap-2 ml-auto">
          {['all', 'pending', 'in_transit', 'delivered'].map(status => (
            <button key={status} onClick={() => setFilter(status)} className={`px-4 py-2 rounded-lg transition-colors font-medium ${filter === status ? 'bg-blue-100 text-blue-700 border border-blue-200' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
              {status === 'all' ? 'All' : getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map((booking, index) => (
          <BookingCard
            key={booking._id || booking.bookingId || index}
            booking={booking}
            onViewDetails={setSelectedBooking}
            onEdit={setEditBooking}
            onCancel={handleCancelBooking}
            onPayNow={handlePayNow}
            getStatusBadge={getStatusBadge}
            getStatusText={getStatusText}
          />
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-4">You haven't created any bookings yet</p>
          <button onClick={() => navigate('/booking/request')} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
            Create Your First Booking
          </button>
        </div>
      )}

      <BookingDetailsModal
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
        getStatusBadge={getStatusBadge}
        getStatusText={getStatusText}
      />

      <BookingEditModal
        booking={editBooking}
        onClose={() => setEditBooking(null)}
        onSave={setEditBooking}
        onUpdate={handleUpdateBooking}
        saving={saving}
      />
    </div>
  )
}
