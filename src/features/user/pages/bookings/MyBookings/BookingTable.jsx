import { Phone, CreditCard, ArrowRight, User, Package, Calendar } from 'lucide-react'
import { getStatusText, calculateBookingPrice } from '@/features/booking'

const STATUS_STYLES = {
  pending: {
    text: 'text-amber-700 bg-amber-50 border-amber-200/50',
    dot: 'bg-amber-500 animate-pulse',
    label: 'Pending'
  },
  confirmed: {
    text: 'text-sky-700 bg-sky-50 border-sky-200/50',
    dot: 'bg-sky-500',
    label: 'Confirmed'
  },
  processing: {
    text: 'text-indigo-700 bg-indigo-50 border-indigo-200/50',
    dot: 'bg-indigo-500 animate-pulse',
    label: 'Processing'
  },
  in_transit: {
    text: 'text-blue-700 bg-blue-50 border-blue-200/50',
    dot: 'bg-blue-600 animate-ping',
    label: 'In Transit'
  },
  delivered: {
    text: 'text-emerald-700 bg-emerald-50 border-emerald-200/50',
    dot: 'bg-emerald-500',
    label: 'Delivered'
  },
  cancelled: {
    text: 'text-rose-700 bg-rose-50 border-rose-200/50',
    dot: 'bg-rose-500',
    label: 'Cancelled'
  },
  on_hold: {
    text: 'text-orange-700 bg-orange-50 border-orange-200/50',
    dot: 'bg-orange-500',
    label: 'On Hold'
  },
  failed: {
    text: 'text-red-700 bg-red-50 border-red-200/50',
    dot: 'bg-red-500',
    label: 'Failed'
  }
}

function SkeletonRow() {
  return (
    <tr className="animate-pulse border-b border-slate-100">
      <td className="px-6 py-4 w-12 text-center">
        <div className="w-4 h-4 bg-slate-100 rounded mx-auto" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-16" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-24 mb-1" />
        <div className="h-3 bg-slate-50 rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-24 mb-1" />
        <div className="h-3 bg-slate-50 rounded w-32" />
      </td>
      <td className="px-6 py-4">
        <div className="h-5 bg-slate-100 rounded w-12" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-20" />
      </td>
      <td className="px-6 py-4">
        <div className="h-4 bg-slate-100 rounded w-14" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-slate-100 rounded w-28" />
      </td>
      <td className="px-6 py-4 text-center">
        <div className="w-8 h-8 rounded-full bg-slate-100 mx-auto" />
      </td>
      <td className="px-6 py-4">
        <div className="h-6 bg-slate-100 rounded w-20" />
      </td>
      <td className="px-6 py-4 text-right">
        <div className="h-8 bg-slate-100 rounded w-24 ml-auto" />
      </td>
    </tr>
  )
}

