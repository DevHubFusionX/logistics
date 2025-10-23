import { motion } from 'framer-motion'
import { User, MapPin, Package, ChevronLeft, CheckCircle } from 'lucide-react'

export default function ReviewStep({ data, onSubmit, loading, onChange }) {
  const handleBack = () => {
    // This will be handled by parent component
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Review & Submit</h3>
        <p className="text-gray-600">Please review your booking details</p>
      </div>

      <div className="space-y-6">
        {/* Transport Mode */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-blue-500" />
            Vehicle Type
          </h4>
          <div className="text-sm">
            <span className="font-medium capitalize">{data.vehicleType?.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Customer Info */}
        <div className="bg-sky-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <User className="w-5 h-5 text-sky-500" />
            Customer Information
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Name/Business:</span>
              <span className="font-medium">{data.fullNameOrBusiness}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{data.contactPhone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Email:</span>
              <span className="font-medium">{data.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{data.customerType}</span>
            </div>
          </div>
        </div>

        {/* Pickup Details */}
        <div className="bg-green-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Pickup Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Person:</span>
              <span className="font-medium">{data.pickupPerson.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{data.pickupPerson.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-right">
                {data.pickupLocation.address}, {data.pickupLocation.city}, {data.pickupLocation.state}
              </span>
            </div>
          </div>
        </div>

        {/* Dropoff Details */}
        <div className="bg-orange-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-orange-500" />
            Drop-off Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Person:</span>
              <span className="font-medium">{data.receiverPerson.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Phone:</span>
              <span className="font-medium">{data.receiverPerson.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Location:</span>
              <span className="font-medium text-right">
                {data.dropoffLocation.address}, {data.dropoffLocation.city}, {data.dropoffLocation.state}
              </span>
            </div>
          </div>
        </div>

        {/* Cargo Details */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-500" />
            Cargo Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="font-medium">{data.goodsType}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Weight:</span>
              <span className="font-medium">{data.cargoWeightKg} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Quantity:</span>
              <span className="font-medium">{data.quantity}</span>
            </div>
            {data.isFragile && (
              <div className="flex justify-between">
                <span className="text-gray-600">Special:</span>
                <span className="font-medium text-red-600">Fragile</span>
              </div>
            )}
            {data.isPerishable && (
              <div className="flex justify-between">
                <span className="text-gray-600">Special:</span>
                <span className="font-medium text-blue-600">
                  Perishable {data.tempControlCelsius && `(${data.tempControlCelsius}°C)`}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t border-gray-200">
        <motion.button
          type="button"
          onClick={() => onChange({ step: 4 })} // Go back to previous step
          className="flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-all"
          whileTap={{ scale: 0.98 }}
        >
          <ChevronLeft className="w-5 h-5" />
          Back
        </motion.button>
        
        <motion.button
          type="button"
          onClick={onSubmit}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white py-3 rounded-xl font-medium hover:bg-green-600 transition-all disabled:opacity-50"
          whileTap={{ scale: loading ? 1 : 0.98 }}
        >
          <CheckCircle className="w-5 h-5" />
          {loading ? 'Creating Booking...' : 'Confirm & Submit'}
        </motion.button>
      </div>
    </div>
  )
}