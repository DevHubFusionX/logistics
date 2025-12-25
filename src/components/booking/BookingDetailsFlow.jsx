import { useState } from 'react'
import { User, MapPin, Truck, ArrowLeft, ArrowRight } from 'lucide-react'
import FormSection from './FormSection'
import FormInput from './FormInput'

export default function BookingDetailsFlow({ formData, onChange, onNestedChange, onSubmit, onBack, loading }) {
  const [subStep, setSubStep] = useState(1)
  const [errors, setErrors] = useState({})

  const validateStep = (step) => {
    const newErrors = {}

    if (step === 1) {
      if (!formData.fullNameOrBusiness) newErrors.fullNameOrBusiness = 'Full Name or Business Name is required'
      if (!formData.email) newErrors.email = 'Email address is required'
      if (!formData.contactPhone) newErrors.contactPhone = 'Phone number is required'
    } else if (step === 2) {
      if (!formData.pickupPerson.name) newErrors.pickupPersonName = 'Pickup contact name is required'
      if (!formData.pickupPerson.phone) newErrors.pickupPersonPhone = 'Pickup contact phone is required'
      if (!formData.pickupPerson.email) newErrors.pickupPersonEmail = 'Pickup contact email is required'
      if (!formData.pickupLocation.address) newErrors.pickupAddress = 'Pickup street address is required'
      if (!formData.estimatedPickupDate) newErrors.estimatedPickupDate = 'Pickup date & time is required'
    } else if (step === 3) {
      if (!formData.receiverPerson.name) newErrors.receiverPersonName = 'Receiver name is required'
      if (!formData.receiverPerson.phone) newErrors.receiverPersonPhone = 'Receiver phone is required'
      if (!formData.receiverPerson.email) newErrors.receiverPersonEmail = 'Receiver email is required'
      if (!formData.dropoffLocation.address) newErrors.dropoffAddress = 'Delivery street address is required'
      if (!formData.estimatedDeliveryDate) newErrors.estimatedDeliveryDate = 'Delivery date & time is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(subStep)) {
      if (subStep < 3) {
        setSubStep(subStep + 1)
      } else {
        onSubmit()
      }
    }
  }

  const handleBack = () => {
    if (subStep > 1) {
      setSubStep(subStep - 1)
    } else {
      onBack()
    }
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Sub-step indicator for mobile */}
      <div className="md:hidden flex justify-center gap-2 mb-4">
        {[1, 2, 3].map((s) => (
          <div
            key={s}
            className={`h-2 rounded-full transition-all ${s === subStep ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
              }`}
          />
        ))}
      </div>

      {subStep === 1 && (
        <FormSection icon={User} title="Your Contact Information" colorScheme="blue">
          <FormInput
            label="Full Name / Business"
            value={formData.fullNameOrBusiness}
            onChange={(e) => onChange('fullNameOrBusiness', e.target.value)}
            error={errors.fullNameOrBusiness}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.email}
            onChange={(e) => onChange('email', e.target.value)}
            error={errors.email}
          />
          <FormInput
            label="Phone"
            type="tel"
            value={formData.contactPhone}
            onChange={(e) => onChange('contactPhone', e.target.value)}
            placeholder="+234XXXXXXXXXX"
            error={errors.contactPhone}
          />
        </FormSection>
      )}

      {subStep === 2 && (
        <FormSection icon={MapPin} title="Pickup Details" colorScheme="green">
          <FormInput
            label="Pickup Person Name"
            value={formData.pickupPerson.name}
            onChange={(e) => onNestedChange('pickupPerson', 'name', e.target.value)}
            error={errors.pickupPersonName}
          />
          <FormInput
            label="Phone"
            type="tel"
            value={formData.pickupPerson.phone}
            onChange={(e) => onNestedChange('pickupPerson', 'phone', e.target.value)}
            placeholder="+234XXXXXXXXXX"
            error={errors.pickupPersonPhone}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.pickupPerson.email}
            onChange={(e) => onNestedChange('pickupPerson', 'email', e.target.value)}
            error={errors.pickupPersonEmail}
          />
          <FormInput
            label="Pickup Address"
            value={formData.pickupLocation.address}
            onChange={(e) => onNestedChange('pickupLocation', 'address', e.target.value)}
            placeholder="Full street address"
            error={errors.pickupAddress}
          />
          <FormInput
            label="Pickup Date & Time"
            type="datetime-local"
            value={formData.estimatedPickupDate}
            onChange={(e) => onChange('estimatedPickupDate', e.target.value)}
            error={errors.estimatedPickupDate}
          />
        </FormSection>
      )}

      {subStep === 3 && (
        <FormSection icon={Truck} title="Delivery Details" colorScheme="orange">
          <FormInput
            label="Receiver Name"
            value={formData.receiverPerson.name}
            onChange={(e) => onNestedChange('receiverPerson', 'name', e.target.value)}
            error={errors.receiverPersonName}
          />
          <FormInput
            label="Phone"
            type="tel"
            value={formData.receiverPerson.phone}
            onChange={(e) => onNestedChange('receiverPerson', 'phone', e.target.value)}
            placeholder="+234XXXXXXXXXX"
            error={errors.receiverPersonPhone}
          />
          <FormInput
            label="Email"
            type="email"
            value={formData.receiverPerson.email}
            onChange={(e) => onNestedChange('receiverPerson', 'email', e.target.value)}
            error={errors.receiverPersonEmail}
          />
          <FormInput
            label="Delivery Address"
            value={formData.dropoffLocation.address}
            onChange={(e) => onNestedChange('dropoffLocation', 'address', e.target.value)}
            placeholder="Full street address"
            error={errors.dropoffAddress}
          />
          <FormInput
            label="Delivery Date & Time"
            type="datetime-local"
            value={formData.estimatedDeliveryDate}
            onChange={(e) => onChange('estimatedDeliveryDate', e.target.value)}
            error={errors.estimatedDeliveryDate}
          />
        </FormSection>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleBack}
          disabled={loading}
          className="px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all font-semibold flex items-center gap-2 shadow-sm disabled:opacity-50"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-3 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 hover:shadow-lg active:scale-[0.98] transition-all font-semibold shadow-md text-base disabled:opacity-50"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Processing...
            </>
          ) : subStep === 3 ? (
            <>
              Confirm Booking <ArrowRight className="w-5 h-5" />
            </>
          ) : (
            <>
              Continue <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  )
}
