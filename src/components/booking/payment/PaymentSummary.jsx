export default function PaymentSummary({ bookingId, amount }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <p className="text-xs sm:text-sm text-gray-600">Booking ID</p>
          <p className="text-lg sm:text-xl font-bold text-blue-600 break-all">{bookingId}</p>
        </div>
        <div className="sm:text-right">
          <p className="text-xs sm:text-sm text-gray-600">Amount Due</p>
          <p className="text-xl sm:text-2xl font-bold text-gray-900">₦{amount?.toFixed(2)}</p>
        </div>
      </div>
    </div>
  )
}
