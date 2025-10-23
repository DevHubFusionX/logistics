import { motion } from 'framer-motion'
import { Truck, Plane, Ship, Package, Download, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ActiveShipments({ bookings, loading }) {
  const recentShipments = bookings.slice(0, 3).map(booking => ({
    id: booking._id?.slice(-8) || 'N/A',
    fullId: booking._id,
    from: `${booking.pickupLocation?.city}, ${booking.pickupLocation?.state}`,
    to: `${booking.dropoffLocation?.city}, ${booking.dropoffLocation?.state}`,
    status: booking.status,
    type: booking.vehicleType?.toLowerCase().includes('truck') ? 'ground' : 'air',
    progress: booking.status?.toLowerCase() === 'delivered' ? 100 : booking.status?.toLowerCase() === 'in-transit' ? 65 : 30,
    eta: new Date(booking.estimatedDeliveryDate).toLocaleDateString(),
    weight: `${booking.cargoWeightKg} kg`,
    value: booking.goodsType
  }))

  const getServiceIcon = (type) => {
    const icons = { ground: Truck, air: Plane, ocean: Ship }
    return icons[type] || Package
  }

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'in-transit': return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'delivered': return 'bg-green-50 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'confirmed': return 'bg-purple-50 text-purple-700 border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border-gray-200';
    }
  }

  return (
    <motion.div 
      className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg sm:text-xl font-bold text-gray-900">Recent Bookings</h2>
        <Link to="/bookings">
          <button className="flex items-center gap-2 text-sky-600 hover:text-sky-700 text-sm font-medium transition-colors">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-600 mx-auto"></div>
        </div>
      ) : recentShipments.length === 0 ? (
        <div className="text-center py-12">
          <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No active shipments</p>
        </div>
      ) : (
        <div className="space-y-3">
          {recentShipments.map((shipment, index) => {
          const ServiceIcon = getServiceIcon(shipment.type)
          return (
            <Link key={shipment.id} to={`/bookings/${shipment.fullId}`}>
              <motion.div 
                className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:bg-white hover:shadow-md transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                      <ServiceIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900 text-sm">ID: {shipment.id}</h3>
                      <p className="text-xs text-gray-600">{shipment.from} → {shipment.to}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${getStatusColor(shipment.status)}`}>
                    {shipment.status}
                  </span>
                </div>
                {shipment.status?.toLowerCase() !== 'delivered' && (
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-sky-400 to-sky-600 h-2 rounded-full transition-all"
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                )}
              </motion.div>
            </Link>
          )
          })}
        </div>
      )}
    </motion.div>
  )
}