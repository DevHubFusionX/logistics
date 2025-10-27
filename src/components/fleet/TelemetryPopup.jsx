import { X, Gauge, Navigation, AlertTriangle, Activity } from 'lucide-react'

export default function TelemetryPopup({ vehicle, onClose }) {
  const telemetryData = {
    speed: 65,
    heading: 'NE (45°)',
    braking: 8.2,
    acceleration: 0.3,
    engineRpm: 2100,
    coolantTemp: 85
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Live Telemetry - {vehicle.id}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Gauge className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium">Speed</span>
              </div>
              <div className="text-xl font-bold text-blue-600">{telemetryData.speed} km/h</div>
            </div>

            <div className="bg-green-50 rounded-lg p-3">
              <div className="flex items-center gap-2 mb-1">
                <Navigation className="w-4 h-4 text-green-600" />
                <span className="text-sm font-medium">Heading</span>
              </div>
              <div className="text-lg font-bold text-green-600">{telemetryData.heading}</div>
            </div>
          </div>

          <div className="bg-yellow-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
              <span className="text-sm font-medium">Harsh Braking Score</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${telemetryData.braking * 10}%` }}
                ></div>
              </div>
              <span className="text-sm font-bold">{telemetryData.braking}/10</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Acceleration:</span>
              <span className="font-medium">{telemetryData.acceleration} g</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Engine RPM:</span>
              <span className="font-medium">{telemetryData.engineRpm}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Coolant Temp:</span>
              <span className="font-medium">{telemetryData.coolantTemp}°C</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Status:</span>
              <span className="font-medium capitalize">{vehicle.status}</span>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4 text-gray-600" />
              <span className="text-sm font-medium">Live Stream</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <div className="text-xs text-gray-600">
              Last updated: {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        <div className="flex gap-2 mt-6">
          <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            View History
          </button>
          <button 
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
}