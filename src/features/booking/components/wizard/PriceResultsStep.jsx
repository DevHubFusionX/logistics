import { MapPin, Package, Truck, ArrowRight, ArrowLeft, ShieldCheck, Clock, CheckCircle } from 'lucide-react'

export default function PriceResultsStep({ formData, estimatedCost, loading, onNext, onBack }) {
  const pickupCity = formData.pickupLocation?.city || 'Lagos'
  const pickupAddress = formData.pickupLocation?.address || 'Pickup Address'
  const dropoffCity = formData.dropoffLocation?.city || 'Warri'
  const dropoffAddress = formData.dropoffLocation?.address || 'Dropoff Address'
  const goodsType = formData.goodsType || 'Frozen Foods'
  const vehicleType = formData.vehicleType || '10 Tons'

  return (
    <div className="w-full space-y-6">
      
      {/* Main Card Container */}
      <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] space-y-6 sm:space-y-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-5 border-b border-slate-100">
          <div>
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Your instant quote</h3>
            <p className="text-xs text-slate-400 mt-1">{vehicleType} · VAT & fees included</p>
          </div>
          <span className="text-xs font-bold px-3 py-1 bg-sky-50 text-sky-700 border border-sky-100 rounded-full">
            Estimate
          </span>
        </div>

        {/* 1. Route Section */}
        <div className="space-y-3">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Route</p>
          <div className="flex items-start gap-4 bg-slate-50/50 p-5 rounded-xl border border-slate-100/30">
            {/* Dotted Stepper */}
            <div className="flex flex-col items-center gap-1.5 mt-1 flex-shrink-0">
              <div className="w-3 h-3 rounded-full bg-sky-600 ring-4 ring-sky-50" />
              <div className="w-0.5 h-10 bg-slate-200 border-dashed border-l-2" />
              <div className="w-3 h-3 rounded-full bg-emerald-600 ring-4 ring-emerald-50" />
            </div>
            
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">From</span>
                <h4 className="text-sm font-bold text-slate-800 mt-0.5">{pickupCity}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate" title={pickupAddress}>
                  {pickupAddress}
                </p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">To</span>
                <h4 className="text-sm font-bold text-slate-800 mt-0.5">{dropoffCity}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate" title={dropoffAddress}>
                  {dropoffAddress}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Specs Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100/30">
            <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-700 flex-shrink-0">
              <Package className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Cargo</span>
              <span className="text-sm font-bold text-slate-800">{goodsType}</span>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-xl border border-slate-100/30">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
              <Truck className="w-4.5 h-4.5" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Truck Requirement</span>
              <span className="text-sm font-bold text-slate-800">{vehicleType}</span>
            </div>
          </div>
        </div>

        {/* 3. Inclusions Section */}
        <div className="space-y-4 pt-2">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">What's included</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {[
              { icon: Truck,       label: 'Door-to-door delivery', desc: 'Secure pickup & direct dropoff' },
              { icon: Clock,       label: 'Real-time tracking',   desc: 'Live location & temperature feed' },
              { icon: ShieldCheck, label: 'Insurance coverage',   desc: 'Transit cargo insurance protection' },
              { icon: CheckCircle, label: 'Expert handling',      desc: 'Certified cold chain logistics' },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-sky-50 flex items-center justify-center text-sky-700 flex-shrink-0 mt-0.5">
                  <Icon className="w-3 h-3" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800">{label}</p>
                  <p className="text-[10px] text-slate-400 mt-0.5">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Pricing & Action Footer */}
        <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Estimated total</span>
            <span className="text-3xl font-black text-slate-900 mt-1 block">
              ₦{estimatedCost?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </span>
            <span className="text-[10px] text-slate-400 mt-1 block">Based on market rates & distance</span>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button
              onClick={onBack}
              className="flex-1 md:flex-none px-5 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-center gap-1.5 border border-slate-200"
            >
              <ArrowLeft className="w-4 h-4" /> Edit details
            </button>
            <button
              onClick={onNext}
              disabled={loading}
              className="flex-grow md:flex-none px-6 py-3 bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-600 hover:to-sky-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-sky-800/10 hover:shadow-lg hover:shadow-sky-800/20 active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing…' : <>Proceed to booking <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
