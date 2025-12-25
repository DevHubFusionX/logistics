import { Package, MapPin, ArrowRight, ArrowLeft, Truck, Shield, Clock, CheckCircle2, TrendingUp, Sparkles } from 'lucide-react'

export default function PriceResultsStep({ formData, estimatedCost, loading, onNext, onBack }) {
  const formattedCost = estimatedCost?.toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })

  return (
    <div className="space-y-8 animate-fadeIn max-w-lg mx-auto">
      {/* Price Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 rounded-3xl p-8 shadow-2xl text-white transform hover:scale-[1.01] transition-transform duration-300">
        {/* Background blobs */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-cyan-400/20 blur-2xl"></div>

        <div className="relative z-10 flex flex-col items-center">
          <div className="bg-white/15 backdrop-blur-md p-3 rounded-2xl mb-6 shadow-inner ring-1 ring-white/20">
            <Truck className="w-8 h-8 text-yellow-300" />
          </div>

          <h3 className="text-blue-100 font-medium tracking-wide uppercase text-sm mb-2">Estimated Total Cost</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-5xl sm:text-6xl font-extrabold tracking-tight drop-shadow-sm">
              {formattedCost}
            </span>
          </div>

          <div className="w-full bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10 space-y-4">
            {/* Route Visualization */}
            <div className="flex items-center justify-between relative">
              {/* Connecting Line */}
              <div className="absolute left-[30px] right-[30px] top-1/2 h-0.5 bg-gradient-to-r from-green-400/50 to-orange-400/50 -z-10"></div>

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 bg-green-500 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-green-500/20 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-green-200 font-bold uppercase tracking-wider">From</span>
                  <span className="font-bold text-sm text-center">{formData.pickupLocation.city}</span>
                </div>
              </div>

              <ArrowRight className="w-5 h-5 text-white/40" />

              <div className="flex flex-col items-center gap-2 group">
                <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shadow-lg ring-4 ring-orange-500/20 group-hover:scale-110 transition-transform">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[10px] text-orange-200 font-bold uppercase tracking-wider">To</span>
                  <span className="font-bold text-sm text-center">{formData.dropoffLocation.city}</span>
                </div>
              </div>
            </div>

            <div className="h-px bg-white/10 w-full my-2"></div>

            <div className="flex items-center justify-between px-2">
              <span className="text-blue-200 text-sm">Package Details</span>
              <span className="font-semibold text-sm flex items-center gap-2">
                <Package className="w-4 h-4 text-purple-300" />
                {formData.goodsType} ({formData.truckSize} Tons)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { icon: Truck, title: "Door-to-door", desc: "Complete delivery service", color: "green" },
          { icon: Clock, title: "Real-time tracking", desc: "Track your shipment", color: "blue" },
          { icon: Shield, title: "Insurance included", desc: "Protected shipment", color: "purple" },
          { icon: CheckCircle2, title: "Expert Handling", desc: "Professional care", color: "orange" }
        ].map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all flex items-start gap-4 group">
            <div className={`p-3 rounded-xl bg-${item.color}-50 group-hover:bg-${item.color}-100 transition-colors`}>
              <item.icon className={`w-6 h-6 text-${item.color}-600`} />
            </div>
            <div>
              <h4 className="font-bold text-gray-900 leading-tight mb-1">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-4">
        <button
          onClick={onBack}
          className="px-6 py-4 rounded-xl font-semibold text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-all flex items-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          onClick={onNext}
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-blue-900 to-blue-800 text-white py-4 rounded-xl font-bold text-lg shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 active:scale-[0.98] transition-all flex items-center justify-center gap-3"
        >
          {loading ? 'Processing...' : 'Book Shipment'} <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
