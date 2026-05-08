import { MapPin, Fuel, Wrench, Clock, Activity } from 'lucide-react'
import { STATUS_COLORS } from '../../constants'
import { getFuelColor, formatNumber, cn } from '../../utils/helpers'

const VehicleInfo = ({ label, value, icon: Icon }) => (
  <div className="flex justify-between items-center">
    <span className="text-gray-600 flex items-center gap-1">
      {Icon && <Icon className="w-3 h-3" />}
      {label}:
    </span>
    <span className={typeof value === 'object' ? value.className : ''}>
      {typeof value === 'object' ? value.text : value}
    </span>
  </div>
)

export default function VehicleCard({ vehicle, isSelected, onSelect, onViewTelemetry }) {

  return (
    <div className={cn(
      'bg-white rounded-lg p-3 sm:p-4 border-2 cursor-pointer transition-all',
      isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
    )}>
      <div className="flex items-start justify-between mb-2 sm:mb-3 gap-2">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(vehicle.id)}
            className="rounded flex-shrink-0"
          />
          <div className="min-w-0">
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 truncate">{vehicle.id}</h3>
            <p className="text-xs sm:text-sm text-gray-600">{vehicle.plate}</p>
          </div>
        </div>
        <span className={cn('px-2 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0', STATUS_COLORS[vehicle.status])}>
          {vehicle.status}
        </span>
      </div>

      <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm">
        <VehicleInfo label="Type" value={`${vehicle.type} (${vehicle.capacity})`} />
        <VehicleInfo label="Driver" value={vehicle.driver} />
        <VehicleInfo label="Location" value={vehicle.location} icon={MapPin} />
        <VehicleInfo label="Updated" value={vehicle.lastUpdate} icon={Clock} />
        <VehicleInfo label="Odometer" value={`${formatNumber(vehicle.odometer)} km`} />
        <VehicleInfo 
          label="Fuel" 
          value={{ text: `${vehicle.fuelLevel}%`, className: getFuelColor(vehicle.fuelLevel) }}
          icon={Fuel} 
        />
        <VehicleInfo label="Maintenance" value={vehicle.maintenanceDue} icon={Wrench} />
      </div>

      <button
        onClick={onViewTelemetry}
        className="w-full mt-3 px-3 py-2 bg-blue-600 text-white rounded-lg text-xs sm:text-sm hover:bg-blue-700 flex items-center justify-center gap-2"
      >
        <Activity className="w-4 h-4" />
        <span>Live Telemetry</span>
      </button>
    </div>
  )
}