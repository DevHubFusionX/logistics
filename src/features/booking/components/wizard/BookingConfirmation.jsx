import { CheckCircle, Package, Calendar } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BookingConfirmation({ bookingId, estimatedCost, formData }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-8 text-center space-y-6">
      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-14 h-14 rounded-2xl bg-green-50 flex items-center justify-center">
          <CheckCircle className="w-7 h-7 text-green-600" />
        </div>
      </div>

      <div>
        <h3 className="font-heading font-bold text-xl text-gray-900">Booking confirmed!</h3>
        <p className="text-sm text-gray-400 mt-1">Your shipment has been successfully booked</p>
      </div>

      {/* Reference */}
      <div className="bg-sky-50 rounded-xl px-6 py-4 inline-block w-full">
        <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Booking reference</p>
        <p className="font-heading font-black text-2xl text-sky-700 break-all">{bookingId}</p>
        <p className="text-xs text-gray-500 mt-1">
          Estimated cost: <span className="font-bold text-gray-800">₦{estimatedCost?.toLocaleString()}</span>
        </p>
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
            <Calendar className="w-3 h-3" /> Pickup
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {new Date(formData.estimatedPickupDate).toLocaleDateString()}
          </p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center justify-center gap-1 mb-1">
            <Calendar className="w-3 h-3" /> Delivery
          </p>
          <p className="text-sm font-semibold text-gray-800">
            {new Date(formData.estimatedDeliveryDate).toLocaleDateString()}
          </p>
        </div>
      </div>

      <p className="text-xs text-gray-400">
        Our team will assign a driver and send confirmation to your email and phone shortly.
      </p>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          onClick={() => navigate('/my-bookings')}
          className="flex-1 py-3 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
        >
          <Package className="w-4 h-4" /> View my bookings
        </button>
        <button
          onClick={() => navigate('/my-bookings')}
          className="flex-1 py-3 border border-gray-200 text-gray-600 text-sm font-semibold rounded-xl hover:bg-gray-50 transition-colors"
        >
          Back to dashboard
        </button>
      </div>
    </div>
  )
}
