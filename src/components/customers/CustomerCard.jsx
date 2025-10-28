import { Mail, Phone, MapPin, Package, DollarSign, Calendar } from 'lucide-react'
import { customerTiers } from './customersData'

export default function CustomerCard({ customer, onView }) {
  const tier = customerTiers[customer.tier]
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 truncate">{customer.name}</h3>
          <p className="text-sm text-gray-500 truncate">{customer.id}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${tier.color}`}>
          {tier.label}
        </span>
      </div>
      
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Mail className="w-4 h-4 flex-shrink-0" />
          <span className="truncate">{customer.email}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Phone className="w-4 h-4 flex-shrink-0" />
          <span>{customer.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4 flex-shrink-0" />
          <span>{customer.location}</span>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <div className="flex items-center gap-1 text-gray-500 mb-1">
            <Package className="w-3 h-3" />
            <span>Shipments</span>
          </div>
          <p className="font-semibold text-gray-900">{customer.totalShipments}</p>
        </div>
        <div>
          <div className="flex items-center gap-1 text-gray-500 mb-1">
            <DollarSign className="w-3 h-3" />
            <span>Revenue</span>
          </div>
          <p className="font-semibold text-gray-900">${(customer.revenue / 1000).toFixed(0)}k</p>
        </div>
      </div>
      
      <button 
        onClick={() => onView(customer.id)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
      >
        View Details
      </button>
    </div>
  )
}