import { useState } from 'react'
import { Plus } from 'lucide-react'
import TaskCard from './TaskCard'
import { taskStatuses, mockTasks } from './tasksData'

export default function KanbanBoard({ onAssignDriver, onCreateTask }) {
  const [tasks] = useState(mockTasks)

  const getTasksByStatus = (status) => {
    return tasks.filter(task => task.status === status)
  }

  const handleUpdateStatus = (taskId) => {
    console.log('Update task status:', taskId)
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {Object.entries(taskStatuses).map(([statusKey, status]) => {
        const statusTasks = getTasksByStatus(statusKey)
        
        return (
          <div key={statusKey} className={`${status.bgColor} rounded-lg p-3 sm:p-4`}>
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${status.color}`}></div>
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{status.label}</h3>
                <span className="bg-white text-gray-600 text-xs sm:text-sm px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full flex-shrink-0">
                  {statusTasks.length}
                </span>
              </div>
              {statusKey === 'unassigned' && (
                <button 
                  onClick={onCreateTask}
                  className="p-1 hover:bg-white rounded-md transition-colors"
                >
                  <Plus className="w-4 h-4 text-gray-600" />
                </button>
              )}
            </div>
            
            <div className="space-y-2 sm:space-y-3">
              {statusTasks.map(task => (
                <TaskCard 
                  key={task.id}
                  task={task}
                  onAssignDriver={onAssignDriver}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>
            
            {statusTasks.length === 0 && (
              <div className="text-center py-6 sm:py-8 text-gray-500">
                <p className="text-xs sm:text-sm">No {status.label.toLowerCase()} tasks</p>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}