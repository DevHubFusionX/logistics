import { Truck, Thermometer, Fuel } from 'lucide-react'
import { VirtualizedTable } from '../ui/advanced'

const IconWithText = ({ Icon, text, className = '' }) => (
  <div className="flex items-center gap-1">
    <Icon className={`w-4 h-4 text-gray-400 ${className}`} />
    <span className={className}>{text}</span>
  </div>
)

const useTripColumns = (getStatusColor, getTempColor, onViewTrip, onCancelTrip) => [
  { key: 'id', label: 'Trip ID', width: '100px' },
  { 
    key: 'truckId', 
    label: 'Truck', 
    width: '100px',
    render: (value) => <IconWithText Icon={Truck} text={value} />
  },
  { key: 'driverName', label: 'Driver', width: '150px' },
  { 
    key: 'status', 
    label: 'Status', 
    width: '120px',
    render: (value) => (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(value)}`}>
        {value.replace('_', ' ')}
      </span>
    )
  },
  { 
    key: 'eta', 
    label: 'ETA', 
    width: '140px',
    render: (value) => value ? new Date(value).toLocaleString('en-US', { 
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
    }) : 'N/A'
  },
  { 
    key: 'distance', 
    label: 'Distance', 
    width: '100px',
    render: (value) => `${value} km`
  },
  { 
    key: 'fuelUsed', 
    label: 'Fuel Used', 
    width: '100px',
    render: (value) => <IconWithText Icon={Fuel} text={`${value}L`} className="w-3 h-3" />
  },
  { 
    key: 'tempAvg', 
    label: 'Temp Avg', 
    width: '100px',
    render: (value, row) => value ? (
      <IconWithText 
        Icon={Thermometer} 
        text={`${value}°C`} 
        className={getTempColor(value, row.tempRange)} 
      />
    ) : 'N/A'
  },
  { 
    key: 'actions', 
    label: 'Actions', 
    width: '150px',
    render: (_, row) => (
      <div className="flex items-center gap-2">
        <button
          onClick={() => onViewTrip(row.id)}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          View
        </button>
        {row.status === 'pending' && (
          <button
            onClick={() => onCancelTrip(row.id)}
            className="text-red-600 hover:text-red-700 text-sm font-medium"
          >
            Cancel
          </button>
        )}
      </div>
    )
  }
]

export default function TripTable({ trips, getStatusColor, getTempColor, onViewTrip, onCancelTrip, onExport }) {
  const columns = useTripColumns(getStatusColor, getTempColor, onViewTrip, onCancelTrip)

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <VirtualizedTable
        data={trips}
        columns={columns}
        height={400}
        onExport={onExport}
      />
    </div>
  )
}
