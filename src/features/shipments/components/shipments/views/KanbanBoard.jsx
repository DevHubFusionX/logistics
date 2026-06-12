import { useState } from 'react'
import { Package, User, Clock, AlertTriangle } from 'lucide-react'

export default function KanbanBoard({ shipments, drivers, onAssignDriver }) {
  const [draggedShipment, setDraggedShipment] = useState(null)

  const columns = [
    { id: 'unassigned', title: 'Unassigned', color: 'bg-gray-100' },
    { id: 'assigned', title: 'Assigned', color: 'bg-blue-100' },
    { id: 'in_progress', title: 'In Progress', color: 'bg-yellow-100' },
    { id: 'completed', title: 'Completed', color: 'bg-green-100' }
  ]

  const getShipmentsByStatus = (status) => {
    return shipments.filter(shipment => {
      if (status === 'unassigned') return !shipment.assignedDriver
      if (status === 'assigned') return shipment.assignedDriver && shipment.status === 'pending'
      if (status === 'in_progress') return shipment.status === 'in_transit'
      if (status === 'completed') return shipment.status === 'delivered'
      return false
    })
  }

  const handleDragStart = (e, shipment) => {
    setDraggedShipment(shipment)
    e.dataTransfer.effectAllowed = 'move'
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
  }

  const handleDrop = (e, targetStatus, driverId = null) => {
    e.preventDefault()
    if (draggedShipment) {
      onAssignDriver(draggedShipment.id, driverId, targetStatus)
      setDraggedShipment(null)
    }
  }

  const ShipmentCard = ({ shipment }) => (
    <div
      draggable
      onDragStart={(e) => handleDragStart(e, shipment)}
      className="bg-white p-3 sm:p-4 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm sm:text-base font-semibold text-gray-900">{shipment.id}</span>
        <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs rounded-full ${
          shipment.priority === 'urgent' ? 'bg-red-100 text-red-700' :
          shipment.priority === 'high' ? 'bg-orange-100 text-orange-700' :
          'bg-gray-100 text-gray-700'
        }`}>
          {shipment.priority}
        </span>
      </div>
      <p className="text-xs sm:text-sm text-gray-600 mb-2 truncate">{shipment.customer}</p>
      <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
        <span className="truncate">{shipment.origin}</span>
        <span>→</span>
        <span className="truncate">{shipment.destination}</span>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Clock className="w-3 h-3 flex-shrink-0" />
          <span className="truncate">{shipment.eta}</span>
        </div>
        {shipment.assignedDriver && (
          <div className="flex items-center gap-1 text-xs text-blue-600">
            <User className="w-3 h-3 flex-shrink-0" />
            <span className="truncate max-w-[80px]">{shipment.assignedDriver}</span>
          </div>
        )}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4 lg:p-6">
      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 sm:mb-6">Dispatch Board</h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {columns.map(column => (
          <div key={column.id} className="space-y-3 sm:space-y-4">
            <div
              className={`${column.color} p-2 sm:p-3 rounded-lg`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, column.id)}
            >
              <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">{column.title}</h4>
              <span className="text-xs sm:text-sm text-gray-600">
                {getShipmentsByStatus(column.id).length} shipments
              </span>
            </div>
            
            <div className="space-y-2 sm:space-y-3 min-h-[300px] sm:min-h-[400px]">
              {getShipmentsByStatus(column.id).map(shipment => (
                <ShipmentCard key={shipment.id} shipment={shipment} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Driver Assignment Panel */}
      <div className="mt-6 sm:mt-8 border-t border-gray-200 pt-4 sm:pt-6">
        <h4 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Available Drivers</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {drivers.map(driver => (
            <div
              key={driver.id}
              className="p-3 sm:p-4 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors"
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, 'assigned', driver.id)}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm sm:text-base font-medium text-gray-900 truncate">{driver.name}</p>
                  <p className="text-xs sm:text-sm text-gray-500">{driver.vehicle}</p>
                  <p className="text-xs text-gray-400">
                    {driver.assignedShipments || 0} assigned
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}