import { Power, MapPin, Route, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export default function BulkOperations({ selectedVehicles, onClearSelection }) {
  const [showDropdown, setShowDropdown] = useState(false)

  if (selectedVehicles.length === 0) return null

  const operations = [
    { id: 'offline', label: 'Take Offline', icon: Power, color: 'red' },
    { id: 'depot', label: 'Assign to Depot', icon: MapPin, color: 'blue' },
    { id: 'route', label: 'Push Route', icon: Route, color: 'green' }
  ]

  const handleOperation = (operationId) => {
    console.log(`Performing ${operationId} on vehicles:`, selectedVehicles)
    setShowDropdown(false)
    onClearSelection()
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        <span className="text-xs sm:text-sm">Actions ({selectedVehicles.length})</span>
        <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4" />
      </button>

      {showDropdown && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-[180px] sm:min-w-48">
          <div className="p-2">
            <div className="text-xs text-gray-500 px-2 py-1 border-b border-gray-100">
              {selectedVehicles.length} vehicle{selectedVehicles.length > 1 ? 's' : ''} selected
            </div>
            {operations.map((operation) => {
              const Icon = operation.icon
              return (
                <button
                  key={operation.id}
                  onClick={() => handleOperation(operation.id)}
                  className="w-full flex items-center gap-2 px-2 py-2 text-xs sm:text-sm hover:bg-gray-50 rounded"
                >
                  <Icon className={`w-4 h-4 text-${operation.color}-600 flex-shrink-0`} />
                  <span className="truncate">{operation.label}</span>
                </button>
              )
            })}
            <div className="border-t border-gray-100 mt-1 pt-1">
              <button
                onClick={onClearSelection}
                className="w-full text-left px-2 py-2 text-xs sm:text-sm text-gray-600 hover:bg-gray-50 rounded"
              >
                Clear Selection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}