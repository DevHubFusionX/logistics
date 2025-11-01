import { MapPin, Package } from 'lucide-react'

export default function ReviewQuote({ formData, estimatedCost, onBack, onConfirm, loading }) {
  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-4">Shipment Summary</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-green-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Pickup Location</p>
                <p className="font-semibold">{formData.pickupLocation.address}</p>
                <p className="text-sm">{formData.pickupLocation.city}, {formData.pickupLocation.state}</p>
                <p className="text-sm text-gray-600 mt-1">Contact: {formData.pickupPerson.name} ({formData.pickupPerson.phone})</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-orange-600 mt-1" />
              <div>
                <p className="text-sm text-gray-500">Delivery Location</p>
                <p className="font-semibold">{formData.dropoffLocation.address}</p>
                <p className="text-sm">{formData.dropoffLocation.city}, {formData.dropoffLocation.state}</p>
                <p className="text-sm text-gray-600 mt-1">Contact: {formData.receiverPerson.name} ({formData.receiverPerson.phone})</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3 text-sm sm:text-base">Cargo Details</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-gray-500">Goods Type</p>
              <p className="font-semibold">{formData.goodsType}</p>
            </div>
            <div>
              <p className="text-gray-500">Weight</p>
              <p className="font-semibold">{formData.cargoWeightKg} kg</p>
            </div>
            <div>
              <p className="text-gray-500">Quantity</p>
              <p className="font-semibold">{formData.quantity} units</p>
            </div>
            <div>
              <p className="text-gray-500">Vehicle Type</p>
              <p className="font-semibold">{formData.vehicleType}</p>
            </div>
          </div>
          
          {(formData.isFragile || formData.isPerishable) && (
            <div className="mt-3 flex gap-2">
              {formData.isFragile && <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-semibold">Fragile</span>}
              {formData.isPerishable && <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">Perishable ({formData.tempControlCelsius}°C)</span>}
            </div>
          )}
        </div>

        <div className="border-t mt-4 pt-4">
          <h4 className="font-semibold mb-3 text-sm sm:text-base">Schedule</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm">
            <div>
              <p className="text-gray-500">Pickup Date</p>
              <p className="font-semibold">{new Date(formData.estimatedPickupDate).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-gray-500">Delivery Date</p>
              <p className="font-semibold">{new Date(formData.estimatedDeliveryDate).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border-2 border-blue-200 p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-xs sm:text-sm text-gray-600">Estimated Shipping Cost</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-600">₦{estimatedCost?.toFixed(2)}</p>
            <p className="text-xs text-gray-500 mt-1">Price calculated based on distance, weight, and service type</p>
          </div>
          <Package className="w-10 h-10 sm:w-12 sm:h-12 text-blue-600 flex-shrink-0" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button onClick={onBack} className="px-4 sm:px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base">
          Back to Edit
        </button>
        <button onClick={onConfirm} disabled={loading} className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold disabled:opacity-50 text-sm sm:text-base">
          {loading ? 'Processing...' : 'Confirm & Book Now'}
        </button>
      </div>
    </div>
  )
}
