import { X, Truck, Thermometer, Shield, Wrench, Phone, Navigation, MapPin } from 'lucide-react'
import { TRIP_HISTORY } from './fleetData'

export default function TruckDetailModal({ truck, onClose, getTempColor, getStatusColor, getInsuranceStatus }) {
  if (!truck) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{truck.id}</h2>
              <p className="text-sm text-gray-500">{truck.plateNumber}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Truck Specifications */}
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Truck className="w-5 h-5" />
              Truck Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 text-xs">Make</span>
                <p className="font-semibold text-gray-900">{truck.make}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Model</span>
                <p className="font-semibold text-gray-900">{truck.model}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Year</span>
                <p className="font-semibold text-gray-900">{truck.year}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Tonnage</span>
                <p className="font-semibold text-gray-900">{truck.tonnage}T</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Capacity</span>
                <p className="font-semibold text-gray-900">{truck.capacity}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Status</span>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(truck.status)}`}>
                  {truck.status.replace('_', ' ')}
                </span>
              </div>
            </div>
          </div>

          {/* Live Sensor Data */}
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-5 border border-blue-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Thermometer className="w-5 h-5 text-blue-600" />
              Live Sensor Data
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-3">
                <span className="text-gray-500 text-xs">Temperature</span>
                <p className={`font-bold text-2xl ${getTempColor(truck.temperature)}`}>
                  {truck.temperature}°C
                </p>
              </div>
              <div className="bg-white rounded-lg p-3">
                <span className="text-gray-500 text-xs">Door Status</span>
                <p className={`font-semibold text-lg ${truck.doorStatus === 'closed' ? 'text-green-600' : 'text-red-600'}`}>
                  {truck.doorStatus}
                </p>
              </div>
              <div className="col-span-2 bg-white rounded-lg p-3">
                <span className="text-gray-500 text-xs flex items-center gap-1 mb-1">
                  <MapPin className="w-3 h-3" />
                  GPS Location
                </span>
                <p className="font-medium text-sm">{truck.gps}</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Call Driver
              </button>
              <button className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border border-gray-300 flex items-center justify-center gap-2">
                <Navigation className="w-4 h-4" />
                Track
              </button>
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Insurance Information
            </h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-500 text-xs">Policy Number</span>
                <p className="font-semibold text-gray-900">{truck.policyNumber}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Expiry Date</span>
                <p className={`font-semibold ${getInsuranceStatus(truck.insuranceExpiry).color}`}>
                  {truck.insuranceExpiry}
                </p>
              </div>
            </div>
          </div>

          {/* Maintenance Tracker */}
          <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl p-5 border border-orange-200">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-orange-600" />
              Maintenance Tracker
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-gray-500 text-xs">Last Service</span>
                <p className="font-semibold text-gray-900">{truck.lastService}</p>
              </div>
              <div>
                <span className="text-gray-500 text-xs">Next Service Due</span>
                <p className="font-semibold text-gray-900">{truck.nextService}</p>
              </div>
              <button className="w-full mt-2 px-4 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                Upload Service Record
              </button>
            </div>
          </div>

          {/* Recent Trip History */}
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-4">Recent Trip History</h3>
            <div className="space-y-2">
              {(TRIP_HISTORY[truck.id] || []).map(trip => (
                <div key={trip.id} className="bg-white rounded-lg p-4 hover:shadow-sm transition-shadow">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-gray-900">{trip.id}</span>
                    <span className="text-xs text-gray-500">{trip.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{trip.route}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Duration: {trip.duration}</span>
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      {trip.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
