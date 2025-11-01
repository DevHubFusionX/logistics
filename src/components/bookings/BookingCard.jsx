import { Package, MapPin, Clock, Eye, Download, Info, Edit, X, CreditCard, Truck, Phone, User } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BookingCard({ booking, onViewDetails, onEdit, onCancel, onPayNow, getStatusBadge, getStatusText }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Package className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900">{booking.bookingId || booking._id}</h3>
            <p className="text-sm text-gray-600">{booking.goodsType} • {booking.cargoWeightKg}kg</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(booking.status)}`}>
          {getStatusText(booking.status)}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-green-600 mt-1" />
          <div>
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="font-semibold text-gray-900">{booking.pickupLocation?.city || booking.pickupLocation?.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-orange-600 mt-1" />
          <div>
            <p className="text-xs text-gray-500">Delivery</p>
            <p className="font-semibold text-gray-900">{booking.dropoffLocation?.city || booking.dropoffLocation?.address}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>Created: {new Date(booking.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>ETA: {new Date(booking.estimatedDeliveryDate).toLocaleDateString()}</span>
        </div>
      </div>

      {booking.assignedDriver && (booking.status === 'confirmed' || booking.status === 'in_transit') && (
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg p-3 mb-4 border border-blue-200">
          <p className="text-xs font-semibold text-gray-700 mb-2">Driver Information</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
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

      <div className="flex items-center justify-between pt-4 border-t">
        <div>
          <p className="text-sm text-gray-600">Total Amount</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold text-gray-900">₦{(booking.totalCost || booking.estimatedCost || booking.price || 0).toFixed(2)}</p>
            {booking.paymentStatus === 'paid' ? (
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">Paid</span>
            ) : (
              <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-bold">Unpaid</span>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => onViewDetails(booking)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
            <Info className="w-4 h-4" />
            Details
          </button>
          {booking.status === 'pending' && (
            <>
              <button onClick={() => onEdit(booking)} className="flex items-center gap-2 px-4 py-2 border border-blue-300 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium">
                <Edit className="w-4 h-4" />
                Edit
              </button>
              <button onClick={() => onCancel(booking._id)} className="flex items-center gap-2 px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors font-medium">
                <X className="w-4 h-4" />
                Cancel
              </button>
            </>
          )}
          {booking.paymentStatus === 'unpaid' && (
            <button onClick={() => onPayNow(booking)} className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium">
              <CreditCard className="w-4 h-4" />
              Pay Now
            </button>
          )}
          {booking.trackingNumber && (
            <button onClick={() => navigate(`/tracking/${booking.trackingNumber}`)} className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              <Eye className="w-4 h-4" />
              Track
            </button>
          )}
          {booking.status === 'delivered' && booking.paymentStatus === 'paid' && (
            <button onClick={() => navigate(`/tracking/invoice/${booking.bookingId || booking._id}`)} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              <Download className="w-4 h-4" />
              Invoice
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
