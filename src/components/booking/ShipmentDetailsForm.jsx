import { User, MapPin, Truck, Package, ArrowRight, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { validateField, getValidationErrors } from '../../utils/formValidation'
import { securityService } from '../../services'

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
      <div className="flex items-center gap-1 mt-1 text-red-600 text-xs">
        <AlertCircle className="w-3 h-3" />
        <span>{error}</span>
      </div>
    ) : null
  )

  const inputClass = (fieldName) => `w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 ${
    touched[fieldName] && errors[fieldName] ? 'border-red-500 bg-red-50' : 'border-gray-300'
  }`

  return (
    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
      {/* Customer Information */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Customer Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Business Name</label>
            <input type="text" name="fullNameOrBusiness" value={formData.fullNameOrBusiness} onChange={handleFieldChange} onBlur={() => handleBlur('fullNameOrBusiness')} className={inputClass('fullNameOrBusiness')} required />
            <ErrorMessage error={touched.fullNameOrBusiness && errors.fullNameOrBusiness} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleFieldChange} onBlur={() => handleBlur('email')} className={inputClass('email')} required />
            <ErrorMessage error={touched.email && errors.email} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={handleFieldChange} onBlur={() => handleBlur('contactPhone')} className={inputClass('contactPhone')} placeholder="+234XXXXXXXXXX" required />
            <ErrorMessage error={touched.contactPhone && errors.contactPhone} />
          </div>
        </div>
      </div>

      {/* Pickup Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-green-100 rounded-lg">
            <MapPin className="w-5 h-5 text-green-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Pickup Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Person Name</label>
            <input type="text" value={formData.pickupPerson.name} onChange={(e) => handleNestedFieldChange('pickupPerson', 'name', e.target.value)} onBlur={() => handleBlur('pickupPersonName')} className={inputClass('pickupPersonName')} required />
            <ErrorMessage error={touched.pickupPersonName && errors.pickupPersonName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={formData.pickupPerson.phone} onChange={(e) => handleNestedFieldChange('pickupPerson', 'phone', e.target.value)} onBlur={() => handleBlur('pickupPersonPhone')} className={inputClass('pickupPersonPhone')} placeholder="+234XXXXXXXXXX" required />
            <ErrorMessage error={touched.pickupPersonPhone && errors.pickupPersonPhone} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.pickupPerson.email} onChange={(e) => handleNestedFieldChange('pickupPerson', 'email', e.target.value)} onBlur={() => handleBlur('pickupPersonEmail')} className={inputClass('pickupPersonEmail')} required />
            <ErrorMessage error={touched.pickupPersonEmail && errors.pickupPersonEmail} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={formData.pickupLocation.address} onChange={(e) => handleNestedFieldChange('pickupLocation', 'address', e.target.value)} onBlur={() => handleBlur('pickupAddress')} className={inputClass('pickupAddress')} placeholder="Full street address (min 10 characters)" required />
            <ErrorMessage error={touched.pickupAddress && errors.pickupAddress} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select value={formData.pickupLocation.city} onChange={(e) => handleNestedFieldChange('pickupLocation', 'city', e.target.value)} onBlur={() => handleBlur('pickupCity')} className={inputClass('pickupCity')} required>
              <option value="">Select City...</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Warri">Warri</option>
              <option value="Benin City">Benin City</option>
              <option value="Enugu">Enugu</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
            <ErrorMessage error={touched.pickupCity && errors.pickupCity} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" value={formData.pickupLocation.state} onChange={(e) => handleNestedFieldChange('pickupLocation', 'state', e.target.value)} onBlur={() => handleBlur('pickupState')} className={inputClass('pickupState')} required />
            <ErrorMessage error={touched.pickupState && errors.pickupState} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <input type="datetime-local" name="estimatedPickupDate" value={formData.estimatedPickupDate} onChange={handleFieldChange} onBlur={() => handleBlur('estimatedPickupDate')} className={inputClass('estimatedPickupDate')} required />
            <ErrorMessage error={touched.estimatedPickupDate && errors.estimatedPickupDate} />
          </div>
        </div>
      </div>

      {/* Delivery Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-orange-100 rounded-lg">
            <Truck className="w-5 h-5 text-orange-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Delivery Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Receiver Name</label>
            <input type="text" value={formData.receiverPerson.name} onChange={(e) => handleNestedFieldChange('receiverPerson', 'name', e.target.value)} onBlur={() => handleBlur('receiverPersonName')} className={inputClass('receiverPersonName')} required />
            <ErrorMessage error={touched.receiverPersonName && errors.receiverPersonName} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={formData.receiverPerson.phone} onChange={(e) => handleNestedFieldChange('receiverPerson', 'phone', e.target.value)} onBlur={() => handleBlur('receiverPersonPhone')} className={inputClass('receiverPersonPhone')} placeholder="+234XXXXXXXXXX" required />
            <ErrorMessage error={touched.receiverPersonPhone && errors.receiverPersonPhone} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.receiverPerson.email} onChange={(e) => handleNestedFieldChange('receiverPerson', 'email', e.target.value)} onBlur={() => handleBlur('receiverPersonEmail')} className={inputClass('receiverPersonEmail')} required />
            <ErrorMessage error={touched.receiverPersonEmail && errors.receiverPersonEmail} />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={formData.dropoffLocation.address} onChange={(e) => handleNestedFieldChange('dropoffLocation', 'address', e.target.value)} onBlur={() => handleBlur('dropoffAddress')} className={inputClass('dropoffAddress')} placeholder="Full street address (min 10 characters)" required />
            <ErrorMessage error={touched.dropoffAddress && errors.dropoffAddress} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <select value={formData.dropoffLocation.city} onChange={(e) => handleNestedFieldChange('dropoffLocation', 'city', e.target.value)} onBlur={() => handleBlur('dropoffCity')} className={inputClass('dropoffCity')} required>
              <option value="">Select City...</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Warri">Warri</option>
              <option value="Benin City">Benin City</option>
              <option value="Enugu">Enugu</option>
              <option value="Port Harcourt">Port Harcourt</option>
            </select>
            <ErrorMessage error={touched.dropoffCity && errors.dropoffCity} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" value={formData.dropoffLocation.state} onChange={(e) => handleNestedFieldChange('dropoffLocation', 'state', e.target.value)} onBlur={() => handleBlur('dropoffState')} className={inputClass('dropoffState')} required />
            <ErrorMessage error={touched.dropoffState && errors.dropoffState} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
            <input type="datetime-local" name="estimatedDeliveryDate" value={formData.estimatedDeliveryDate} onChange={handleFieldChange} onBlur={() => handleBlur('estimatedDeliveryDate')} className={inputClass('estimatedDeliveryDate')} required />
            <ErrorMessage error={touched.estimatedDeliveryDate && errors.estimatedDeliveryDate} />
          </div>
        </div>
      </div>

      {/* Cargo Details */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="w-5 h-5 text-purple-600" />
          </div>
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Cargo Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Goods Type</label>
            <select name="goodsType" value={formData.goodsType} onChange={handleFieldChange} onBlur={() => handleBlur('goodsType')} className={inputClass('goodsType')} required>
              <option value="">Select...</option>
              <option value="Frozen Foods">Frozen Foods</option>
              <option value="Electronics">Electronics</option>
              <option value="Food">Food</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="General">General Cargo</option>
            </select>
            <ErrorMessage error={touched.goodsType && errors.goodsType} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input type="number" step="0.1" name="cargoWeightKg" value={formData.cargoWeightKg} onChange={handleFieldChange} onBlur={() => handleBlur('cargoWeightKg')} className={inputClass('cargoWeightKg')} placeholder="0.1 - 50,000" required />
            <ErrorMessage error={touched.cargoWeightKg && errors.cargoWeightKg} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={handleFieldChange} onBlur={() => handleBlur('quantity')} className={inputClass('quantity')} placeholder="1 - 1,000" required />
            <ErrorMessage error={touched.quantity && errors.quantity} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={handleFieldChange} onBlur={() => handleBlur('vehicleType')} className={inputClass('vehicleType')} required>
              <option value="">Select...</option>
              <option value="Refrigerated Van">Refrigerated Van</option>
              <option value="Van">Van</option>
              <option value="Truck">Truck</option>
            </select>
            <ErrorMessage error={touched.vehicleType && errors.vehicleType} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
            <input type="number" name="tempControlCelsius" value={formData.tempControlCelsius} onChange={handleFieldChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isFragile" checked={formData.isFragile} onChange={handleFieldChange} className="rounded" />
              <span className="text-sm font-medium text-gray-700">Fragile</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isPerishable" checked={formData.isPerishable} onChange={handleFieldChange} className="rounded" />
              <span className="text-sm font-medium text-gray-700">Perishable</span>
            </label>
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={handleFieldChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Additional instructions..."></textarea>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button type="button" onClick={() => navigate('/dashboard')} className="px-4 sm:px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
          Cancel
        </button>
        <button type="submit" className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm text-sm sm:text-base">
          Continue to Review <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
    </form>
  )
}
