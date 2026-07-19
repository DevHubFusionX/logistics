import { Clock, Truck, AlertTriangle, CheckCircle } from 'lucide-react'

export default function DockScheduling({ arrivals }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'On Time': return 'text-green-600 bg-green-50'
      case 'Delayed': return 'text-red-600 bg-red-50'
      case 'Early': return 'text-blue-600 bg-blue-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'On Time': return <CheckCircle className="w-4 h-4" />
      case 'Delayed': return <AlertTriangle className="w-4 h-4" />
      case 'Early': return <Clock className="w-4 h-4" />
      default: return <Clock className="w-4 h-4" />
    }
  }

  return (
    <div className="bg-white rounded-lg border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Dock Scheduling</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {arrivals.map((arrival) => (
            <div key={arrival.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Truck className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{arrival.carrier}</div>
                  <div className="text-sm text-gray-500">Shipment #{arrival.shipmentId}</div>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">Bay {arrival.assignedBay}</div>
                  <div className="text-xs text-gray-500">Assigned</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{arrival.scheduledTime}</div>
                  <div className="text-xs text-gray-500">Scheduled</div>
                </div>
                
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900">{arrival.eta}</div>
                  <div className="text-xs text-gray-500">ETA</div>
                </div>
                
                <div className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(arrival.status)}`}>
                  {getStatusIcon(arrival.status)}
                  <span className="ml-1">{arrival.status}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}