import { User, MapPin, Truck, ArrowLeft } from 'lucide-react'
import { useState } from 'react'

export default function BookingDetailsStep({ formData, onChange, onNestedChange, onSubmit, onBack, loading }) {
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!formData.fullNameOrBusiness) newErrors.fullNameOrBusiness = true
    if (!formData.email) newErrors.email = true
    if (!formData.contactPhone) newErrors.contactPhone = true
    if (!formData.pickupPerson.name) newErrors.pickupPersonName = true
    if (!formData.pickupPerson.phone) newErrors.pickupPersonPhone = true
    if (!formData.pickupPerson.email) newErrors.pickupPersonEmail = true
    if (!formData.pickupLocation.address) newErrors.pickupAddress = true
    if (!formData.receiverPerson.name) newErrors.receiverPersonName = true
    if (!formData.receiverPerson.phone) newErrors.receiverPersonPhone = true
    if (!formData.receiverPerson.email) newErrors.receiverPersonEmail = true
    if (!formData.dropoffLocation.address) newErrors.dropoffAddress = true

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fadeIn">
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-blue-600 rounded-xl shadow-md">
            <User className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Your Contact Information</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name / Business</label>
            <input
              type="text"
              value={formData.fullNameOrBusiness}
              onChange={(e) => onChange('fullNameOrBusiness', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.fullNameOrBusiness ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => onChange('email', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all ${errors.contactPhone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-green-600 rounded-xl shadow-md">
            <MapPin className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Pickup Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Person Name</label>
            <input
              type="text"
              value={formData.pickupPerson.name}
              onChange={(e) => onNestedChange('pickupPerson', 'name', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${errors.pickupPersonName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${errors.pickupPersonPhone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.pickupPerson.email}
              onChange={(e) => onNestedChange('pickupPerson', 'email', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${errors.pickupPersonEmail ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Address</label>
            <input
              type="text"
              value={formData.pickupLocation.address}
              onChange={(e) => onNestedChange('pickupLocation', 'address', e.target.value)}
              placeholder="Full street address"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 transition-all ${errors.pickupAddress ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Pickup Date & Time</label>
            <input
              type="datetime-local"
              value={formData.estimatedPickupDate}
              onChange={(e) => onChange('estimatedPickupDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 bg-white transition-all"
              required
            />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-3 bg-orange-600 rounded-xl shadow-md">
            <Truck className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">Delivery Details</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Receiver Name</label>
            <input
              type="text"
              value={formData.receiverPerson.name}
              onChange={(e) => onNestedChange('receiverPerson', 'name', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${errors.receiverPersonName ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
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
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${errors.receiverPersonPhone ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
            <input
              type="email"
              value={formData.receiverPerson.email}
              onChange={(e) => onNestedChange('receiverPerson', 'email', e.target.value)}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${errors.receiverPersonEmail ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Address</label>
            <input
              type="text"
              value={formData.dropoffLocation.address}
              onChange={(e) => onNestedChange('dropoffLocation', 'address', e.target.value)}
              placeholder="Full street address"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-orange-500 transition-all ${errors.dropoffAddress ? 'border-red-500 bg-red-50' : 'border-gray-200 bg-white'}`}
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">Delivery Date & Time</label>
            <input
              type="datetime-local"
              value={formData.estimatedDeliveryDate}
              onChange={(e) => onChange('estimatedDeliveryDate', e.target.value)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 bg-white transition-all"
              required
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={onBack}
          className="px-6 py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all font-semibold flex items-center gap-2 shadow-sm"
        >
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl hover:from-green-700 hover:to-green-800 hover:shadow-lg transition-all font-semibold shadow-md text-base disabled:opacity-50"
        >
          {loading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </form>
  )
}
