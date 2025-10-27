import { BarChart3, AlertTriangle, Truck, Warehouse, Plus, UserCheck, FileText } from 'lucide-react'
import { Chart, ChartSkeleton } from '../../ui/advanced'

export default function OperationalInsights({ loading = false }) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ChartSkeleton key={i} height={300} />
        ))}
      </div>
    )
  }
  const deliveryStats = [
    { status: 'Delivered', count: 1181, percentage: 85, color: 'bg-green-500' },
    { status: 'In Transit', count: 45, percentage: 8, color: 'bg-blue-500' },
    { status: 'Delayed', count: 8, percentage: 4, color: 'bg-yellow-500' },
    { status: 'Exceptions', count: 3, percentage: 3, color: 'bg-red-500' }
  ]

  const delayReasons = [
    { reason: 'Traffic Congestion', count: 12, percentage: 45 },
    { reason: 'Weather Conditions', count: 8, percentage: 30 },
    { reason: 'Vehicle Breakdown', count: 4, percentage: 15 },
    { reason: 'Customer Unavailable', count: 3, percentage: 10 }
  ]

  const exceptions = [
    {
      id: 'SH023',
      reason: 'Traffic Delay',
      etaChange: '+2.5 hrs',
      priority: 'high',
      customer: 'Adebayo Industries'
    },
    {
      id: 'SH045',
      reason: 'Route Deviation',
      etaChange: '+1.2 hrs',
      priority: 'medium',
      customer: 'Kano Distribution'
    },
    {
      id: 'SH067',
      reason: 'Vehicle Issue',
      etaChange: '+4.0 hrs',
      priority: 'high',
      customer: 'Port Harcourt Ltd'
    }
  ]

  const fleetVehicles = [
    {
      id: 'V001',
      status: 'active',
      fuel: 78,
      location: 'Lagos-Ibadan Expressway',
      driver: 'Adebayo Ogun'
    },
    {
      id: 'V002',
      status: 'delayed',
      fuel: 45,
      location: 'Kano Industrial Area',
      driver: 'Fatima Ahmed'
    },
    {
      id: 'V003',
      status: 'active',
      fuel: 92,
      location: 'Port Harcourt CBD',
      driver: 'Chidi Okoro'
    }
  ]

  const quickActions = [
    { icon: Plus, label: 'Create Dispatch', color: 'bg-blue-500' },
    { icon: UserCheck, label: 'Assign Driver', color: 'bg-green-500' },
    { icon: FileText, label: 'Generate Manifest', color: 'bg-purple-500' }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
      {/* Deliveries by Status */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <span className="truncate">Deliveries by Status</span>
        </h3>
        <Chart 
          type="donut"
          data={deliveryStats.map(stat => ({ 
            label: stat.status, 
            value: stat.count 
          }))}
          size={200}
          colorblindSafe={true}
        />
      </div>

      {/* Top Delay Reasons */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
          <span className="truncate">Top Delay Reasons</span>
        </h3>
        <Chart 
          type="bar"
          data={delayReasons.map(reason => ({ 
            label: reason.reason.split(' ')[0], 
            value: reason.count 
          }))}
          width={300}
          height={200}
          colorblindSafe={true}
        />
      </div>

      {/* Exceptions Table */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 truncate">Active Exceptions</h3>
        <div className="space-y-2 sm:space-y-3">
          {exceptions.map((exception) => (
            <div key={exception.id} className="p-2 sm:p-3 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-sm sm:text-base font-semibold text-gray-900">{exception.id}</span>
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium ${
                  exception.priority === 'high' 
                    ? 'bg-red-100 text-red-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {exception.priority}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{exception.reason}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
                <span className="truncate">{exception.customer}</span>
                <span className="font-medium text-red-600 flex-shrink-0">{exception.etaChange}</span>
              </div>
            </div>
          ))}
        </div>
        <button className="w-full mt-3 sm:mt-4 text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Exceptions →
        </button>
      </div>

      {/* Fleet Snapshot */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
          <span className="truncate">Fleet Snapshot</span>
        </h3>
        <div className="space-y-2 sm:space-y-3">
          {fleetVehicles.map((vehicle) => (
            <div key={vehicle.id} className="p-2 sm:p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-1 sm:mb-2">
                <span className="text-sm sm:text-base font-semibold text-gray-900">{vehicle.id}</span>
                <div className={`w-2 h-2 rounded-full ${
                  vehicle.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}></div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mb-1 truncate">{vehicle.driver}</p>
              <div className="flex items-center justify-between text-xs text-gray-500 gap-2">
                <span className="flex-shrink-0">Fuel: {vehicle.fuel}%</span>
                <span className="truncate">{vehicle.location}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Warehouse Capacity */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 flex items-center gap-2">
          <Warehouse className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
          <span className="truncate">Warehouse Capacity</span>
        </h3>
        <div className="text-center mb-3 sm:mb-4">
          <div className="text-2xl sm:text-3xl font-bold text-gray-900">67.8%</div>
          <div className="text-xs sm:text-sm text-gray-500">Current Utilization</div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-3 sm:mb-4">
          <div className="bg-purple-500 h-2 sm:h-3 rounded-full" style={{ width: '67.8%' }}></div>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
          <div>
            <span className="text-gray-500">Occupied:</span>
            <p className="font-medium truncate">2,847 pallets</p>
          </div>
          <div>
            <span className="text-gray-500">Available:</span>
            <p className="font-medium truncate">1,353 pallets</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
        <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-900 mb-3 sm:mb-4 truncate">Quick Actions</h3>
        <div className="space-y-2 sm:space-y-3">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <button
                key={index}
                className={`w-full flex items-center gap-2 p-2 sm:p-3 ${action.color} text-white rounded-lg hover:opacity-90 transition-opacity text-xs sm:text-sm`}
              >
                <Icon className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                <span className="font-medium truncate">{action.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}