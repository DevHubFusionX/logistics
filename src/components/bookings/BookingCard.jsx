import { Package, MapPin, Clock, Eye, Download, Info, Edit, X, CreditCard, Truck, Phone, User, UserCheck, ChevronRight, ExternalLink } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getStatusBadge, getStatusText } from '../../utils/bookingUtils'

export default function BookingCard({ booking, onViewDetails, onEdit, onCancel, onPayNow, onAssignDriver }) {
  const navigate = useNavigate()

  // Data Normalization
  const id = booking._id || booking.tracking_number || booking.trackingNumber || booking.id || 'N/A'
  const packageInfo = `${(booking.goodsType || booking.package_type || booking.cargoType || 'Package').toUpperCase()} • ${booking.cargoWeightKg || booking.weight || 0}kg`

  const origin = typeof booking.pickupLocation === 'string'
    ? booking.pickupLocation
    : (booking.pickupLocation?.city || booking.origin || booking.pickupCity || 'N/A')

  const destination = typeof booking.dropoffLocation === 'string'
    ? booking.dropoffLocation
    : (booking.dropoffLocation?.city || booking.destination || booking.deliveryCity || 'N/A')

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? 'N/A' : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const createdAt = formatDate(booking.createdAt || booking.created_at)
  const eta = formatDate(booking.estimatedDeliveryDate || booking.estimated_delivery || booking.pickupDate)

  const amount = booking.price || booking.shipping_fee || booking.amount || booking.calculatedPrice || 0
  const paymentStatus = booking.paymentStatus || booking.payment_status || 'unpaid'

  const driver = booking.driver || booking.assignedDriver
  const driverName = driver?.profile ? `${driver.profile.first_name} ${driver.profile.last_name}` : (driver?.name || null)

  return (
    <div className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col h-full">
      {/* Header Section */}
      <div className="p-5 flex flex-wrap justify-between items-start gap-4">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <div className="p-2 sm:p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100 flex-shrink-0">
            <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-black text-gray-900 text-sm sm:text-lg leading-tight truncate tracking-tight" title={id}>{id}</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-0.5 truncate">{packageInfo}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
          <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider shadow-sm border border-transparent ${getStatusBadge(booking.status)}`}>
            {getStatusText(booking.status)}
          </span>
          <div className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
            <Clock className="w-3 h-3" />
            {createdAt}
          </div>
        </div>
      </div>

      {/* Route & Journey Section */}
      <div className="px-5 pb-5 flex-1">
        <div className="relative bg-gray-50/50 rounded-2xl p-5 border border-gray-100 flex flex-col gap-5">
          {/* Visual Route Line */}
          <div
            className="absolute left-[34px] top-[40px] bottom-[40px] w-0.5 opacity-30"
            style={{
              backgroundImage: 'linear-gradient(to bottom, #d1d5db 50%, transparent 50%)',
              backgroundSize: '1px 8px',
              backgroundRepeat: 'repeat-y'
            }}
          />

          <div className="flex gap-4 items-start relative z-10">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-emerald-500 flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">Origin</p>
              <p className="text-sm font-bold text-gray-900 truncate tracking-tight">{origin}</p>
            </div>
          </div>

          <div className="flex gap-4 items-start relative z-10">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-orange-500 flex items-center justify-center shadow-sm">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
            </div>
            <div className="min-w-0 flex-1 pt-0.5">
              <p className="text-[10px] text-gray-400 font-black uppercase tracking-tighter mb-0.5">Destination</p>
              <p className="text-sm font-bold text-gray-900 truncate tracking-tight">{destination}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Driver & Logistics Context */}
      {driverName && (booking.status === 'confirmed' || booking.status === 'in_transit') ? (
        <div className="px-5 mb-5">
          <div className="bg-blue-50/50 rounded-2xl p-4 border border-blue-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-blue-200 flex items-center justify-center relative">
              <User className="w-6 h-6 text-blue-600" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-xs font-black text-gray-900 truncate">{driverName}</p>
                <span className="text-[9px] font-bold px-1.5 py-0.5 bg-blue-100 text-blue-700 rounded-md truncate max-w-[80px] uppercase">
                  {driver.vehicle?.plate_number || 'Truck'}
                </span>
              </div>
              <div className="flex items-center gap-3 mt-1 text-[11px] font-bold text-blue-600">
                <a href={`tel:${driver.profile?.phone || driver.phone}`} className="hover:underline flex items-center gap-1">
                  <Phone className="w-3 h-3" />
                  Contact
                </a>
                <div className="w-1 h-1 rounded-full bg-blue-200" />
                <span className="text-gray-400 flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  ETA: {eta}
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 mb-5 flex items-center justify-between text-[11px] font-bold text-gray-500 bg-gray-50/30 p-3 rounded-2xl border border-dashed border-gray-200">
          <div className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-blue-400" />
            <span>Estimated Delivery</span>
          </div>
          <span className="text-gray-900">{eta}</span>
        </div>
      )}

      {/* Footer / Actions Section */}
      <div className="mt-auto bg-gray-50/80 p-5 border-t border-gray-100">
        <div className="flex items-center justify-between mb-5 px-1">
          <div>
            <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-0.5">Billing</p>
            <div className="flex items-center gap-3">
              <p className="text-2xl font-black text-gray-900 tracking-tighter">₦{amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
              <span className={`px-2 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-tighter border ${paymentStatus === 'paid' ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-orange-50 border-orange-100 text-orange-700'
                }`}>
                {paymentStatus}
              </span>
            </div>
          </div>
          <button
            onClick={() => navigate(`/tracking/${id}`)}
            className="w-12 h-12 flex items-center justify-center bg-white border border-gray-200 rounded-2xl text-blue-600 shadow-sm hover:shadow-md hover:bg-blue-50 transition-all active:scale-95"
            title="Track Shipment"
          >
            <ExternalLink className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onViewDetails(booking)}
            className="flex-1 min-w-[100px] py-3 bg-gray-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gray-800 shadow-lg shadow-gray-200 transition-all active:scale-[0.98]"
          >
            Details
          </button>

          {onAssignDriver && (booking.status === 'pending' || booking.status === 'pending_assignment') && (
            <button
              onClick={() => onAssignDriver(booking)}
              className="flex-[1.5] min-w-[130px] py-3 bg-orange-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-orange-700 shadow-lg shadow-orange-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <UserCheck className="w-4 h-4 flex-shrink-0" />
              Assign Driver
            </button>
          )}

          {onPayNow && booking.status !== 'cancelled' && (paymentStatus === 'unpaid' || paymentStatus === 'failed') && (
            <button
              onClick={() => onPayNow(booking)}
              className="flex-[1.5] min-w-[110px] py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
            >
              <CreditCard className="w-4 h-4 flex-shrink-0" />
              Pay Now
            </button>
          )}
        </div>

        {/* Optional Secondary Actions for Pending (Edit/Cancel) */}
        {booking.status === 'pending' && (onEdit || onCancel) && (
          <div className="grid grid-cols-2 gap-2.5 mt-2.5">
            {onEdit && (
              <button onClick={() => onEdit(booking)} className="py-2.5 bg-white border border-blue-200 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-colors">
                Edit
              </button>
            )}
            {onCancel && (
              <button onClick={() => onCancel(booking)} className="py-2.5 bg-white border border-red-200 text-red-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-red-50 transition-colors">
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  )
}
