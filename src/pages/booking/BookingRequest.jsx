import { useEffect } from 'react'
import { MapPin, Package, Banknote, CheckCircle, CreditCard, Loader2, ArrowRight, Check } from 'lucide-react'
import {
  useBookingFlow,
  LocationStep,
  PackageStep,
  PriceResultsStep,
  BookingDetailsFlow,
  PaymentSelection,
  BookingConfirmation
} from '@/features/booking'
import ErrorFallback from '../../components/common/ErrorFallback'
import NetworkStatus from '../../components/common/NetworkStatus'

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-3">
      <Loader2 className="w-8 h-8 text-sky-700 animate-spin" />
      <p className="text-sm text-gray-600 font-medium">Calculating your rate…</p>
    </div>
  </div>
)

const steps = [
  { num: 1, name: 'Route',   desc: 'Pickup & delivery cities',  icon: MapPin },
  { num: 2, name: 'Cargo',   desc: 'Type & truck size',         icon: Package },
  { num: 3, name: 'Price',   desc: 'Review your quote',         icon: Banknote },
  { num: 4, name: 'Details', desc: 'Contact & address info',    icon: CheckCircle },
  { num: 5, name: 'Payment', desc: 'Secure checkout',           icon: CreditCard },
]

/* ── Mobile step strip ── */
function MobileStepStrip({ currentStep }) {
  return (
    <div className="lg:hidden bg-white border-b border-gray-100 px-4 py-3">
      {/* Step label */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
            Step {currentStep} of {steps.length}
          </p>
          <p className="text-sm font-heading font-bold text-gray-900 mt-0.5">
            {steps.find(s => s.num === currentStep)?.name}
            <span className="text-gray-400 font-normal"> — {steps.find(s => s.num === currentStep)?.desc}</span>
          </p>
        </div>
        <span className="text-xs font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">
          {Math.round((currentStep / steps.length) * 100)}%
        </span>
      </div>

      {/* Icon step row */}
      <div className="flex items-center">
        {steps.map((s, idx) => {
          const done   = currentStep > s.num
          const active = currentStep === s.num
          const Icon   = s.icon
          return (
            <div key={s.num} className="flex items-center flex-1 last:flex-none">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  done   ? 'bg-sky-700 text-white' :
                  active ? 'bg-sky-700 text-white ring-4 ring-sky-100' :
                           'bg-gray-100 text-gray-400'
                }`}>
                  {done ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <span className={`text-[10px] font-semibold ${
                  active ? 'text-sky-700' : done ? 'text-gray-500' : 'text-gray-300'
                }`}>
                  {s.name}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div className="flex-1 h-px mx-1.5 mb-4 relative">
                  <div className="absolute inset-0 bg-gray-200 rounded-full" />
                  <div className={`absolute inset-0 rounded-full bg-sky-700 transition-all duration-500 ${
                    currentStep > s.num ? 'w-full' : 'w-0'
                  }`} />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* ── Desktop sidebar ── */
function StepSidebar({ currentStep, formData }) {
  return (
    <aside className="hidden lg:flex flex-col gap-5 w-72 xl:w-80 flex-shrink-0">
      {/* Brand strip */}
      <div className="bg-sky-700 rounded-2xl p-6 text-white">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-300 mb-1">Book a shipment</p>
        <h2 className="font-heading font-bold text-xl leading-snug">
          Fast, cold-chain<br />delivery across Nigeria
        </h2>
        <p className="text-sky-300 text-xs mt-3 leading-relaxed">
          Instant pricing · Real-time tracking · Insurance included
        </p>
      </div>

      {/* Step list */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        {steps.map((s, idx) => {
          const done   = currentStep > s.num
          const active = currentStep === s.num
          const Icon   = s.icon
          return (
            <div key={s.num}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${active ? 'bg-sky-50' : ''}`}>
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-all ${
                  done   ? 'bg-sky-700 text-white' :
                  active ? 'bg-sky-700 text-white ring-4 ring-sky-100' :
                           'bg-gray-100 text-gray-400'
                }`}>
                  {done ? <Check className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-semibold leading-tight ${
                    active ? 'text-sky-700' : done ? 'text-gray-700' : 'text-gray-400'
                  }`}>{s.name}</p>
                  <p className={`text-xs mt-0.5 ${active ? 'text-sky-500' : 'text-gray-400'}`}>{s.desc}</p>
                </div>
                {active && <ArrowRight className="w-3.5 h-3.5 text-sky-400 flex-shrink-0" />}
              </div>
              {idx < steps.length - 1 && (
                <div className={`h-4 w-px ml-7 ${done ? 'bg-sky-200' : 'bg-gray-100'}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Live summary */}
      {(formData.pickupLocation?.city || formData.goodsType) && (
        <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Your booking so far</p>
          {formData.pickupLocation?.city && (
            <div className="flex items-start gap-2.5">
              <div className="flex flex-col items-center gap-0.5 mt-1 flex-shrink-0">
                <div className="w-2 h-2 rounded-full bg-sky-700" />
                <div className="w-px h-5 bg-gray-200" />
                <div className="w-2 h-2 rounded-full border-2 border-sky-700" />
              </div>
              <div className="space-y-2.5">
                <div>
                  <p className="text-xs text-gray-400">From</p>
                  <p className="text-sm font-semibold text-gray-800">{formData.pickupLocation.city}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400">To</p>
                  <p className="text-sm font-semibold text-gray-800">{formData.dropoffLocation?.city || '—'}</p>
                </div>
              </div>
            </div>
          )}
          {formData.goodsType && (
            <div className="pt-2 border-t border-gray-100 grid grid-cols-2 gap-2">
              <div>
                <p className="text-xs text-gray-400">Cargo</p>
                <p className="text-sm font-semibold text-gray-800">{formData.goodsType}</p>
              </div>
              {formData.vehicleType && (
                <div>
                  <p className="text-xs text-gray-400">Truck</p>
                  <p className="text-sm font-semibold text-gray-800">{formData.vehicleType}</p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  )
}

export default function BookingRequest() {
  const {
    step, setStep, loading, error, bookingId, estimatedCost,
    paymentMethod, setPaymentMethod, formData,
    handleLocationNext, handlePackageNext, handlePriceNext,
    handleConfirmBooking, handleRetryBooking, handleResetBooking,
    handlePaymentSuccess, handlePaymentClose, handlePayLater,
    handleSimpleChange, handleNestedChange
  } = useBookingFlow()

  useEffect(() => { handleResetBooking() }, [handleResetBooking])

  if (error && step === 4) {
    return (
      <div className="p-4">
        <ErrorFallback error={error} onRetry={handleRetryBooking} onReset={handleResetBooking} />
      </div>
    )
  }

  if (step === 6) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BookingConfirmation bookingId={bookingId} estimatedCost={estimatedCost} formData={formData} />
      </div>
    )
  }

  return (
    <>
      {loading && step === 2 && <LoadingOverlay />}

      <div className="h-full flex flex-col">
        <NetworkStatus />

        {/* Mobile step strip — sits at the top, full width */}
        <MobileStepStrip currentStep={step} />

        {/* Content */}
        <div className="flex-1 flex gap-6 p-4 lg:p-6 overflow-hidden">
          <StepSidebar currentStep={step} formData={formData} />

          {/* Form area */}
          <div className="flex-1 min-w-0 overflow-y-auto pb-6">
            <div className="lg:max-w-2xl">
              {step === 1 && <LocationStep formData={formData} onChange={handleNestedChange} onNext={handleLocationNext} />}
              {step === 2 && <PackageStep formData={formData} onChange={handleSimpleChange} onNext={handlePackageNext} onBack={() => setStep(1)} loading={loading} />}
              {step === 3 && <PriceResultsStep formData={formData} estimatedCost={estimatedCost} loading={loading} onNext={handlePriceNext} onBack={() => setStep(2)} />}
              {step === 4 && <BookingDetailsFlow formData={formData} onChange={handleSimpleChange} onNestedChange={handleNestedChange} onSubmit={handleConfirmBooking} onBack={() => setStep(3)} loading={loading} />}
              {step === 5 && <PaymentSelection bookingId={bookingId} estimatedCost={estimatedCost} email={formData.email} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} onPaymentSuccess={handlePaymentSuccess} onPaymentClose={handlePaymentClose} onPayLater={handlePayLater} onBack={() => setStep(4)} />}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