export default function BookingTable({ rows, loading, onViewDetails, onPay }) {
  return (
    <div className="hidden md:block overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50/70 backdrop-blur-sm border-b border-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-wider">
              <th className="px-6 py-4.5 w-12 text-center">
                <input 
                  type="checkbox" 
                  className="rounded-md border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer transition-colors" 
                />
              </th>
              <th className="px-6 py-4.5 font-semibold">Order No</th>
              <th className="px-6 py-4.5 font-semibold">Sender / Pickup</th>
              <th className="px-6 py-4.5 font-semibold">Receiver / Delivery</th>
              <th className="px-6 py-4.5 font-semibold">Cargo</th>
              <th className="px-6 py-4.5 font-semibold">Partner</th>
              <th className="px-6 py-4.5 font-semibold">Delivery Fee</th>
              <th className="px-6 py-4.5 font-semibold">Rider</th>
              <th className="px-6 py-4.5 w-16 text-center">Call</th>
              <th className="px-6 py-4.5 font-semibold">Status</th>
              <th className="px-6 py-4.5 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
            ) : (
              rows.map((booking, idx) => {
                const bookingId = booking._id || booking.tracking_number || booking.id || 'N/A'
                const displayId = bookingId.slice(-8).toUpperCase()
                const goodsType = booking.goodsType || booking.package_type || booking.cargoType || 'General'
                const origin = typeof booking.pickupLocation === 'string' ? booking.pickupLocation : (booking.pickupLocation?.city || booking.pickupLocation?.address || 'Lagos')
                const senderName = booking.pickupLocation?.contactName || 'Client'
                const destination = typeof booking.dropoffLocation === 'string' ? booking.dropoffLocation : (booking.dropoffLocation?.city || booking.dropoffLocation?.address || '—')
                const receiverName = booking.dropoffLocation?.contactName || 'Recipient'
                const amount = booking.price || booking.shipping_fee || booking.amount || calculateBookingPrice(booking) || 0
                const payStatus = booking.paymentStatus || booking.payment_status || 'unpaid'
                
                const sc = STATUS_STYLES[booking.status] || STATUS_STYLES.pending
                const canPayNow = booking.status !== 'cancelled' && (payStatus === 'unpaid' || payStatus === 'failed')
                const riderName = booking.driver?.name || booking.driverName || 'Rider unassigned'
                const riderPhone = booking.driver?.phone || booking.driverPhone
                const initials = riderName !== 'Rider unassigned' ? riderName.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'U'

                return (
                  <tr 
                    key={bookingId + idx} 
                    className="hover:bg-slate-50/40 transition-colors group cursor-pointer"
                    onClick={() => onViewDetails({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
                  >
                    <td className="px-6 py-4.5 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        className="rounded-md border-slate-300 text-sky-600 focus:ring-sky-500 w-4 h-4 cursor-pointer transition-colors" 
                      />
                    </td>
                    <td className="px-6 py-4.5 font-mono text-xs font-bold text-slate-800 tracking-tight">
                      <span className="bg-slate-50 border border-slate-100 px-2 py-1 rounded-md text-[11px]">
                        #{displayId}
                      </span>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="text-slate-800 font-semibold text-xs tracking-tight">{senderName}</div>
                      <div className="text-slate-400 text-[10px] mt-1 font-medium truncate max-w-[160px]" title={origin}>
                        {origin}
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="text-slate-800 font-semibold text-xs tracking-tight flex items-center gap-1.5">
                        <ArrowRight className="w-3 h-3 text-slate-300" />
                        {receiverName}
                      </div>
                      <div className="text-slate-400 text-[10px] mt-1 font-medium truncate max-w-[160px]" title={destination}>
                        {destination}
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold bg-slate-50 text-slate-600 border border-slate-100 px-2 py-0.5 rounded-full capitalize">
                        <Package className="w-2.5 h-2.5 text-slate-400" />
                        {goodsType}
                      </span>
                    </td>
                    <td className="px-6 py-4.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Dara Express
                    </td>
                    <td className="px-6 py-4.5">
                      <div className="font-bold text-slate-800 text-[13px]">
                        ₦{amount.toLocaleString()}
                      </div>
                      <div className={`text-[9px] font-bold uppercase tracking-wider mt-0.5 ${
                        payStatus === 'success' || payStatus === 'paid' ? 'text-emerald-600' : 'text-rose-500'
                      }`}>
                        {payStatus === 'success' || payStatus === 'paid' ? 'Paid' : 'Unpaid'}
                      </div>
                    </td>
                    <td className="px-6 py-4.5">
                      {riderName !== 'Rider unassigned' ? (
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 text-[10px] font-bold shrink-0">
                            {initials}
                          </div>
                          <div>
                            <span className="text-xs text-slate-800 font-semibold block leading-tight">
                              {riderName}
                            </span>
                            <span className="text-[9px] text-emerald-600 font-medium flex items-center gap-0.5 mt-0.5">
                              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" /> Active
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 text-slate-400">
                          <div className="w-7 h-7 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[10px] font-bold shrink-0">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <span className="text-xs font-medium italic">{riderName}</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4.5 text-center" onClick={(e) => e.stopPropagation()}>
                      {riderPhone ? (
                        <a 
                          href={`tel:${riderPhone}`} 
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-100/50 shadow-sm transition-all hover:scale-105 active:scale-95"
                          title={`Call ${riderName}`}
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </a>
                      ) : (
                        <button 
                          disabled 
                          className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-300 border border-slate-100 cursor-not-allowed"
                        >
                          <Phone className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </td>
                    <td className="px-6 py-4.5">
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 border rounded-full shadow-[0_1px_2px_rgba(0,0,0,0.01)] ${sc.text}`}>
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
                    </td>
                    <td className="px-6 py-4.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onViewDetails({ ...booking, calculatedPrice: calculateBookingPrice(booking) })}
                          className="text-[11px] font-bold text-slate-600 hover:text-slate-800 px-3 py-1.5 rounded-lg hover:bg-slate-100 border border-transparent hover:border-slate-200/50 transition-all active:scale-95"
                        >
                          Details
                        </button>
                        {canPayNow && (
                          <button
                            onClick={() => onPay(booking)}
                            className="inline-flex items-center gap-1 text-[11px] font-extrabold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-100/50 px-3 py-1.5 rounded-lg shadow-sm transition-all hover:scale-105 active:scale-95"
                          >
                            <CreditCard className="w-3.5 h-3.5" /> Pay
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
