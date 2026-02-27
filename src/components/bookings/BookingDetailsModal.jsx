import { X, MapPin, Package, Calendar, Info } from 'lucide-react'

export default function BookingDetailsModal({ booking, onClose, getStatusBadge, getStatusText }) {
  if (!booking) return null

  const pickupAddr = typeof booking.pickupLocation === 'string'
    ? booking.pickupLocation
    : `${booking.pickupLocation?.address || ''}${booking.pickupLocation?.city ? `, ${booking.pickupLocation.city}` : ''}${booking.pickupLocation?.state ? `, ${booking.pickupLocation.state}` : ''}`

  const dropoffAddr = typeof booking.dropoffLocation === 'string'
    ? booking.dropoffLocation
    : `${booking.dropoffLocation?.address || ''}${booking.dropoffLocation?.city ? `, ${booking.dropoffLocation.city}` : ''}${booking.dropoffLocation?.state ? `, ${booking.dropoffLocation.state}` : ''}`

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-xl font-black text-gray-900 tracking-tight">Booking Details</h2>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest leading-none mt-1">
              Ref: {booking.trackingNumber || booking.tracking_number || booking._id}
            </p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Status and Overview */}
          <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <div>
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Current Status</p>
              <span className={`px-3 py-1 rounded-xl text-xs font-black uppercase tracking-wider shadow-sm border border-transparent ${getStatusBadge(booking.status)}`}>
                {getStatusText(booking.status)}
              </span>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Total Amount</p>
              <p className="text-xl font-black text-gray-900 tracking-tighter">₦{(booking.amount || booking.price || 0).toLocaleString()}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Pickup Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                </div>
                <h3 className="font-bold text-gray-900 tracking-tight">Pickup Details</h3>
              </div>
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5 text-emerald-600">Address</p>
                  <p className="text-sm font-bold text-gray-900">{pickupAddr || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">Contact Person</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{booking.pickupPerson?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">Contact Phone</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{booking.pickupPerson?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Delivery Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-orange-100 rounded-xl flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                <h3 className="font-bold text-gray-900 tracking-tight">Delivery Details</h3>
              </div>
              <div className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 space-y-3">
                <div>
                  <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5 text-orange-600">Address</p>
                  <p className="text-sm font-bold text-gray-900">{dropoffAddr || 'N/A'}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">Receiver Person</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{booking.receiverPerson?.name || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">Receiver Phone</p>
                    <p className="text-sm font-bold text-gray-900 truncate">{booking.receiverPerson?.phone || 'N/A'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cargo Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-100 rounded-xl flex items-center justify-center">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 tracking-tight">Cargo Information</h3>
            </div>
            <div className="grid md:grid-cols-4 gap-4 bg-gray-50/50 rounded-2xl p-5 border border-gray-100">
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1">Package Type</p>
                <p className="text-sm font-bold text-gray-900">{(booking.cargoType || booking.goodsType || 'N/A').toUpperCase()}</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1">Weight</p>
                <p className="text-sm font-bold text-gray-900">{booking.weight || booking.cargoWeightKg || 0} kg</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1">Quantity</p>
                <p className="text-sm font-bold text-gray-900">{booking.quantity || 1} units</p>
              </div>
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-1">Vehicle Type</p>
                <p className="text-sm font-bold text-gray-900">{(booking.serviceType || booking.vehicleType || 'N/A').toUpperCase()}</p>
              </div>
            </div>

            {/* Cargo Flags */}
            <div className="flex flex-wrap gap-3">
              {(booking.isFragile || booking.dimensions?.isFragile) && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-red-600 border border-red-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  Fragile
                </div>
              )}
              {(booking.isPerishable || booking.dimensions?.isPerishable) && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 text-blue-600 border border-blue-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  Perishable
                </div>
              )}
              {booking.tempControlCelsius && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-50 text-cyan-600 border border-cyan-100 rounded-xl text-[10px] font-black uppercase tracking-widest">
                  <Info className="w-3 h-3" />
                  Temp: {booking.tempControlCelsius}°C
                </div>
              )}
            </div>
          </div>

          {/* Timestamps */}
          <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-dashed">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-300" />
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Booking Date</p>
                <p className="text-xs font-bold text-gray-900">{new Date(booking.createdAt).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-300" />
              <div>
                <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter">Estimated Delivery</p>
                <p className="text-xs font-bold text-gray-900">{new Date(booking.pickupDate || booking.estimatedDeliveryDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Notes */}
          {booking.notes && (
            <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100">
              <h4 className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">Additional Notes</h4>
              <p className="text-xs font-medium text-blue-800 leading-relaxed italic">"{booking.notes}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
