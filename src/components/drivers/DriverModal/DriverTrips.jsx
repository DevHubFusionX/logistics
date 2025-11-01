import { MapPin } from 'lucide-react'
import { DRIVER_TRIP_HISTORY } from '../driversData'

export default function DriverTrips({ driver }) {
  const trips = DRIVER_TRIP_HISTORY[driver.id] || []

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Last 10 Trips
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          On-Time Rate: <span className="font-bold text-green-600">{driver.onTimeRate}%</span>
        </p>
      </div>
      <div className="space-y-3">
        {trips.map(trip => (
          <div key={trip.id} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-900">{trip.id}</span>
              <span className="text-xs text-gray-500">{trip.date}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{trip.route}</p>
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-500">Duration: {trip.duration}</span>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full ${
                  trip.onTime ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {trip.onTime ? 'On Time' : 'Delayed'}
                </span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                  {trip.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
        Rate Driver
      </button>
    </div>
  )
}
