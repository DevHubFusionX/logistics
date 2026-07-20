import { MapPin, UserCheck } from 'lucide-react'
import FormSection from '../FormSection'
import FormInput from '../FormInput'
import AddressBookSelector from '../AddressBookSelector'
import DateTimePicker from './DateTimePicker'
import { useState } from 'react'

export default function PickupDetailsSubStep({
  formData,
  onChange,
  onNestedChange,
  errors,
  touched,
  onBlur
}) {
  const [showAutofillAlert, setShowAutofillAlert] = useState(false)

  const handleAutofill = () => {
    onNestedChange('pickupPerson', 'name', formData.fullNameOrBusiness || '')
    onNestedChange('pickupPerson', 'phone', formData.contactPhone || '')
    onNestedChange('pickupPerson', 'email', formData.email || '')
    
    // Mark fields as touched
    onBlur('pickupPersonName')
    onBlur('pickupPersonPhone')
    onBlur('pickupPersonEmail')

    setShowAutofillAlert(true)
    setTimeout(() => setShowAutofillAlert(false), 3000)
  }

  const handleAddressSelect = (addr) => {
    onNestedChange('pickupPerson', 'name', addr.contact_name)
    onNestedChange('pickupPerson', 'phone', addr.phone)
    onNestedChange('pickupLocation', 'address', addr.street)
    
    // Mark fields as touched
    onBlur('pickupPersonName')
    onBlur('pickupPersonPhone')
    onBlur('pickupAddress')

    setShowAutofillAlert(true)
    setTimeout(() => setShowAutofillAlert(false), 3000)
  }

  // Min date limit is current local date/time
  const minDateTime = new Date().toISOString().slice(0, 16)

  return (
    <FormSection icon={MapPin} title="Pickup details">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <AddressBookSelector
          currentCity={formData.pickupLocation.city}
          onSelect={handleAddressSelect}
        />
        
        <button
          type="button"
          onClick={handleAutofill}
          className="flex items-center gap-1.5 text-xs font-bold text-sky-750 hover:text-sky-850 bg-sky-50 px-3 py-1.5 rounded-xl transition-all border border-sky-100/40 mb-2 shadow-sm duration-200 cursor-pointer"
        >
          <UserCheck className="w-3.5 h-3.5" />
          Use My Profile Details
        </button>
      </div>

      {showAutofillAlert && (
        <div className="mb-4 p-3 bg-sky-50 border border-sky-100 rounded-xl animate-in fade-in duration-200">
          <p className="text-xs text-sky-800 font-semibold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-ping" />
            Contact information successfully autofilled!
          </p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <FormInput
          label="Pickup contact name *"
          value={formData.pickupPerson.name}
          onChange={e => {
            onNestedChange('pickupPerson', 'name', e.target.value)
            if (touched.pickupPersonName) onBlur('pickupPersonName')
          }}
          onBlur={() => onBlur('pickupPersonName')}
          error={touched.pickupPersonName && errors.pickupPersonName}
          placeholder="Enter pickup contact name"
        />

        <FormInput
          label="Phone *"
          type="tel"
          value={formData.pickupPerson.phone}
          onChange={e => {
            onNestedChange('pickupPerson', 'phone', e.target.value)
            if (touched.pickupPersonPhone) onBlur('pickupPersonPhone')
          }}
          onBlur={() => onBlur('pickupPersonPhone')}
          error={touched.pickupPersonPhone && errors.pickupPersonPhone}
          placeholder="+234XXXXXXXXXX"
        />

        <FormInput
          label="Email *"
          type="email"
          value={formData.pickupPerson.email}
          onChange={e => {
            onNestedChange('pickupPerson', 'email', e.target.value)
            if (touched.pickupPersonEmail) onBlur('pickupPersonEmail')
          }}
          onBlur={() => onBlur('pickupPersonEmail')}
          error={touched.pickupPersonEmail && errors.pickupPersonEmail}
          placeholder="Enter email address"
        />

        <DateTimePicker
          label="Pickup date & time *"
          value={formData.estimatedPickupDate}
          min={minDateTime}
          onChange={val => {
            onChange('estimatedPickupDate', val)
            if (touched.estimatedPickupDate) onBlur('estimatedPickupDate')
          }}
          onBlur={() => onBlur('estimatedPickupDate')}
          error={touched.estimatedPickupDate && errors.estimatedPickupDate}
        />

        <div className="sm:col-span-2">
          <FormInput
            label="Pickup address *"
            value={formData.pickupLocation.address}
            onChange={e => {
              onNestedChange('pickupLocation', 'address', e.target.value)
              if (touched.pickupAddress) onBlur('pickupAddress')
            }}
            onBlur={() => onBlur('pickupAddress')}
            error={touched.pickupAddress && errors.pickupAddress}
            placeholder="Full street address"
          />
        </div>
      </div>
    </FormSection>
  )
}
