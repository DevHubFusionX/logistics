import DashboardHeader from '../components/dashboard/DashboardHeader'
import PerformanceStats from '../components/dashboard/PerformanceStats'
import ActiveShipments from '../components/dashboard/ActiveShipments'
import OperationsPanel from '../components/dashboard/OperationsPanel'

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <DashboardHeader />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <PerformanceStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <ActiveShipments />
          <OperationsPanel />
        </div>
      </div>
    </div>
  )
}