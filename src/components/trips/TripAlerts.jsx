import { AlertTriangle } from 'lucide-react'

const getSeverityColor = (severity) => {
  const colors = {
    critical: 'bg-red-100 text-red-700',
    high: 'bg-orange-100 text-orange-700',
    default: 'bg-yellow-100 text-yellow-700'
  }
  return colors[severity] || colors.default
}

export default function TripAlerts({ alerts, onViewTrip }) {
  const activeAlerts = alerts.filter(a => !a.resolved)
  
  if (activeAlerts.length === 0) return null

  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <div className="flex items-center gap-2 mb-3">
        <AlertTriangle className="w-5 h-5 text-red-600" />
        <h3 className="font-semibold text-red-900">Active Trip Alerts ({activeAlerts.length})</h3>
      </div>
      <div className="space-y-2">
        {activeAlerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between bg-white rounded-lg p-3">
            <div className="flex items-center gap-3">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(alert.severity)}`}>
                {alert.severity}
              </span>
              <span className="font-medium text-gray-900">{alert.tripId}</span>
              <span className="text-gray-600">{alert.message}</span>
            </div>
            <button 
              onClick={() => onViewTrip(alert.tripId)}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Trip
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
