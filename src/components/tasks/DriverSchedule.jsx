import { useState } from 'react'
import { Calendar, Clock, User, Plus, Edit } from 'lucide-react'
import { mockDrivers, mockSchedule } from './tasksData'

export default function DriverSchedule({ onCreateShift }) {
  const [selectedDate, setSelectedDate] = useState('2024-01-15')
  const [viewMode, setViewMode] = useState('day') // day, week

  const getScheduleForDate = (date) => {
    return mockSchedule.filter(schedule => schedule.date === date)
  }

  const scheduleData = getScheduleForDate(selectedDate)

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border border-gray-300 rounded-md px-2 sm:px-3 py-1.5 sm:py-2 text-sm flex-1"
            />
          </div>
          <div className="flex border border-gray-300 rounded-md">
            <button
              onClick={() => setViewMode('day')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 sm:py-2 text-xs sm:text-sm ${
                viewMode === 'day' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Day
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`flex-1 sm:flex-initial px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-l border-gray-300 ${
                viewMode === 'week' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              Week
            </button>
          </div>
        </div>
        <button 
          onClick={onCreateShift}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
        >
          <Plus className="w-4 h-4" />
          <span>Create Shift</span>
        </button>
      </div>

      {/* Driver Schedule Grid */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">Driver Schedule - {selectedDate}</h3>
        </div>
        
        <div className="p-3 sm:p-4">
          {scheduleData.length > 0 ? (
            <div className="space-y-3 sm:space-y-4">
              {scheduleData.map(schedule => (
                <div key={schedule.id} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                      <User className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 flex-shrink-0" />
                      <div className="min-w-0">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">{schedule.driverName}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">Driver ID: {schedule.driverId}</p>
                      </div>
                    </div>
                    <button className="p-1.5 sm:p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg flex-shrink-0">
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="space-y-2">
                    {schedule.shifts.map((shift, index) => (
                      <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-2 sm:p-3 bg-gray-50 rounded-lg">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-medium">
                              {shift.start} - {shift.end}
                            </span>
                          </div>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                            {shift.type}
                          </span>
                        </div>
                        <div className="text-xs sm:text-sm text-gray-600">
                          {shift.tasks.length} tasks
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 sm:py-8">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm sm:text-base text-gray-500">No shifts scheduled for this date</p>
              <button 
                onClick={onCreateShift}
                className="mt-3 px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg"
              >
                Create First Shift
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Available Drivers */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-3 sm:p-4 border-b border-gray-200">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900">Available Drivers</h3>
        </div>
        <div className="p-3 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {mockDrivers.map(driver => {
              const statusColors = {
                available: 'bg-green-100 text-green-700',
                busy: 'bg-yellow-100 text-yellow-700',
                offline: 'bg-gray-100 text-gray-700'
              }
              
              return (
                <div key={driver.id} className="p-3 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2 gap-2">
                    <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate">{driver.name}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full whitespace-nowrap flex-shrink-0 ${statusColors[driver.status]}`}>
                      {driver.status}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 truncate">{driver.vehicle}</p>
                  <p className="text-xs text-gray-500 truncate">{driver.phone}</p>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}