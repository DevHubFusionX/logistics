import { Package, CheckCircle, CreditCard, Truck } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { useBookingFlow } from '../../hooks/useBookingFlow'
import ProgressSteps from '../../components/booking/ProgressSteps'
import ShipmentDetailsForm from '../../components/booking/ShipmentDetailsForm'
import ReviewQuote from '../../components/booking/ReviewQuote'
import PaymentSelection from '../../components/booking/PaymentSelection'
import BookingConfirmation from '../../components/booking/BookingConfirmation'
import DraftRecoveryBanner from '../../components/booking/DraftRecoveryBanner'
import SaveDraftButton from '../../components/booking/SaveDraftButton'
import ErrorFallback from '../../components/common/ErrorFallback'
import RetryIndicator from '../../components/common/RetryIndicator'
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
    showDraftBanner,
    formData,
    retry,
    draft,
    handleRestoreDraft,
    handleDiscardDraft,
    handleSaveDraft,
    handleNext,
    handleConfirmBooking,
    handleRetryBooking,
    handleResetBooking,
    handlePaymentSuccess,
    handlePaymentClose,
    handlePayLater,
    handleChange,
    handleNestedChange
  } = useBookingFlow()

  const steps = [
    { num: 1, name: 'Shipment Details', icon: Package },
    { num: 2, name: 'Review & Quote', icon: CheckCircle },
    { num: 3, name: 'Payment', icon: CreditCard },
    { num: 4, name: 'Confirmation', icon: Truck }
  ]

  // Show error fallback if there's an error on step 2
  if (error && step === 2) {
    return (
      <div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
        <PageHeader
          title="Book a Shipment"
          subtitle="Complete your logistics booking in 3 easy steps"
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
    <div className="space-y-4 sm:space-y-6 pb-6 px-4 sm:px-0">
      <NetworkStatus />
      <RetryIndicator retryCount={retry.retryCount} retryDelay={retry.retryDelay} />

      <PageHeader
        title="Book a Shipment"
        subtitle="Complete your logistics booking in 3 easy steps"
      />

      {showDraftBanner && (
        <DraftRecoveryBanner
          draftAge={draft.draftAge}
          onRestore={handleRestoreDraft}
          onDiscard={handleDiscardDraft}
        />
      )}

      <ProgressSteps steps={steps} currentStep={step} />

      {step === 1 && (
        <>
          <ShipmentDetailsForm
            formData={formData}
            onChange={handleChange}
            onNestedChange={handleNestedChange}
            onSubmit={handleNext}
          />
          <div className="flex justify-end">
            <SaveDraftButton
              onSave={handleSaveDraft}
              lastSaved={draft.lastSaved}
            />
          </div>
        </>
      )}

      {step === 2 && (
        <ReviewQuote
          formData={formData}
          estimatedCost={estimatedCost}
          onBack={() => setStep(1)}
          onConfirm={handleConfirmBooking}
          loading={loading}
        />
      )}

      {step === 3 && (
        <PaymentSelection
          bookingId={bookingId}
          estimatedCost={estimatedCost}
          email={formData.email}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentClose={handlePaymentClose}
          onPayLater={handlePayLater}
          onBack={() => setStep(2)}
        />
      )}

      {step === 4 && (
        <BookingConfirmation
          bookingId={bookingId}
          estimatedCost={estimatedCost}
          formData={formData}
        />
      )}
    </div>
  )
}
