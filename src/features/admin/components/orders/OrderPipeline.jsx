import { CheckCircle, Clock, Package, Truck, Home } from 'lucide-react'

export default function OrderPipeline({ orders }) {
  const stages = [
    { id: 'pending', name: 'Pending Pick', icon: Clock, color: 'yellow' },
    { id: 'picking', name: 'Picking', icon: Package, color: 'blue' },
    { id: 'packed', name: 'Packed', icon: CheckCircle, color: 'purple' },
    { id: 'dispatched', name: 'Dispatched', icon: Truck, color: 'indigo' },
    { id: 'delivered', name: 'Delivered', icon: Home, color: 'green' }
  ]

  const getStageCount = (stageId) => {
    return orders.filter(order => order.status === stageId).length
  }

  const getColorClasses = (color, isActive) => {
    const colors = {
      yellow: isActive ? 'bg-yellow-500 text-white' : 'bg-yellow-100 text-yellow-600',
      blue: isActive ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600',
      purple: isActive ? 'bg-purple-500 text-white' : 'bg-purple-100 text-purple-600',
      indigo: isActive ? 'bg-indigo-500 text-white' : 'bg-indigo-100 text-indigo-600',
      green: isActive ? 'bg-green-500 text-white' : 'bg-green-100 text-green-600'
    }
    return colors[color]
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Order Pipeline</h3>
      
      <div className="flex items-center justify-between overflow-x-auto pb-2">
        {stages.map((stage, index) => {
          const count = getStageCount(stage.id)
          const Icon = stage.icon
          
          return (
            <div key={stage.id} className="flex items-center flex-shrink-0">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center ${getColorClasses(stage.color, count > 0)}`}>
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div className="mt-2 text-center">
                  <div className="text-xs sm:text-sm font-medium text-gray-900 whitespace-nowrap">{stage.name}</div>
                  <div className="text-base sm:text-lg font-bold text-gray-600">{count}</div>
                </div>
              </div>
              
              {index < stages.length - 1 && (
                <div className="h-0.5 bg-gray-200 mx-2 sm:mx-4 w-8 sm:w-12 lg:w-16 flex-shrink-0"></div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}