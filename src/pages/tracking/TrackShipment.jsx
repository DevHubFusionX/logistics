import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Package, Truck, MapPin, Clock, CheckCircle, Download, Bell, Phone, Mail } from 'lucide-react'

export default function TrackShipment() {
  const [trackingId, setTrackingId] = useState('')
  const [shipmentData, setShipmentData] = useState(null)
  const [loading, setLoading] = useState(false)

  // Mock shipment data
  const mockShipment = {
    id: 'DL-1001',
    status: 'In Transit',
    from: { address: 'New York, NY 10001', contact: 'ABC Corp' },
    to: { address: 'Los Angeles, CA 90210', contact: 'XYZ Industries' },
    driver: { name: 'Mike Johnson', phone: '+1 (555) 123-4567', truck: 'TR-4521' },
    estimatedDelivery: '2024-01-15',
    currentLocation: 'Denver, CO',
    progress: 65,
    timeline: [
      { status: 'Booking Confirmed', time: '2024-01-12 09:00', completed: true, description: 'Order placed and payment confirmed' },
      { status: 'Assigned', time: '2024-01-12 14:30', completed: true, description: 'Truck TR-4521 assigned with driver Mike Johnson' },
      { status: 'Picked Up', time: '2024-01-13 08:15', completed: true, description: 'Package collected from New York facility' },
      { status: 'In Transit', time: '2024-01-13 10:00', completed: true, description: 'Currently in Denver, CO - On schedule' },
      { status: 'Out for Delivery', time: 'Expected 2024-01-15 08:00', completed: false, description: 'Final delivery to Los Angeles' },
      { status: 'Delivered', time: 'Expected 2024-01-15 17:00', completed: false, description: 'Package delivered to recipient' }
    ]
  }

  const handleTrack = (e) => {
    e.preventDefault()
    if (!trackingId.trim()) return
    
    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setShipmentData(mockShipment)
      setLoading(false)
    }, 1500)
  }

  const getStatusColor = (status) => {
    const colors = {
      'Booking Confirmed': 'bg-blue-500',
      'Assigned': 'bg-purple-500',
      'Picked Up': 'bg-yellow-500',
      'In Transit': 'bg-orange-500',
      'Out for Delivery': 'bg-indigo-500',
      'Delivered': 'bg-green-500'
    }
    return colors[status] || 'bg-gray-400'
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Shipment</h1>
          <p className="text-gray-600">Enter your tracking ID to get real-time updates</p>
        </motion.div>

        {/* Search Form */}
        <motion.div 
          className="bg-white rounded-2xl shadow-lg p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <form onSubmit={handleTrack} className="flex gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                placeholder="Enter tracking ID (e.g., DL-1001)"
              />
            </div>
            <motion.button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
            >
              <Search className="w-5 h-5" />
              {loading ? 'Tracking...' : 'Track'}
            </motion.button>
          </form>
        </motion.div>

        {/* Shipment Details */}
        {shipmentData && (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Tracking Info */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              {/* Status Overview */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{shipmentData.id}</h2>
                    <p className="text-gray-600">Current Status: <span className="font-semibold text-sky-600">{shipmentData.status}</span></p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Estimated Delivery</p>
                    <p className="text-lg font-semibold text-gray-900">{shipmentData.estimatedDelivery}</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Progress</span>
                    <span>{shipmentData.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <motion.div 
                      className="bg-sky-500 h-3 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${shipmentData.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </div>
                </div>

                {/* Route Info */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-green-500" />
                      From
                    </h3>
                    <p className="text-gray-700">{shipmentData.from.contact}</p>
                    <p className="text-gray-600 text-sm">{shipmentData.from.address}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-red-500" />
                      To
                    </h3>
                    <p className="text-gray-700">{shipmentData.to.contact}</p>
                    <p className="text-gray-600 text-sm">{shipmentData.to.address}</p>
                  </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Shipment Timeline</h3>
                <div className="space-y-4">
                  {shipmentData.timeline.map((event, index) => (
                    <motion.div 
                      key={index}
                      className="flex gap-4"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${event.completed ? getStatusColor(event.status) : 'bg-gray-300'}`} />
                        {index < shipmentData.timeline.length - 1 && (
                          <div className={`w-0.5 h-12 mt-2 ${event.completed ? 'bg-gray-300' : 'bg-gray-200'}`} />
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`font-semibold ${event.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                            {event.status}
                          </h4>
                          <span className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                            {event.time}
                          </span>
                        </div>
                        <p className={`text-sm ${event.completed ? 'text-gray-600' : 'text-gray-400'}`}>
                          {event.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div 
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {/* Driver Info */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Truck className="w-5 h-5" />
                  Driver Information
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{shipmentData.driver.name}</p>
                    <p className="text-gray-600 text-sm">Truck: {shipmentData.driver.truck}</p>
                  </div>
                  <button className="w-full flex items-center justify-center gap-2 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                    <Phone className="w-4 h-4" />
                    Call Driver
                  </button>
                </div>
              </div>

              {/* Current Location */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Current Location
                </h3>
                <p className="text-gray-700 font-semibold">{shipmentData.currentLocation}</p>
                <p className="text-gray-600 text-sm mt-1">Last updated: 2 hours ago</p>
              </div>

              {/* Notifications */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Mail className="w-4 h-4" />
                    Email Updates
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                    <Phone className="w-4 h-4" />
                    SMS Alerts
                  </button>
                </div>
              </div>

              {/* Actions */}
              {shipmentData.status === 'Delivered' && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Documents</h3>
                  <button className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition-colors">
                    <Download className="w-4 h-4" />
                    Download Invoice
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}

        {/* Sample Tracking IDs */}
        {!shipmentData && (
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Try Sample Tracking IDs</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['DL-1001', 'DL-1002', 'DL-1003'].map((id) => (
                <button
                  key={id}
                  onClick={() => setTrackingId(id)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  {id}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}