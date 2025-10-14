import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Package, MapPin, Phone, Calendar, Truck } from 'lucide-react'
import ApiService from '../../services/api'

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filters, setFilters] = useState({
    page: 1,
    limit: 10,
    status: ''
  })

  useEffect(() => {
    fetchBookings()
  }, [filters])

  const fetchBookings = async () => {
    try {
      setLoading(true)
      const response = await ApiService.getAllBookings(filters)
      if (response.success) {
        setBookings(response.data)
      }
    } catch (error) {
      setError(error.message || 'Failed to fetch bookings')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      in_transit: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    }
    return colors[status] || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return <div className="flex justify-center py-8">Loading bookings...</div>
  }

  if (error) {
    return <div className="text-red-600 text-center py-8">{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Your Bookings</h2>
        <select
          value={filters.status}
          onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="in_transit">In Transit</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="grid gap-6">
        {bookings.map((booking, index) => (
          <motion.div
            key={booking._id}
            className="bg-white p-6 rounded-xl border border-gray-200 hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {booking.fullNameOrBusiness}
                </h3>
                <p className="text-gray-600 flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  {booking.contactPhone}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(booking.status)}`}>
                {booking.status?.replace('_', ' ').toUpperCase()}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Pickup</p>
                  <p className="text-sm text-gray-600">
                    {booking.pickupLocation?.address}, {booking.pickupLocation?.city}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Dropoff</p>
                  <p className="text-sm text-gray-600">
                    {booking.dropoffLocation?.address}, {booking.dropoffLocation?.city}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600">
              <span className="flex items-center gap-1">
                <Package className="w-4 h-4" />
                {booking.goodsType}
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-4 h-4" />
                {booking.cargoWeightKg} kg
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(booking.createdAt).toLocaleDateString()}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {bookings.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No bookings found</p>
        </div>
      )}
    </div>
  )
}