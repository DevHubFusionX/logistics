import { useState, useEffect } from 'react'
import { User, ArrowLeft, ArrowRight } from 'lucide-react'
import StepProgressPills from './details/StepProgressPills'
import PickupDetailsSubStep from './details/PickupDetailsSubStep'
import DeliveryDetailsSubStep from './details/DeliveryDetailsSubStep'

export default function BookingDetailsFlow({ formData, onChange, onNestedChange, onSubmit, onBack, loading }) {
  const [subStep, setSubStep] = useState(1)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const validateStep = (step) => {
    const e = {}
    if (step === 1) {
      if (!formData.pickupPerson?.name) e.pickupPersonName = 'Required'
      if (!formData.pickupPerson?.phone) e.pickupPersonPhone = 'Required'
      if (!formData.pickupPerson?.email) e.pickupPersonEmail = 'Required'
      if (!formData.pickupLocation?.address) e.pickupAddress = 'Required'
      if (!formData.estimatedPickupDate) e.estimatedPickupDate = 'Required'
    } else if (step === 2) {
      if (!formData.receiverPerson?.name) e.receiverPersonName = 'Required'
      if (!formData.receiverPerson?.phone) e.receiverPersonPhone = 'Required'
      if (!formData.receiverPerson?.email) e.receiverPersonEmail = 'Required'
      if (!formData.dropoffLocation?.address) e.dropoffAddress = 'Required'
      if (!formData.estimatedDeliveryDate) e.estimatedDeliveryDate = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  // Keep validation errors state in sync with form data changes
  useEffect(() => {
    validateStep(subStep)
  }, [formData, subStep])

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }))
  }

  const handleNext = () => {
    // Mark all fields in current step as touched to trigger error states
    const stepFields = subStep === 1
      ? ['pickupPersonName', 'pickupPersonPhone', 'pickupPersonEmail', 'pickupAddress', 'estimatedPickupDate']
      : ['receiverPersonName', 'receiverPersonPhone', 'receiverPersonEmail', 'dropoffAddress', 'estimatedDeliveryDate']

    const newTouched = { ...touched }
    stepFields.forEach(f => {
      newTouched[f] = true
    })
    setTouched(newTouched)

    if (!validateStep(subStep)) return
    if (subStep < 2) setSubStep(subStep + 1)
    else onSubmit()
  }

  const handleBack = () => {
    if (subStep > 1) setSubStep(subStep - 1)
    else onBack()
  }

  const subStepLabels = ['Pickup details', 'Delivery details']

  return (
    <div className="space-y-4 w-full">
      {/* Read-only profile confirmation header */}
      <div className="bg-sky-50/50 border border-sky-100/50 rounded-xl p-3 px-4 flex items-center justify-between text-xs sm:text-sm text-sky-900">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-sky-600 flex-shrink-0" />
          <span>Booking as <strong>{formData.fullNameOrBusiness || 'Dara Customer'}</strong> ({formData.email})</span>
        </div>
      </div>

      {/* Sub-step pills */}
      <StepProgressPills subStep={subStep} subStepLabels={subStepLabels} />

      {subStep === 1 && (
        <PickupDetailsSubStep
          formData={formData}
          onChange={onChange}
          onNestedChange={onNestedChange}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
        />
      )}

      {subStep === 2 && (
        <DeliveryDetailsSubStep
          formData={formData}
          onChange={onChange}
          onNestedChange={onNestedChange}
          errors={errors}
          touched={touched}
          onBlur={handleBlur}
        />
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={loading}
          className="px-5 py-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60 cursor-pointer"
        >
          {loading ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
          ) : subStep === 2 ? (
            <>Confirm booking <ArrowRight className="w-4 h-4" /></>
          ) : (
            <>Continue <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  )
}
