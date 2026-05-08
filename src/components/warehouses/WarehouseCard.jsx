import { MapPin, Package, TrendingUp, Clock, AlertTriangle } from 'lucide-react'

export default function WarehouseCard({ warehouse, onClick }) {
  const getUtilizationColor = (percentage) => {
    if (percentage >= 90) return 'text-red-600 bg-red-50'
    if (percentage >= 75) return 'text-yellow-600 bg-yellow-50'
    return 'text-green-600 bg-green-50'
  }

  return (
    <div 
      className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onClick(warehouse.id)}
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">{warehouse.name}</h3>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
            <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{warehouse.location}</span>
          </div>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${getUtilizationColor(warehouse.utilization)}`}>
          {warehouse.utilization}%
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{warehouse.capacity.toLocaleString()}</div>
          <div className="text-xs text-gray-500">Capacity (sqft)</div>
        </div>
        <div className="text-center">
          <div className="text-lg sm:text-2xl font-bold text-gray-900">{warehouse.activeSkus}</div>
          <div className="text-xs text-gray-500">Active SKUs</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
        <div className="flex items-center text-green-600">
          <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span>{warehouse.inbound}</span>
        </div>
        <div className="flex items-center text-blue-600">
          <Package className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span>{warehouse.outbound}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
          <span>{warehouse.dwellTime}d</span>
        </div>
        {warehouse.exceptions > 0 && (
          <div className="flex items-center text-red-600">
            <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span>{warehouse.exceptions}</span>
          </div>
        )}
      </div>
    </div>
  )
}