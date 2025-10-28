import { AlertTriangle } from 'lucide-react'

export default function MaintenanceAlerts({ alerts }) {
  if (!alerts || alerts.length === 0) return null

  return (
    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-xl p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-red-100 rounded-lg">
          <AlertTriangle className="w-5 h-5 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-red-900">Active Alerts ({alerts.length})</h3>
      </div>
      <div className="space-y-2">
        {alerts.map(alert => (
          <div key={alert.id} className="flex items-center justify-between bg-white rounded-lg p-4 shadow-sm hover:shadow transition-shadow">
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${
                alert.severity === 'critical' ? 'bg-red-100 text-red-700' :
                alert.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {alert.severity}
              </span>
              <span className="font-semibold text-gray-900">{alert.truckId}</span>
              <span className="text-gray-600 truncate">{alert.message}</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium flex-shrink-0">
              View
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
