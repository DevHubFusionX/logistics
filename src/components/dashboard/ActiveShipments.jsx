import { motion } from 'framer-motion'
import { Truck, Plane, Ship, Package, Download, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ActiveShipments() {
  const recentShipments = [
    { id: 'DL-1001', from: 'New York, NY', to: 'Los Angeles, CA', status: 'In Transit', type: 'ground', progress: 65, eta: '2 days', weight: '2,500 kg', value: '$1,250' },
    { id: 'DL-1002', from: 'Chicago, IL', to: 'Miami, FL', status: 'Delivered', type: 'air', progress: 100, eta: 'Delivered', weight: '850 kg', value: '$2,100' },
    { id: 'DL-1003', from: 'Seattle, WA', to: 'Boston, MA', status: 'Processing', type: 'ground', progress: 15, eta: '4 days', weight: '3,200 kg', value: '$980' },
    { id: 'DL-1004', from: 'San Francisco, CA', to: 'Houston, TX', status: 'Picked Up', type: 'air', progress: 30, eta: '1 day', weight: '1,100 kg', value: '$1,850' }
  ]

  const getServiceIcon = (type) => {
    const icons = { ground: Truck, air: Plane, ocean: Ship }
    return icons[type] || Package
  }

  const getStatusColor = (status) => {
    const colors = {
      'In Transit': 'bg-blue-50 text-blue-700 border-blue-200',
      'Delivered': 'bg-green-50 text-green-700 border-green-200',
      'Processing': 'bg-yellow-50 text-yellow-700 border-yellow-200',
      'Picked Up': 'bg-purple-50 text-purple-700 border-purple-200'
    }
    return colors[status] || 'bg-gray-50 text-gray-700 border-gray-200'
  }

  return (
    <motion.div 
      className="lg:col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg border border-white/50 p-4 sm:p-6 lg:p-8"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.4 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4 sm:gap-0">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Active Shipments</h2>
          <p className="text-gray-600 text-sm sm:text-base">Monitor your current logistics operations</p>
        </div>
        <Link to="/tracking">
          <button className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors">
            View All
            <ArrowRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
      <div className="space-y-4 sm:space-y-6">
        {recentShipments.map((shipment, index) => {
          const ServiceIcon = getServiceIcon(shipment.type)
          return (
            <motion.div 
              key={shipment.id}
              className="p-4 sm:p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              whileHover={{ scale: 1.01, y: -2 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-sky-400 to-sky-600 rounded-xl flex items-center justify-center shadow-md">
                    <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
                      <h3 className="font-bold text-gray-900 text-base sm:text-lg">{shipment.id}</h3>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(shipment.status)}`}>
                        {shipment.status}
                      </span>
                    </div>
                    <p className="text-gray-700 font-medium mb-1 text-sm sm:text-base">{shipment.from} → {shipment.to}</p>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span>Weight: {shipment.weight}</span>
                      <span>Value: {shipment.value}</span>
                      <span>ETA: {shipment.eta}</span>
                    </div>
                  </div>
                </div>
              </div>
              {shipment.status !== 'Delivered' && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Progress</span>
                    <span className="text-sm font-medium text-gray-900">{shipment.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-sky-400 to-sky-600 h-3 rounded-full transition-all duration-500"
                      style={{ width: `${shipment.progress}%` }}
                    />
                  </div>
                </div>
              )}
              {shipment.status === 'Delivered' && (
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-green-700 font-medium">✓ Delivery Completed</span>
                  <Link to={`/invoice/${shipment.id}`}>
                    <button className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors">
                      <Download className="w-4 h-4" />
                      Download Invoice
                    </button>
                  </Link>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}