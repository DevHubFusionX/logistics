import { useState } from 'react'
import { Search, MapPin, Package, Truck, CheckCircle, Clock } from 'lucide-react'
import bookingService from '../../services/bookingService'
import toast from 'react-hot-toast'

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState('')
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrack = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await bookingService.getBookingById(trackingId)
      const booking = response.data || response
      setShipment({
        id: booking.bookingId || booking._id,
        status: booking.status,
        origin: `${booking.pickupLocation?.city || 'N/A'}`,
        destination: `${booking.dropoffLocation?.city || 'N/A'}`,
        currentLocation: booking.currentLocation?.city || 'Tracking will be available once driver is assigned',
        estimatedDelivery: new Date(booking.estimatedDeliveryDate).toLocaleDateString(),
        timeline: [
          { status: 'Booked', date: new Date(booking.createdAt).toLocaleString(), completed: true },
          { status: 'Confirmed', date: 'Pending', completed: ['confirmed', 'in_transit', 'delivered'].includes(booking.status) },
          { status: 'In Transit', date: 'Pending', completed: ['in_transit', 'delivered'].includes(booking.status) },
          { status: 'Delivered', date: 'Pending', completed: booking.status === 'delivered' }
        ]
      })
    } catch (error) {
      toast.error('Booking not found')
      setShipment(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
          <p className="text-gray-600">Enter your tracking ID to see real-time updates</p>
        </div>

        <form onSubmit={handleTrack} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter Tracking ID (e.g., BK-1234567890)"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
            <button type="submit" disabled={loading} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
        </form>

        {shipment && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Tracking ID: {shipment.id}</h2>
                  <p className="text-gray-600">Status: <span className="font-semibold text-blue-600 capitalize">{shipment.status.replace('_', ' ')}</span></p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Estimated Delivery</p>
                  <p className="text-lg font-bold">{shipment.estimatedDelivery}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <MapPin className="w-8 h-8 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Origin</p>
                    <p className="font-semibold">{shipment.origin}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-8 h-8 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Current Location</p>
                    <p className="font-semibold">{shipment.currentLocation}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Package className="w-8 h-8 text-orange-600" />
                  <div>
                    <p className="text-xs text-gray-600">Destination</p>
                    <p className="font-semibold">{shipment.destination}</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                <div className="space-y-6">
                  {shipment.timeline.map((event, index) => (
                    <div key={index} className="relative flex items-start gap-4">
                      <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center ${event.completed ? 'bg-green-500' : 'bg-gray-300'}`}>
                        {event.completed ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <Clock className="w-5 h-5 text-white" />
                        )}
                      </div>
                      <div className="flex-1 pb-6">
                        <h3 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                          {event.status}
                        </h3>
                        <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-sm text-blue-800">Contact our support team at support@logistics.com or call +234 800 123 4567</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
