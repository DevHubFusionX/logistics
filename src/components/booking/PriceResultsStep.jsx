import { Package, MapPin, ArrowRight, ArrowLeft, Truck, ShieldCheck, Clock, CheckCircle } from 'lucide-react'

export default function PriceResultsStep({ formData, estimatedCost, loading, onNext, onBack }) {
  const features = [
    { icon: Truck, title: 'Door-to-door', desc: 'Full delivery' },
    { icon: Clock, title: 'Real-time tracking', desc: 'Secure transit' },
    { icon: ShieldCheck, title: 'Insurance', desc: 'Protected cargo' },
    { icon: CheckCircle, title: 'Expert Handling', desc: 'Pro care' }
  ]

  return (
    <div className="max-w-5xl mx-auto animate-fadeIn px-4">
      {/* Shipment Ticket Container */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-blue-900/10 overflow-hidden relative">

        {/* Header Ribbon - More Colorful */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 px-8 py-4 flex items-center justify-between border-b border-gray-100/50">
          <div className="flex items-center gap-3">
            <div className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse shadow-[0_0_10px_rgba(0,132,61,0.5)]" />
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">{formData.vehicleType || 'Standard'} Quote Summary</span>
          </div>
          <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Instant Pricing Estimate</p>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Left Side: Route and Info */}
          <div className="flex-1 p-8 sm:p-10 space-y-10 border-r border-gray-50 bg-white">
            {/* Horizontal Route */}
            <div className="flex items-center justify-between relative px-4">
              <div className="absolute left-12 right-12 top-6 h-px border-t-2 border-dashed border-gray-200 -z-0" />

              <div className="flex flex-col items-center gap-4 relative z-10 scale-90 sm:scale-100">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-primary flex items-center justify-center shadow-lg shadow-primary/10 transition-transform hover:scale-110 duration-300">
                  <div className="w-4 h-4 rounded-full bg-primary" />
                </div>
                <div className="text-center">
                  <span className="text-[9px] font-black text-primary uppercase tracking-[0.2em] block mb-1">Origin</span>
                  <h3 className="text-lg font-bold text-gray-900 leading-none">{formData.pickupLocation.city}</h3>
                </div>
              </div>

              <div className="bg-blue-50 p-2.5 rounded-full border border-blue-100 shadow-sm z-10 hidden sm:block">
                <ArrowRight className="w-5 h-5 text-primary" />
              </div>

              <div className="flex flex-col items-center gap-4 relative z-10 scale-90 sm:scale-100">
                <div className="w-12 h-12 rounded-2xl bg-white border-2 border-accent flex items-center justify-center shadow-lg shadow-accent/10 transition-transform hover:scale-110 duration-300">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
                <div className="text-center">
                  <span className="text-[9px] font-black text-accent uppercase tracking-[0.2em] block mb-1">Destination</span>
                  <h3 className="text-lg font-bold text-gray-900 leading-none">{formData.dropoffLocation.city}</h3>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 pt-6">
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Cargo Category</label>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-orange-50">
                    <Package className="w-4 h-4 text-orange-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{formData.goodsType}</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Weight / Qty</label>
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-blue-50">
                    <Truck className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm font-bold text-gray-800">{formData.cargoWeightKg}kg • {formData.quantity} units</p>
                </div>
              </div>
              <div className="space-y-1.5 col-span-2 sm:col-span-1">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Vehicle Selected</label>
                <p className="text-sm font-bold text-blue-600 bg-blue-50 inline-block px-3 py-1 rounded-lg border border-blue-100">
                  {formData.vehicleType}
                </p>
              </div>
            </div>

            <div className="pt-6 grid grid-cols-2 gap-4">
              {features.map((f, i) => (
                <div key={i} className="flex items-center gap-3 py-2.5 px-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm group hover:border-accent/30 transition-all">
                  <CheckCircle className="w-4 h-4 text-accent shrink-0 group-hover:scale-110 transition-transform" />
                  <span className="text-[11px] font-bold text-gray-600 tracking-tight">{f.title}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-[320px] bg-gradient-to-b from-primary/5 to-accent/5 p-8 sm:p-10 flex flex-col items-center justify-center text-center border-l border-dashed border-gray-200 shadow-inner">
            <div className="space-y-1 mb-8">
              <p className="text-primary/60 text-[10px] font-black uppercase tracking-widest text-center">Estimated Price</p>
              <h2 className="text-4xl font-black text-gray-900 leading-tight">
                ₦{estimatedCost?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                <span className="text-lg text-gray-400 font-semibold">.00</span>
              </h2>
              <p className="text-[10px] text-accent font-bold uppercase tracking-wider">VAT & Fees Included</p>
            </div>

            <div className="w-full space-y-4">
              <button
                onClick={onNext}
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary via-blue-600 to-accent text-white rounded-2xl py-4 font-black uppercase tracking-[0.2em] text-[10px] hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-1 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-3 group border border-white/20 shadow-xl"
              >
                {loading ? 'Processing...' : (
                  <>
                    Proceed to Booking
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <button
                onClick={onBack}
                className="w-full py-3 rounded-xl font-bold text-gray-400 hover:text-primary transition-all text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/50"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Edit Details
              </button>
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-[10px] text-gray-400 font-medium uppercase tracking-[0.1em] mt-8 opacity-60">
        Prices are calculated based on current market rates and distance.
      </p>
    </div>
  )
}
