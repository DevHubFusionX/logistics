import { Package, MapPin, Clock, Eye, Download, Info, Edit, X, CreditCard, Truck, Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BookingCard({ booking, onViewDetails, onEdit, onCancel, onPayNow, getStatusBadge, getStatusText }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 sm:p-3 bg-blue-100 rounded-lg">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-gray-900 break-all">{booking.bookingId || booking._id}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{booking.goodsType} • {booking.cargoWeightKg}kg</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap self-start ${getStatusBadge(booking.status)}`}>
          {getStatusText(booking.status)}
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="font-semibold text-gray-900 text-sm truncate">{booking.pickupLocation?.city || booking.pickupLocation?.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-orange-600 mt-1 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-xs text-gray-500">Delivery</p>
            <p className="font-semibold text-gray-900 text-sm truncate">{booking.dropoffLocation?.city || booking.dropoffLocation?.address}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4 flex-shrink-0" />
          <span>ETA: {new Date(booking.estimatedDeliveryDate).toLocaleDateString()}</span>
        </div>
      </div>

      {booking.assignedDriver && (booking.status === 'confirmed' || booking.status === 'in_transit') && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4 border border-blue-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Driver Information</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Driver</p>
                <p className="font-semibold text-gray-900">{booking.assignedDriver.name || 'N/A'}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Contact</p>
                <a href={`tel:${booking.assignedDriver.phone}`} className="font-semibold text-blue-600 hover:underline">
                  {booking.assignedDriver.phone || 'N/A'}
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-blue-600" />
              <div>
                <p className="text-xs text-gray-500">Vehicle</p>
                <p className="font-semibold text-gray-900">{booking.assignedVehicle?.plateNumber || 'N/A'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t">
        <div>
          <p className="text-xs sm:text-sm text-gray-600">Total Amount</p>
          <div className="flex items-center gap-2">
            <p className="text-lg sm:text-xl font-bold text-gray-900">₦{(booking.calculatedPrice || booking.totalCost || booking.estimatedCost || booking.price || 0).toFixed(2)}</p>
            {booking.paymentStatus === 'paid' ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid</span>
            ) : booking.paymentStatus === 'processing' ? (
              <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">Processing</span>
            ) : booking.paymentStatus === 'failed' ? (
              <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold">Failed</span>
            ) : (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Unpaid</span>
            )}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <button onClick={() => onViewDetails(booking)} className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
            <Info className="w-4 h-4" />
            <span className="hidden sm:inline">Details</span>
          </button>
          {booking.status === 'pending' && (
            <>
              <button onClick={() => onEdit(booking)} className="flex items-center gap-1 px-3 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium text-sm">
                <Edit className="w-4 h-4" />
                <span className="hidden sm:inline">Edit</span>
              </button>
              <button onClick={() => onCancel(booking)} className="flex items-center gap-1 px-3 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium text-sm">
                <X className="w-4 h-4" />
                <span className="hidden sm:inline">Cancel</span>
              </button>
            </>
          )}
          {booking.status !== 'cancelled' && (booking.paymentStatus === 'unpaid' || booking.paymentStatus === 'failed' || !booking.paymentStatus || booking.status === 'pending') && (
            <button onClick={() => onPayNow(booking)} className="flex items-center gap-1 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium text-sm">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">{booking.paymentStatus === 'failed' ? 'Retry Payment' : 'Pay Now'}</span>
            </button>
          )}
          <button onClick={() => navigate(`/tracking/${booking._id || booking.bookingId}`)} className="flex items-center gap-1 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm">
            <Eye className="w-4 h-4" />
            <span className="hidden sm:inline">Track</span>
          </button>
          {booking.status === 'delivered' && booking.paymentStatus === 'paid' && (
            <button onClick={() => navigate(`/tracking/invoice/${booking.bookingId || booking._id}`)} className="flex items-center gap-1 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Invoice</span>
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
