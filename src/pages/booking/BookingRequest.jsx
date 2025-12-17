import { MapPin, Package, DollarSign, CheckCircle, CreditCard } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { useBookingFlow } from '../../hooks/useBookingFlow'
import ProgressSteps from '../../components/booking/ProgressSteps'
import LocationStep from '../../components/booking/LocationStep'
import PackageStep from '../../components/booking/PackageStep'
import PriceResultsStep from '../../components/booking/PriceResultsStep'
import BookingDetailsStep from '../../components/booking/BookingDetailsStep'
import PaymentSelection from '../../components/booking/PaymentSelection'
import BookingConfirmation from '../../components/booking/BookingConfirmation'
import ErrorFallback from '../../components/common/ErrorFallback'
import NetworkStatus from '../../components/common/NetworkStatus'

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
    { num: 3, name: 'Price', icon: DollarSign },
    { num: 4, name: 'Details', icon: CheckCircle },
    { num: 5, name: 'Payment', icon: CreditCard }
  ]

  if (error && step === 4) {
    return (
      <div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
        <PageHeader
          title="Book a Shipment"
          subtitle="Get instant pricing and book your delivery"
        />
        <ErrorFallback
          error={error}
          onRetry={handleRetryBooking}
          onReset={handleResetBooking}
        />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-5xl mx-auto space-y-6 pb-12 px-4 sm:px-6 lg:px-8 pt-6">
        <NetworkStatus />

        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Book a Shipment</h1>
          <p className="text-gray-600 text-lg">Get instant pricing and book your delivery in minutes</p>
        </div>

        <ProgressSteps steps={steps} currentStep={step} />

        <div className="mt-8">
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
            <BookingDetailsStep
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
  )
}
