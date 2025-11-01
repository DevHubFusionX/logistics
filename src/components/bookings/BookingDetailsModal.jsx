import { Package, MapPin } from 'lucide-react'

export default function BookingDetailsModal({ booking, onClose, getStatusBadge, getStatusText }) {
  if (!booking) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900">Booking Details</h3>
            <p className="text-sm text-gray-600">{booking.bookingId || booking._id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <span className="text-2xl text-gray-500">&times;</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <span className="font-semibold">Status</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600" />
              Cargo Information
            </h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Goods Type</p>
                <p className="font-semibold">{booking.goodsType}</p>
              </div>
              <div>
                <p className="text-gray-500">Weight</p>
                <p className="font-semibold">{booking.cargoWeightKg} kg</p>
              </div>
              <div>
                <p className="text-gray-500">Quantity</p>
                <p className="font-semibold">{booking.quantity} units</p>
              </div>
              <div>
                <p className="text-gray-500">Vehicle Type</p>
                <p className="font-semibold">{booking.vehicleType}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-3">
              {booking.isFragile && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Fragile</span>}
              {booking.isPerishable && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Perishable ({booking.tempControlCelsius}°C)</span>}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-green-600" />
              Pickup Details
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-semibold">{booking.pickupLocation?.address}</p>
                <p className="text-gray-600">{booking.pickupLocation?.city}, {booking.pickupLocation?.state}</p>
              </div>
              <div>
                <p className="text-gray-500">Contact Person</p>
                <p className="font-semibold">{booking.pickupPerson?.name}</p>
                <p className="text-gray-600">{booking.pickupPerson?.phone} • {booking.pickupPerson?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Pickup Date</p>
                <p className="font-semibold">{new Date(booking.estimatedPickupDate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-orange-600" />
              Delivery Details
            </h4>
            <div className="space-y-2 text-sm">
              <div>
                <p className="text-gray-500">Location</p>
                <p className="font-semibold">{booking.dropoffLocation?.address}</p>
                <p className="text-gray-600">{booking.dropoffLocation?.city}, {booking.dropoffLocation?.state}</p>
              </div>
              <div>
                <p className="text-gray-500">Receiver</p>
                <p className="font-semibold">{booking.receiverPerson?.name}</p>
                <p className="text-gray-600">{booking.receiverPerson?.phone} • {booking.receiverPerson?.email}</p>
              </div>
              <div>
                <p className="text-gray-500">Delivery Date</p>
                <p className="font-semibold">{new Date(booking.estimatedDeliveryDate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          {booking.notes && (
            <div>
              <h4 className="font-semibold mb-2">Additional Notes</h4>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{booking.notes}</p>
            </div>
          )}

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Amount</p>
                <p className="text-2xl font-bold text-gray-900">₦{(booking.totalCost || booking.estimatedCost || booking.price || 0).toFixed(2)}</p>
              </div>
              {booking.paymentStatus === 'paid' ? (
                <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold">Paid</span>
              ) : (
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-bold">Unpaid</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
