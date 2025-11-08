import { useState, useEffect } from 'react'
import { Search, MapPin, Package, Truck, CheckCircle, Clock, AlertCircle, RefreshCw } from 'lucide-react'
import bookingService from '../services/bookingService'
import toast from 'react-hot-toast'

export default function Tracking() {
  const [trackingId, setTrackingId] = useState('')
  const [shipment, setShipment] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [autoRefresh, setAutoRefresh] = useState(false)

  useEffect(() => {
    let interval
    if (autoRefresh && shipment && shipment.status !== 'delivered' && shipment.status !== 'cancelled') {
      interval = setInterval(() => {
        handleTrack(null, true)
      }, 30000)
    }
    return () => clearInterval(interval)
  }, [autoRefresh, shipment])

  const handleTrack = async (e, silent = false) => {
    if (e) e.preventDefault()
    if (!trackingId.trim()) {
      toast.error('Please enter a tracking ID')
      return
    }
    
    setLoading(true)
    setError(null)
    
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)
    
    try {
      const response = await bookingService.getBookingById(trackingId)
      const booking = response.data || response
      
      if (!booking) {
        throw new Error('No booking data received')
      }
      
      setShipment({
        id: booking.bookingId || booking._id,
        status: booking.status,
        origin: `${booking.pickupLocation?.city || 'N/A'}`,
        destination: `${booking.dropoffLocation?.city || 'N/A'}`,
        currentLocation: booking.currentLocation?.city || 'Tracking will be available once driver is assigned',
        estimatedDelivery: booking.estimatedDeliveryDate ? new Date(booking.estimatedDeliveryDate).toLocaleDateString() : 'TBD',
        driver: booking.driver?.name || 'Not assigned',
        vehicle: booking.vehicle?.registrationNumber || 'Not assigned',
        timeline: [
          { status: 'Booked', date: new Date(booking.createdAt).toLocaleString(), completed: true },
          { status: 'Confirmed', date: booking.confirmedAt ? new Date(booking.confirmedAt).toLocaleString() : 'Pending', completed: ['confirmed', 'in_transit', 'delivered'].includes(booking.status) },
          { status: 'In Transit', date: booking.inTransitAt ? new Date(booking.inTransitAt).toLocaleString() : 'Pending', completed: ['in_transit', 'delivered'].includes(booking.status) },
          { status: 'Delivered', date: booking.deliveredAt ? new Date(booking.deliveredAt).toLocaleString() : 'Pending', completed: booking.status === 'delivered' }
        ]
      })
      
      if (!silent) {
        toast.success('Shipment found!')
      }
    } catch (error) {
      clearTimeout(timeoutId)
      if (error.name === 'AbortError') {
        setError('Request timed out. Please try again.')
        toast.error('Request timed out')
      } else {
        const message = error.response?.data?.message || error.message || 'Booking not found'
        setError(message)
        toast.error(message)
      }
      setShipment(null)
      setAutoRefresh(false)
    } finally {
      clearTimeout(timeoutId)
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
          <p className="text-gray-600">Enter your tracking ID to see real-time updates</p>
        </div>

        <form onSubmit={handleTrack} className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value.trim())}
              placeholder="Enter Tracking ID (e.g., BK-1234567890)"
              className="flex-1 px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              disabled={loading}
            />
            <button type="submit" disabled={loading} className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-colors">
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <Search className="w-5 h-5" />
              )}
              {loading ? 'Tracking...' : 'Track'}
            </button>
          </div>
          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}
        </form>

        {shipment && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Tracking ID: {shipment.id}</h2>
                  <p className="text-gray-600">Status: <span className="font-semibold text-blue-600 capitalize">{shipment.status.replace('_', ' ')}</span></p>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleTrack(null, true)}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg disabled:opacity-50 transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Refresh
                  </button>
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Est. Delivery</p>
                    <p className="text-sm sm:text-lg font-bold">{shipment.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <input
                  type="checkbox"
                  id="autoRefresh"
                  checked={autoRefresh}
                  onChange={(e) => setAutoRefresh(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                  disabled={shipment.status === 'delivered' || shipment.status === 'cancelled'}
                />
                <label htmlFor="autoRefresh" className="text-sm text-gray-700">
                  Auto-refresh every 30 seconds
                </label>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Truck className="w-8 h-8 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600">Driver</p>
                    <p className="font-semibold text-sm">{shipment.driver}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                  <Package className="w-8 h-8 text-indigo-600" />
                  <div>
                    <p className="text-xs text-gray-600">Vehicle</p>
                    <p className="font-semibold text-sm">{shipment.vehicle}</p>
                  </div>
                </div>
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
