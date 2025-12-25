import { MapPin, Package, Banknote, CheckCircle, CreditCard, Loader2 } from 'lucide-react'
import { useBookingFlow } from '../../hooks/useBookingFlow'
import ProgressSteps from '../../components/booking/ProgressSteps'
import LocationStep from '../../components/booking/LocationStep'
import PackageStep from '../../components/booking/PackageStep'
import PriceResultsStep from '../../components/booking/PriceResultsStep'
import BookingDetailsFlow from '../../components/booking/BookingDetailsFlow'
import PaymentSelection from '../../components/booking/PaymentSelection'
import BookingConfirmation from '../../components/booking/BookingConfirmation'
import ErrorFallback from '../../components/common/ErrorFallback'
import NetworkStatus from '../../components/common/NetworkStatus'

const LoadingOverlay = () => (
  <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
      <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      <p className="text-gray-700 font-semibold">Processing your request...</p>
    </div>
  </div>
)

export default function BookingRequest() {
  const {
    step,
    setStep,
    loading,
    error,
    bookingId,
    estimatedCost,
    paymentMethod,
    setPaymentMethod,
    formData,
    handleLocationNext,
    handlePackageNext,
    handlePriceNext,
    handleConfirmBooking,
    handleRetryBooking,
    handleResetBooking,
    handlePaymentSuccess,
    handlePaymentClose,
    handlePayLater,
    handleSimpleChange,
    handleNestedChange
  } = useBookingFlow()

  const steps = [
    { num: 1, name: 'Locations', icon: MapPin },
    { num: 2, name: 'Package', icon: Package },
    { num: 3, name: 'Price', icon: Banknote },
    { num: 4, name: 'Details', icon: CheckCircle },
    { num: 5, name: 'Payment', icon: CreditCard }
  ]

  if (error && step === 4) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <ErrorFallback
            error={error}
            onRetry={handleRetryBooking}
            onReset={handleResetBooking}
          />
        </div>
      </div>
    )
  }

  return (
    <>
      {loading && step === 2 && <LoadingOverlay />}

      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <NetworkStatus />

          <div className="text-center mb-10 animate-fadeIn">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4 shadow-lg">
              <Package className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">
              Book a Shipment
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Get instant pricing and book your delivery in minutes
            </p>
          </div>

          <ProgressSteps steps={steps} currentStep={step} />

          <div className="mt-10">
            {step === 1 && (
              <LocationStep
                formData={formData}
                onChange={handleNestedChange}
                onNext={handleLocationNext}
              />
            )}

            {step === 2 && (
              <PackageStep
                formData={formData}
                onChange={handleSimpleChange}
                onNext={handlePackageNext}
                onBack={() => setStep(1)}
                loading={loading}
              />
            )}

            {step === 3 && (
              <PriceResultsStep
                formData={formData}
                estimatedCost={estimatedCost}
                loading={loading}
                onNext={handlePriceNext}
                onBack={() => setStep(2)}
              />
            )}

            {step === 4 && (
              <BookingDetailsFlow
                formData={formData}
                onChange={handleSimpleChange}
                onNestedChange={handleNestedChange}
                onSubmit={handleConfirmBooking}
                onBack={() => setStep(3)}
                loading={loading}
              />
            )}

            {step === 5 && (
              <PaymentSelection
                bookingId={bookingId}
                estimatedCost={estimatedCost}
                email={formData.email}
                paymentMethod={paymentMethod}
                setPaymentMethod={setPaymentMethod}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentClose={handlePaymentClose}
                onPayLater={handlePayLater}
                onBack={() => setStep(4)}
              />
            )}

            {step === 6 && (
              <BookingConfirmation
                bookingId={bookingId}
                estimatedCost={estimatedCost}
                formData={formData}
              />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
