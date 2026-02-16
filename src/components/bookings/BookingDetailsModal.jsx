import { X, MapPin, Package, Calendar, User, Phone, Mail, Truck } from 'lucide-react'

export default function BookingDetailsModal({ booking, onClose, getStatusBadge, getStatusText }) {
  if (!booking) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
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
              <p className="text-sm text-gray-600">Booking ID / Tracking</p>
              <p className="text-xl font-bold">{booking.tracking_number || booking.bookingId || booking.id || booking._id}</p>
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
                  <p><span className="text-gray-600">Location:</span> {
                    typeof booking.pickupLocation === 'string'
                      ? booking.pickupLocation
                      : (booking.pickupLocation?.address || booking.origin || 'N/A') + (booking.pickupLocation?.city ? `, ${booking.pickupLocation.city}` : '')
                  }</p>
                  <p><span className="text-gray-600">Contact:</span> {booking.pickupPerson?.name || 'N/A'}</p>
                  <p><span className="text-gray-600">Phone:</span> {booking.pickupPerson?.phone || 'N/A'}</p>
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
                  <p><span className="text-gray-600">Location:</span> {
                    typeof booking.dropoffLocation === 'string'
                      ? booking.dropoffLocation
                      : (booking.dropoffLocation?.address || booking.destination || 'N/A') + (booking.dropoffLocation?.city ? `, ${booking.dropoffLocation.city}` : '')
                  }</p>
                  <p><span className="text-gray-600">Receiver:</span> {booking.receiverPerson?.name || booking.receiver_name || 'N/A'}</p>
                  <p><span className="text-gray-600">Phone:</span> {booking.receiverPerson?.phone || booking.receiver_phone || 'N/A'}</p>
                  <p><span className="text-gray-600">Email:</span> {booking.receiverPerson?.email || booking.receiver_email || 'N/A'}</p>
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
                <p className="text-gray-600">Package Type</p>
                <p className="font-semibold">{(booking.goodsType || booking.package_type || 'N/A').toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="font-semibold">{booking.cargoWeightKg || booking.weight || 0} kg</p>
              </div>
              <div>
                <p className="text-gray-600">Quantity</p>
                <p className="font-semibold">{booking.quantity || booking.dimensions?.quantity || 1} units</p>
              </div>
              <div>
                <p className="text-gray-600">Service Type</p>
                <p className="font-semibold">{(booking.vehicleType || booking.service_type || 'Standard').toUpperCase()}</p>
              </div>
              <div>
                <p className="text-gray-600">Fragile</p>
                <p className="font-semibold">{booking.isFragile || booking.dimensions?.isFragile ? 'Yes' : 'No'}</p>
              </div>
              <div>
                <p className="text-gray-600">Perishable</p>
                <p className="font-semibold">{booking.isPerishable || booking.dimensions?.isPerishable ? 'Yes' : 'No'}</p>
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
                <p className="text-gray-600">Booking Date</p>
                <p className="font-semibold">{new Date(booking.createdAt || booking.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-600">Estimated Delivery</p>
                <p className="font-semibold">{new Date(booking.estimatedDeliveryDate || booking.estimated_delivery).toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Amount</span>
              <span className="text-2xl font-bold">₦{(booking.price || booking.shipping_fee || booking.calculatedPrice || 0).toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between mt-2">
              <span className="text-gray-600">Payment Status</span>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${(booking.paymentStatus || booking.payment_status) === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                }`}>
                {(booking.paymentStatus || booking.payment_status) === 'paid' ? 'Paid' : 'Unpaid'}
              </span>
            </div>
          </div>

          {(booking.notes || booking.special_instructions) && (
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-2">Special Instructions</h3>
              <p className="text-sm text-gray-700">{booking.notes || booking.special_instructions}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
