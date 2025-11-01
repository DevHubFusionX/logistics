import { useState, useMemo } from 'react'
import { PageHeader } from '../components/dashboard'
import { useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks'
import { sanitizeInput } from '../utils'
import { 
  DriverStats, 
  DriverFilters, 
  DriverTable, 
  DriverModal, 
  AddDriverModal,
  mockDrivers 
} from '../components/drivers'

export default function Drivers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [activeTab, setActiveTab] = useState('info')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => showToast.info('Press N to add new driver'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const filteredDrivers = useMemo(() => {
    const sanitizedSearch = sanitizeInput(searchTerm)
    return mockDrivers.filter(driver => {
      const matchesSearch = driver.name.toLowerCase().includes(sanitizedSearch.toLowerCase()) ||
                           driver.licenseNumber.toLowerCase().includes(sanitizedSearch.toLowerCase())
      const matchesStatus = filterStatus === 'all' || driver.status === filterStatus
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, filterStatus])

  const handleViewDriver = (driverId) => {
    const driver = mockDrivers.find(d => d.id === driverId)
    const sanitizedDriver = {
      ...driver,
      name: sanitizeInput(driver.name),
      email: sanitizeInput(driver.email),
      phone: sanitizeInput(driver.phone),
      address: sanitizeInput(driver.address),
      licenseNumber: sanitizeInput(driver.licenseNumber),
      emergencyContact: sanitizeInput(driver.emergencyContact),
      complianceNotes: sanitizeInput(driver.complianceNotes)
    }
    setSelectedDriver(sanitizedDriver)
    setActiveTab('info')
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader 
        title="Driver Management" 
        subtitle="Manage driver profiles, performance tracking, and vehicle assignments"
      />

      <DriverStats drivers={mockDrivers} />

      <DriverFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onStatusChange={setFilterStatus}
        onClear={() => setSearchTerm('')}
        onAddDriver={() => setIsAddModalOpen(true)}
      />

      <DriverTable
        drivers={filteredDrivers}
        onView={handleViewDriver}
        onEdit={() => showToast.info('Edit driver')}
        onDelete={() => showToast.warning('Delete driver')}
        onExport={() => showToast.success('Driver data exported successfully')}
        onSaveView={() => showToast.info('View saved')}
      />

      <DriverModal
        driver={selectedDriver}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onClose={() => setSelectedDriver(null)}
      />

      <AddDriverModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />
      <ToastContainer />
    </div>
  )
}
