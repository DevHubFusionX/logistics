import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Package, MapPin, DollarSign, Tag } from 'lucide-react'
import { PageHeader } from '@/features/dashboard'
import { useBookingStore } from '@/features/booking'

export default function Quotation() {
  const location = useLocation()
  const navigate = useNavigate()
  const store = useBookingStore()

  // Use location state or fallback to store
  const bookingData = location.state?.bookingData || store.formData
  const bookingId = location.state?.bookingId || store.bookingId
  const clientId = location.state?.clientId

  if (!bookingData || (!location.state?.bookingData && !store.bookingId)) {
    navigate('/booking/request')
    return null
  }

  // Use the API-calculated price from the store (set by useBookingFlow)
  const estimatedCost = location.state?.quote?.total || store.estimatedCost || 0

  const handleAccept = () => {
    store.setEstimatedCost(estimatedCost)
    navigate('/booking/payment', { state: { bookingData, estimatedCost, bookingId } })
  }

  const formattedPrice = Number(estimatedCost).toLocaleString()

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Your Quote"
        subtitle={`Booking ID: ${bookingId}`}
      />

      <button onClick={() => navigate('/booking/request')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Form
      </button>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Shipment Summary</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Service Type:</span>
                <span className="font-semibold capitalize">{bookingData.serviceType || bookingData.vehicleType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cargo Type:</span>
                <span className="font-semibold capitalize">{bookingData.cargoType || bookingData.goodsType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-semibold">{bookingData.weight || bookingData.cargoWeightKg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="font-semibold">{bookingData.pickupCity || bookingData.pickupLocation?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-semibold">{bookingData.deliveryCity || bookingData.dropoffLocation?.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Date:</span>
                <span className="font-semibold">{bookingData.pickupDate || bookingData.estimatedPickupDate}</span>
              </div>
            </div>

          </div>

          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-200 p-6">
            <div className="flex items-center gap-2 text-green-700 mb-3">
              <CheckCircle className="w-5 h-5" />
              <span className="font-semibold">What's Included</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Real-time GPS tracking
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Temperature monitoring
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Insurance coverage
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                24/7 customer support
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-t-xl border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Estimated Price</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-lg font-bold border-b pb-4">
                <span>Total:</span>
                <span className="text-blue-600">₦{formattedPrice}</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Price includes insurance, handling, and applicable taxes. Final amount calculated by our system based on route, weight, and service type.
              </p>
            </div>

            <button onClick={handleAccept} className="w-full mt-6 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
              Proceed to Payment <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
