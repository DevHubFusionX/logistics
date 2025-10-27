import { useState } from 'react'
import { MapPin, Truck, Navigation, Phone, AlertTriangle, Clock } from 'lucide-react'
import { MapSkeleton } from '../../ui/advanced'

export default function LiveMap({ loading = false }) {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  
  if (loading) {
    return <MapSkeleton />
  }

  const vehicles = [
    {
      id: 'V001',
      driver: 'Adebayo Ogun',
      status: 'in_transit',
      speed: '65 km/h',
      location: 'Lagos-Ibadan Expressway',
      shipments: ['SH001', 'SH002', 'SH003'],
      eta: '14:30',
      lastUpdate: '2 mins ago',
      fuel: 78
    },
    {
      id: 'V002',
      driver: 'Fatima Ahmed',
      status: 'delayed',
      speed: '0 km/h',
      location: 'Kano Industrial Area',
      shipments: ['SH004', 'SH005'],
      eta: '16:45',
      lastUpdate: '5 mins ago',
      fuel: 45
    },
    {
      id: 'V003',
      driver: 'Chidi Okoro',
      status: 'active',
      speed: '45 km/h',
      location: 'Port Harcourt CBD',
      shipments: ['SH006'],
      eta: '15:20',
      lastUpdate: '1 min ago',
      fuel: 92
    }
  ]

  const statusColors = {
    active: 'bg-green-500',
    in_transit: 'bg-blue-500',
    delayed: 'bg-red-500',
    idle: 'bg-gray-500'
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 h-[300px] sm:h-[400px] lg:h-[500px]">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900">Live Fleet Map</h3>
        <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="hidden sm:inline">Live Updates</span>
        </div>
      </div>

      {/* Map Placeholder */}
      <div className="relative bg-gray-100 rounded-lg h-[calc(100%-2.5rem)] sm:h-[calc(100%-3rem)] overflow-hidden" role="img" aria-label="Live fleet tracking map">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50"></div>
        
        {/* Vehicle Pins */}
        {vehicles.map((vehicle, index) => (
          <button
            key={vehicle.id}
            onClick={() => setSelectedVehicle(vehicle)}
            className={`absolute w-8 h-8 ${statusColors[vehicle.status]} rounded-full flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform`}
            style={{
              left: `${20 + index * 25}%`,
              top: `${30 + index * 15}%`
            }}
          >
            <Truck className="w-4 h-4" />
          </button>
        ))}

        {/* Route Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <path
            d="M 50 100 Q 200 50 350 150"
            stroke="#3b82f6"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>

        {/* Vehicle Details Card */}
        {selectedVehicle && (
          <div className="absolute top-2 left-2 right-2 sm:top-4 sm:left-auto sm:right-4 sm:w-72 lg:w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-3 sm:p-4 z-10 max-h-[calc(100%-1rem)] overflow-y-auto">
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <div className="flex items-center gap-2">
                <div className={`w-2 sm:w-3 h-2 sm:h-3 ${statusColors[selectedVehicle.status]} rounded-full`}></div>
                <span className="text-sm sm:text-base font-semibold text-gray-900">{selectedVehicle.id}</span>
              </div>
              <button
                onClick={() => setSelectedVehicle(null)}
                className="text-gray-400 hover:text-gray-600 text-xl sm:text-2xl leading-none"
              >
                ×
              </button>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <div>
                <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">{selectedVehicle.driver}</p>
                <p className="text-xs text-gray-500 truncate">{selectedVehicle.location}</p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Speed:</span>
                  <p className="font-medium truncate">{selectedVehicle.speed}</p>
                </div>
                <div>
                  <span className="text-gray-500">ETA:</span>
                  <p className="font-medium">{selectedVehicle.eta}</p>
                </div>
                <div>
                  <span className="text-gray-500">Fuel:</span>
                  <p className="font-medium">{selectedVehicle.fuel}%</p>
                </div>
                <div>
                  <span className="text-gray-500">Shipments:</span>
                  <p className="font-medium">{selectedVehicle.shipments.length}</p>
                </div>
              </div>

              <div className="pt-2 sm:pt-3 border-t border-gray-200">
                <p className="text-xs text-gray-500 mb-2 sm:mb-3">Last update: {selectedVehicle.lastUpdate}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-blue-500 text-white px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-1">
                    <Phone className="w-3 h-3" />
                    <span>Call</span>
                  </button>
                  <button className="flex-1 bg-gray-100 text-gray-700 px-2 py-1.5 rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                    <Navigation className="w-3 h-3" />
                    <span>Route</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 flex flex-col gap-1 sm:gap-2">
          <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base">
            +
          </button>
          <button className="w-7 h-7 sm:w-8 sm:h-8 bg-white rounded-lg shadow-md flex items-center justify-center hover:bg-gray-50 text-sm sm:text-base">
            -
          </button>
        </div>
      </div>
    </div>
  )
}