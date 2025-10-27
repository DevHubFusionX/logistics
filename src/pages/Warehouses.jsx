import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import WarehouseCard from '../components/warehouses/WarehouseCard'
import WarehouseDashboard from '../components/warehouses/WarehouseDashboard'
import InventoryTable from '../components/warehouses/InventoryTable'
import DockScheduling from '../components/warehouses/DockScheduling'

const mockWarehouses = [
  {
    id: 1,
    name: 'Lagos Main Warehouse',
    location: 'Apapa, Lagos',
    capacity: 50000,
    utilization: 85,
    activeSkus: 1250,
    inbound: 45,
    outbound: 38,
    dwellTime: 3.2,
    exceptions: 2,
    topSkus: [
      { id: 1, name: 'SKU-001', description: 'Electronics Components', quantity: 5000 },
      { id: 2, name: 'SKU-002', description: 'Automotive Parts', quantity: 3200 },
      { id: 3, name: 'SKU-003', description: 'Textiles', quantity: 2800 }
    ],
    exceptionDetails: [
      { id: 1, type: 'Temperature Alert', description: 'Cold storage unit 3 temperature above threshold', time: '2 hours ago' },
      { id: 2, type: 'Inventory Discrepancy', description: 'SKU-045 count mismatch in Zone B', time: '4 hours ago' }
    ]
  },
  {
    id: 2,
    name: 'Abuja Distribution Center',
    location: 'Garki, Abuja',
    capacity: 35000,
    utilization: 72,
    activeSkus: 890,
    inbound: 28,
    outbound: 31,
    dwellTime: 2.8,
    exceptions: 0,
    topSkus: [
      { id: 1, name: 'SKU-101', description: 'Food & Beverages', quantity: 4200 },
      { id: 2, name: 'SKU-102', description: 'Pharmaceuticals', quantity: 1800 },
      { id: 3, name: 'SKU-103', description: 'Consumer Goods', quantity: 1500 }
    ]
  },
  {
    id: 3,
    name: 'Port Harcourt Hub',
    location: 'Trans Amadi, Port Harcourt',
    capacity: 28000,
    utilization: 91,
    activeSkus: 675,
    inbound: 22,
    outbound: 19,
    dwellTime: 4.1,
    exceptions: 1,
    topSkus: [
      { id: 1, name: 'SKU-201', description: 'Oil & Gas Equipment', quantity: 2100 },
      { id: 2, name: 'SKU-202', description: 'Industrial Tools', quantity: 1900 },
      { id: 3, name: 'SKU-203', description: 'Safety Equipment', quantity: 1200 }
    ],
    exceptionDetails: [
      { id: 1, type: 'Capacity Warning', description: 'Warehouse approaching maximum capacity', time: '1 hour ago' }
    ]
  }
]

const mockInventory = [
  { id: 1, sku: 'SKU-001', description: 'Electronics Components', location: 'A-01-15', currentStock: 450, reorderPoint: 500, lastUpdated: '2 hours ago' },
  { id: 2, sku: 'SKU-002', description: 'Automotive Parts', location: 'B-03-22', currentStock: 1200, reorderPoint: 800, lastUpdated: '1 hour ago' },
  { id: 3, sku: 'SKU-003', description: 'Textiles', location: 'C-02-08', currentStock: 300, reorderPoint: 400, lastUpdated: '3 hours ago' },
  { id: 4, sku: 'SKU-004', description: 'Medical Supplies', location: 'D-01-05', currentStock: 150, reorderPoint: 200, lastUpdated: '30 min ago' }
]

const mockArrivals = [
  { id: 1, carrier: 'DHL Express', shipmentId: 'DHL-2024-001', assignedBay: 'A1', scheduledTime: '09:00', eta: '09:15', status: 'Delayed' },
  { id: 2, carrier: 'FedEx', shipmentId: 'FDX-2024-045', assignedBay: 'B2', scheduledTime: '10:30', eta: '10:30', status: 'On Time' },
  { id: 3, carrier: 'UPS', shipmentId: 'UPS-2024-078', assignedBay: 'A3', scheduledTime: '11:00', eta: '10:45', status: 'Early' },
  { id: 4, carrier: 'Local Carrier', shipmentId: 'LC-2024-012', assignedBay: 'C1', scheduledTime: '14:00', eta: '14:00', status: 'On Time' }
]

export default function Warehouses() {
  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('overview')

  const filteredWarehouses = mockWarehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.location.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (selectedWarehouse) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <WarehouseDashboard 
          warehouse={selectedWarehouse} 
          onBack={() => setSelectedWarehouse(null)} 
        />
        
        {/* Tabs */}
        <div className="border-b border-gray-200 overflow-x-auto">
          <nav className="-mb-px flex space-x-4 sm:space-x-8 min-w-max">
            {[
              { id: 'overview', name: 'Overview' },
              { id: 'inventory', name: 'Inventory' },
              { id: 'dock', name: 'Dock Scheduling' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'inventory' && <InventoryTable inventory={mockInventory} />}
        {activeTab === 'dock' && <DockScheduling arrivals={mockArrivals} />}
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Warehouses & Inventory</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage warehouse operations and inventory levels</p>
        </div>
        <button className="flex items-center justify-center px-3 sm:px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors w-full sm:w-auto">
          <Plus className="w-4 h-4 mr-2" />
          <span>Add Warehouse</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search warehouses..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full sm:max-w-md border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
        />
      </div>

      {/* Warehouse Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredWarehouses.map((warehouse) => (
          <WarehouseCard
            key={warehouse.id}
            warehouse={warehouse}
            onClick={setSelectedWarehouse}
          />
        ))}
      </div>
    </div>
  )
}