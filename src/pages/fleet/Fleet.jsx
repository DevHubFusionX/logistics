import { useState } from 'react'
import { Truck, MapPin, Fuel, Wrench, Users, Calendar } from 'lucide-react'
import VehicleCard from '../../components/fleet/VehicleCard'
import FleetMap from '../../components/fleet/FleetMap'
import TelemetryPopup from '../../components/fleet/TelemetryPopup'
import MaintenanceCalendar from '../../components/fleet/MaintenanceCalendar'
import FuelTrends from '../../components/fleet/FuelTrends'
import BulkOperations from '../../components/fleet/BulkOperations'
import StatsCard from '../../components/dashboard/widgets/StatsCard'

const mockVehicles = [
  {
    id: 'VH001',
    plate: 'ABC-123',
    type: 'Truck',
    capacity: '10 tons',
    driver: 'John Smith',
    location: 'Downtown Depot',
    lastUpdate: '2 min ago',
    odometer: 45230,
    fuelLevel: 75,
    maintenanceDue: '2024-02-15',
    status: 'available',
    lat: 40.7128,
    lng: -74.0060
  },
  {
    id: 'VH002', 
    plate: 'XYZ-456',
    type: 'Van',
    capacity: '3 tons',
    driver: 'Sarah Johnson',
    location: 'Route 95',
    lastUpdate: '5 min ago',
    odometer: 32100,
    fuelLevel: 45,
    maintenanceDue: '2024-01-28',
    status: 'en route',
    lat: 40.7589,
    lng: -73.9851
  }
]

export default function Fleet() {
  const [selectedVehicle, setSelectedVehicle] = useState(null)
  const [showTelemetry, setShowTelemetry] = useState(false)
  const [selectedVehicles, setSelectedVehicles] = useState([])
  const [activeWidget, setActiveWidget] = useState('map')

  const stats = [
    { title: 'Total Vehicles', value: '24', icon: Truck, color: 'blue' },
    { title: 'Active Routes', value: '18', icon: MapPin, color: 'green' },
    { title: 'Fuel Alerts', value: '3', icon: Fuel, color: 'yellow' },
    { title: 'Maintenance Due', value: '5', icon: Wrench, color: 'red' }
  ]

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
            {mockVehicles.map(vehicle => (
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
          {activeWidget === 'map' && <FleetMap vehicles={mockVehicles} />}
          {activeWidget === 'calendar' && <MaintenanceCalendar vehicles={mockVehicles} />}
          {activeWidget === 'fuel' && <FuelTrends vehicles={mockVehicles} />}
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