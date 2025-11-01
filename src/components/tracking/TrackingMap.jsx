import { MapPin, Navigation, Clock } from 'lucide-react'

export default function TrackingMap({ shipment }) {
  const currentLocation = shipment.currentLocation || {}
  const hasLocation = currentLocation.city || currentLocation.lat

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          {hasLocation ? 'Live Location' : 'Tracking Information'}
        </h3>
        {currentLocation.timestamp && (
          <p className="text-sm text-gray-600 mt-1">Last updated: {currentLocation.timestamp}</p>
        )}
      </div>

      <div className="relative h-96 bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Navigation className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-pulse" />
            {hasLocation ? (
              <>
                <p className="text-lg font-semibold text-gray-900">Currently in {currentLocation.city}</p>
                {currentLocation.lat && <p className="text-sm text-gray-600 mt-1">Coordinates: {currentLocation.lat}, {currentLocation.lng}</p>}
              </>
            ) : (
              <p className="text-lg font-semibold text-gray-900">Tracking will be available once driver is assigned</p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg">
              <Clock className="w-4 h-4" />
              <span className="text-sm font-semibold">ETA: {shipment.estimatedDelivery}</span>
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg p-3 shadow-lg">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">From</p>
              <p className="font-semibold">Lagos</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-gray-300 rounded-full"></div>
              <p className="text-xs text-center text-gray-600 mt-1">70% Complete</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">To</p>
              <p className="font-semibold">Abuja</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
