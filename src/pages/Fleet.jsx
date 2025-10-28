import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { VirtualizedTable, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { Thermometer, MapPin, Calendar } from 'lucide-react'
import { FLEET_DATA, MAINTENANCE_ALERTS } from '../components/fleet/fleetData'
import AddTruckModal from '../components/fleet/AddTruckModal'
import FleetFilters from '../components/fleet/FleetFilters'
import FleetMetrics from '../components/fleet/FleetMetrics'
import MaintenanceAlerts from '../components/fleet/MaintenanceAlerts'
import TruckDetailModal from '../components/fleet/TruckDetailModal'

export default function Fleet() {
  const [filters, setFilters] = useState({})
  const [selectedTruck, setSelectedTruck] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => showToast.info('Add new truck', 'Press N'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload(),
    onExport: () => showToast.info('Export functionality', 'Ctrl+E pressed')
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleViewTruck = (truckId) => {
    const truck = FLEET_DATA.find(t => t.id === truckId)
    setSelectedTruck(truck)
  }

  const filteredFleet = FLEET_DATA.filter(truck => {
    if (filters.search && !truck.id.toLowerCase().includes(filters.search.toLowerCase()) &&
      !truck.plateNumber.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.status && truck.status !== filters.status) return false
    return true
  })

  const statusCounts = {
    available: FLEET_DATA.filter(t => t.status === 'available').length,
    on_trip: FLEET_DATA.filter(t => t.status === 'on_trip').length,
    maintenance: FLEET_DATA.filter(t => t.status === 'maintenance').length
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700'
      case 'on_trip': return 'bg-blue-100 text-blue-700'
      case 'maintenance': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTempColor = (temp) => {
    if (temp < 20) return 'text-blue-600'
    if (temp > 24) return 'text-orange-600'
    return 'text-green-600'
  }

  const getInsuranceStatus = (expiry) => {
    const daysUntil = Math.ceil((new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24))
    if (daysUntil < 0) return { text: 'Expired', color: 'text-red-600' }
    if (daysUntil < 30) return { text: `${daysUntil} days`, color: 'text-orange-600' }
    return { text: `${daysUntil} days`, color: 'text-green-600' }
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Fleet Management"
        subtitle="Real-time monitoring and management of refrigerated truck fleet"
      />

      <FleetFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={() => setFilters({})}
        onAddTruck={() => setIsAddModalOpen(true)}
      />

      <FleetMetrics data={FLEET_DATA} statusCounts={statusCounts} />

      <MaintenanceAlerts alerts={MAINTENANCE_ALERTS} />

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <VirtualizedTable
          data={filteredFleet}
          columns={[
            { key: 'id', label: 'Truck ID', width: '100px' },
            { key: 'plateNumber', label: 'Plate Number', width: '120px' },
            { 
              key: 'tonnage', 
              label: 'Tonnage & Capacity', 
              width: '150px',
              render: (value, row) => `${value}T / ${row.capacity}`
            },
            { 
              key: 'location', 
              label: 'Location', 
              width: '180px',
              render: (value) => (
                <div className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{value}</span>
                </div>
              )
            },
            { 
              key: 'temperature', 
              label: 'Real-time Temp', 
              width: '120px',
              render: (value) => (
                <div className="flex items-center gap-1">
                  <Thermometer className={`w-4 h-4 ${getTempColor(value)}`} />
                  <span className={`font-medium ${getTempColor(value)}`}>{value}°C</span>
                </div>
              )
            },
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
              key: 'insuranceExpiry', 
              label: 'Insurance Expiry', 
              width: '140px',
              render: (value) => {
                const status = getInsuranceStatus(value)
                return (
                  <div className="flex items-center gap-1">
                    <Calendar className={`w-3 h-3 ${status.color}`} />
                    <span className={status.color}>{status.text}</span>
                  </div>
                )
              }
            },
            { 
              key: 'actions', 
              label: 'Actions', 
              width: '100px',
              render: (_, row) => (
                <button
                  onClick={() => handleViewTruck(row.id)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View
                </button>
              )
            }
          ]}
          height={500}
          onExport={() => showToast.success('Fleet data exported successfully')}
          onSaveView={() => showToast.info('View saved')}
        />
      </div>

      <TruckDetailModal
        truck={selectedTruck}
        onClose={() => setSelectedTruck(null)}
        getTempColor={getTempColor}
        getStatusColor={getStatusColor}
        getInsuranceStatus={getInsuranceStatus}
      />

      <AddTruckModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ToastContainer />
    </div>
  )
}
