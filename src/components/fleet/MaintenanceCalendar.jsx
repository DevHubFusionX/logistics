import { Calendar, Wrench, Clock } from 'lucide-react'
import { MAINTENANCE_SCHEDULE, AUTO_SCHEDULE_THRESHOLDS } from '../../constants/mockData'
import { getPriorityBadgeColor, formatNumber } from '../../utils/helpers'

export default function MaintenanceCalendar({ vehicles }) {

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5" />
          Maintenance Calendar
        </h3>
        <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700">
          Auto-Schedule
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-red-50 rounded-lg p-3">
          <div className="text-lg font-bold text-red-600">3</div>
          <div className="text-sm text-red-700">Overdue</div>
        </div>
        <div className="bg-yellow-50 rounded-lg p-3">
          <div className="text-lg font-bold text-yellow-600">5</div>
          <div className="text-sm text-yellow-700">Due This Week</div>
        </div>
        <div className="bg-green-50 rounded-lg p-3">
          <div className="text-lg font-bold text-green-600">12</div>
          <div className="text-sm text-green-700">Scheduled</div>
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Upcoming Services</h4>
        {MAINTENANCE_SCHEDULE.map((item) => (
          <div key={`${item.id}-${item.type}`} className="border border-gray-200 rounded-lg p-3">
            <div className="flex justify-between items-start mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{item.id}</span>
                  <span className="text-gray-600">({item.plate})</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityBadgeColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <div className="text-sm text-gray-600 mt-1">{item.type}</div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-3 h-3" />
                  {item.due}
                </div>
                <div className="text-xs text-gray-500">{formatNumber(item.mileage)} km</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200">
                Schedule
              </button>
              <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200">
                Postpone
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium mb-3 flex items-center gap-2">
          <Wrench className="w-4 h-4" />
          Auto-Schedule Thresholds
        </h4>
        <div className="grid grid-cols-2 gap-3 text-sm">
          {Object.entries(AUTO_SCHEDULE_THRESHOLDS).map(([service, km]) => (
            <div key={service} className="flex justify-between">
              <span className="text-gray-600">{service}:</span>
              <span className="font-medium">Every {formatNumber(km)} km</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}