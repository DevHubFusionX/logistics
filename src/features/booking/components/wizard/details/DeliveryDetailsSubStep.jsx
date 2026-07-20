import { Truck } from 'lucide-react'
import FormSection from '../FormSection'
import FormInput from '../FormInput'
import AddressBookSelector from '../AddressBookSelector'
import DateTimePicker from './DateTimePicker'
import { useState } from 'react'

export default function DeliveryDetailsSubStep({
  formData,
  onChange,
  onNestedChange,
  errors,
  touched,
  onBlur
}) {
  const [showAutofillAlert, setShowAutofillAlert] = useState(false)

  const handleAddressSelect = (addr) => {
    onNestedChange('receiverPerson', 'name', addr.contact_name)
    onNestedChange('receiverPerson', 'phone', addr.phone)
    onNestedChange('dropoffLocation', 'address', addr.street)

    // Mark fields as touched
    onBlur('receiverPersonName')
    onBlur('receiverPersonPhone')
    onBlur('dropoffAddress')

    setShowAutofillAlert(true)
    setTimeout(() => setShowAutofillAlert(false), 3000)
  }

  // Min date limit is the pickup date (if selected) or current local date/time
  const minDateTime = formData.estimatedPickupDate || new Date().toISOString().slice(0, 16)

  return (
    <FormSection icon={Truck} title="Delivery details">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <AddressBookSelector
          currentCity={formData.dropoffLocation.city}
          onSelect={handleAddressSelect}
        />
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
          label="Receiver name *"
          value={formData.receiverPerson.name}
          onChange={e => {
            onNestedChange('receiverPerson', 'name', e.target.value)
            if (touched.receiverPersonName) onBlur('receiverPersonName')
          }}
          onBlur={() => onBlur('receiverPersonName')}
          error={touched.receiverPersonName && errors.receiverPersonName}
          placeholder="Enter receiver name"
        />

        <FormInput
          label="Phone *"
          type="tel"
          value={formData.receiverPerson.phone}
          onChange={e => {
            onNestedChange('receiverPerson', 'phone', e.target.value)
            if (touched.receiverPersonPhone) onBlur('receiverPersonPhone')
          }}
          onBlur={() => onBlur('receiverPersonPhone')}
          error={touched.receiverPersonPhone && errors.receiverPersonPhone}
          placeholder="+234XXXXXXXXXX"
        />

        <FormInput
          label="Email *"
          type="email"
          value={formData.receiverPerson.email}
          onChange={e => {
            onNestedChange('receiverPerson', 'email', e.target.value)
            if (touched.receiverPersonEmail) onBlur('receiverPersonEmail')
          }}
          onBlur={() => onBlur('receiverPersonEmail')}
          error={touched.receiverPersonEmail && errors.receiverPersonEmail}
          placeholder="Enter email address"
        />

        <DateTimePicker
          label="Delivery date & time *"
          value={formData.estimatedDeliveryDate}
          min={minDateTime}
          onChange={val => {
            onChange('estimatedDeliveryDate', val)
            if (touched.estimatedDeliveryDate) onBlur('estimatedDeliveryDate')
          }}
          onBlur={() => onBlur('estimatedDeliveryDate')}
          error={touched.estimatedDeliveryDate && errors.estimatedDeliveryDate}
        />

        <div className="sm:col-span-2">
          <FormInput
            label="Delivery address *"
            value={formData.dropoffLocation.address}
            onChange={e => {
              onNestedChange('dropoffLocation', 'address', e.target.value)
              if (touched.dropoffAddress) onBlur('dropoffAddress')
            }}
            onBlur={() => onBlur('dropoffAddress')}
            error={touched.dropoffAddress && errors.dropoffAddress}
            placeholder="Full street address"
          />
        </div>
      </div>
    </FormSection>
  )
}
