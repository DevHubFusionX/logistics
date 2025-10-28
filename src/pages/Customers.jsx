import { useState } from 'react'
import { PageHeader } from '../components/dashboard/index'
import { Users, Search, ShoppingCart, TrendingUp, UserCheck, AlertCircle } from 'lucide-react'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import ClientsTable from '../components/clients/ClientsTable'
import ClientDetail from '../components/clients/ClientDetail'
import CreateOrderModal from '../components/clients/CreateOrderModal'
import { clientsData } from '../components/clients/clientsData'

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedClient, setSelectedClient] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const filteredClients = clientsData.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const totalRevenue = clientsData.reduce((sum, c) => sum + c.revenue, 0)
  const activeClients = clientsData.filter(c => c.paymentStatus === 'current').length
  const overduePayments = clientsData.filter(c => c.paymentStatus === 'overdue').length

  const handleCreateOrder = (orderData) => {
    showToast.success('Order created successfully', `Trip ID: TRP-${Date.now()}`)
    setShowOrderModal(false)
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader 
        title="Client & Order Management" 
        subtitle="Manage customer relationships, orders, and payment tracking"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard 
          title="Total Clients"
          value={clientsData.length}
          icon={Users}
          color="blue"
          sparklineData={[3, 4, 4, 4, 4, 4, 4]}
        />
        <MetricCard 
          title="Total Revenue"
          value={(totalRevenue / 1000000).toFixed(1)}
          unit="M"
          icon={TrendingUp}
          color="green"
          sparklineData={[6.2, 6.8, 7.2, 7.8, 8.1, 8.3, 8.3]}
        />
        <MetricCard 
          title="Active Clients"
          value={activeClients}
          icon={UserCheck}
          color="green"
          sparklineData={[2, 2, 3, 3, 3, 3, 3]}
        />
        <MetricCard 
          title="Overdue Payments"
          value={overduePayments}
          icon={AlertCircle}
          color="red"
          sparklineData={[2, 1, 1, 2, 1, 1, 1]}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search clients by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <button 
            onClick={() => setShowOrderModal(true)}
            className="flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            Create Order for Client
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-600" />
            Client Directory
          </h2>
          <p className="text-sm text-gray-600 mt-1">{filteredClients.length} clients found</p>
        </div>
        <ClientsTable data={filteredClients} onViewClient={setSelectedClient} />
      </div>

      {selectedClient && (
        <ClientDetail client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}

      {showOrderModal && (
        <CreateOrderModal onClose={() => setShowOrderModal(false)} onSubmit={handleCreateOrder} />
      )}

      <ToastContainer />
    </div>
  )
}