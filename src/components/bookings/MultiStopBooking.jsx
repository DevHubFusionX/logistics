import { useState } from 'react'
import { Plus, Trash2, MapPin, ArrowRight } from 'lucide-react'
import toast from 'react-hot-toast'

export default function MultiStopBooking({ onSubmit }) {
  const [stops, setStops] = useState([
    { type: 'pickup', address: '', city: '', state: '', contactName: '', contactPhone: '' },
    { type: 'dropoff', address: '', city: '', state: '', contactName: '', contactPhone: '' }
  ])

  const addStop = (type) => {
    if (stops.length >= 10) {
      toast.error('Maximum 10 stops allowed')
      return
    }
    setStops([...stops, { type, address: '', city: '', state: '', contactName: '', contactPhone: '' }])
  }

  const removeStop = (index) => {
    if (stops.length <= 2) {
      toast.error('Minimum 2 stops required')
      return
    }
    setStops(stops.filter((_, i) => i !== index))
  }

  const updateStop = (index, field, value) => {
    const updated = [...stops]
    updated[index][field] = value
    setStops(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const hasPickup = stops.some(s => s.type === 'pickup')
    const hasDropoff = stops.some(s => s.type === 'dropoff')
    
    if (!hasPickup || !hasDropoff) {
      toast.error('At least one pickup and one dropoff required')
      return
    }

    onSubmit(stops)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
        <p className="text-sm text-blue-800">
          Add multiple pickup and dropoff locations for your shipment. Stops will be optimized for the best route.
        </p>
      </div>

      {stops.map((stop, index) => (
        <div key={index} className="bg-white rounded-lg border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className={`w-5 h-5 ${stop.type === 'pickup' ? 'text-green-600' : 'text-orange-600'}`} />
              <span className="font-semibold text-gray-900 capitalize">
                Stop {index + 1}: {stop.type}
              </span>
            </div>
            {stops.length > 2 && (
              <button
                type="button"
                onClick={() => removeStop(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={stop.type}
                onChange={(e) => updateStop(index, 'type', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="pickup">Pickup</option>
                <option value="dropoff">Dropoff</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
              <input
                type="text"
                value={stop.address}
                onChange={(e) => updateStop(index, 'address', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
              <input
                type="text"
                value={stop.city}
                onChange={(e) => updateStop(index, 'city', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
              <input
                type="text"
                value={stop.state}
                onChange={(e) => updateStop(index, 'state', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
              <input
                type="text"
                value={stop.contactName}
                onChange={(e) => updateStop(index, 'contactName', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
              <input
                type="tel"
                value={stop.contactPhone}
                onChange={(e) => updateStop(index, 'contactPhone', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => addStop('pickup')}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-green-300 text-green-700 rounded-lg hover:bg-green-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Pickup
        </button>
        <button
          type="button"
          onClick={() => addStop('dropoff')}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-orange-300 text-orange-700 rounded-lg hover:bg-orange-50 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          Add Dropoff
        </button>
      </div>

      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
      >
        Continue <ArrowRight className="w-5 h-5" />
      </button>
    </form>
  )
}
