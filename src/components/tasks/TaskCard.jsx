import { Clock, User, Truck, MapPin, AlertCircle, Camera, FileText } from 'lucide-react'
import { taskStatuses } from './tasksData'

export default function TaskCard({ task, onAssignDriver, onUpdateStatus }) {
  const status = taskStatuses[task.status]
  const priorityColors = {
    critical: 'text-red-600 bg-red-50',
    high: 'text-orange-600 bg-orange-50',
    medium: 'text-yellow-600 bg-yellow-50',
    low: 'text-blue-600 bg-blue-50'
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 sm:p-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 truncate">{task.title}</h3>
          <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">{task.description}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 ${priorityColors[task.priority]}`}>
          {task.priority}
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{task.address}</span>
        </div>
        <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
          <span className="truncate">{task.scheduledTime} ({task.estimatedDuration})</span>
        </div>
        {task.driver && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <User className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{task.driver}</span>
          </div>
        )}
        {task.vehicle && (
          <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-600">
            <Truck className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">{task.vehicle}</span>
          </div>
        )}
      </div>

      {/* Progress Indicators */}
      <div className="flex items-center gap-2 mb-3 sm:mb-4">
        {task.photos.length > 0 && (
          <div className="flex items-center gap-1 text-xs text-green-600">
            <Camera className="w-3 h-3 flex-shrink-0" />
            <span>{task.photos.length}</span>
          </div>
        )}
        {task.signature && (
          <div className="flex items-center gap-1 text-xs text-green-600">
            <FileText className="w-3 h-3 flex-shrink-0" />
            <span>Signed</span>
          </div>
        )}
      </div>

      <div className="flex gap-2">
        {task.status === 'unassigned' && (
          <button 
            onClick={() => onAssignDriver(task.id)}
            className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Assign
          </button>
        )}
        {task.status !== 'complete' && (
          <button 
            onClick={() => onUpdateStatus(task.id)}
            className="flex-1 px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border border-gray-300 rounded hover:bg-gray-50"
          >
            Update
          </button>
        )}
      </div>
    </div>
  )
}