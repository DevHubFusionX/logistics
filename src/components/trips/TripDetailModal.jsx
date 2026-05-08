import { CheckCircle, Clock, Navigation, Image as ImageIcon, FileText } from 'lucide-react'
import { Chart } from '../ui/advanced'

const TabButton = ({ active, onClick, label }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
      active ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:text-gray-900'
    }`}
  >
    {label}
  </button>
)

const TimelineEvent = ({ event, isLast, getStatusColor }) => (
  <div className="flex gap-4">
    <div className="flex flex-col items-center">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        event.status === 'completed' ? 'bg-green-100' :
        event.status === 'in_progress' ? 'bg-blue-100' : 'bg-gray-100'
      }`}>
        {event.status === 'completed' ? <CheckCircle className="w-5 h-5 text-green-600" /> :
         event.status === 'in_progress' ? <Clock className="w-5 h-5 text-blue-600" /> :
         <Clock className="w-5 h-5 text-gray-400" />}
      </div>
      {!isLast && <div className={`w-0.5 h-12 ${event.status === 'completed' ? 'bg-green-300' : 'bg-gray-300'}`} />}
    </div>
    <div className="flex-1 pb-8">
      <h4 className="font-semibold text-gray-900">{event.event}</h4>
      <p className="text-sm text-gray-600">{event.location}</p>
      <p className="text-xs text-gray-500">{event.time}</p>
    </div>
  </div>
)

export default function TripDetailModal({ trip, isOpen, onClose, activeTab, setActiveTab, timeline, temperatureData, getStatusColor, getTempColor }) {
  if (!isOpen || !trip) return null

  const tabs = ['timeline', 'temperature', 'fuel', 'route', 'pod']

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
      <div className="fixed inset-y-0 right-0 w-full sm:w-[800px] bg-white shadow-xl z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{trip.id}</h2>
              <p className="text-sm text-gray-500">{trip.origin} → {trip.destination}</p>
            </div>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-2xl">×</button>
          </div>

          <div className="mb-6">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(trip.status)}`}>
              {trip.status.replace('_', ' ').toUpperCase()}
            </span>
          </div>

          <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
            {tabs.map(tab => (
              <TabButton 
                key={tab} 
                active={activeTab === tab} 
                onClick={() => setActiveTab(tab)} 
                label={tab.charAt(0).toUpperCase() + tab.slice(1)} 
              />
            ))}
          </div>

          {activeTab === 'timeline' && (
            <div className="space-y-4">
              {(timeline[trip.id] || []).map((event, index, arr) => (
                <TimelineEvent key={event.id} event={event} isLast={index === arr.length - 1} />
              ))}
            </div>
          )}

          {activeTab === 'temperature' && (
            <div className="space-y-4">
              <div className="bg-blue-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Temperature Range</h3>
                <p className="text-sm text-gray-600">
                  Min: {trip.tempRange.min}°C | Max: {trip.tempRange.max}°C | 
                  Avg: <span className={getTempColor(trip.tempAvg, trip.tempRange)}>{trip.tempAvg || 'N/A'}°C</span>
                </p>
              </div>
              {temperatureData[trip.id] && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-4">Temperature History</h3>
                  <Chart
                    type="bar"
                    data={temperatureData[trip.id].map(d => ({ label: d.time, value: d.temp }))}
                    width={700}
                    height={250}
                    colorblindSafe={true}
                  />
                </div>
              )}
            </div>
          )}

          {activeTab === 'fuel' && (
            <div className="bg-orange-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Fuel Consumption</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-gray-600">Total Used:</span>
                  <p className="text-2xl font-bold text-orange-600">{trip.fuelUsed}L</p>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Efficiency:</span>
                  <p className="text-2xl font-bold text-green-600">
                    {(trip.distance / (trip.fuelUsed || 1)).toFixed(1)} km/L
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'route' && (
            <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center">
              <div className="text-center">
                <Navigation className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600">Route Replay</p>
                <p className="text-sm text-gray-500">Distance: {trip.distance} km</p>
              </div>
            </div>
          )}

          {activeTab === 'pod' && (
            <div className="space-y-4">
              {trip.status === 'delivered' ? (
                <>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Proof of Delivery</h3>
                    <p className="text-sm text-gray-600">Delivered successfully on {trip.eta}</p>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">POD Image</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">Download</button>
                  </div>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-600">Signature</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">Download</button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">POD will be available after delivery</div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
