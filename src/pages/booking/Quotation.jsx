import { useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle, Package, MapPin, DollarSign, Tag } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { calculateQuote } from '../../utils/pricingEngine'

export default function Quotation() {
  const location = useLocation()
  const navigate = useNavigate()
  const { bookingData, bookingId, clientId } = location.state || {}

  if (!bookingData) {
    navigate('/booking/request')
    return null
  }

  const quote = calculateQuote(bookingData, clientId)

  const handleAccept = () => {
    navigate('/booking/payment', { state: { bookingData, quote, bookingId } })
  }

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
                <span className="font-semibold capitalize">{bookingData.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Cargo Type:</span>
                <span className="font-semibold capitalize">{bookingData.cargoType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight:</span>
                <span className="font-semibold">{bookingData.weight} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">From:</span>
                <span className="font-semibold">{bookingData.pickupCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">To:</span>
                <span className="font-semibold">{bookingData.deliveryCity}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pickup Date:</span>
                <span className="font-semibold">{bookingData.pickupDate}</span>
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
              <h2 className="text-xl font-bold text-gray-900">Price Breakdown</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 text-sm">
              {quote.hasClientOverride && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                  <div className="flex items-center gap-2 text-green-700 mb-1">
                    <Tag className="w-4 h-4" />
                    <span className="text-xs font-semibold">Special Client Rate Applied</span>
                  </div>
                  <p className="text-xs text-green-600">Custom pricing for {quote.clientName}</p>
                  <p className="text-xs text-green-600">Base rate: ${quote.appliedRate}/kg • Discount: {quote.discountPercentage}%</p>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Base Price ({bookingData.weight} kg × ${quote.appliedRate}):</span>
                <span>${quote.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service ({bookingData.serviceType} {quote.serviceMultiplier}×):</span>
                <span>${(parseFloat(quote.basePrice) * quote.serviceMultiplier).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance:</span>
                <span>${quote.insurance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Handling:</span>
                <span>${quote.handling}</span>
              </div>
              {parseFloat(quote.discount) > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Client Discount:</span>
                  <span>-${quote.discount}</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Subtotal:</span>
                <span>${quote.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%):</span>
                <span>${quote.tax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-blue-600">${quote.total}</span>
              </div>
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
