import { MapPin, Package, Truck, ArrowRight, ArrowLeft, ShieldCheck, Clock, CheckCircle } from 'lucide-react'

const includes = [
  { icon: Truck,       label: 'Door-to-door delivery' },
  { icon: Clock,       label: 'Real-time tracking' },
  { icon: ShieldCheck, label: 'Insurance coverage' },
  { icon: CheckCircle, label: 'Expert handling' },
]

export default function PriceResultsStep({ formData, estimatedCost, loading, onNext, onBack }) {
  return (
    <div className="space-y-4 w-full">
      <div className="bg-white rounded-none sm:rounded-2xl border-y sm:border border-gray-100 overflow-hidden w-full">

        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="font-heading font-bold text-gray-900 text-lg">Your instant quote</h3>
            <p className="text-xs text-gray-400 mt-0.5">{formData.vehicleType} · VAT & fees included</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 bg-sky-50 text-sky-700 rounded-full">Estimate</span>
        </div>

        {/* Body — 3 columns on lg, stacked on mobile */}
        <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-gray-100">

          {/* Col 1: Route */}
          <div className="p-6 space-y-4">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Route</p>
            <div className="flex items-start gap-3">
              <div className="flex flex-col items-center gap-1 mt-1 flex-shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-sky-700" />
                <div className="w-px h-8 bg-gray-200" />
                <div className="w-2.5 h-2.5 rounded-full border-2 border-sky-700" />
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-xs text-gray-400 font-medium">From</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{formData.pickupLocation.city}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium">To</p>
                  <p className="text-base font-bold text-gray-900 mt-0.5">{formData.dropoffLocation.city}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Col 2: Cargo + includes */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Package className="w-3 h-3" /> Cargo
                </p>
                <p className="text-sm font-semibold text-gray-800">{formData.goodsType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider flex items-center gap-1 mb-1">
                  <Truck className="w-3 h-3" /> Truck
                </p>
                <p className="text-sm font-semibold text-gray-800">{formData.vehicleType}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2.5">
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">What's included</p>
              {includes.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-2 text-xs text-gray-600">
                  <Icon className="w-3.5 h-3.5 text-sky-700 flex-shrink-0" />
                  {label}
                </div>
              ))}
            </div>
          </div>

          {/* Col 3: Price + CTA */}
          <div className="p-6 flex flex-col justify-between gap-6 bg-gray-50/50">
            <div>
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-2">Estimated total</p>
              <p className="font-heading font-black text-4xl text-gray-900 leading-none">
                ₦{estimatedCost?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs text-gray-400 mt-2">Based on current market rates & distance</p>
            </div>

            <div className="space-y-2">
              <button
                onClick={onNext}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 py-4 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
              >
                {loading ? 'Processing…' : <>Proceed to booking <ArrowRight className="w-4 h-4" /></>}
              </button>
              <button
                onClick={onBack}
                className="w-full py-3 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Edit details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
