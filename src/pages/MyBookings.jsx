import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { Package, MapPin, Clock, Eye, Download, Info } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function MyBookings() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  // Mock data - replace with API call filtered by logged-in user
  const bookings = [
    {
      id: 'BK-1001',
      pickupCity: 'Lagos',
      deliveryCity: 'Abuja',
      cargoType: 'Frozen Foods',
      weight: '5 tons',
      status: 'in_transit',
      createdDate: '2024-01-15',
      estimatedDelivery: '2024-01-16',
      amount: 112.37,
      driver: 'Adebayo Ogun',
      trackingId: 'TR-5001'
    },
    {
      id: 'BK-1002',
      pickupCity: 'Kano',
      deliveryCity: 'Port Harcourt',
      cargoType: 'Perishable Goods',
      weight: '3 tons',
      status: 'pending',
      createdDate: '2024-01-14',
      estimatedDelivery: '2024-01-17',
      amount: 245.80,
      driver: null,
      trackingId: null
    },
    {
      id: 'BK-1003',
      pickupCity: 'Abuja',
      deliveryCity: 'Lagos',
      cargoType: 'General Cargo',
      weight: '2 tons',
      status: 'delivered',
      createdDate: '2024-01-10',
      estimatedDelivery: '2024-01-12',
      actualDelivery: '2024-01-12',
      amount: 189.50,
      driver: 'Chidi Okoro',
      trackingId: 'TR-4998'
    }
  ]

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(b => b.status === filter)

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

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="My Bookings"
        subtitle="View and track all your shipment bookings"
      />

      <div className="flex flex-wrap gap-3">
        <button
          onClick={() => navigate('/booking/request')}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
        >
          + New Booking
        </button>
        <button
          onClick={() => navigate('/booking-status-guide')}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          <Info className="w-4 h-4" />
          Status Guide
        </button>
        
        <div className="flex gap-2 ml-auto">
          {['all', 'pending', 'in_transit', 'delivered'].map(status => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors font-medium ${
                filter === status
                  ? 'bg-blue-100 text-blue-700 border border-blue-200'
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {status === 'all' ? 'All' : getStatusText(status)}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredBookings.map(booking => (
          <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">{booking.id}</h3>
                  <p className="text-sm text-gray-600">{booking.cargoType} • {booking.weight}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-4">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="font-semibold text-gray-900">{booking.pickupCity}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-600 mt-1" />
                <div>
                  <p className="text-xs text-gray-500">Delivery</p>
                  <p className="font-semibold text-gray-900">{booking.deliveryCity}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>Created: {booking.createdDate}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>ETA: {booking.estimatedDelivery}</span>
              </div>
              {booking.driver && (
                <div className="flex items-center gap-1">
                  <span>Driver: {booking.driver}</span>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-xl font-bold text-gray-900">₦{booking.amount.toFixed(2)}</p>
              </div>
              <div className="flex gap-2">
                {booking.trackingId && (
                  <button
                    onClick={() => navigate(`/tracking/${booking.trackingId}`)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <Eye className="w-4 h-4" />
                    Track
                  </button>
                )}
                {booking.status === 'delivered' && (
                  <button
                    onClick={() => navigate(`/tracking/invoice/${booking.id}`)}
                    className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Download className="w-4 h-4" />
                    Invoice
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
          <p className="text-gray-600 mb-4">You haven't created any bookings yet</p>
          <button
            onClick={() => navigate('/booking/request')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Create Your First Booking
          </button>
        </div>
      )}
    </div>
  )
}
