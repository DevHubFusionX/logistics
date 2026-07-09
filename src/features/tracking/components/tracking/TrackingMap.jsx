import { MapPin, Navigation, Clock } from 'lucide-react'

export default function TrackingMap({ shipment }) {
  const currentLocation = shipment.currentLocation || {}
  const origin = shipment.pickupAddress || shipment.pickupCity
  const destination = shipment.deliveryAddress || shipment.deliveryCity
  const hasRoute = origin && destination

  const mapUrl = currentLocation.city && hasRoute
    ? `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(currentLocation.city + ' to: ' + destination)}&t=&z=6&ie=UTF8&iwloc=&output=embed`
    : hasRoute
      ? `https://maps.google.com/maps?saddr=${encodeURIComponent(origin)}&daddr=${encodeURIComponent(destination)}&t=&z=6&ie=UTF8&iwloc=&output=embed`
      : null

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
        <h3 className="font-semibold text-gray-900 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          {hasRoute ? 'Transit Route Map' : 'Tracking Information'}
        </h3>
        {currentLocation.timestamp && (
          <p className="text-sm text-gray-600 mt-1">Last updated: {currentLocation.timestamp}</p>
        )}
      </div>

      <div className="relative h-[450px] bg-gray-100">
        {hasRoute && mapUrl ? (
          <iframe
            title="Shipment Location Map"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            src={mapUrl}
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Navigation className="w-12 h-12 text-blue-600 mx-auto mb-3 animate-pulse" />
              <p className="text-lg font-semibold text-gray-900">Tracking will be available once route details are ready</p>
            </div>
          </div>
        )}
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-100 z-10">
          <div className="flex items-center justify-between text-sm">
            <div>
              <p className="text-gray-600">From</p>
              <p className="font-semibold">{shipment.pickupCity}</p>
            </div>
            <div className="flex-1 mx-4">
              <div className="h-1 bg-gradient-to-r from-green-500 via-blue-500 to-gray-300 rounded-full"></div>
              <p className="text-xs text-center text-gray-600 mt-1">70% Complete</p>
            </div>
            <div className="text-right">
              <p className="text-gray-600">To</p>
              <p className="font-semibold">{shipment.deliveryCity}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
