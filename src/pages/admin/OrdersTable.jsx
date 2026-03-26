import React, { useState } from 'react'
import { 
  ChevronLeft, ChevronRight, RefreshCw, 
  ArrowUpDown, Download, Edit, MoreHorizontal,
  ExternalLink, Copy, AlertCircle, Truck
} from 'lucide-react'
import { useToast } from '../../components/ui/advanced'
import { useOrdersTableQuery, useOrderMutations } from '../../hooks/queries/useOrderQueries'
import adminOrderService from '../../services/adminOrderService'
import OrderDetailsModal from '../../components/admin/OrderDetailsModal'
import OrderFormModal from '../../components/admin/OrderFormModal'
import OrdersTableControls from '../../components/admin/orders/OrdersTableControls'
import OrdersTableRow from '../../components/admin/orders/OrdersTableRow'

/**
 * Admin Orders Management Table
 * Professional, enterprise-grade interface for managing dispatch records.
 */
export default function OrdersTable() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  
  const [sortField, setSortField] = useState('date')
  const [sortOrder, setSortOrder] = useState('desc')
  
  const itemsPerPage = 10
  const { showToast } = useToast()
  const { addOrder, updateOrder, deleteOrder } = useOrderMutations()

  const { data: ordersData, isLoading, refetch } = useOrdersTableQuery({
    page: currentPage,
    limit: itemsPerPage,
    search: searchTerm,
    status: statusFilter === 'all' ? '' : statusFilter,
    sortBy: sortField,
    sortOrder: sortOrder
  })

  // --- Helpers ---
  const handleExportCSV = (data, filename = `logistics_dispatch_${new Date().toISOString().split('T')[0]}.csv`) => {
    if (!data || data.length === 0) {
      showToast.error("Export Failed", "There is no data to export.")
      return
    }

    const headers = ["Order ID", "Date", "Company", "Truck Size", "Goods Type", "Pickup", "Delivery", "Fleet", "Status", "Revenue"]
    const csvRows = [
      headers.join(','),
      ...data.map(o => [`"${o.id}"`, `"${formatDate(o.date)}"`, `"${o.company}"`, `"${o.truckSize}"`, `"${o.goodsType}"`, `"${o.pickup}"`, `"${o.delivery}"`, `"${o.fleet}"`, `"${o.status}"`, o.revenue].join(','))
    ]

    try {
      const blob = new Blob([csvRows.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement("a")
      link.href = URL.createObjectURL(blob)
      link.setAttribute("download", filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast.success("Export Successful", `${data.length} records downloaded.`)
    } catch {
      showToast.error("Export Error", "System failed to generate CSV.")
    }
  }

  const handleExportAll = async () => {
    setIsExporting(true)
    try {
      // Fetch everything (high limit) with current search/filter
      const response = await adminOrderService.getOrders({
        limit: 10000, 
        search: searchTerm,
        status: statusFilter === 'all' ? '' : statusFilter,
        sortBy: sortField,
        sortOrder: sortOrder
      })
      
      const rawRes = response.data?.data || response.data
      const allRecords = Array.isArray(rawRes) ? rawRes 
                       : (rawRes?.records ? rawRes.records 
                       : (rawRes ? [rawRes] : []))
      
      const processed = allRecords.map(b => {
        const routeParts = b.route?.split('→') || []
        return {
          id: b._id || b.orderId || b.id,
          company: b.customer?.name || b.company || 'Unknown',
          truckSize: b.truckType || b.truckSize || 'Standard',
          goodsType: b.goodsType || 'General Cargo',
          pickup: routeParts[0]?.trim() || b.pickup || 'N/A',
          delivery: routeParts[1]?.trim() || b.delivery || 'N/A',
          fleet: b.fleet || 'Direct Fleet',
          status: b.status || 'Pending',
          revenue: b.revenue,
          date: b.date || b.createdAt
        }
      })
      
      handleExportCSV(processed)
    } catch {
      showToast.error("Export Failed", "Could not fetch all records for download.")
    } finally {
      setIsExporting(false)
    }
  }

  const getStatusStyle = (status = '') => {
    switch (status.toLowerCase()) {
      case 'fulfilled': return 'bg-emerald-50 text-emerald-700 border-emerald-100 shadow-emerald-50'
      case 'unfulfilled': return 'bg-rose-50 text-rose-700 border-rose-100 shadow-rose-50'
      default: return 'bg-gray-50 text-gray-600 border-gray-100 shadow-gray-50'
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A'
    return new Date(dateString).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  // --- Handlers ---
  const handleViewOrder = (order) => { setSelectedOrder(order); setIsDetailsOpen(true); }
  const handleEditOrder = (order) => { setSelectedOrder(order); setIsFormOpen(true); }
  const handleCopyId = (id) => { navigator.clipboard.writeText(id); showToast.success('Copied', `ID ${id} copied to clipboard.`); }
  
  const handleDeleteOrder = async (id) => {
    if (window.confirm('Are you sure you want to delete this dispatch record?')) {
      try { await deleteOrder.mutateAsync(id); showToast.success('Deleted', 'Record removed.'); }
      catch { showToast.error('Error', 'Could not delete record.'); }
    }
  }

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedOrder) {
        await updateOrder.mutateAsync({ ...formData, id: selectedOrder.id })
      } else {
        await addOrder.mutateAsync(formData)
      }
      setIsFormOpen(false)
    } catch { 
      showToast.error('Action Failed', 'Could not save record.') 
    }
  }

  // --- Data Logic (Spec aligned & Robust) ---
  const rawResponse = ordersData?.data 
  const rawRecords = Array.isArray(rawResponse) ? rawResponse 
                   : (rawResponse?.records ? rawResponse.records 
                   : (rawResponse ? [rawResponse] : []))

  const filteredOrders = rawRecords.map(b => {
    // Handling route split e.g. "Lagos → Abuja"
    const routeParts = b.route?.split('→') || []
    return {
      id: b._id || b.orderId || b.id,
      company: b.customer?.name || b.company || 'Unknown',
      truckSize: b.truckType || b.truckSize || 'Standard',
      goodsType: b.goodsType || 'General Cargo',
      pickup: routeParts[0]?.trim() || b.pickup || 'N/A',
      delivery: routeParts[1]?.trim() || b.delivery || 'N/A',
      fleet: b.fleet || 'Direct Fleet',
      status: b.status || 'Pending',
      revenue: b.revenue, // Backend returns pre-formatted string like "₦1,128,000"
      date: b.date || b.createdAt,
      reason: b.reasonIfUnfulfilled || b.reason || '-'
    }
  })

  const totalPages = ordersData?.pagination?.totalPages || rawResponse?.pagination?.totalPages || 1
  const paginatedOrders = filteredOrders 

  return (
    <div className="pt-2 sm:pt-4 px-4 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      
      {/* Page Header */}
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-8 gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            Company Dispatch Log
          </h1>
          <p className="text-gray-500 font-medium text-xs mt-1.5">
            Enterprise-wide logistical overview for the last 4 months
          </p>
        </div>

        {/* Action Buttons moved here */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex items-center gap-3 w-full xl:w-auto">
          <button 
            onClick={() => { setSelectedOrder(null); setIsFormOpen(true); }}
            className="flex items-center justify-center gap-2 px-5 py-2 bg-gray-900 rounded-lg text-xs font-bold text-white hover:bg-gray-800 transition-all shadow-md shadow-gray-200/50 w-full sm:w-auto"
          >
            <Truck className="w-3.5 h-3.5" /> Add Dispatch
          </button>
          
          <button 
            onClick={() => refetch()}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm w-full sm:w-auto"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} /> Refresh
          </button>

          <button 
            onClick={handleExportAll}
            disabled={isExporting}
            className="sm:col-span-2 lg:col-span-1 flex items-center justify-center gap-2 px-5 py-2 bg-blue-600 rounded-lg text-xs font-bold text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100/50 w-full lg:w-auto disabled:opacity-50"
          >
            {isExporting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            {isExporting ? 'Preparing...' : 'Export Full CSV'}
          </button>
        </div>
      </div>

      {/* Search & Filter Card */}
      <div className="mb-8">
        <OrdersTableControls 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          sortField={sortField}
          setSortField={setSortField}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          isLoading={isLoading}
        />
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-[32px] shadow-2xl shadow-gray-200/40 border border-gray-100 overflow-hidden flex flex-col">
        


        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-200">
          <table className="w-full border-separate border-spacing-0 min-w-[1300px]">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Company Name</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 hidden md:table-cell">Truck Size</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 hidden lg:table-cell">Goods Type</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Pickup</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Delivery</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100 hidden xl:table-cell">Fleet</th>
                <th className="px-6 py-5 text-left text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Financials / Date</th>
                <th className="px-6 py-5 text-center text-[11px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">Actions</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-gray-50 relative">
              {isLoading ? (
                <tr>
                  <td colSpan="8" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center animate-pulse">
                        <RefreshCw className="w-6 h-6 text-blue-600 animate-spin" />
                      </div>
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">Loading Logistics Data...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedOrders.length > 0 ? (
                paginatedOrders.map((order) => (
                  <OrdersTableRow 
                    key={order.id}
                    order={order}
                    onView={handleViewOrder}
                    onEdit={handleEditOrder}
                    onDelete={handleDeleteOrder}
                    onCopyId={handleCopyId}
                    onExport={() => handleExportCSV([order], `dispatch_${order.id}_report.csv`)}
                    getStatusStyle={getStatusStyle}
                    formatDate={formatDate}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <AlertCircle className="w-10 h-10 text-gray-200" />
                      <p className="text-gray-400 text-xs font-bold uppercase tracking-widest leading-none">No dispatch records found</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
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
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 md:w-9 md:h-9 flex items-center justify-center rounded-lg md:rounded-xl text-[11px] md:text-xs font-bold transition-all ${
                      currentPage === i + 1 
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-200' 
                        : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
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
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
      />

      <OrderFormModal 
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedOrder}
        isLoading={addOrder.isPending || updateOrder.isPending}
      />
    </div>
  )
}
