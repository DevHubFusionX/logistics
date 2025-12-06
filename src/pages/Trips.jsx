import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { Truck, AlertTriangle, CheckCircle, Clock, MapPin } from 'lucide-react'
import { TRIPS_DATA, TRIP_TIMELINE, TRIP_TEMPERATURE_DATA, TRIP_ALERTS } from '../components/trips/tripsData'
import { mockDrivers } from '../components/drivers/driversData'
import { FLEET_DATA } from '../components/fleet/fleetData'
import TripAlerts from '../components/trips/TripAlerts'
import TripFilters from '../components/trips/TripFilters'
import TripFormModal from '../components/trips/TripFormModal'
import TripDetailModal from '../components/trips/TripDetailModal'
import TripTable from '../components/trips/TripTable'
import { useTripData, getStatusColor, getTempColor } from '../hooks/useTripData'

export default function Trips() {
  const [filters, setFilters] = useState({})
  const [selectedTrip, setSelectedTrip] = useState(null)
  const [detailView, setDetailView] = useState(false)
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [activeTab, setActiveTab] = useState('timeline')
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => setShowCreateForm(true),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleViewTrip = (tripId) => {
    const trip = TRIPS_DATA.find(t => t.id === tripId)
    setSelectedTrip(trip)
    setDetailView(true)
    setActiveTab('timeline')
  }

  const { filteredTrips, statusCounts } = useTripData(TRIPS_DATA, filters)
  const availableTrucks = FLEET_DATA.filter(t => t.status === 'available')
  const availableDrivers = mockDrivers.filter(d => d.status === 'available')

  const handleCreateTrip = () => {
    showToast.success('Trip created successfully')
    setShowCreateForm(false)
  }

  return (
    <>
      <PageHeader
        title="Trip Management"
        subtitle="End-to-end trip lifecycle: creation → tracking → completion"
      />

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          title="Active Trips"
          value={statusCounts.in_transit}
          icon={Truck}
          color="blue"
          sparklineData={[8, 10, 9, 12, 11, 10, 12]}
        />
        <MetricCard
          title="Pending"
          value={statusCounts.pending}
          icon={Clock}
          color="yellow"
          sparklineData={[5, 4, 6, 5, 4, 3, 4]}
        />
        <MetricCard
          title="Delivered Today"
          value={statusCounts.delivered}
          icon={CheckCircle}
          color="green"
          sparklineData={[15, 18, 20, 22, 25, 28, 30]}
        />
        <MetricCard
          title="Active Alerts"
          value={TRIP_ALERTS.filter(a => !a.resolved).length}
          icon={AlertTriangle}
          color="red"
          sparklineData={[8, 6, 7, 5, 4, 3, 2]}
        />
      </div>

      <TripAlerts alerts={TRIP_ALERTS} onViewTrip={handleViewTrip} />
      <TripFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
        onClearFilters={() => setFilters({})} 
        onCreateTrip={() => setShowCreateForm(true)} 
      />

      {/* Active Trips Map */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-blue-600" />
          Active Trips Map
        </h3>
        <div className="relative bg-gradient-to-br from-blue-50 to-green-50 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">Real-time map with all trucks in transit</p>
            <p className="text-sm text-gray-500">{statusCounts.in_transit} active trips</p>
          </div>
        </div>
      </div>

      <TripTable 
        trips={filteredTrips}
        getStatusColor={getStatusColor}
        getTempColor={getTempColor}
        onViewTrip={handleViewTrip}
        onCancelTrip={() => showToast.warning('Cancel trip')}
        onExport={() => showToast.success('Trip data exported successfully')}
      />

      <TripFormModal 
        isOpen={showCreateForm} 
        onClose={() => setShowCreateForm(false)} 
        onSubmit={handleCreateTrip}
        trucks={availableTrucks}
        drivers={availableDrivers}
      />

      <TripDetailModal 
        trip={selectedTrip}
        isOpen={detailView}
        onClose={() => setDetailView(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        timeline={TRIP_TIMELINE}
        temperatureData={TRIP_TEMPERATURE_DATA}
        getStatusColor={getStatusColor}
        getTempColor={getTempColor}
      />

      <ToastContainer />
    </>
  )
}
