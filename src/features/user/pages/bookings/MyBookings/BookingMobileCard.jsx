import { CreditCard, Phone, ArrowRight, Package, User } from 'lucide-react'
import { getStatusText, calculateBookingPrice, BOOKING_STATUS_CONFIG } from '@/features/booking'

export default function BookingMobileCard({ booking, onViewDetails, onPay }) {
  const bookingId = booking._id || booking.tracking_number || booking.id || 'N/A'
  const displayId = bookingId.slice(-8).toUpperCase()
  const goodsType = booking.goodsType || booking.package_type || booking.cargoType || 'General'
  const origin = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || booking.pickupLocation?.address || 'Lagos')
  const senderName = booking.pickupLocation?.contactName || 'Client'
  const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || booking.dropoffLocation?.address || '—')
  const receiverName = booking.dropoffLocation?.contactName || 'Recipient'
  const amount = booking.price || booking.shipping_fee || booking.amount || calculateBookingPrice(booking) || 0
  const payStatus = booking.paymentStatus || booking.payment_status || 'unpaid'
  
  const sc = BOOKING_STATUS_CONFIG[booking.status] || BOOKING_STATUS_CONFIG.pending
  const canPayNow = booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')
  const riderName = booking.driver?.name || booking.driverName || 'Rider unassigned'
  const riderPhone = booking.driver?.phone || booking.driverPhone
  const initials = riderName !== 'Rider unassigned' ? riderName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'

  return (
    <div 
      className="bg-white border border-slate-100 rounded-2xl p-4.5 space-y-4 shadow-[0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:border-slate-200/60 transition-all duration-200 cursor-pointer"
      onClick={() => onViewDetails({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
    >
      <div className="flex justify-between items-center pb-3 border-b border-slate-100/60">
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Order No</span>
          <span className="font-mono text-xs font-bold text-slate-800 bg-slate-50 border border-slate-100 px-1.5 py-0.5 rounded mt-0.5 inline-block">
            #{displayId}
          </span>
        </div>
        <span className={`inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 border rounded-full ${sc.pill}`}>
          {booking.status === 'in_transit' ? (
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-blue-600"></span>
            </span>
          ) : (
            <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
          )}
          {sc.label}
        </span>
      </div>

      <div className="space-y-3.5">
        <div className="flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-1.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Sender</span>
            <span className="text-xs font-bold text-slate-800 block truncate">{senderName}</span>
            <span className="text-slate-500 text-[10px] font-medium block truncate mt-0.5">{origin}</span>
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Receiver</span>
            <span className="text-xs font-bold text-slate-800 truncate flex items-center gap-1">
              <ArrowRight className="w-3 h-3 text-slate-300" />
              {receiverName}
            </span>
            <span className="text-slate-500 text-[10px] font-medium block truncate mt-0.5">{destination}</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 pt-3 border-t border-slate-100/60">
        <div className="flex items-center gap-1.5">
          <span className="inline-flex items-center gap-1 text-[9px] font-extrabold bg-slate-50 text-slate-500 border border-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
            <Package className="w-2.5 h-2.5 text-slate-400" />
            {goodsType}
          </span>
          <span className="text-[9px] font-extrabold bg-sky-50/50 text-sky-700 border border-sky-100/30 px-2 py-0.5 rounded uppercase tracking-wider">
            Dara
          </span>
        </div>
        <div className="text-right">
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Delivery Fee</span>
          <span className="font-extrabold text-slate-800 text-[13px] block mt-0.5">₦{amount.toLocaleString()}</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-3 border-t border-slate-100/60" onClick={(e) => e.stopPropagation()}>
        <div>
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-wider block">Rider</span>
          {riderName !== 'Rider unassigned' ? (
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6.5 h-6.5 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 text-[9px] font-bold shrink-0">
                {initials}
              </div>
              <span className="text-xs font-semibold text-slate-800">{riderName}</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 mt-1 text-slate-400">
              <div className="w-6.5 h-6.5 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[9px] font-bold shrink-0">
                <User className="w-3 h-3" />
              </div>
              <span className="text-xs font-medium italic">{riderName}</span>
            </div>
          )}
        </div>
        
        {riderPhone && (
          <a 
            href={`tel:${riderPhone}`} 
            className="w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-100/50 flex items-center justify-center transition-all shadow-sm active:scale-95"
            title={`Call ${riderName}`}
          >
            <Phone className="w-3.5 h-3.5" />
          </a>
        )}
      </div>

      <div className="flex items-center gap-2 pt-3 border-t border-slate-100/60" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={() => onViewDetails({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
          className="flex-1 text-xs font-bold text-slate-600 hover:text-slate-800 py-2 border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-center active:scale-95"
        >
          Details
        </button>
        {canPayNow && (
          <button
            onClick={() => onPay(booking)}
            className="flex-1 text-xs font-extrabold text-white bg-sky-700 hover:bg-sky-600 py-2 rounded-xl transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95"
          >
            <CreditCard className="w-3.5 h-3.5" /> Pay
          </button>
        )}
      </div>
    </div>
  )
}
