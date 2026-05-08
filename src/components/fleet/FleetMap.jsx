import { MapPin, Navigation, AlertTriangle } from 'lucide-react'

export default function FleetMap({ vehicles }) {
  const geofences = [
    { id: 1, name: 'Downtown Zone', violations: 2, color: 'red' },
    { id: 2, name: 'Industrial Area', violations: 0, color: 'green' },
    { id: 3, name: 'Highway Corridor', violations: 1, color: 'yellow' }
  ]

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <h3 className="text-base sm:text-lg font-semibold">Fleet Map</h3>
        <div className="flex gap-2 w-full sm:w-auto">
          <button className="flex-1 sm:flex-initial px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs sm:text-sm">
            Real-time
          </button>
          <button className="flex-1 sm:flex-initial px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs sm:text-sm">
            Geofences
          </button>
        </div>
      </div>

      <div className="relative bg-gray-100 rounded-lg h-64 sm:h-80 mb-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {vehicles.map((vehicle, index) => (
            <div
              key={vehicle.id}
              className={`absolute w-3 h-3 rounded-full ${
                vehicle.status === 'available' ? 'bg-green-500' :
                vehicle.status === 'en route' ? 'bg-blue-500' :
                vehicle.status === 'idle' ? 'bg-yellow-500' : 'bg-gray-500'
              }`}
              style={{
                left: `${20 + index * 15}%`,
                top: `${30 + index * 10}%`
              }}
              title={`${vehicle.id} - ${vehicle.status}`}
            />
          ))}
          
          <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-white rounded-lg p-2 sm:p-3 shadow-sm">
            <div className="text-xs font-medium mb-1 sm:mb-2">Legend</div>
            <div className="space-y-1 text-xs">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <span>Available</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                <span>En Route</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></div>
                <span>Idle</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <div className="w-2 h-2 bg-gray-500 rounded-full flex-shrink-0"></div>
                <span>Offline</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm sm:text-base font-medium mb-2 flex items-center gap-2">
            <Navigation className="w-4 h-4 flex-shrink-0" />
            <span>Active Routes</span>
          </h4>
          <div className="text-xl sm:text-2xl font-bold text-blue-600">18</div>
          <div className="text-xs sm:text-sm text-gray-600">vehicles moving</div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm sm:text-base font-medium mb-2 flex items-center gap-2">
            <MapPin className="w-4 h-4 flex-shrink-0" />
            <span>Geofences</span>
          </h4>
          <div className="space-y-1">
            {geofences.map(fence => (
              <div key={fence.id} className="flex justify-between text-xs sm:text-sm gap-2">
                <span className="truncate">{fence.name}</span>
                <span className={`flex-shrink-0 ${
                  fence.violations > 0 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {fence.violations} alerts
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h4 className="text-sm sm:text-base font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>Alerts</span>
          </h4>
          <div className="text-xl sm:text-2xl font-bold text-red-600">3</div>
          <div className="text-xs sm:text-sm text-gray-600">geofence violations</div>
        </div>
      </div>
    </div>
  )
}