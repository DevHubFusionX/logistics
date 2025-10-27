import { useState } from 'react'
import { PageHeader } from '../components/dashboard/index'
import { Kanban, Calendar, Smartphone } from 'lucide-react'
import KanbanBoard from '../components/tasks/KanbanBoard'
import DriverSchedule from '../components/tasks/DriverSchedule'
import MobileIntegration from '../components/tasks/MobileIntegration'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'

export default function Tasks() {
  const [activeTab, setActiveTab] = useState('kanban')
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => {
      handleCreateTask()
      showToast.info('New task created', 'Press T for new task')
    },
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const handleAssignDriver = (taskId) => {
    console.log('Assign driver to task:', taskId)
    showToast.success('Driver assigned successfully')
  }

  const handleCreateTask = () => {
    console.log('Create new task')
    showToast.info('Task creation dialog opened')
  }

  const handleCreateShift = () => {
    console.log('Create new shift')
    showToast.info('Shift creation dialog opened')
  }

  const handleSendTask = (taskId, message) => {
    console.log('Send task to mobile:', taskId, message)
    showToast.success('Task sent to mobile app')
  }

  return (
    <>
      <PageHeader
        title="Tasks & Workflow"
        subtitle="Manage and track operational tasks"
      />
      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 lg:py-8">
        {/* Tab Navigation */}
        <div className="mb-4 sm:mb-6">
          <div className="border-b border-gray-200 overflow-x-auto">
            <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
              <button
                onClick={() => setActiveTab('kanban')}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === 'kanban'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Kanban className="w-4 h-4 inline mr-1 sm:mr-2" />
                <span>Dispatch Board</span>
              </button>
              <button
                onClick={() => setActiveTab('schedule')}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === 'schedule'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Calendar className="w-4 h-4 inline mr-1 sm:mr-2" />
                <span>Driver Schedule</span>
              </button>
              <button
                onClick={() => setActiveTab('mobile')}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${activeTab === 'mobile'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
              >
                <Smartphone className="w-4 h-4 inline mr-1 sm:mr-2" />
                <span>Mobile Integration</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Task Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <MetricCard 
            title="Active Tasks"
            value={24}
            change={8}
            trend="up"
            sparklineData={[18, 20, 22, 21, 23, 24, 24]}
            detail="8% increase from yesterday"
          />
          <MetricCard 
            title="Completed Today"
            value={12}
            change={15}
            trend="up"
            sparklineData={[8, 9, 10, 11, 10, 11, 12]}
            detail="15% above daily average"
          />
          <MetricCard 
            title="Available Drivers"
            value={6}
            change={0}
            trend="neutral"
            sparklineData={[6, 5, 6, 6, 7, 6, 6]}
            detail="No change from yesterday"
          />
          <MetricCard 
            title="Mobile Connected"
            value={8}
            change={12}
            trend="up"
            sparklineData={[6, 7, 7, 8, 8, 8, 8]}
            detail="2 new mobile connections"
          />
        </div>

        {/* Tab Content */}
        {activeTab === 'kanban' && (
          <KanbanBoard
            onAssignDriver={handleAssignDriver}
            onCreateTask={handleCreateTask}
          />
        )}

        {activeTab === 'schedule' && (
          <DriverSchedule onCreateShift={handleCreateShift} />
        )}

        {activeTab === 'mobile' && (
          <MobileIntegration onSendTask={handleSendTask} />
        )}
      </div>
      
      <ToastContainer />
    </>
  )
}