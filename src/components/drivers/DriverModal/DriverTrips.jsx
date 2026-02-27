import { MapPin, Clock } from 'lucide-react'

export default function DriverTrips({ driver }) {
  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
        <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Trip History
        </h3>
        <p className="text-sm text-gray-600">
          Driver: <span className="font-semibold text-gray-900">{driver.name}</span>
        </p>
      </div>

      <div className="text-center py-16">
        <div className="p-4 bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <Clock className="w-8 h-8 text-gray-400" />
        </div>
        <h4 className="text-lg font-semibold text-gray-700 mb-2">Trip History Coming Soon</h4>
        <p className="text-sm text-gray-500 max-w-md mx-auto">
          Trip assignments and history for this driver will be available once integrated with the trip management system.
        </p>
      </div>
    </div>
  )
}
