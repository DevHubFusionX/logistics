import { useState } from 'react'
import { X, UserCheck, Truck, Star, MapPin, Phone } from 'lucide-react'

const mockDrivers = [
  {
    id: 'DRV-001',
    name: 'Ahmed Ibrahim',
    phone: '+234-801-234-5678',
    rating: 4.8,
    trips: 523,
    vehicle: 'Toyota Hiace',
    plate: 'ABC-123-XY',
    location: 'Lagos',
    distance: 5,
    status: 'available'
  },
  {
    id: 'DRV-002',
    name: 'Chidi Okafor',
    phone: '+234-802-345-6789',
    rating: 4.9,
    trips: 612,
    vehicle: 'Mercedes Sprinter',
    plate: 'DEF-456-YZ',
    location: 'Lagos',
    distance: 8,
    status: 'available'
  },
  {
    id: 'DRV-003',
    name: 'Fatima Yusuf',
    phone: '+234-803-456-7890',
    rating: 4.7,
    trips: 445,
    vehicle: 'Isuzu NPR',
    plate: 'GHI-789-ZA',
    location: 'Ikeja',
    distance: 12,
    status: 'available'
  }
]

export default function AssignDriverModal({ booking, onClose, onAssign }) {
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleAssign = () => {
    if (!selectedDriver) return
    setLoading(true)
    setTimeout(() => {
      onAssign(booking.id, selectedDriver)
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-blue-200 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Assign Driver</h3>
            <p className="text-sm text-gray-600">Booking: {booking.id}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Booking Details</h4>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-600">Customer</p>
                <p className="font-semibold">{booking.customerName}</p>
              </div>
              <div>
                <p className="text-gray-600">Route</p>
                <p className="font-semibold">{booking.pickupCity} → {booking.deliveryCity}</p>
              </div>
              <div>
                <p className="text-gray-600">Weight</p>
                <p className="font-semibold">{booking.weight} kg</p>
              </div>
              <div>
                <p className="text-gray-600">Service</p>
                <p className="font-semibold capitalize">{booking.serviceType}</p>
              </div>
            </div>
          </div>

          <h4 className="font-semibold text-gray-900 mb-4">Available Drivers</h4>
          <div className="space-y-3">
            {mockDrivers.map(driver => (
              <div
                key={driver.id}
                onClick={() => setSelectedDriver(driver)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  selectedDriver?.id === driver.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{driver.name}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                          <span>{driver.rating}</span>
                        </div>
                        <span>•</span>
                        <span>{driver.trips} trips</span>
                      </div>
                    </div>
                  </div>
                  {selectedDriver?.id === driver.id && (
                    <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{driver.vehicle} • {driver.plate}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{driver.distance} km away</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">{driver.phone}</span>
                  </div>
                  <div>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                      {driver.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="sticky bottom-0 bg-white px-6 py-4 border-t border-gray-200 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleAssign}
            disabled={!selectedDriver || loading}
            className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Assigning...' : 'Assign Driver'}
          </button>
        </div>
      </div>
    </div>
  )
}
