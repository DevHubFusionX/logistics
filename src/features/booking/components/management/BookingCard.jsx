import { ArrowRight, CreditCard, MapPin, Calendar, Package, Truck, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getStatusText } from '../../utils/bookingUtils'

const STATUS_CONFIG = {
  pending:    { dot: 'bg-amber-400',   pill: 'bg-amber-50 text-amber-700'    },
  confirmed:  { dot: 'bg-sky-500',     pill: 'bg-sky-50 text-sky-700'        },
  processing: { dot: 'bg-sky-500',     pill: 'bg-sky-50 text-sky-700'        },
  in_transit: { dot: 'bg-emerald-500', pill: 'bg-emerald-50 text-emerald-700'},
  delivered:  { dot: 'bg-gray-400',    pill: 'bg-gray-100 text-gray-600'     },
  cancelled:  { dot: 'bg-red-400',     pill: 'bg-red-50 text-red-600'        },
}

export default function BookingCard({ booking, onViewDetails, onEdit, onCancel, onPayNow, onAssignDriver, onRemoveTruck }) {
  const navigate = useNavigate()

  const id          = booking._id || booking.tracking_number || booking.trackingNumber || booking.id || 'N/A'
  const origin      = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || booking.origin || 'N/A')
  const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || booking.destination || 'N/A')
  const goodsType   = booking.goodsType || booking.package_type || booking.cargoType || 'Package'
  const amount      = booking.price || booking.shipping_fee || booking.amount || booking.calculatedPrice || 0
  const payStatus   = booking.paymentStatus || booking.payment_status || 'unpaid'
  const canPayNow   = onPayNow && booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')
  const canCancel   = booking.status === 'pending' && onCancel

  const formatDate = (d) => {
    if (!d) return null
    const date = new Date(d)
    return isNaN(date) ? null : date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
  }

  const eta       = formatDate(booking.estimatedDeliveryDate || booking.estimated_delivery || booking.pickupDate)
  const cfg       = STATUS_CONFIG[booking.status] || STATUS_CONFIG.pending

  const hasAssignment = !!(booking.driverName || booking.truckPlateNumber || booking.driverId || booking.truckId)
  const canAssign = !!onAssignDriver && ['pending', 'pending_assignment'].includes(booking.status)
  const canReassign = !!onAssignDriver && ['confirmed', 'driver_assigned'].includes(booking.status)

  return (
    <div className="bg-white rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden">

      {/* Top: status + ID + date */}
      <div className="px-4 pt-4 pb-3 flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-0.5 ${cfg.dot}`} />
          <div className="min-w-0">
            <p className="text-xs font-mono font-bold text-gray-900 truncate leading-tight">{id}</p>
            <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full mt-1 ${cfg.pill}`}>
              {getStatusText(booking.status)}
            </span>
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <p className="text-base font-heading font-black text-gray-900 leading-tight">
            ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
          </p>
          <span className={`text-[10px] font-semibold ${payStatus === 'paid' ? 'text-emerald-600' : 'text-orange-500'}`}>
            {payStatus === 'paid' ? 'Paid' : 'Unpaid'}
          </span>
        </div>
      </div>

      {/* Route */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2.5">
          <MapPin className="w-3.5 h-3.5 text-sky-700 flex-shrink-0" />
          <span className="text-xs font-medium text-gray-700 truncate">{origin}</span>
          <ArrowRight className="w-3 h-3 text-gray-300 flex-shrink-0" />
          <span className="text-xs font-medium text-gray-700 truncate">{destination}</span>
        </div>
      </div>

      {/* Driver/Truck Info if assigned */}
      {(booking.driverName || booking.truckPlateNumber) && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {booking.truckPlateNumber && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-50 border border-slate-150 rounded-xl text-[11px] font-semibold text-slate-700 shadow-sm">
              <Truck className="w-3.5 h-3.5 text-slate-400" />
              <span>{booking.truckPlateNumber}</span>
            </span>
          )}
          {booking.driverName && (
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-violet-50 border border-violet-150 rounded-xl text-[11px] font-semibold text-violet-700 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-pulse" />
              <span>{booking.driverName}</span>
            </span>
          )}
        </div>
      )}

      {/* Meta row */}
      <div className="px-4 pb-4 flex items-center gap-3 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Package className="w-3 h-3" />
          {goodsType}
        </span>
        {eta && (
          <>
            <span className="text-gray-200">·</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {eta}
            </span>
          </>
        )}
      </div>

      {/* Actions */}
      <div className="mt-auto border-t border-gray-100 px-4 py-3 flex items-center gap-2">
        <button
          onClick={() => onViewDetails(booking)}
          className="flex-1 py-2 text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
        >
          Details
        </button>

        {canAssign && (
          <button
            onClick={() => onAssignDriver(booking)}
            className="flex-1 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm shadow-indigo-100"
          >
            <Truck className="w-3.5 h-3.5" /> Assign Truck
          </button>
        )}

        {canReassign && (
          <>
            <button
              onClick={() => onAssignDriver(booking)}
              className="flex-1 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 rounded-xl transition-colors border border-indigo-150 flex items-center justify-center gap-1.5"
            >
              Reassign
            </button>
            {onRemoveTruck && (
              <button
                onClick={() => onRemoveTruck(booking)}
                className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
                title="Remove Truck"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </>
        )}

        {canPayNow && (
          <button
            onClick={() => onPayNow(booking)}
            className="flex-1 py-2 text-xs font-semibold text-white bg-sky-700 hover:bg-sky-600 rounded-xl transition-colors flex items-center justify-center gap-1.5"
          >
            <CreditCard className="w-3.5 h-3.5" /> Pay now
          </button>
        )}
        {canCancel && (
          <button
            onClick={() => onCancel(booking)}
            className="py-2 px-3 text-xs font-semibold text-red-500 hover:bg-red-50 rounded-xl transition-colors"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  )
}
