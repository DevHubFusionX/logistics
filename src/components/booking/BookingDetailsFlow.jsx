import { useState } from 'react'
import { User, MapPin, Truck, ArrowLeft, ArrowRight } from 'lucide-react'

export default function BookingDetailsFlow({ formData, onChange, onNestedChange, onSubmit, onBack, loading }) {
  const [subStep, setSubStep] = useState(1)
  const [errors, setErrors] = useState({})

  const validateStep = (step) => {
    const newErrors = {}
    
    if (step === 1) {
      if (!formData.fullNameOrBusiness) newErrors.fullNameOrBusiness = true
      if (!formData.email) newErrors.email = true
      if (!formData.contactPhone) newErrors.contactPhone = true
    } else if (step === 2) {
      if (!formData.pickupPerson.name) newErrors.pickupPersonName = true
      if (!formData.pickupPerson.phone) newErrors.pickupPersonPhone = true
      if (!formData.pickupPerson.email) newErrors.pickupPersonEmail = true
      if (!formData.pickupLocation.address) newErrors.pickupAddress = true
      if (!formData.estimatedPickupDate) newErrors.estimatedPickupDate = true
    } else if (step === 3) {
      if (!formData.receiverPerson.name) newErrors.receiverPersonName = true
      if (!formData.receiverPerson.phone) newErrors.receiverPersonPhone = true
      if (!formData.receiverPerson.email) newErrors.receiverPersonEmail = true
      if (!formData.dropoffLocation.address) newErrors.dropoffAddress = true
      if (!formData.estimatedDeliveryDate) newErrors.estimatedDeliveryDate = true
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
            className={`h-2 rounded-full transition-all ${
              s === subStep ? 'w-8 bg-blue-600' : 'w-2 bg-gray-300'
            }`}
          />
        ))}
      </div>

      {/* Step 1: Contact Information */}
      {subStep === 1 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-blue-600 rounded-xl shadow-md">
              <User className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Your Contact Information</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name / Business</label>
              <input
                type="text"
                value={formData.fullNameOrBusiness}
                onChange={(e) => onChange('fullNameOrBusiness', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.fullNameOrBusiness ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => onChange('email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.contactPhone}
                onChange={(e) => onChange('contactPhone', e.target.value)}
                placeholder="+234XXXXXXXXXX"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${
                  errors.contactPhone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Pickup Details */}
      {subStep === 2 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-green-600 rounded-xl shadow-md">
              <MapPin className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Pickup Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Person Name</label>
              <input
                type="text"
                value={formData.pickupPerson.name}
                onChange={(e) => onNestedChange('pickupPerson', 'name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.pickupPersonName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.pickupPerson.phone}
                onChange={(e) => onNestedChange('pickupPerson', 'phone', e.target.value)}
                placeholder="+234XXXXXXXXXX"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.pickupPersonPhone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.pickupPerson.email}
                onChange={(e) => onNestedChange('pickupPerson', 'email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.pickupPersonEmail ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address</label>
              <input
                type="text"
                value={formData.pickupLocation.address}
                onChange={(e) => onNestedChange('pickupLocation', 'address', e.target.value)}
                placeholder="Full street address"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.pickupAddress ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Date & Time</label>
              <input
                type="datetime-local"
                value={formData.estimatedPickupDate}
                onChange={(e) => onChange('estimatedPickupDate', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${
                  errors.estimatedPickupDate ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 3: Delivery Details */}
      {subStep === 3 && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center gap-3 mb-5">
            <div className="p-3 bg-orange-600 rounded-xl shadow-md">
              <Truck className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">Delivery Details</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Receiver Name</label>
              <input
                type="text"
                value={formData.receiverPerson.name}
                onChange={(e) => onNestedChange('receiverPerson', 'name', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${
                  errors.receiverPersonName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
              <input
                type="tel"
                value={formData.receiverPerson.phone}
                onChange={(e) => onNestedChange('receiverPerson', 'phone', e.target.value)}
                placeholder="+234XXXXXXXXXX"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${
                  errors.receiverPersonPhone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={formData.receiverPerson.email}
                onChange={(e) => onNestedChange('receiverPerson', 'email', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${
                  errors.receiverPersonEmail ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
              <input
                type="text"
                value={formData.dropoffLocation.address}
                onChange={(e) => onNestedChange('dropoffLocation', 'address', e.target.value)}
                placeholder="Full street address"
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${
                  errors.dropoffAddress ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Date & Time</label>
              <input
                type="datetime-local"
                value={formData.estimatedDeliveryDate}
                onChange={(e) => onChange('estimatedDeliveryDate', e.target.value)}
                className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${
                  errors.estimatedDeliveryDate ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'
                }`}
                required
              />
            </div>
          </div>
        </div>
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
