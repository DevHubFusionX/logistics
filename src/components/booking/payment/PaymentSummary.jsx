export default function PaymentSummary({ bookingId, amount }) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 rounded-2xl p-4 sm:p-6 mb-6 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-1">Booking Reference</p>
          <div className="flex items-center gap-2">
            <span className="text-base sm:text-lg font-bold text-gray-900 font-mono tracking-tight">{bookingId}</span>
          </div>
        </div>
        <div className="w-full sm:w-auto pt-4 sm:pt-0 border-t sm:border-t-0 border-blue-200 sm:text-right">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Amount</p>
          <p className="text-2xl sm:text-3xl font-extrabold text-blue-700">₦{amount?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
        </div>
      </div>
    </div>
  )
}
