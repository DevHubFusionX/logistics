export default function PaymentSummary({ bookingId, amount }) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100 mb-4">
      <div>
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Booking ref</p>
        <p className="text-sm font-mono font-bold text-gray-900">{bookingId}</p>
      </div>
      <div className="text-right">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-0.5">Amount due</p>
        <p className="font-heading font-black text-xl text-sky-700">
          ₦{amount?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
        </p>
      </div>
    </div>
  )
}
