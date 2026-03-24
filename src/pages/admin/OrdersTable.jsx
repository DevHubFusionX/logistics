import { useState, useMemo, useEffect } from 'react'
import { PageHeader } from '../../components/dashboard'
import { 
  Search, Download, MoreHorizontal, 
  CheckCircle2, AlertCircle, Truck,
  ArrowUpDown, ExternalLink, RefreshCw,
  MapPin, Calendar, Building2, Package,
  ChevronLeft, ChevronRight, Copy
} from 'lucide-react'
import { useToast } from '../../components/ui/advanced'
import { useOrdersTableQuery } from '../../hooks/queries/useOrderQueries'
import OrderDetailsModal from '../../components/admin/OrderDetailsModal'

export default function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const itemsPerPage = 10
  const { showToast } = useToast()

  const { data: ordersData, isLoading, isError, refetch } = useOrdersTableQuery()

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  const filteredOrders = useMemo(() => {
    const records = ordersData?.records || []
    return records.filter(order => {
      // Robust null checks to prevent "toLowerCase of undefined"
      const companyStr = order.company || ''
      const fleetStr = order.fleet || ''
      const pickupStr = order.pickup || ''
      const deliveryStr = order.delivery || ''
      const goodsStr = order.goodsType || ''
      const statusStr = order.status || ''

      const matchesSearch = 
        companyStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fleetStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pickupStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        deliveryStr.toLowerCase().includes(searchTerm.toLowerCase()) ||
        goodsStr.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === 'all' || statusStr.toLowerCase() === statusFilter.toLowerCase()
      
      return matchesSearch && matchesStatus
    })
  }, [ordersData, searchTerm, statusFilter])

  const { paginatedOrders, totalPages } = useMemo(() => {
    const total = Math.ceil(filteredOrders.length / itemsPerPage)
    const start = (currentPage - 1) * itemsPerPage
    return {
      paginatedOrders: filteredOrders.slice(start, start + itemsPerPage),
      totalPages: total
    }
  }, [filteredOrders, currentPage])

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleViewOrder = (order) => {
    setSelectedOrder(order)
    setIsModalOpen(true)
  }

  const handleCopyId = (id) => {
    navigator.clipboard.writeText(id)
    showToast.success('ID Copied', `Order ID ${id} has been copied to your clipboard.`)
  }

  const handleExportRow = (order) => {
    showToast.success('Exporting...', `Generating dispatch report for ${order.company}`)
  }

  const getStatusStyle = (status = '') => {
    switch (status.toLowerCase()) {
      case 'fulfilled':
        return 'bg-emerald-50 text-emerald-700 border-emerald-100 ring-emerald-500/10'
      case 'unfulfilled':
        return 'bg-rose-50 text-rose-700 border-rose-100 ring-rose-500/10'
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100'
    }
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <PageHeader 
          title="Company Dispatch Log" 
          subtitle="Enterprise-wide logistical overview for the last 4 months" 
        />
        <div className="flex items-center gap-3">
          <button 
            onClick={() => refetch()}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:bg-gray-50 transition-all shadow-sm"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <button 
            onClick={() => showToast.success('Export started', 'The dispatch log is being prepared for download.')}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 border border-blue-700 rounded-xl text-sm font-bold text-white hover:bg-blue-700 transition-all shadow-md"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* Modern Control Bar */}
      <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-100 p-4 shadow-sm sticky top-20 z-20 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
          <input
            type="search"
            placeholder="Search company, fleet, goods, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500/20 font-medium placeholder:text-gray-400"
          />
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto overflow-x-auto no-scrollbar pb-1 md:pb-0">
          <div className="flex bg-gray-50 p-1 rounded-2xl border border-gray-100 min-w-max">
            {['all', 'fulfilled', 'unfulfilled'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-3 md:px-4 py-2 rounded-[14px] text-[10px] md:text-xs font-bold capitalize transition-all ${
                  statusFilter === status 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-[32px] border border-gray-100 overflow-hidden shadow-sm relative min-h-[500px]">
        {isLoading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-sm font-bold text-gray-500">Syncing Enterprise Log...</p>
            </div>
          </div>
        )}

        {isError && (
          <div className="absolute inset-0 bg-white z-10 flex items-center justify-center p-6 text-center">
            <div className="max-w-xs">
              <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-100">
                <AlertCircle className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Connection Interrupted</h3>
              <p className="text-sm text-gray-500 mt-2 mb-6">We couldn't reach the logistics server. Please check your connection and try again.</p>
              <button 
                onClick={() => refetch()}
                className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 transition-all"
              >
                Retry Connection
              </button>
            </div>
          </div>
        )}

        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <table className="w-full border-separate border-spacing-0 min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Company Name</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Truck Size</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Goods Type</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Pickup Location</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Delivery Destination</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Fleet Company</th>
                <th className="px-6 py-5 text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                <th className="px-6 py-5 text-right text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 font-mono">Date</th>
                <th className="px-6 py-5 text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {paginatedOrders.map((order) => (
                <tr key={order.id} className="group hover:bg-blue-50/30 transition-all duration-150">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-bold text-gray-900 group-hover:text-blue-700 transition-colors">{order.company}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-gray-100 text-[12px] font-bold text-gray-600 border border-gray-200">
                      <Truck className="w-3.5 h-3.5" />
                      {order.truckSize}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 text-[13px] font-medium text-gray-600">
                      <Package className="w-3.5 h-3.5 text-gray-400" />
                      {order.goodsType}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-700">
                      <MapPin className="w-3 h-3 text-emerald-500" />
                      {order.pickup}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-[13px] font-semibold text-gray-700">
                      <MapPin className="w-3 h-3 text-rose-500" />
                      {order.delivery}
                    </div>
                  </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-[13px] font-medium text-gray-500 italic">{order.fleet}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ring-1 uppercase tracking-tight ${getStatusStyle(order.status)}`}>
                      {order.status === 'Fulfilled' ? <CheckCircle2 className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900">{formatDate(order.date)}</span>
                      <span className="text-[10px] text-gray-400 font-medium">Recorded</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <div className="flex items-center justify-center gap-2">
                       <button 
                        onClick={() => handleViewOrder(order)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all" 
                        title="View Trip Specification"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </button>
                      <div className="relative group/more">
                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all">
                          <MoreHorizontal className="w-4 h-4" />
                        </button>
                        <div className="absolute right-0 bottom-full mb-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 opacity-0 invisible group-hover/more:opacity-100 group-hover/more:visible transition-all z-30">
                          <button 
                            onClick={() => handleCopyId(order.id)}
                            className="w-full text-left px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center gap-2"
                          >
                            <Copy className="w-3.5 h-3.5" /> Copy Order ID
                          </button>
                          <button 
                            onClick={() => handleExportRow(order)}
                            className="w-full text-left px-3 py-2 text-xs font-bold text-gray-600 hover:bg-gray-50 rounded-xl flex items-center gap-2"
                          >
                            <Download className="w-3.5 h-3.5" /> Export Data
                          </button>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {paginatedOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-bold text-gray-900">No matching logistical records</h3>
            <p className="text-gray-500 mt-1 max-w-xs mx-auto">Try adjusting your search criteria or broadening your filters.</p>
          </div>
        )}

        {/* Improved Pagination Footer */}
        <div className="px-6 py-5 bg-gray-50/50 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] md:text-[12px] text-gray-400 font-bold uppercase tracking-wider text-center md:text-left">
            Showing <span className="text-gray-900">{paginatedOrders.length}</span> of <span className="text-gray-900">{filteredOrders.length}</span> records
          </p>
          
          {totalPages > 1 && (
            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
              <button 
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              <div className="flex items-center gap-1 px-1 sm:px-2">
                {[...Array(totalPages)].map((_, i) => {
                  const page = i + 1;
                  // Show limited pages if many
                  if (totalPages > 5) {
                    if (page !== 1 && page !== totalPages && Math.abs(page - currentPage) > 1) {
                      if (page === 2 || page === totalPages - 1) return <span key={page} className="text-gray-300">...</span>;
                      return null;
                    }
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold transition-all ${
                        currentPage === page 
                          ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                          : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 bg-white border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-sm"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      <OrderDetailsModal 
        order={selectedOrder}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
