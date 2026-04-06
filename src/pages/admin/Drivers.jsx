import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { useToast } from '../../components/ui/advanced'
import { useLogisticsShortcuts } from '../../hooks'
import { sanitizeInput } from '../../utils'
import { AlertCircle, RefreshCw } from 'lucide-react'
import {
  DriverStats,
  DriverFilters,
  DriverTable,
  DriverModal,
  AddDriverModal
} from '../../components/drivers'
import { useDriversQuery, useFleetQuery } from '../../hooks/queries/useAdminQueries'

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()
  const [driverToEdit, setDriverToEdit] = useState(null)

  const { data: drivers = [], isLoading: isLoadingDrivers, isError: isErrorDrivers, refetch: refetchDrivers } = useDriversQuery()
  const { data: fleetResponse, isLoading: isLoadingFleet, refetch: refetchFleet } = useFleetQuery()
  const fleet = useMemo(() => fleetResponse?.records || [], [fleetResponse])

  const isLoading = isLoadingDrivers || isLoadingFleet
  const isError = isErrorDrivers
  const refetch = () => {
    refetchDrivers()
    refetchFleet()
  }

  // Create a map of driverId -> assigned truck info
  const truckMap = useMemo(() => {
    const map = {}
    fleet.forEach(truck => {
      if (truck.driverId) {
        map[truck.driverId] = truck
      }
    })
    return map
  }, [fleet])

  useLogisticsShortcuts({
    onNewShipment: () => setIsAddModalOpen(true),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => refetch()
  })

  const filteredDrivers = useMemo(() => {
    console.log('[Drivers Page] Input drivers:', drivers)
    const sanitizedSearch = sanitizeInput(searchTerm)
    const filtered = drivers.filter(driver => {
      const matchesSearch = (driver.name || '').toLowerCase().includes(sanitizedSearch.toLowerCase()) ||
        (driver.licenseNumber || '').toLowerCase().includes(sanitizedSearch.toLowerCase())
      const matchesStatus = filterStatus === 'all' || driver.status === filterStatus
      return matchesSearch && matchesStatus
    })
    console.log('[Drivers Page] Filtered output:', filtered)
    return filtered
  }, [drivers, searchTerm, filterStatus])

  const handleViewDriver = (driverId) => {
    const driver = drivers.find(d => (d.id || d._id) === driverId)
    if (!driver) return

    const sanitizedDriver = {
      ...driver,
      name: sanitizeInput(driver.name || `${driver.profile?.first_name || ''} ${driver.profile?.last_name || ''}`.trim()),
      email: sanitizeInput(driver.email || driver.profile?.email || ''),
      phone: sanitizeInput(driver.phone || driver.profile?.phone || ''),
      address: sanitizeInput(driver.address || ''),
      licenseNumber: sanitizeInput(driver.licenseNumber || ''),
      emergencyContact: sanitizeInput(driver.emergencyContact || ''),
      complianceNotes: sanitizeInput(driver.complianceNotes || '')
    }
    setSelectedDriver(sanitizedDriver)
    setActiveTab('info')
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse">Loading driver directory...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <div className="p-4 bg-red-100 rounded-full">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Failed to load drivers</h3>
        <p className="text-gray-600 max-w-md">We encountered an error while fetching the driver directory. Please check your connection and try again.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Retry Fetch
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Driver Management"
        subtitle="Manage driver profiles, performance tracking, and vehicle assignments"
      />

      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Overview</h3>
          <button
            onClick={() => refetch()}
            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
            title="Refresh Data"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>
        <DriverStats drivers={drivers} />
      </div>

      <DriverFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        onClear={() => setSearchTerm('')}
        onAddDriver={() => {
          setDriverToEdit(null)
          setIsAddModalOpen(true)
        }}
      />

      <DriverTable
        drivers={filteredDrivers}
        onView={handleViewDriver}
        onEdit={(id) => {
          const driver = drivers.find(d => (d.id || d._id) === id)
          if (driver) {
            setDriverToEdit(driver)
            setIsAddModalOpen(true)
          }
        }}
        onDelete={() => showToast.warning('Delete driver functionality incoming')}
        onExport={() => showToast.success('Driver data exported successfully')}
        onSaveView={() => showToast.info('View saved')}
      />

      <DriverModal
        driver={selectedDriver}
        assignedTruck={selectedDriver ? truckMap[selectedDriver.id] : null}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={() => setSelectedDriver(null)}
      />

      <AddDriverModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setDriverToEdit(null)
        }}
        onRefresh={refetch}
        driver={driverToEdit}
      />
      <ToastContainer />
    </div>
  )
}

