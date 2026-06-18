import { User, MapPin, Truck, Package, ArrowRight, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { validateField, getValidationErrors } from '@/utils/formValidation'
import { securityService } from '@/services'
import AddressBookSelector from './AddressBookSelector'
import FormSelect from './FormSelect'

export default function ShipmentDetailsForm({ formData, onChange, onNestedChange, onSubmit }) {
  const navigate = useNavigate()
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target
    const sanitized = type === 'text' || type === 'email' ? securityService.sanitizeInput(value) : value
    e.target.value = sanitized
    onChange(e)
    setTouched({ ...touched, [name]: true })

    const error = validateField(name, type === 'checkbox' ? checked : sanitized, formData)
    setErrors({ ...errors, [name]: error })
  }

  const handleNestedFieldChange = (parent, field, value) => {
    const sanitized = typeof value === 'string' ? securityService.sanitizeInput(value) : value
    onNestedChange(parent, field, sanitized)
    const fieldName = `${parent}${field.charAt(0).toUpperCase() + field.slice(1)}`
    setTouched({ ...touched, [fieldName]: true })

    const error = validateField(fieldName, sanitized, formData)
    setErrors({ ...errors, [fieldName]: error })
  }

  const handleBlur = (name) => {
    setTouched({ ...touched, [name]: true })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = getValidationErrors(formData)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setTouched(Object.keys(validationErrors).reduce((acc, key) => ({ ...acc, [key]: true }), {}))
      return
    }

    onSubmit(e)
  }

  const ErrorMessage = ({ error }) => (
    error ? (
      <div className="flex items-center gap-1 mt-1 text-red-655 text-xs">
        <AlertCircle className="w-3 h-3" />
        <span>{error}</span>
      </div>
    ) : null
  )

  const inputClass = (fieldName) => `w-full px-4 py-3 border rounded-xl text-sm font-medium outline-none transition-all duration-205
    ${touched[fieldName] && errors[fieldName]
      ? 'border-red-300 bg-red-50/50 text-red-900 focus:ring-4 focus:ring-red-500/5'
      : 'border-gray-200 bg-white text-gray-900 focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 hover:border-gray-300'
    }`

  const cityOptions = [
    { value: 'Lagos', label: 'Lagos' },
    { value: 'Abuja', label: 'Abuja' },
    { value: 'Warri', label: 'Warri' },
    { value: 'Benin City', label: 'Benin City' },
    { value: 'Enugu', label: 'Enugu' },
    { value: 'Port Harcourt', label: 'Port Harcourt' }
  ]

  const goodsOptions = [
    { value: 'Frozen Foods', label: 'Frozen Foods' },
    { value: 'Pharmaceuticals', label: 'Pharmaceuticals' },
    { value: 'General Cargo', label: 'General Cargo' }
  ]

  const vehicleOptions = [
    { value: '5 Tons', label: '5 Tons' },
    { value: '10 Tons', label: '10 Tons' },
    { value: '15 Tons', label: '15 Tons' }
  ]

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Customer Information */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-sky-50 rounded-xl text-sky-600">
            <User className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Customer Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Business Name</label>
            <input type="text" name="fullNameOrBusiness" value={formData.fullNameOrBusiness} onChange={handleFieldChange} onBlur={() => handleBlur('fullNameOrBusiness')} className={inputClass('fullNameOrBusiness')} required />
            <ErrorMessage error={touched.fullNameOrBusiness && errors.fullNameOrBusiness} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleFieldChange} onBlur={() => handleBlur('email')} className={inputClass('email')} required />
            <ErrorMessage error={touched.email && errors.email} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleFieldChange} onBlur={() => handleBlur('contactPhone')} className={inputClass('contactPhone')} placeholder="+234XXXXXXXXXX" required />
            <ErrorMessage error={touched.contactPhone && errors.contactPhone} />
          </div>
        </div>
      </div>

      {/* Pickup Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Pickup Details</h3>
        </div>
        <AddressBookSelector
          currentCity={formData.pickupLocation.city}
          onSelect={(addr) => {
            onNestedChange('pickupPerson', 'name', addr.contact_name);
            onNestedChange('pickupPerson', 'phone', addr.phone);
            onNestedChange('dropoffLocation', 'city', addr.city);
            onNestedChange('pickupLocation', 'address', addr.street);
            onNestedChange('pickupLocation', 'city', addr.city);
            onNestedChange('pickupLocation', 'state', addr.state);
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 mt-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Pickup Person Name</label>
            <input type="text" value={formData.pickupPerson.name} onChange={(e) => handleNestedFieldChange('pickupPerson', 'name', e.target.value)} onBlur={() => handleBlur('pickupPersonName')} className={inputClass('pickupPersonName')} required />
            <ErrorMessage error={touched.pickupPersonName && errors.pickupPersonName} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone</label>
            <input type="tel" value={formData.pickupPerson.phone} onChange={(e) => handleNestedFieldChange('pickupPerson', 'phone', e.target.value)} onBlur={() => handleBlur('pickupPersonPhone')} className={inputClass('pickupPersonPhone')} placeholder="+234XXXXXXXXXX" required />
            <ErrorMessage error={touched.pickupPersonPhone && errors.pickupPersonPhone} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" value={formData.pickupPerson.email} onChange={(e) => handleNestedFieldChange('pickupPerson', 'email', e.target.value)} onBlur={() => handleBlur('pickupPersonEmail')} className={inputClass('pickupPersonEmail')} required />
            <ErrorMessage error={touched.pickupPersonEmail && errors.pickupPersonEmail} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Address</label>
            <input type="text" value={formData.pickupLocation.address} onChange={(e) => handleNestedFieldChange('pickupLocation', 'address', e.target.value)} onBlur={() => handleBlur('pickupAddress')} className={inputClass('pickupAddress')} placeholder="Full street address (min 10 characters)" required />
            <ErrorMessage error={touched.pickupAddress && errors.pickupAddress} />
          </div>
          <div>
            <FormSelect
              label="City"
              value={formData.pickupLocation.city || 'Lagos'}
              onChange={(value) => handleNestedFieldChange('pickupLocation', 'city', value)}
              options={cityOptions}
              placeholder="Select City..."
              error={touched.pickupCity && errors.pickupCity}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">State</label>
            <input type="text" value={formData.pickupLocation.state} onChange={(e) => handleNestedFieldChange('pickupLocation', 'state', e.target.value)} onBlur={() => handleBlur('pickupState')} className={inputClass('pickupState')} required />
            <ErrorMessage error={touched.pickupState && errors.pickupState} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Pickup Date</label>
            <input type="datetime-local" name="estimatedPickupDate" value={formData.estimatedPickupDate} onChange={handleFieldChange} onBlur={() => handleBlur('estimatedPickupDate')} className={inputClass('estimatedPickupDate')} required />
            <ErrorMessage error={touched.estimatedPickupDate && errors.estimatedPickupDate} />
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
            <Truck className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Delivery Details</h3>
        </div>
        <AddressBookSelector
          currentCity={formData.dropoffLocation.city}
          onSelect={(addr) => {
            onNestedChange('receiverPerson', 'name', addr.contact_name);
            onNestedChange('receiverPerson', 'phone', addr.phone);
            onNestedChange('dropoffLocation', 'address', addr.street);
            onNestedChange('dropoffLocation', 'city', addr.city);
            onNestedChange('dropoffLocation', 'state', addr.state);
          }}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4 mt-3">
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Receiver Name</label>
            <input type="text" value={formData.receiverPerson.name} onChange={(e) => handleNestedFieldChange('receiverPerson', 'name', e.target.value)} onBlur={() => handleBlur('receiverPersonName')} className={inputClass('receiverPersonName')} required />
            <ErrorMessage error={touched.receiverPersonName && errors.receiverPersonName} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Phone</label>
            <input type="tel" value={formData.receiverPerson.phone} onChange={(e) => handleNestedFieldChange('receiverPerson', 'phone', e.target.value)} onBlur={() => handleBlur('receiverPersonPhone')} className={inputClass('receiverPersonPhone')} placeholder="+234XXXXXXXXXX" required />
            <ErrorMessage error={touched.receiverPersonPhone && errors.receiverPersonPhone} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Email</label>
            <input type="email" value={formData.receiverPerson.email} onChange={(e) => handleNestedFieldChange('receiverPerson', 'email', e.target.value)} onBlur={() => handleBlur('receiverPersonEmail')} className={inputClass('receiverPersonEmail')} required />
            <ErrorMessage error={touched.receiverPersonEmail && errors.receiverPersonEmail} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Address</label>
            <input type="text" value={formData.dropoffLocation.address} onChange={(e) => handleNestedFieldChange('dropoffLocation', 'address', e.target.value)} onBlur={() => handleBlur('dropoffAddress')} className={inputClass('dropoffAddress')} placeholder="Full street address (min 10 characters)" required />
            <ErrorMessage error={touched.dropoffAddress && errors.dropoffAddress} />
          </div>
          <div>
            <FormSelect
              label="City"
              value={formData.dropoffLocation.city}
              onChange={(value) => handleNestedFieldChange('dropoffLocation', 'city', value)}
              options={cityOptions}
              placeholder="Select City..."
              error={touched.dropoffCity && errors.dropoffCity}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">State</label>
            <input type="text" value={formData.dropoffLocation.state} onChange={(e) => handleNestedFieldChange('dropoffLocation', 'state', e.target.value)} onBlur={() => handleBlur('dropoffState')} className={inputClass('dropoffState')} required />
            <ErrorMessage error={touched.dropoffState && errors.dropoffState} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Delivery Date</label>
            <input type="datetime-local" name="estimatedDeliveryDate" value={formData.estimatedDeliveryDate} onChange={handleFieldChange} onBlur={() => handleBlur('estimatedDeliveryDate')} className={inputClass('estimatedDeliveryDate')} required />
            <ErrorMessage error={touched.estimatedDeliveryDate && errors.estimatedDeliveryDate} />
          </div>
        </div>
      </div>

      {/* Cargo Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)]">
        <div className="flex items-center gap-2.5 mb-5">
          <div className="p-2 bg-purple-50 rounded-xl text-purple-600">
            <Package className="w-5 h-5" />
          </div>
          <h3 className="text-base sm:text-lg font-bold text-gray-900">Cargo Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <FormSelect
              label="Goods Type"
              value={formData.goodsType}
              onChange={(value) => handleFieldChange({ target: { name: 'goodsType', value } })}
              options={goodsOptions}
              placeholder="Select..."
              error={touched.goodsType && errors.goodsType}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Weight (kg)</label>
            <input type="number" step="0.1" name="cargoWeightKg" value={formData.cargoWeightKg} onChange={handleFieldChange} onBlur={() => handleBlur('cargoWeightKg')} className={inputClass('cargoWeightKg')} placeholder="0.1 - 50,000" required />
            <ErrorMessage error={touched.cargoWeightKg && errors.cargoWeightKg} />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleFieldChange} onBlur={() => handleBlur('quantity')} className={inputClass('quantity')} placeholder="1 - 1,000" required />
            <ErrorMessage error={touched.quantity && errors.quantity} />
          </div>
          <div>
            <FormSelect
              label="Vehicle Type"
              value={formData.vehicleType}
              onChange={(value) => handleFieldChange({ target: { name: 'vehicleType', value } })}
              options={vehicleOptions}
              placeholder="Select..."
              error={touched.vehicleType && errors.vehicleType}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Temperature (°C)</label>
            <input type="number" name="tempControlCelsius" value={formData.tempControlCelsius} onChange={handleFieldChange} className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 hover:border-gray-300 transition-all duration-200" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-5">
            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input type="checkbox" name="isFragile" checked={formData.isFragile} onChange={handleFieldChange} className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-gray-300" />
              <span className="text-sm font-semibold text-gray-700">Fragile</span>
            </label>
            <label className="flex items-center gap-2 select-none cursor-pointer">
              <input type="checkbox" name="isPerishable" checked={formData.isPerishable} onChange={handleFieldChange} className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 border-gray-300" />
              <span className="text-sm font-semibold text-gray-700">Perishable</span>
            </label>
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleFieldChange} rows="3" className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm font-medium outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-500/5 hover:border-gray-300 transition-all duration-200" placeholder="Additional instructions..."></textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={() => navigate('/my-bookings')}
          className="px-4 sm:px-6 py-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-gray-655 text-sm sm:text-base cursor-pointer"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-500 hover:to-sky-600 active:scale-[0.99] text-white py-3 rounded-xl font-bold shadow-sm shadow-sky-500/10 transition-all duration-200 text-sm sm:text-base cursor-pointer"
        >
          Continue to Review <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </form>
  )
}
