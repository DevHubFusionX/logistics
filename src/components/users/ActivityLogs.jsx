import { Activity, Clock } from 'lucide-react'

export default function ActivityLogs({ logs }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <Activity className="w-5 h-5" />
        Recent Activity
      </h3>
      <div className="space-y-2">
        {logs.map((log) => (
          <div key={log.id} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{log.user}</span> {log.action}
                </p>
                <div className="flex items-center gap-1 mt-1 text-xs text-gray-500">
                  <Clock className="w-3 h-3" />
                  {log.timestamp}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
