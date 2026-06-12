import { AlertTriangle, XCircle, AlertCircle, Bell } from 'lucide-react'

export default function AlertCenter({ alerts }) {
  const getSeverityIcon = (severity) => {
    switch (severity) {
      case 'critical': return <XCircle className="w-5 h-5 text-red-500" />
      case 'high': return <AlertTriangle className="w-5 h-5 text-orange-500" />
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />
    }
  }

  const getSeverityBg = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-gradient-to-br from-red-50 to-red-100 border-red-200'
      case 'high': return 'bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200'
      default: return 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200'
    }
  }

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-700'
      case 'high': return 'bg-orange-100 text-orange-700'
      default: return 'bg-yellow-100 text-yellow-700'
    }
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-red-100 rounded-lg">
            <Bell className="w-5 h-5 text-red-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Alert Center</h3>
        </div>
        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
          {alerts.length}
        </span>
      </div>
      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {alerts.map((alert, idx) => (
          <div key={idx} className={`flex items-start gap-3 p-4 rounded-lg border ${getSeverityBg(alert.severity)} hover:shadow-md transition-all cursor-pointer`}>
            {getSeverityIcon(alert.severity)}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-gray-900">
                  Truck {alert.truck} {alert.message}
                </p>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold uppercase whitespace-nowrap ${getSeverityBadge(alert.severity)}`}>
                  {alert.severity}
                </span>
              </div>
              <p className="text-xs text-gray-600">{alert.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
