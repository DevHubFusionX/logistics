import { User, MapPin, Truck, Package, ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ShipmentDetailsForm({ formData, onChange, onNestedChange, onSubmit }) {
  const navigate = useNavigate()

  return (
    <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
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
            <input type="text" name="fullNameOrBusiness" value={formData.fullNameOrBusiness} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" name="contactPhone" value={formData.contactPhone} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
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
            <input type="text" value={formData.pickupPerson.name} onChange={(e) => onNestedChange('pickupPerson', 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={formData.pickupPerson.phone} onChange={(e) => onNestedChange('pickupPerson', 'phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.pickupPerson.email} onChange={(e) => onNestedChange('pickupPerson', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={formData.pickupLocation.address} onChange={(e) => onNestedChange('pickupLocation', 'address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" value={formData.pickupLocation.city} onChange={(e) => onNestedChange('pickupLocation', 'city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" value={formData.pickupLocation.state} onChange={(e) => onNestedChange('pickupLocation', 'state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Date</label>
            <input type="datetime-local" name="estimatedPickupDate" value={formData.estimatedPickupDate} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
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
            <input type="text" value={formData.receiverPerson.name} onChange={(e) => onNestedChange('receiverPerson', 'name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input type="tel" value={formData.receiverPerson.phone} onChange={(e) => onNestedChange('receiverPerson', 'phone', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input type="email" value={formData.receiverPerson.email} onChange={(e) => onNestedChange('receiverPerson', 'email', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <input type="text" value={formData.dropoffLocation.address} onChange={(e) => onNestedChange('dropoffLocation', 'address', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input type="text" value={formData.dropoffLocation.city} onChange={(e) => onNestedChange('dropoffLocation', 'city', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
            <input type="text" value={formData.dropoffLocation.state} onChange={(e) => onNestedChange('dropoffLocation', 'state', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
            <input type="datetime-local" name="estimatedDeliveryDate" value={formData.estimatedDeliveryDate} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
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
            <select name="goodsType" value={formData.goodsType} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select...</option>
              <option value="Electronics">Electronics</option>
              <option value="Food">Food</option>
              <option value="Pharmaceuticals">Pharmaceuticals</option>
              <option value="General">General Cargo</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
            <input type="number" step="0.1" name="cargoWeightKg" value={formData.cargoWeightKg} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
            <input type="number" name="quantity" value={formData.quantity} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Vehicle Type</label>
            <select name="vehicleType" value={formData.vehicleType} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" required>
              <option value="">Select...</option>
              <option value="Van">Van</option>
              <option value="Truck">Truck</option>
              <option value="Refrigerated Van">Refrigerated Van</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Temperature (°C)</label>
            <input type="number" name="tempControlCelsius" value={formData.tempControlCelsius} onChange={onChange} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 pt-4 sm:pt-6">
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isFragile" checked={formData.isFragile} onChange={onChange} className="rounded" />
              <span className="text-sm font-medium text-gray-700">Fragile</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="isPerishable" checked={formData.isPerishable} onChange={onChange} className="rounded" />
              <span className="text-sm font-medium text-gray-700">Perishable</span>
            </label>
          </div>
          <div className="sm:col-span-2 md:col-span-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea name="notes" value={formData.notes} onChange={onChange} rows="3" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder="Additional instructions..."></textarea>
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
