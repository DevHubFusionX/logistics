import { Mail, Phone, Truck, Star, MapPin, Package } from 'lucide-react'

export default function DriverCard({ driver, onView }) {
  const statusColors = {
    active: 'bg-green-100 text-green-700',
    busy: 'bg-yellow-100 text-yellow-700',
    offline: 'bg-gray-100 text-gray-700'
  }
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{driver.name}</h3>
          <p className="text-sm text-gray-500">{driver.id}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[driver.status]}`}>
          {driver.status}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Truck className="w-4 h-4 flex-shrink-0" />
          <span>{driver.vehicle}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{driver.location}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span>{driver.phone}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-semibold">{driver.rating}</span>
          </div>
          <p className="text-xs text-gray-500">Rating</p>
        </div>
        <div className="text-center p-2 bg-gray-50 rounded">
          <div className="flex items-center justify-center gap-1 mb-1">
            <Package className="w-3 h-3 text-blue-500" />
            <span className="text-sm font-semibold">{driver.totalDeliveries}</span>
          </div>
          <p className="text-xs text-gray-500">Deliveries</p>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-600">On-time Rate</span>
          <span className="font-semibold text-gray-900">{driver.onTimeRate}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${driver.onTimeRate}%` }}
          ></div>
        </div>
      </div>
      
      <button 
        onClick={() => onView(driver.id)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        View Profile
      </button>
    </div>
  )
}