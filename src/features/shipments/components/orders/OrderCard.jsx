import { Clock, AlertTriangle, Package, User, Download } from 'lucide-react'

export default function OrderCard({ order, onStatusChange, onExport }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'picking': return 'bg-blue-100 text-blue-800'
      case 'packed': return 'bg-purple-100 text-purple-800'
      case 'dispatched': return 'bg-indigo-100 text-indigo-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getSLAStatus = (slaMinutes) => {
    if (slaMinutes <= 0) return { color: 'text-red-600', urgent: true }
    if (slaMinutes <= 30) return { color: 'text-yellow-600', urgent: true }
    return { color: 'text-green-600', urgent: false }
  }

  const slaStatus = getSLAStatus(order.slaMinutes)

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
        <div className="min-w-0 flex-1">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">#{order.id}</h3>
          <div className="flex items-center text-xs sm:text-sm text-gray-500 mt-1">
            <User className="w-3 h-3 sm:w-4 sm:h-4 mr-1 flex-shrink-0" />
            <span className="truncate">{order.customer}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          {order.priority === 'high' && slaStatus.urgent && (
            <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap ${getStatusColor(order.status)}`}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div>
          <div className="text-xs sm:text-sm text-gray-500">Items</div>
          <div className="text-sm sm:text-base font-medium">{order.items} items</div>
        </div>
        <div>
          <div className="text-xs sm:text-sm text-gray-500">Value</div>
          <div className="text-sm sm:text-base font-medium truncate">₦{order.value.toLocaleString()}</div>
        </div>
      </div>

      {order.priority === 'high' && (
        <div className="flex items-center justify-between mb-3 sm:mb-4 p-2 sm:p-3 bg-red-50 rounded-lg gap-2">
          <div className="flex items-center min-w-0">
            <Clock className={`w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 flex-shrink-0 ${slaStatus.color}`} />
            <span className="text-xs sm:text-sm font-medium">SLA Timer</span>
          </div>
          <span className={`text-xs sm:text-sm font-bold whitespace-nowrap ${slaStatus.color}`}>
            {order.slaMinutes > 0 ? `${order.slaMinutes}m` : 'OVERDUE'}
          </span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="text-xs sm:text-sm text-gray-500 truncate w-full sm:w-auto">
          Created: {order.createdAt}
        </div>
        <div className="flex gap-2 self-end sm:self-auto">
          <button
            onClick={() => onExport(order.id, 'picklist')}
            className="p-1.5 sm:p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="Export Pick List"
          >
            <Download className="w-4 h-4" />
          </button>
          <button
            onClick={() => onExport(order.id, 'manifest')}
            className="p-1.5 sm:p-2 text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
            title="Export Manifest"
          >
            <Package className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}