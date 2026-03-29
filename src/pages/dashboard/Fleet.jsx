import { useState, useMemo, memo } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { PageHeader } from '../../components/dashboard'
import { VirtualizedTable, useToast } from '../../components/ui/advanced'
import { useLogisticsShortcuts } from '../../hooks/useKeyboardShortcuts'
import { Thermometer, RefreshCw, AlertCircle, Truck, Shield, CheckCircle, XCircle } from 'lucide-react'
import AddTruckModal from '../../components/fleet/AddTruckModal'
import FleetFilters from '../../components/fleet/FleetFilters'
import FleetMetrics from '../../components/fleet/FleetMetrics'
import TruckDetailModal from '../../components/fleet/TruckDetailModal'
import { useFleetQuery, useDriversQuery } from '../../hooks/queries/useAdminQueries'

function Fleet() {
  const [filters, setFilters] = useState({})
  const [selectedTruck, setSelectedTruck] = useState(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()
  const { user } = useAuthStore()
  const isAdminManager = user?.role === 'Admin Manager'

  const { data: fleetData = [], isLoading, isError, refetch } = useFleetQuery(filters)
  const { data: drivers = [] } = useDriversQuery()

  // Create a lookup map: driverId -> driver name
  const driverMap = useMemo(() => {
    const map = {}
    drivers.forEach(d => { map[d.id] = d.name })
    return map
  }, [drivers])

  // Driver IDs that are already assigned to trucks
  const assignedDriverIds = useMemo(() => {
    return new Set(fleetData.map(t => t.driverId).filter(Boolean))
  }, [fleetData])

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
    const truck = fleetData.find(t => (t.id || t._id) === truckId)
    setSelectedTruck(truck)
  }

  const filteredFleet = useMemo(() => {
    return fleetData.filter(truck => {
      const plate = truck.plateNumber || ''
      const id = truck.id || truck._id || ''
      const make = truck.make || ''

      if (filters.search &&
        !id.toLowerCase().includes(filters.search.toLowerCase()) &&
        !plate.toLowerCase().includes(filters.search.toLowerCase()) &&
        !make.toLowerCase().includes(filters.search.toLowerCase())) {
        return false
      }
      if (filters.status && truck.status !== filters.status) return false
      return true
    })
  }, [fleetData, filters])

  const statusCounts = useMemo(() => {
    return {
      total: 73,
      approved: 32,
      pending: 41,
      gpsEnabled: 12
    }
  }, [])

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-700'
      case 'pending': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse">Loading fleet data...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-lg font-bold text-gray-900">Failed to load fleet data</h3>
        <p className="text-gray-500 max-w-sm">Unable to connect to the fleet management service. Please check your connection.</p>
        <button onClick={() => refetch()} className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-sm">
          <RefreshCw className="w-4 h-4" /> Retry
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Fleet Management"
          subtitle="Manage your truck fleet, vehicle specifications, and compliance"
        />
        <button onClick={() => refetch()} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" title="Refresh fleet data">
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

      {!isAdminManager && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <VirtualizedTable
            data={filteredFleet}
            columns={[
              {
                key: 'plateNumber',
                label: 'Plate Number',
                width: '120px',
                render: (value) => (
                  <span className="font-semibold text-gray-900">{value || 'N/A'}</span>
                )
              },
              {
                key: 'driverId',
                label: 'Driver',
                width: '140px',
                render: (value) => (
                  <span className="text-sm">{value ? (driverMap[value] || 'Unknown') : <span className="text-gray-400 italic">Unassigned</span>}</span>
                )
              },
              {
                key: 'vehicleType',
                label: 'Type',
                width: '100px',
                render: (value) => (
                  <div className="flex items-center gap-1">
                    <Truck className="w-3 h-3 text-gray-400" />
                    <span className="text-sm">{value || 'N/A'}</span>
                  </div>
                )
              },
              {
                key: 'make',
                label: 'Make & Model',
                width: '150px',
                render: (value, row) => (
                  <span className="text-sm">{value} {row.model} {row.yearOfManufacture !== 'N/A' ? `(${row.yearOfManufacture})` : ''}</span>
                )
              },
              {
                key: 'truckCapacity',
                label: 'Capacity',
                width: '100px'
              },
              {
                key: 'temperatureRange',
                label: 'Temp Range',
                width: '130px',
                render: (value) => (
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-blue-500" />
                    <span className="text-sm">{value || 'N/A'}</span>
                  </div>
                )
              },
              {
                key: 'gpsTrackingInstalled',
                label: 'GPS',
                width: '70px',
                render: (value) => value ? (
                  <CheckCircle className="w-4 h-4 text-green-500" />
                ) : (
                  <XCircle className="w-4 h-4 text-gray-300" />
                )
              },
              {
                key: 'status',
                label: 'Status',
                width: '110px',
                render: (value) => (
                  <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${getStatusColor(value)}`}>
                    {value || 'unknown'}
                  </span>
                )
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
      )}

      <TruckDetailModal
        truck={selectedTruck}
        onClose={() => setSelectedTruck(null)}
        driverMap={driverMap}
      />

      <AddTruckModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onRefresh={refetch}
        assignedDriverIds={assignedDriverIds}
      />
      <ToastContainer />
    </div>
  )
}

export default memo(Fleet)
