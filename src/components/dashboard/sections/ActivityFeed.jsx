import { useState } from 'react'
import { Package, Truck, AlertTriangle, CheckCircle, Clock, MapPin, Filter } from 'lucide-react'
import { ListSkeleton } from '../../ui/advanced'

export default function ActivityFeed({ loading = false }) {
  const [filter, setFilter] = useState('all')
  
  if (loading) {
    return <ListSkeleton items={6} />
  }

  const activities = [
    {
      id: 1,
      type: 'delivery',
      icon: CheckCircle,
      title: 'Package Delivered',
      description: 'SH001 delivered to Adebayo Industries, Lagos',
      time: '2 mins ago',
      severity: 'success',
      driver: 'Adebayo Ogun'
    },
    {
      id: 2,
      type: 'pickup',
      icon: Package,
      title: 'Pickup Completed',
      description: 'SH045 picked up from Kano Warehouse',
      time: '5 mins ago',
      severity: 'info',
      driver: 'Fatima Ahmed'
    },
    {
      id: 3,
      type: 'delay',
      icon: AlertTriangle,
      title: 'Delivery Delayed',
      description: 'SH023 delayed due to traffic congestion on Lagos-Ibadan Expressway',
      time: '8 mins ago',
      severity: 'warning',
      driver: 'Chidi Okoro'
    },
    {
      id: 4,
      type: 'exception',
      icon: AlertTriangle,
      title: 'Route Exception',
      description: 'Vehicle V002 deviated from planned route',
      time: '12 mins ago',
      severity: 'error',
      driver: 'Fatima Ahmed'
    },
    {
      id: 5,
      type: 'pickup',
      icon: Package,
      title: 'Pickup Scheduled',
      description: 'SH046 scheduled for pickup at 15:30',
      time: '15 mins ago',
      severity: 'info',
      driver: 'Adebayo Ogun'
    },
    {
      id: 6,
      type: 'delivery',
      icon: CheckCircle,
      title: 'Package Delivered',
      description: 'SH019 delivered to Port Harcourt Distribution Center',
      time: '18 mins ago',
      severity: 'success',
      driver: 'Chidi Okoro'
    }
  ]

  const severityColors = {
    success: 'text-green-600 bg-green-50 border-green-200',
    info: 'text-blue-600 bg-blue-50 border-blue-200',
    warning: 'text-yellow-600 bg-yellow-50 border-yellow-200',
    error: 'text-red-600 bg-red-50 border-red-200'
  }

  const iconColors = {
    success: 'text-green-500',
    info: 'text-blue-500',
    warning: 'text-yellow-500',
    error: 'text-red-500'
  }

  const filteredActivities = filter === 'all' 
    ? activities 
    : activities.filter(activity => activity.severity === filter)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6 h-[300px] sm:h-[400px] lg:h-[500px] flex flex-col">
      <div className="flex items-center justify-between mb-3 sm:mb-4 gap-2">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 truncate">Activity Feed</h3>
        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
          <Filter className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="text-xs border border-gray-300 rounded-lg px-2 py-1 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All</option>
            <option value="success">Deliveries</option>
            <option value="info">Pickups</option>
            <option value="warning">Delays</option>
            <option value="error">Exceptions</option>
          </select>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 sm:space-y-3" role="feed" aria-label="Recent activity feed">
        {filteredActivities.map((activity) => {
          const Icon = activity.icon
          return (
            <div
              key={activity.id}
              className={`p-2 sm:p-3 lg:p-4 rounded-lg border-l-4 ${severityColors[activity.severity]} hover:shadow-sm transition-shadow cursor-pointer`}
              role="article"
              aria-label={`${activity.title}: ${activity.description}`}
            >
              <div className="flex items-start gap-2">
                <div className={`p-1 sm:p-1.5 rounded-lg ${iconColors[activity.severity]} flex-shrink-0`}>
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="font-semibold text-gray-900 text-xs sm:text-sm leading-tight truncate">{activity.title}</h4>
                    <span className="text-xs text-gray-500 flex-shrink-0 whitespace-nowrap">{activity.time}</span>
                  </div>
                  <p className="text-xs text-gray-600 mb-1 sm:mb-2 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Truck className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{activity.driver}</span>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="pt-3 sm:pt-4 border-t border-gray-200 mt-3 sm:mt-4">
        <button className="w-full text-xs sm:text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Activities →
        </button>
      </div>
    </div>
  )
}