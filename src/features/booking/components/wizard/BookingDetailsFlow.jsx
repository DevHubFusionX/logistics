import { useState } from 'react'
import { User, MapPin, Truck, ArrowLeft, ArrowRight } from 'lucide-react'
import FormSection from './FormSection'
import FormInput from './FormInput'
import AddressBookSelector from './AddressBookSelector'

export default function BookingDetailsFlow({ formData, onChange, onNestedChange, onSubmit, onBack, loading }) {
  const [subStep, setSubStep] = useState(1)
  const [errors, setErrors] = useState({})

  const validateStep = (step) => {
    const e = {}
    if (step === 1) {
      if (!formData.fullNameOrBusiness) e.fullNameOrBusiness = 'Required'
      if (!formData.email) e.email = 'Required'
      if (!formData.contactPhone) e.contactPhone = 'Required'
    } else if (step === 2) {
      if (!formData.pickupPerson.name) e.pickupPersonName = 'Required'
      if (!formData.pickupPerson.phone) e.pickupPersonPhone = 'Required'
      if (!formData.pickupPerson.email) e.pickupPersonEmail = 'Required'
      if (!formData.pickupLocation.address) e.pickupAddress = 'Required'
      if (!formData.estimatedPickupDate) e.estimatedPickupDate = 'Required'
    } else if (step === 3) {
      if (!formData.receiverPerson.name) e.receiverPersonName = 'Required'
      if (!formData.receiverPerson.phone) e.receiverPersonPhone = 'Required'
      if (!formData.receiverPerson.email) e.receiverPersonEmail = 'Required'
      if (!formData.dropoffLocation.address) e.dropoffAddress = 'Required'
      if (!formData.estimatedDeliveryDate) e.estimatedDeliveryDate = 'Required'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleNext = () => {
    if (!validateStep(subStep)) return
    if (subStep < 3) setSubStep(subStep + 1)
    else onSubmit()
  }

  const handleBack = () => {
    if (subStep > 1) setSubStep(subStep - 1)
    else onBack()
  }

  const subStepLabels = ['Your info', 'Pickup details', 'Delivery details']

  return (
    <div className="space-y-4 w-full">
      {/* Sub-step pills */}
      <div className="flex gap-2 px-0">
        {subStepLabels.map((label, i) => (
          <div
            key={i}
            className={`flex-1 py-2 rounded-xl text-xs font-semibold text-center transition-all ${
              i + 1 === subStep ? 'bg-sky-700 text-white' :
              i + 1 < subStep  ? 'bg-sky-100 text-sky-700' : 'bg-gray-100 text-gray-400'
            }`}
          >
            {label}
          </div>
        ))}
      </div>

      {subStep === 1 && (
        <FormSection icon={User} title="Your contact information">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <FormInput label="Full name / Business" value={formData.fullNameOrBusiness} onChange={e => onChange('fullNameOrBusiness', e.target.value)} error={errors.fullNameOrBusiness} />
            </div>
            <FormInput label="Email" type="email" value={formData.email} onChange={e => onChange('email', e.target.value)} error={errors.email} />
            <FormInput label="Phone" type="tel" value={formData.contactPhone} onChange={e => onChange('contactPhone', e.target.value)} placeholder="+234XXXXXXXXXX" error={errors.contactPhone} />
          </div>
        </FormSection>
      )}

      {subStep === 2 && (
        <FormSection icon={MapPin} title="Pickup details">
          <AddressBookSelector currentCity={formData.pickupLocation.city} onSelect={addr => {
            onNestedChange('pickupPerson', 'name', addr.contact_name)
            onNestedChange('pickupPerson', 'phone', addr.phone)
            onNestedChange('pickupLocation', 'address', addr.street)
          }} />
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Pickup contact name" value={formData.pickupPerson.name} onChange={e => onNestedChange('pickupPerson', 'name', e.target.value)} error={errors.pickupPersonName} />
            <FormInput label="Phone" type="tel" value={formData.pickupPerson.phone} onChange={e => onNestedChange('pickupPerson', 'phone', e.target.value)} placeholder="+234XXXXXXXXXX" error={errors.pickupPersonPhone} />
            <FormInput label="Email" type="email" value={formData.pickupPerson.email} onChange={e => onNestedChange('pickupPerson', 'email', e.target.value)} error={errors.pickupPersonEmail} />
            <FormInput label="Pickup date & time" type="datetime-local" value={formData.estimatedPickupDate} onChange={e => onChange('estimatedPickupDate', e.target.value)} error={errors.estimatedPickupDate} />
            <div className="sm:col-span-2">
              <FormInput label="Pickup address" value={formData.pickupLocation.address} onChange={e => onNestedChange('pickupLocation', 'address', e.target.value)} placeholder="Full street address" error={errors.pickupAddress} />
            </div>
          </div>
        </FormSection>
      )}

      {subStep === 3 && (
        <FormSection icon={Truck} title="Delivery details">
          <AddressBookSelector currentCity={formData.dropoffLocation.city} onSelect={addr => {
            onNestedChange('receiverPerson', 'name', addr.contact_name)
            onNestedChange('receiverPerson', 'phone', addr.phone)
            onNestedChange('dropoffLocation', 'address', addr.street)
          }} />
          <div className="grid sm:grid-cols-2 gap-4">
            <FormInput label="Receiver name" value={formData.receiverPerson.name} onChange={e => onNestedChange('receiverPerson', 'name', e.target.value)} error={errors.receiverPersonName} />
            <FormInput label="Phone" type="tel" value={formData.receiverPerson.phone} onChange={e => onNestedChange('receiverPerson', 'phone', e.target.value)} placeholder="+234XXXXXXXXXX" error={errors.receiverPersonPhone} />
            <FormInput label="Email" type="email" value={formData.receiverPerson.email} onChange={e => onNestedChange('receiverPerson', 'email', e.target.value)} error={errors.receiverPersonEmail} />
            <FormInput label="Delivery date & time" type="datetime-local" value={formData.estimatedDeliveryDate} onChange={e => onChange('estimatedDeliveryDate', e.target.value)} error={errors.estimatedDeliveryDate} />
            <div className="sm:col-span-2">
              <FormInput label="Delivery address" value={formData.dropoffLocation.address} onChange={e => onNestedChange('dropoffLocation', 'address', e.target.value)} placeholder="Full street address" error={errors.dropoffAddress} />
            </div>
          </div>
        </FormSection>
      )}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={handleBack}
          disabled={loading}
          className="px-5 py-4 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-1.5 disabled:opacity-50"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={handleNext}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 py-4 bg-sky-700 hover:bg-sky-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-60"
        >
          {loading ? (
            <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
          ) : subStep === 3 ? (
            <>Confirm booking <ArrowRight className="w-4 h-4" /></>
          ) : (
            <>Continue <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  )
}
