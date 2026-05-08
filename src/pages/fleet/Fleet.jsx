import { useState } from 'react'
import { Truck, MapPin, Fuel, Wrench, Users, Calendar } from 'lucide-react'
import VehicleCard from '../../components/fleet/VehicleCard'
import FleetMap from '../../components/fleet/FleetMap'
import TelemetryPopup from '../../components/fleet/TelemetryPopup'
import MaintenanceCalendar from '../../components/fleet/MaintenanceCalendar'
import FuelTrends from '../../components/fleet/FuelTrends'
import BulkOperations from '../../components/fleet/BulkOperations'
import StatsCard from '../../components/dashboard/widgets/StatsCard'

import { useTrucksQuery } from '../../hooks/queries/useFleetQueries'
import { Loader2 } from 'lucide-react'

export default function Fleet() {
  const { data: trucksData, isLoading } = useTrucksQuery()
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showTelemetry, setShowTelemetry] = useState(false)
  const [selectedVehicles, setSelectedVehicles] = useState([])
  const [activeWidget, setActiveWidget] = useState('map')

  const vehicles = trucksData || []

  const stats = [
    { title: 'Total Vehicles', value: vehicles.length.toString(), icon: Truck, color: 'blue' },
    { title: 'Active Routes', value: vehicles.filter(v => v.status === 'en route').length.toString(), icon: MapPin, color: 'green' },
    { title: 'Fuel Alerts', value: vehicles.filter(v => v.fuelLevel < 20).length.toString(), icon: Fuel, color: 'yellow' },
    { title: 'Maintenance Due', value: vehicles.filter(v => new Date(v.maintenanceDue) < new Date()).length.toString(), icon: Wrench, color: 'red' }
  ]

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
        <p className="text-gray-500 font-medium">Loading fleet data...</p>
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Fleet Management</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <button 
            onClick={() => setActiveWidget('calendar')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm ${activeWidget === 'calendar' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            <Calendar className="w-4 h-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Maintenance</span>
            <span className="sm:hidden">Maint.</span>
          </button>
          <button 
            onClick={() => setActiveWidget('fuel')}
            className={`flex-1 sm:flex-initial px-3 sm:px-4 py-2 rounded-lg text-sm ${activeWidget === 'fuel' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
          >
            <Fuel className="w-4 h-4 inline mr-1 sm:mr-2" />
            <span className="hidden sm:inline">Fuel Trends</span>
            <span className="sm:hidden">Fuel</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        <div className="lg:col-span-1 space-y-3 sm:space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-base sm:text-lg font-semibold">Vehicles</h2>
            <BulkOperations 
              selectedVehicles={selectedVehicles}
              onClearSelection={() => setSelectedVehicles([])}
            />
          </div>
          <div className="space-y-3 max-h-[400px] sm:max-h-96 overflow-y-auto">
            {vehicles.map(vehicle => (
              <VehicleCard
                key={vehicle.id}
                vehicle={vehicle}
                isSelected={selectedVehicles.includes(vehicle.id)}
                onSelect={(id) => {
                  setSelectedVehicles(prev => 
                    prev.includes(id) 
                      ? prev.filter(v => v !== id)
                      : [...prev, id]
                  )
                }}
                onViewTelemetry={() => {
                  setSelectedVehicle(vehicle)
                  setShowTelemetry(true)
                }}
              />
            ))}
          </div>
        </div>

        <div className="lg:col-span-2">
          {activeWidget === 'map' && <FleetMap vehicles={vehicles} />}
          {activeWidget === 'calendar' && <MaintenanceCalendar vehicles={vehicles} />}
          {activeWidget === 'fuel' && <FuelTrends vehicles={vehicles} />}
        </div>
      </div>

      {showTelemetry && selectedVehicle && (
        <TelemetryPopup
          vehicle={selectedVehicle}
          onClose={() => setShowTelemetry(false)}
        />
      )}
    </div>
  )
}