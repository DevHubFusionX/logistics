import { User, Phone, MapPin } from 'lucide-react'

export default function PickupStep({ data, onChange }) {
  const handlePersonChange = (field, value) => {
    onChange({
      pickupPerson: { ...data.pickupPerson, [field]: value }
    })
  }

  const handleLocationChange = (field, value) => {
    onChange({
      pickupLocation: { ...data.pickupLocation, [field]: value }
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pickup Details</h3>
        <p className="text-gray-600">Who will hand over the goods and where?</p>
      </div>

      <div className="space-y-6">
        <div className="bg-sky-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <User className="w-5 h-5 text-sky-500" />
            Pickup Person
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name *
              </label>
              <input
                type="text"
                value={data.pickupPerson.name}
                onChange={(e) => handlePersonChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Person handling pickup"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={data.pickupPerson.phone}
                  onChange={(e) => handlePersonChange('phone', e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  placeholder="+2348011111111"
                  required
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-green-500" />
            Pickup Location
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                value={data.pickupLocation.address}
                onChange={(e) => handleLocationChange('address', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="12 Cargo Road"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City *
              </label>
              <input
                type="text"
                value={data.pickupLocation.city}
                onChange={(e) => handleLocationChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Lagos"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State *
              </label>
              <input
                type="text"
                value={data.pickupLocation.state}
                onChange={(e) => handleLocationChange('state', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                placeholder="Lagos"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}