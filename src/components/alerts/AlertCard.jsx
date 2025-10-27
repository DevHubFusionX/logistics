import { Clock, User, AlertTriangle } from 'lucide-react'
import { alertSeverities } from './alertsData'

export default function AlertCard({ alert, onAssign, onResolve }) {
  const severity = alertSeverities[alert.severity]
  const timeSinceCreated = Math.floor((Date.now() - alert.createdAt) / (1000 * 60))
  const timeToSLA = Math.floor((alert.slaDeadline - Date.now()) / (1000 * 60))
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${severity.color}`}></div>
          <div>
            <h3 className="font-semibold text-gray-900">{alert.title}</h3>
            <p className="text-sm text-gray-600">{alert.description}</p>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${severity.textColor} ${severity.bgColor}`}>
          {severity.label}
        </span>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{alert.assignedTo}</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{timeSinceCreated}m ago</span>
        </div>
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-gray-400" />
          <span className={timeToSLA < 60 ? 'text-red-600' : 'text-gray-600'}>
            SLA: {timeToSLA > 0 ? `${Math.floor(timeToSLA / 60)}h ${timeToSLA % 60}m` : 'Overdue'}
          </span>
        </div>
      </div>
      
      <div className="flex gap-2 mt-4">
        <button 
          onClick={() => onAssign(alert.id)}
          className="px-3 py-1 text-sm border border-gray-300 rounded hover:bg-gray-50"
        >
          Reassign
        </button>
        <button 
          onClick={() => onResolve(alert.id)}
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Resolve
        </button>
      </div>
    </div>
  )
}