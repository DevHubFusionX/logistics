import { CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function BookingConfirmation({ bookingId, estimatedCost, formData }) {
  const navigate = useNavigate()

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
      <div className="text-center">
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Booking Confirmed!</h3>
        <p className="text-sm sm:text-base text-gray-600 mb-6">Your shipment has been successfully booked</p>
        
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 sm:p-6 mb-6 max-w-md mx-auto">
          <p className="text-xs sm:text-sm text-gray-600 mb-1">Booking Reference</p>
          <p className="text-2xl sm:text-3xl font-bold text-blue-600 mb-4 break-all">{bookingId}</p>
          <p className="text-xs sm:text-sm text-gray-600">Estimated Cost: <span className="font-bold text-gray-900">₦{estimatedCost?.toFixed(2)}</span></p>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6 max-w-md mx-auto">
          <p className="text-sm text-gray-700">
            <strong>Next Steps:</strong> Our team will review your booking and assign a driver. You'll receive a confirmation email and SMS with tracking details shortly.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Pickup</p>
            <p className="font-semibold text-sm">{new Date(formData.estimatedPickupDate).toLocaleDateString()}</p>
          </div>
          <div className="text-center p-3 bg-gray-50 rounded-lg">
            <p className="text-xs text-gray-500">Delivery</p>
            <p className="font-semibold text-sm">{new Date(formData.estimatedDeliveryDate).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button onClick={() => navigate('/my-bookings')} className="px-4 sm:px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base">
            View My Bookings
          </button>
          <button onClick={() => navigate('/dashboard')} className="px-4 sm:px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  )
}
