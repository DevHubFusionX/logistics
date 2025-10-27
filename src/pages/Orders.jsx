import { useState, useEffect } from 'react'
import { Plus, Search, Filter, AlertTriangle } from 'lucide-react'
import OrderCard from '../components/orders/OrderCard'
import OrderPipeline from '../components/orders/OrderPipeline'
import ExportModal from '../components/orders/ExportModal'

const mockOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'Acme Electronics Ltd',
    status: 'pending',
    priority: 'high',
    items: 15,
    value: 125000,
    createdAt: '2024-01-15 09:30',
    slaMinutes: 25
  },
  {
    id: 'ORD-2024-002',
    customer: 'Global Supplies Inc',
    status: 'picking',
    priority: 'normal',
    items: 8,
    value: 75000,
    createdAt: '2024-01-15 08:15',
    slaMinutes: 180
  },
  {
    id: 'ORD-2024-003',
    customer: 'Tech Solutions',
    status: 'packed',
    priority: 'high',
    items: 22,
    value: 200000,
    createdAt: '2024-01-15 07:45',
    slaMinutes: -15
  },
  {
    id: 'ORD-2024-004',
    customer: 'Metro Retail Chain',
    status: 'dispatched',
    priority: 'normal',
    items: 45,
    value: 350000,
    createdAt: '2024-01-14 16:20',
    slaMinutes: 0
  },
  {
    id: 'ORD-2024-005',
    customer: 'Premium Motors',
    status: 'delivered',
    priority: 'normal',
    items: 12,
    value: 180000,
    createdAt: '2024-01-14 14:10',
    slaMinutes: 0
  },
  {
    id: 'ORD-2024-006',
    customer: 'Healthcare Plus',
    status: 'pending',
    priority: 'high',
    items: 6,
    value: 95000,
    createdAt: '2024-01-15 10:15',
    slaMinutes: 45
  }
]

export default function Orders() {
  const [orders, setOrders] = useState(mockOrders)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [exportModal, setExportModal] = useState({ isOpen: false, orderId: null, type: null })

  // Update SLA timers every minute
  useEffect(() => {
    const interval = setInterval(() => {
      setOrders(prevOrders => 
        prevOrders.map(order => ({
          ...order,
          slaMinutes: order.priority === 'high' && order.status !== 'delivered' 
            ? Math.max(order.slaMinutes - 1, -999)
            : order.slaMinutes
        }))
      )
    }, 60000)

    return () => clearInterval(interval)
  }, [])

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPriority = priorityFilter === 'all' || order.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesPriority
  })

  const urgentOrders = orders.filter(order => 
    order.priority === 'high' && order.slaMinutes <= 30 && order.status !== 'delivered'
  ).length

  const handleExport = (orderId, type) => {
    setExportModal({ isOpen: true, orderId, type })
  }

  const handleStatusChange = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Orders & Fulfillment</h1>
          <p className="text-sm sm:text-base text-gray-600">Manage customer orders and fulfillment processes</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
          {urgentOrders > 0 && (
            <div className="flex items-center px-2 sm:px-3 py-2 bg-red-100 text-red-800 rounded-lg text-sm">
              <AlertTriangle className="w-4 h-4 mr-1 sm:mr-2 flex-shrink-0" />
              <span className="whitespace-nowrap">{urgentOrders} urgent</span>
            </div>
          )}
          <button className="flex items-center justify-center px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex-1 sm:flex-initial">
            <Plus className="w-4 h-4 mr-2" />
            <span>Create Order</span>
          </button>
        </div>
      </div>

      {/* Pipeline Overview */}
      <OrderPipeline orders={orders} />

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
        <div className="relative flex-1 sm:flex-initial sm:min-w-[250px]">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending Pick</option>
          <option value="picking">Picking</option>
          <option value="packed">Packed</option>
          <option value="dispatched">Dispatched</option>
          <option value="delivered">Delivered</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          className="px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
        >
          <option value="all">All Priority</option>
          <option value="high">High Priority</option>
          <option value="normal">Normal Priority</option>
        </select>
      </div>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusChange={handleStatusChange}
            onExport={handleExport}
          />
        ))}
      </div>

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500">No orders found matching your criteria</div>
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        isOpen={exportModal.isOpen}
        onClose={() => setExportModal({ isOpen: false, orderId: null, type: null })}
        orderId={exportModal.orderId}
        type={exportModal.type}
      />
    </div>
  )
}