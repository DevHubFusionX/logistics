import React, { useState, useMemo } from 'react'
import {
  ChevronLeft, ChevronRight, RefreshCw,
  Download, Truck, Plus, Search, X,
  CheckCircle, AlertCircle, Package, DollarSign
} from 'lucide-react'
import { useToast } from '../../components/ui'
import { useOrdersTableQuery, useOrderMutations } from '../../hooks/queries/useOrderQueries'
import adminOrderService from '../../services/adminOrderService'
import { useAuth } from '@/features/auth'
import OrderDetailsModal from '../../features/admin/components/admin/OrderDetailsModal'
import OrderFormModal from '../../features/admin/components/admin/OrderFormModal'
import OrdersTableRow from '../../features/admin/components/admin/orders/OrdersTableRow'

function StatCard({ icon: Icon, label, value, color }) {
  const cfg = {
    sky:     { bg: 'bg-sky-50',     icon: 'bg-sky-100 text-sky-700',     val: 'text-sky-700'     },
    emerald: { bg: 'bg-emerald-50', icon: 'bg-emerald-100 text-emerald-700', val: 'text-emerald-700' },
    amber:   { bg: 'bg-amber-50',   icon: 'bg-amber-100 text-amber-700', val: 'text-amber-700'   },
    red:     { bg: 'bg-red-50',     icon: 'bg-red-100 text-red-600',     val: 'text-red-600'     },
  }[color]
  return (
    <div className={`${cfg.bg} rounded-2xl p-4 flex items-center gap-4`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.icon}`}>
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <p className={`text-2xl font-heading font-black leading-none ${cfg.val}`}>{value}</p>
        <p className="text-xs text-gray-500 font-medium mt-1">{label}</p>
      </div>
    </div>
  )
}

const STATUS_FILTERS = ['all', 'Fulfilled', 'Unfulfilled']

export default function OrdersTable() {
  const [searchTerm, setSearchTerm]     = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage]   = useState(1)
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const [isFormOpen, setIsFormOpen]       = useState(false)
  const [isExporting, setIsExporting]     = useState(false)
  const [sortField, setSortField]         = useState('date')
  const [sortOrder, setSortOrder]         = useState('desc')

  const itemsPerPage = 10
  const { showToast } = useToast()
  const { user } = useAuth()
  const { addOrder, updateOrder, deleteOrder } = useOrderMutations()

  const { data: ordersData, isLoading, refetch } = useOrdersTableQuery({
    page: currentPage, limit: itemsPerPage,
    search: searchTerm,
    status: statusFilter === 'all' ? '' : statusFilter,
    sortBy: sortField, sortOrder
  })

  const formatDate = (d) => {
    if (!d) return 'N/A'
    return new Date(d).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
  }

  const handleExportCSV = (data, filename = `orders_${new Date().toISOString().split('T')[0]}.csv`) => {
    if (!data?.length) { showToast.error('Export Failed', 'No data to export.'); return }
    const headers = ['Order ID', 'Date', 'Company', 'Truck', 'Goods', 'Pickup', 'Delivery', 'Fleet', 'Status', 'Revenue']
    const rows = [headers.join(','), ...data.map(o =>
      [`"${o.id}"`, `"${formatDate(o.date)}"`, `"${o.company}"`, `"${o.truckSize}"`, `"${o.goodsType}"`,
       `"${o.pickup}"`, `"${o.delivery}"`, `"${o.fleet}"`, `"${o.status}"`, o.revenue].join(',')
    )]
    try {
      const blob = new Blob([rows.join('\n')], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast.success('Exported', `${data.length} records downloaded.`)
    } catch { showToast.error('Export Error', 'Failed to generate CSV.') }
  }

  const handleExportAll = async () => {
    setIsExporting(true)
    try {
      const res = await adminOrderService.getOrders({ limit: 10000, search: searchTerm, status: statusFilter === 'all' ? '' : statusFilter, sortBy: sortField, sortOrder })
      const raw = res.data?.data || res.data
      const records = Array.isArray(raw) ? raw : (raw?.records || [])
      const processed = records.map(b => ({
        id: b._id || b.orderId || b.id,
        company: b.customer?.name || b.company || 'Unknown',
        truckSize: b.truckType || b.truckSize || 'Standard',
        goodsType: b.goodsType || 'General Cargo',
        pickup: b.route?.split('→')[0]?.trim() || b.pickup || 'N/A',
        delivery: b.route?.split('→')[1]?.trim() || b.delivery || 'N/A',
        fleet: b.fleet || 'Direct Fleet',
        status: b.status || 'Pending',
        revenue: b.revenue,
        date: b.date || b.createdAt
      }))
      handleExportCSV(processed)
    } catch { showToast.error('Export Failed', 'Could not fetch records.') }
    finally { setIsExporting(false) }
  }

  const rawResponse = ordersData?.data
  const rawRecords  = Array.isArray(rawResponse) ? rawResponse : (rawResponse?.records || (rawResponse ? [rawResponse] : []))

  const orders = rawRecords.map(b => ({
    id:        b._id || b.orderId || b.id,
    company:   b.customer?.name || b.company || 'Unknown',
    truckSize: b.truckType || b.truckSize || 'Standard',
    goodsType: b.goodsType || 'General Cargo',
    pickup:    b.route?.split('→')[0]?.trim() || b.pickup || 'N/A',
    delivery:  b.route?.split('→')[1]?.trim() || b.delivery || 'N/A',
    fleet:     b.fleet || 'Direct Fleet',
    status:    b.status || 'Pending',
    revenue:   b.revenue,
    date:      b.date || b.createdAt,
    reason:    b.reasonIfUnfulfilled || b.reason || '-'
  }))

  const totalPages   = ordersData?.pagination?.totalPages   || rawResponse?.pagination?.totalPages   || 1
  const totalRecords = ordersData?.pagination?.totalRecords || rawResponse?.pagination?.totalRecords || orders.length
  const startIdx     = (currentPage - 1) * itemsPerPage + 1
  const endIdx       = Math.min(currentPage * itemsPerPage, totalRecords)

  const fulfilled   = orders.filter(o => o.status === 'Fulfilled').length
  const unfulfilled = orders.filter(o => o.status === 'Unfulfilled').length
  const totalRev    = orders.reduce((s, o) => {
    const n = typeof o.revenue === 'number' ? o.revenue : parseFloat(String(o.revenue || '').replace(/[^0-9.]/g, '')) || 0
    return s + n
  }, 0)

  const getPageNumbers = () => {
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) pages.push(i)
      else if (pages[pages.length - 1] !== '...') pages.push('...')
    }
    return pages
  }

  return (
    <div className="h-full flex flex-col overflow-y-auto bg-gray-50/50">
      <div className="px-4 sm:px-6 py-6 space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="font-heading font-bold text-xl text-gray-900">Orders List</h1>
            <p className="text-xs text-gray-400 mt-0.5">Company dispatch log and order management</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => refetch()}
              className="w-9 h-9 flex items-center justify-center border border-gray-200 bg-white rounded-xl text-gray-500 hover:bg-gray-50 transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <button
              onClick={handleExportAll}
              disabled={isExporting}
              className="flex items-center gap-2 px-4 py-2 border border-gray-200 bg-white rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              {isExporting ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              <span className="hidden sm:inline">{isExporting ? 'Exporting…' : 'Export CSV'}</span>
            </button>
            {!['Admin Manager', 'manager'].includes(user?.role) && (
              <button
                onClick={() => { setSelectedOrder(null); setIsFormOpen(true) }}
                className="flex items-center gap-2 px-4 py-2 bg-sky-700 hover:bg-sky-600 text-white rounded-xl text-sm font-semibold transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add dispatch</span>
              </button>
            )}
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          <StatCard icon={Package}      label="Total orders"  value={totalRecords} color="sky"     />
          <StatCard icon={CheckCircle}  label="Fulfilled"     value={fulfilled}    color="emerald" />
          <StatCard icon={AlertCircle}  label="Unfulfilled"   value={unfulfilled}  color="red"     />
          <StatCard icon={DollarSign}   label="Total revenue" value={`₦${(totalRev/1000000).toFixed(1)}M`} color="amber" />
        </div>

        {/* Search + filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={e => { setSearchTerm(e.target.value); setCurrentPage(1) }}
              placeholder="Search company, goods, location…"
              className="w-full pl-10 pr-9 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-100 outline-none transition-all"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-xl p-1">
            {STATUS_FILTERS.map(s => (
              <button
                key={s}
                onClick={() => { setStatusFilter(s); setCurrentPage(1) }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all capitalize ${
                  statusFilter === s ? 'bg-sky-700 text-white' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {s === 'all' ? 'All' : s}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-100">
                  {['Company', 'Truck', 'Goods', 'Route', 'Fleet', 'Revenue / Date', 'Status', ''].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-[11px] font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {isLoading ? (
                  Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i}>
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="px-5 py-4">
                          <div className="h-3.5 bg-gray-100 rounded animate-pulse" />
                        </td>
                      ))}
                    </tr>
                  ))
                ) : orders.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-14 text-center">
                      <Package className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-400">No orders found</p>
                      {searchTerm && (
                        <button onClick={() => setSearchTerm('')} className="mt-2 text-xs text-sky-700 font-semibold hover:underline">
                          Clear search
                        </button>
                      )}
                    </td>
                  </tr>
                ) : orders.map(order => (
                  <OrdersTableRow
                    key={order.id}
                    order={order}
                    onView={o => { setSelectedOrder(o); setIsDetailsOpen(true) }}
                    onEdit={o => { setSelectedOrder(o); setIsFormOpen(true) }}
                    onDelete={async id => {
                      if (!window.confirm('Delete this dispatch record?')) return
                      try { await deleteOrder.mutateAsync(id); showToast.success('Deleted', 'Record removed.') }
                      catch { showToast.error('Error', 'Could not delete record.') }
                    }}
                    onCopyId={id => { navigator.clipboard.writeText(id); showToast.success('Copied', `ID copied.`) }}
                    onExport={() => handleExportCSV([order], `order_${order.id}.csv`)}
                    formatDate={formatDate}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-400">
              Showing <span className="font-semibold text-gray-700">{startIdx}–{endIdx}</span> of <span className="font-semibold text-gray-700">{totalRecords}</span>
            </p>
            {totalPages > 1 && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                {getPageNumbers().map((p, i) => (
                  <React.Fragment key={i}>
                    {p === '...' ? (
                      <span className="px-1 text-gray-400 text-xs">…</span>
                    ) : (
                      <button
                        onClick={() => setCurrentPage(p)}
                        className={`w-7 h-7 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors ${
                          currentPage === p ? 'bg-sky-700 text-white' : 'border border-gray-200 text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        {p}
                      </button>
                    )}
                  </React.Fragment>
                ))}
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="w-7 h-7 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <OrderDetailsModal order={selectedOrder} isOpen={isDetailsOpen} onClose={() => setIsDetailsOpen(false)} />
      <OrderFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSubmit={async (data) => {
          try {
            if (selectedOrder) await updateOrder.mutateAsync({ ...data, id: selectedOrder.id })
            else await addOrder.mutateAsync(data)
            setIsFormOpen(false)
            showToast.success('Saved', selectedOrder ? 'Order updated.' : 'Order created.')
          } catch { showToast.error('Failed', 'Could not save order.') }
        }}
        initialData={selectedOrder}
        isLoading={addOrder.isPending || updateOrder.isPending}
      />
    </div>
  )
}
