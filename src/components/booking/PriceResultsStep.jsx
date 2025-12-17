import { Package, MapPin, ArrowRight, ArrowLeft, Truck, Shield, Clock, CheckCircle2, TrendingUp } from 'lucide-react'

export default function PriceResultsStep({ formData, estimatedCost, loading, onNext, onBack }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl p-8 shadow-2xl text-white">
        <div className="text-center mb-6">
          <div className="inline-flex p-3 bg-white/20 rounded-full mb-3">
            <TrendingUp className="w-8 h-8" />
          </div>
          <p className="text-blue-100 text-sm mb-2 font-medium">Estimated Shipping Cost</p>
          <p className="text-5xl font-bold mb-2">₦{estimatedCost?.toFixed(2)}</p>
          <p className="text-blue-100 text-sm">Based on distance and package details</p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 space-y-3 border border-white/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-green-200" />
              </div>
              <span className="text-blue-100 font-medium">From</span>
            </div>
            <span className="font-bold text-lg">{formData.pickupLocation.city}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-200" />
              </div>
              <span className="text-blue-100 font-medium">To</span>
            </div>
            <span className="font-bold text-lg">{formData.dropoffLocation.city}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Package className="w-5 h-5 text-purple-200" />
              </div>
              <span className="text-blue-100 font-medium">Package</span>
            </div>
            <span className="font-bold text-lg">{formData.goodsType} ({formData.cargoWeightKg}kg)</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border-2 border-gray-100 p-6 shadow-lg">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 bg-green-100 rounded-lg">
            <Truck className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">What's Included</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-green-100 rounded-lg flex-shrink-0">
              <Truck className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Door-to-door</div>
              <div className="text-sm text-gray-600">Complete delivery service</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Real-time tracking</div>
              <div className="text-sm text-gray-600">Track your shipment</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Insurance coverage</div>
              <div className="text-sm text-gray-600">Protected shipment</div>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
            <div className="p-2 bg-orange-100 rounded-lg flex-shrink-0">
              <CheckCircle2 className="w-5 h-5 text-orange-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">Professional handling</div>
              <div className="text-sm text-gray-600">Expert care</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onBack}
          className="px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-all font-semibold shadow-md text-base disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Book Now'} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
