import { useState } from 'react'
import { PageHeader } from '../../components/dashboard'
import ShipmentFilters from '../../components/shipments/components/ShipmentFilters'
import ShipmentTable from '../../components/shipments/views/ShipmentTable'
import KanbanBoard from '../../components/shipments/views/KanbanBoard'
import ShipmentSidebar from '../../components/shipments/components/ShipmentSidebar'
import CreateShipmentModal from '../../components/shipments/CreateShipmentModal'
import { VirtualizedTable, MetricCard, useToast } from '../../components/ui/advanced'
import { useLogisticsShortcuts } from '../../hooks/useKeyboardShortcuts'
import { List, Map, LayoutGrid, Plus } from 'lucide-react'

export default function Shipments() {
  const [view, setView] = useState('list') // list, map, kanban
  const [filters, setFilters] = useState({})
  const [selectedShipment, setSelectedShipment] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onNewShipment: () => showToast.info('New shipment shortcut pressed', 'Press N'),
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload(),
    onExport: () => showToast.info('Export functionality', 'Ctrl+E pressed')
  })

  // Mock data
  const shipments = [
    {
      id: 'SH001',
      customer: 'Adebayo Industries',
      origin: 'Lagos',
      destination: 'Abuja',
      status: 'in_transit',
      eta: '15:30 Today',
      actual: null,
      driver: 'Adebayo Ogun',
      assignedDriver: 'Adebayo Ogun',
      weight: '2.5 tons',
      volume: '15 m³',
      priority: 'high'
    },
    {
      id: 'SH002',
      customer: 'Kano Distribution',
      origin: 'Kano',
      destination: 'Port Harcourt',
      status: 'delayed',
      eta: '14:00 Today',
      actual: null,
      driver: 'Fatima Ahmed',
      assignedDriver: 'Fatima Ahmed',
      weight: '1.8 tons',
      volume: '12 m³',
      priority: 'urgent'
    },
    {
      id: 'SH003',
      customer: 'Port Harcourt Ltd',
      origin: 'Port Harcourt',
      destination: 'Lagos',
      status: 'delivered',
      eta: '12:00 Today',
      actual: '11:45 Today',
      driver: 'Chidi Okoro',
      assignedDriver: 'Chidi Okoro',
      weight: '3.2 tons',
      volume: '18 m³',
      priority: 'medium'
    },
    {
      id: 'SH004',
      customer: 'Abuja Enterprises',
      origin: 'Abuja',
      destination: 'Kano',
      status: 'pending',
      eta: '16:30 Today',
      actual: null,
      driver: null,
      assignedDriver: null,
      weight: '1.2 tons',
      volume: '8 m³',
      priority: 'low'
    }
  ]

  const drivers = [
    { id: 'D001', name: 'Adebayo Ogun', vehicle: 'V001', assignedShipments: 2 },
    { id: 'D002', name: 'Fatima Ahmed', vehicle: 'V002', assignedShipments: 1 },
    { id: 'D003', name: 'Chidi Okoro', vehicle: 'V003', assignedShipments: 1 },
    { id: 'D004', name: 'Amina Hassan', vehicle: 'V004', assignedShipments: 0 }
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleClearFilters = () => {
    setFilters({})
  }

  const handleViewShipment = (shipmentId) => {
    const shipment = shipments.find(s => s.id === shipmentId)
    setSelectedShipment(shipment)
    setSidebarOpen(true)
  }

  const handleReassignDriver = (shipmentId) => {
    console.log('Reassign driver for:', shipmentId)
  }

  const handlePrintLabel = (shipmentId) => {
    console.log('Print label for:', shipmentId)
  }

  const handleAssignDriver = (shipmentId, driverId, status) => {
    console.log('Assign driver:', { shipmentId, driverId, status })
  }

  const filteredShipments = shipments.filter(shipment => {
    if (filters.search && !shipment.id.toLowerCase().includes(filters.search.toLowerCase()) &&
      !shipment.customer.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.status && shipment.status !== filters.status) return false
    if (filters.priority && shipment.priority !== filters.priority) return false
    return true
  })

  const viewButtons = [
    { id: 'list', icon: List, label: 'List View' },
    { id: 'map', icon: Map, label: 'Map View' },
    { id: 'kanban', icon: LayoutGrid, label: 'Kanban Board' }
  ]

  return (
    <>
      <PageHeader
        title="Shipments"
        subtitle="Manage and track all your shipments in real-time"
      />

      {/* Filters */}
      <ShipmentFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={handleClearFilters}
      />

      {/* View Toggle & Actions */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
        <div className="flex items-center gap-2 overflow-x-auto">
          {viewButtons.map(button => {
            const Icon = button.icon
            return (
              <button
                key={button.id}
                onClick={() => setView(button.id)}
                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-colors whitespace-nowrap ${view === button.id
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{button.label}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>New Shipment</span>
        </button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        <MetricCard 
          title="Total Shipments"
          value={shipments.length}
          change={12}
          trend="up"
          sparklineData={[10, 15, 12, 18, 16, 20, 24]}
          detail="12% increase from last month"
        />
        <MetricCard 
          title="In Transit"
          value={shipments.filter(s => s.status === 'in_transit').length}
          change={-5}
          trend="down"
          sparklineData={[8, 6, 9, 7, 5, 8, 6]}
          detail="5% decrease from last week"
        />
        <MetricCard 
          title="Delivered"
          value={shipments.filter(s => s.status === 'delivered').length}
          change={8}
          trend="up"
          sparklineData={[5, 7, 6, 9, 8, 10, 12]}
          detail="8% increase in delivery rate"
        />
        <MetricCard 
          title="Delayed"
          value={shipments.filter(s => s.status === 'delayed').length}
          change={0}
          trend="neutral"
          sparklineData={[3, 2, 4, 2, 3, 2, 2]}
          detail="No change from last period"
        />
      </div>

      {/* Main Content */}
      {view === 'list' && (
        <VirtualizedTable
          data={filteredShipments}
          columns={[
            { key: 'id', label: 'Shipment ID', width: '120px' },
            { key: 'customer', label: 'Customer', width: '200px' },
            { key: 'origin', label: 'Origin', width: '120px' },
            { key: 'destination', label: 'Destination', width: '120px' },
            { 
              key: 'status', 
              label: 'Status', 
              width: '100px',
              render: (value) => (
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  value === 'delivered' ? 'bg-blue-100 text-blue-700' :
                  value === 'in_transit' ? 'bg-yellow-100 text-yellow-700' :
                  value === 'delayed' ? 'bg-red-100 text-red-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {String(value).replace(/[<>"'&]/g, '').replace('_', ' ')}
                </span>
              )
            },
            { key: 'driver', label: 'Driver', width: '150px', editable: true },
            { key: 'eta', label: 'ETA', width: '120px' }
          ]}
          height={400}
          enableInlineEdit={true}
          onExport={() => showToast.success('Shipments exported successfully')}
          onSaveView={() => showToast.info('View saved')}
        />
      )}

      {view === 'map' && (
        <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
          <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Map View</h3>
          <p className="text-gray-600">Interactive map view coming soon...</p>
        </div>
      )}

      {view === 'kanban' && (
        <KanbanBoard
          shipments={filteredShipments}
          drivers={drivers}
          onAssignDriver={handleAssignDriver}
        />
      )}

      {/* Shipment Sidebar */}
      <ShipmentSidebar
        shipment={selectedShipment}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Overlay for sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <CreateShipmentModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <ToastContainer />
    </>
  )
}