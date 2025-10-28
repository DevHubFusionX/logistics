import { Package, MapPin, Calendar, DollarSign, User, UserCheck, AlertCircle } from 'lucide-react'

export default function BookingCard({ booking, onAssignDriver }) {
  const getStatusBadge = (status) => {
    const styles = {
      pending_assignment: 'bg-orange-100 text-orange-700 border-orange-200',
      driver_assigned: 'bg-blue-100 text-blue-700 border-blue-200',
      in_transit: 'bg-purple-100 text-purple-700 border-purple-200',
      delivered: 'bg-green-100 text-green-700 border-green-200'
    }
    const labels = {
      pending_assignment: 'Pending Assignment',
      driver_assigned: 'Driver Assigned',
      in_transit: 'In Transit',
      delivered: 'Delivered'
    }
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status]}`}>
        {labels[status]}
      </span>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="font-mono text-sm font-bold text-gray-900">{booking.id}</p>
          <p className="text-xs text-gray-500 mt-1">{booking.createdAt}</p>
        </div>
        {getStatusBadge(booking.status)}
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{booking.customerName}</p>
            <p className="text-xs text-gray-500 truncate">{booking.customerEmail}</p>
          </div>
        </div>

        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
          <div className="flex-1 min-w-0">
            <p className="text-xs text-gray-600">
              <span className="font-semibold">{booking.pickupCity}</span> → <span className="font-semibold">{booking.deliveryCity}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Package className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-600">
            {booking.weight} kg • <span className="capitalize">{booking.cargoType}</span> • <span className="capitalize">{booking.serviceType}</span>
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-600">Pickup: {booking.pickupDate}</p>
        </div>

        {booking.driverName && (
          <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2">
            <UserCheck className="w-4 h-4 text-blue-600" />
            <p className="text-xs font-semibold text-blue-900">Driver: {booking.driverName}</p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-200">
        <div className="flex items-center gap-1">
          <DollarSign className="w-4 h-4 text-green-600" />
          <span className="text-lg font-bold text-gray-900">${booking.amount}</span>
        </div>

        {booking.status === 'pending_assignment' && (
          <button
            onClick={() => onAssignDriver(booking)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            <UserCheck className="w-4 h-4" />
            Assign Driver
          </button>
        )}

        {booking.status === 'pending_assignment' && (
          <div className="flex items-center gap-1 text-orange-600">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs font-semibold">Action Required</span>
          </div>
        )}
      </div>
    </div>
  )
}
