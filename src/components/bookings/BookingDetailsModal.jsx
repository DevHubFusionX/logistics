import { X, MapPin, Package, Calendar, User, Phone, Mail, Truck } from 'lucide-react'

export default function BookingDetailsModal({ booking, onClose, getStatusBadge, getStatusText }) {
  if (!booking) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Booking Details</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Booking ID</p>
              <p className="text-xl font-bold">{booking.bookingId || booking._id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(booking.status)}`}>
              {getStatusText(booking.status)}
            </span>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-green-600" />
                  <h3 className="font-semibold">Pickup Details</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Address:</span> {booking.pickupLocation?.address}</p>
                  <p><span className="text-gray-600">City:</span> {booking.pickupLocation?.city}</p>
                  <p><span className="text-gray-600">State:</span> {booking.pickupLocation?.state}</p>
                  <p><span className="text-gray-600">Contact:</span> {booking.pickupPerson?.name}</p>
                  <p><span className="text-gray-600">Phone:</span> {booking.pickupPerson?.phone}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <MapPin className="w-5 h-5 text-orange-600" />
                  <h3 className="font-semibold">Delivery Details</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <p><span className="text-gray-600">Address:</span> {booking.dropoffLocation?.address}</p>
                  <p><span className="text-gray-600">City:</span> {booking.dropoffLocation?.city}</p>
                  <p><span className="text-gray-600">State:</span> {booking.dropoffLocation?.state}</p>
                  <p><span className="text-gray-600">Contact:</span> {booking.receiverPerson?.name}</p>
                  <p><span className="text-gray-600">Phone:</span> {booking.receiverPerson?.phone}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Package className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold">Cargo Information</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Goods Type</p>
                <p className="font-semibold">{booking.goodsType}</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="font-semibold">{booking.cargoWeightKg} kg</p>
              </div>
              <div>
                <p className="text-gray-600">Quantity</p>
                <p className="font-semibold">{booking.quantity || 1} units</p>
              </div>
              <div>
                <p className="text-gray-600">Vehicle Type</p>
                <p className="font-semibold">{booking.vehicleType}</p>
              </div>
              <div>
                <p className="text-gray-600">Fragile</p>
                <p className="font-semibold">{booking.isFragile ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-gray-600">Perishable</p>
                <p className="font-semibold">{booking.isPerishable ? 'Yes' : 'No'}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center gap-2 mb-3">
              <Calendar className="w-5 h-5 text-purple-600" />
              <h3 className="font-semibold">Schedule</h3>
            </div>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Pickup Date</p>
                <p className="font-semibold">{new Date(booking.estimatedPickupDate).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Delivery Date</p>
                <p className="font-semibold">{new Date(booking.estimatedDeliveryDate).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold">₦{booking.calculatedPrice?.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Payment Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                booking.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {booking.paymentStatus === 'paid' ? 'Paid' : 'Unpaid'}
              </span>
            </div>
          </div>

          {booking.notes && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Additional Notes</h3>
              <p className="text-sm text-gray-700">{booking.notes}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
