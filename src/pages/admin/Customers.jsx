import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard/index'
import {
  Users, Search, ShoppingCart, TrendingUp, UserCheck,
  AlertCircle, RefreshCw, Grid, List, Filter, Download
} from 'lucide-react'
import { MetricCard, useToast } from '../../components/ui/advanced'
import { useLogisticsShortcuts } from '../../hooks/useKeyboardShortcuts'
import ClientsTable from '../../components/clients/ClientsTable'
import ClientCard from '../../components/clients/ClientCard'
import ClientDetail from '../../components/clients/ClientDetail'
import CreateOrderModal from '../../components/clients/CreateOrderModal'
import { useCustomersQuery } from '../../hooks/queries/useAdminQueries'

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState('')
  const [viewMode, setViewMode] = useState('grid') // 'grid' or 'table'
  const [selectedClient, setSelectedClient] = useState(null)
  const [showOrderModal, setShowOrderModal] = useState(false)
  const { showToast, ToastContainer } = useToast()

  const { data: clients = [], isLoading, isError, refetch } = useCustomersQuery()

  useLogisticsShortcuts({
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => refetch()
  })

  const filteredClients = useMemo(() => {
    return clients.filter(client =>
      (client.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (client.email?.toLowerCase() || '').includes(searchTerm.toLowerCase())
    )
  }, [clients, searchTerm])

  const stats = useMemo(() => {
    const totalRevenue = clients.reduce((sum, c) => sum + (c.revenue || 0), 0)
    const activeClients = clients.filter(c => c.paymentStatus === 'current').length
    const overduePayments = clients.filter(c => c.paymentStatus === 'overdue').length

    return {
      totalRevenue,
      activeClients,
      overduePayments
    }
  }, [clients])

  const handleCreateOrder = () => {
    showToast.success('Order created successfully', `Trip ID: TRP-${Date.now()}`)
    setShowOrderModal(false)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[500px] space-y-6">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-2">
          <p className="text-xl font-bold text-gray-900">Syncing Client Directory</p>
          <p className="text-gray-500 max-w-xs mx-auto">Connecting to logistics database and fetching latest records...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-red-50/50 rounded-3xl border border-red-100">
        <div className="p-4 bg-white rounded-2xl shadow-sm mb-4">
          <AlertCircle className="w-12 h-12 text-rose-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900">Sync Error</h3>
        <p className="text-gray-600 max-w-md mt-2 mb-8">We encountered an issue while connecting to the client management service. Please verify your network and try again.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-3 px-8 py-3 bg-gray-900 text-white rounded-2xl hover:bg-blue-600 transition-all font-bold shadow-lg hover:shadow-blue-200"
        >
          <RefreshCw className="w-5 h-5" /> Reconnect Now
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <PageHeader
          title="Global Client Network"
          subtitle="Enterprise directory and relationship management portal"
        />
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm">
            <Download className="w-4 h-4" /> Export Data
          </button>
          <button
            onClick={() => setShowOrderModal(true)}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:shadow-blue-200 transition-all font-bold"
          >
            <ShoppingCart className="w-4 h-4" /> New Order
          </button>
        </div>
      </div>

      {/* Modern KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Global Clients"
          value={clients.length}
          icon={Users}
          color="blue"
          sparklineData={[3, 4, 4, 4, 4, 4, 4]}
        />
        <MetricCard
          title="Portfolio Revenue"
          value={(stats.totalRevenue / 1000000).toFixed(1)}
          unit="M"
          icon={TrendingUp}
          color="green"
          sparklineData={[6.2, 6.8, 7.2, 7.8, 8.1, 8.3, 8.3]}
        />
        <MetricCard
          title="In Good Standing"
          value={stats.activeClients}
          icon={UserCheck}
          color="indigo"
          sparklineData={[2, 2, 3, 3, 3, 3, 3]}
        />
        <MetricCard
          title="Payment Risk"
          value={stats.overduePayments}
          icon={AlertCircle}
          color="red"
          sparklineData={[2, 1, 1, 2, 1, 1, 1]}
        />
      </div>

      {/* Control Bar */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-20 z-20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
            <input
              type="search"
              placeholder="Filter clients by name, email, or id..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 font-medium placeholder:text-gray-400"
            />
          </div>
          <button className="hidden md:flex items-center gap-2 px-4 py-3 bg-gray-50 text-gray-600 rounded-2xl hover:bg-gray-100 transition-all font-bold text-sm border border-transparent hover:border-gray-200">
            <Filter className="w-4 h-4" /> Advanced Filters
          </button>
        </div>

        <div className="flex items-center gap-4 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[14px] transition-all font-bold text-sm ${viewMode === 'grid'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <Grid className="w-4 h-4" /> Grid
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`flex items-center gap-2 px-4 py-2 rounded-[14px] transition-all font-bold text-sm ${viewMode === 'table'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-400 hover:text-gray-600'
              }`}
          >
            <List className="w-4 h-4" /> Table
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[400px]">
        {filteredClients.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No matches found</h3>
            <p className="text-gray-500 mt-1 max-w-xs mx-auto">Try adjusting your search criteria or broadening your filters.</p>
          </div>
        ) : viewMode === 'table' ? (
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <ClientsTable data={filteredClients} onViewClient={setSelectedClient} />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredClients.map(client => (
              <ClientCard
                key={client.id}
                client={client}
                onViewClient={setSelectedClient}
              />
            ))}
          </div>
        )}
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