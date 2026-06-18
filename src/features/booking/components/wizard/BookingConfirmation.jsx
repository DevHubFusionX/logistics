import { CheckCircle2, Calendar, MapPin, ArrowRight, Clipboard, Truck, ShieldCheck, Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function BookingConfirmation({ bookingId, estimatedCost, formData }) {
  const navigate = useNavigate()
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(bookingId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pickupCity = formData.pickupLocation?.city || 'Lagos'
  const dropoffCity = formData.dropoffLocation?.city || 'Warri'

  const formattedPickupDate = formData.estimatedPickupDate 
    ? new Date(formData.estimatedPickupDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : 'Not scheduled'

  const formattedDeliveryDate = formData.estimatedDeliveryDate
    ? new Date(formData.estimatedDeliveryDate).toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })
    : 'Not scheduled'

  return (
    <div className="w-full bg-white rounded-3xl border border-slate-100 shadow-[0_12px_40px_rgb(0,0,0,0.03)] overflow-hidden">
      
      {/* Decorative success banner */}
      <div className="bg-gradient-to-r from-emerald-500/5 to-teal-500/5 py-10 px-8 text-center border-b border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
        {/* Glowing background blob */}
        <div className="absolute w-64 h-64 rounded-full bg-emerald-400/5 blur-3xl -top-10 -left-10" />
        <div className="absolute w-64 h-64 rounded-full bg-teal-400/5 blur-3xl -bottom-10 -right-10" />

        <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 shadow-md relative z-10 animate-bounce">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-4 relative z-10">
          Booking Confirmed!
        </h2>
        <p className="text-sm text-slate-500 mt-1 relative z-10 max-w-md">
          Your cold chain shipment has been successfully reserved. We have started processing your request.
        </p>
      </div>

      {/* Info Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
        
        {/* Left Col: Ref, Actions, Support notes (7 Cols) */}
        <div className="lg:col-span-7 p-8 space-y-8 flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Reference info */}
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Booking Reference
              </span>
              <div className="mt-2 flex items-center gap-3 bg-slate-50 border border-slate-100 px-4 py-3 rounded-xl max-w-md">
                <span className="font-mono text-xs font-bold text-slate-700 select-all truncate">
                  {bookingId}
                </span>
                <button
                  onClick={handleCopy}
                  className="px-2.5 py-1 text-[10px] font-bold text-sky-700 bg-sky-50 border border-sky-100 rounded-md hover:bg-sky-100 transition-colors flex-shrink-0"
                >
                  {copied ? 'Copied!' : 'Copy Reference'}
                </button>
              </div>
            </div>

            {/* Next steps info list */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">What happens next</h4>
              <div className="space-y-3.5">
                {[
                  { icon: Truck, label: 'Driver assignment', desc: 'Our system is matching the closest certified driver for your temperature requirements.' },
                  { icon: Mail, label: 'Email confirmation', desc: 'A confirmation summary along with tracking link has been sent to your registered address.' },
                  { icon: ShieldCheck, label: 'Cargo insurance activated', desc: 'Your goods are covered for transit starting from scheduled pickup time.' },
                ].map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 flex-shrink-0 mt-0.5">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-800">{label}</p>
                      <p className="text-[10px] text-slate-400 leading-relaxed mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Action CTAs */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-3.5">
            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-sky-700 to-sky-800 hover:from-sky-600 hover:to-sky-700 text-white text-sm font-bold rounded-xl transition-all shadow-md shadow-sky-800/10 hover:shadow-lg hover:shadow-sky-800/20 active:scale-[0.98] flex items-center justify-center gap-2"
            >
              View my bookings <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="w-full sm:w-auto px-6 py-3.5 border border-slate-200 text-slate-600 text-sm font-semibold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center"
            >
              Back to dashboard
            </button>
          </div>
        </div>

        {/* Right Col: Cost & dates overview (5 Cols) */}
        <div className="lg:col-span-5 p-8 bg-slate-50/20 flex flex-col gap-6 justify-center">
          
          {/* Cost Summary Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Estimated Cost</span>
            <div className="mt-1 flex items-baseline gap-1 text-slate-900">
              <span className="text-3xl font-black tracking-tight">
                ₦{estimatedCost?.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 mt-1.5 block">Estimated VAT & insurance premium included</span>
          </div>

          {/* Date Schedule Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Schedule</span>
            
            <div className="space-y-4">
              {/* Pickup info */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 flex items-center justify-center text-sky-700 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Estimated Pickup</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{formattedPickupDate}</p>
                </div>
              </div>

              {/* Delivery info */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-700 flex-shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider block">Estimated Delivery</span>
                  <p className="text-xs font-bold text-slate-800 mt-0.5">{formattedDeliveryDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Route Preview Box */}
          <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-3">Transit Route</span>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
              <span>{pickupCity}</span>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
              <span>{dropoffCity}</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
