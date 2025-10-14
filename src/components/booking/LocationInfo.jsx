import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

export default function LocationInfo({ data, onChange }) {
  const handleLocationChange = (location, field, value) => {
    onChange({
      [location]: { ...data[location], [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Location Information</h3>
        <p className="text-gray-600">Where should we pickup and deliver?</p>
      </div>

      <div className="space-y-8">
        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-sky-600">Pickup Location</h4>
          <div className="space-y-4">
            <input
              type="text"
              value={data.pickupLocation.address}
              onChange={(e) => handleLocationChange('pickupLocation', 'address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="Street address"
              required
            />
            <input
              type="text"
              value={data.pickupLocation.city}
              onChange={(e) => handleLocationChange('pickupLocation', 'city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="City"
              required
            />
            <input
              type="text"
              value={data.pickupLocation.state}
              onChange={(e) => handleLocationChange('pickupLocation', 'state', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
              placeholder="State"
              required
            />
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-4 text-green-600">Dropoff Location</h4>
          <div className="space-y-4">
            <input
              type="text"
              value={data.dropoffLocation.address}
              onChange={(e) => handleLocationChange('dropoffLocation', 'address', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Street address"
              required
            />
            <input
              type="text"
              value={data.dropoffLocation.city}
              onChange={(e) => handleLocationChange('dropoffLocation', 'city', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="City"
              required
            />
            <input
              type="text"
              value={data.dropoffLocation.state}
              onChange={(e) => handleLocationChange('dropoffLocation', 'state', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="State"
              required
            />
          </div>
        </div>
      </div>
    </div>
  )
}