import { useState, useMemo, memo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { VirtualizedTable, useToast } from '../../components/ui/advanced'
import { useLogisticsShortcuts } from '../../hooks/useKeyboardShortcuts'
import { Thermometer, MapPin, Calendar, RefreshCw, AlertCircle } from 'lucide-react'
import AddTruckModal from '../../components/fleet/AddTruckModal'
import FleetFilters from '../../components/fleet/FleetFilters'
import FleetMetrics from '../../components/fleet/FleetMetrics'
import MaintenanceAlerts from '../../components/fleet/MaintenanceAlerts'
import TruckDetailModal from '../../components/fleet/TruckDetailModal'
import { useFleetQuery } from '../../hooks/queries/useAdminQueries'
import { MAINTENANCE_ALERTS } from '../../components/fleet/fleetData'

function Fleet() {
  const [filters, setFilters] = useState({})
  const [selectedTruck, setSelectedTruck] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const { data: fleetData = [], isLoading, isError, refetch } = useFleetQuery(filters)

  useLogisticsShortcuts({
    onNewShipment: () => setIsAddModalOpen(true),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => refetch(),
    onExport: () => showToast.info('Export started', 'Compiling fleet data...')
  })

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleViewTruck = (truckId) => {
    const truck = fleetData.find(t => t.id === truckId)
    setSelectedTruck(truck)
  }

  const filteredFleet = useMemo(() => {
    return fleetData.filter(truck => {
      const plate = truck.plateNumber || truck.plate_number || ''
      const id = truck.id || truck._id || ''

      if (filters.search && !id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !plate.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.status && truck.status !== filters.status) return false
      return true
    })
  }, [fleetData, filters])

  const statusCounts = useMemo(() => {
    return {
      available: fleetData.filter(t => t.status === 'available').length,
      on_trip: fleetData.filter(t => t.status === 'on_trip').length,
      maintenance: fleetData.filter(t => t.status === 'maintenance').length
    }
  }, [fleetData])

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-700'
      case 'on_trip': return 'bg-blue-100 text-blue-700'
      case 'maintenance': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getTempColor = (temp) => {
    if (!temp && temp !== 0) return 'text-gray-400'
    if (temp < 20) return 'text-blue-600'
    if (temp > 24) return 'text-orange-600'
    return 'text-green-600'
  }

  const getInsuranceStatus = (expiry) => {
    if (!expiry) return { text: 'N/A', color: 'text-gray-400' }
    const daysUntil = Math.ceil((new Date(expiry) - new Date()) / (1000 * 60 * 60 * 24))
    if (daysUntil < 0) return { text: 'Expired', color: 'text-red-600' }
    if (daysUntil < 30) return { text: `${daysUntil} days`, color: 'text-orange-600' }
    return { text: `${daysUntil} days`, color: 'text-green-600' }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse">Synchronizing fleet telemetry...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900">Telemetry Sync Failed</h3>
        <p className="text-gray-500 max-w-sm">Failed to connect to the vehicle tracking service. Please check your connection.</p>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
          <RefreshCw className="w-4 h-4" /> Retry Connection
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Fleet Management"
          subtitle="Real-time monitoring and management of refrigerated truck fleet"
        />
        <button onClick={() => refetch()} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Sync fleet data">
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <FleetFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClear={() => setFilters({})}
        onAddTruck={() => setIsAddModalOpen(true)}
      />

      <FleetMetrics data={fleetData} statusCounts={statusCounts} />

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
              render: (value, row) => `${value}T / ${row.capacity || 'N/A'}`
            },
            {
              key: 'location',
              label: 'Location',
              width: '180px',
              render: (value) => (
                <div className="flex items-center gap-1 font-medium text-gray-700">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="truncate">{value || 'Unknown'}</span>
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
                  <span className={`font-bold ${getTempColor(value)}`}>{value !== undefined ? `${value}°C` : 'N/A'}</span>
                </div>
              )
            },
            {
              key: 'status',
              label: 'Status',
              width: '120px',
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(value)}`}>
                  {(value || 'unknown').replace('_', ' ')}
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
                    <span className={`font-medium ${status.color}`}>{status.text}</span>
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
                  className="text-blue-600 hover:text-blue-800 text-sm font-bold border border-blue-100 px-3 py-1 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Details
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

export default memo(Fleet)
