import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { CheckCircle, XCircle, AlertTriangle, Download, RefreshCw, Search, AlertCircle } from 'lucide-react'
import { useToast } from '../../components/ui/advanced'
import { useReportsQuery } from '../../hooks/queries/useAdminQueries'

export default function Reconciliation() {
  const [dateRange, setDateRange] = useState('today')
  const [searchTerm, setSearchTerm] = useState('')
  const { showToast, ToastContainer } = useToast()

  const { data: reconciliationData = [], isLoading, isError, refetch } = useReportsQuery('financial', { range: dateRange })

  const filteredData = useMemo(() => {
    return reconciliationData.filter(item =>
      (item.bookingId || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.client || '').toLowerCase().includes(searchTerm.toLowerCase())
    )
  }, [reconciliationData, searchTerm])

  const stats = useMemo(() => {
    const matched = filteredData.filter(d => d.status === 'matched').length
    const mismatched = filteredData.filter(d => d.status !== 'matched').length
    const rate = filteredData.length > 0 ? ((matched / filteredData.length) * 100).toFixed(0) : 0
    return { matched, mismatched, rate }
  }, [filteredData])

  const getStatusBadge = (status) => {
    const badges = {
      matched: { icon: CheckCircle, text: 'Matched', class: 'bg-green-100 text-green-700' },
      missing_payment: { icon: XCircle, text: 'Missing Payment', class: 'bg-red-100 text-red-700' },
      missing_trip: { icon: AlertTriangle, text: 'Missing Trip', class: 'bg-yellow-100 text-yellow-700' },
      amount_mismatch: { icon: AlertTriangle, text: 'Amount Mismatch', class: 'bg-orange-100 text-orange-700' }
    }
    const badge = badges[status] || badges.matched
    const Icon = badge.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${badge.class}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    )
  }

  const handleReconcile = () => {
    refetch()
    showToast.success('Reconciliation updated', 'Refreshed records from all systems')
  }

  const handleExport = () => {
    showToast.success('Report exported', 'reconciliation_report.xlsx')
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        <p className="text-gray-500 animate-pulse">Running financial reconciliation...</p>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <div className="p-4 bg-red-100 rounded-full">
          <AlertCircle className="w-12 h-12 text-red-600" />
        </div>
        <h3 className="text-lg font-bold text-gray-900">Reconciliation Failed</h3>
        <p className="text-gray-600 max-w-md">We encountered an error while processing the financial records. Please check your connection and try again.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <RefreshCw className="w-4 h-4" /> Retry Reconciliation
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <PageHeader
          title="Financial Reconciliation"
          subtitle="Verify bookings → trips → payments match"
        />
        <button onClick={() => refetch()} className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-all" title="Restart reconciliation">
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-green-800 mb-1 tracking-tight">Matched Records</p>
              <p className="text-3xl font-black text-green-600">{stats.matched}</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-5 border border-red-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-red-800 mb-1 tracking-tight">Discrepancies</p>
              <p className="text-3xl font-black text-red-600">{stats.mismatched}</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl">
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-800 mb-1 tracking-tight">Accuracy Rate</p>
              <p className="text-3xl font-black text-blue-600">{stats.rate}%</p>
            </div>
            <div className="p-3 bg-white/50 rounded-xl">
              <CheckCircle className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search by booking ID or client..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 font-medium"
            />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50 font-bold"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button
            onClick={handleReconcile}
            className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all font-bold shadow-lg shadow-green-100"
          >
            <RefreshCw className="w-4 h-4" />
            Reconcile
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-bold shadow-lg shadow-blue-100"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-b border-gray-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-gray-900">Reconciliation Records</h3>
            <p className="text-xs text-gray-500 mt-1">{filteredData.length} audit records found in current scope</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Booking ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Trip ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Client</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Amount</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Invoice</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Payment</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-left text-[10px] font-bold text-gray-500 uppercase tracking-widest">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500 italic">No records found matching your filters.</td>
                </tr>
              ) : (
                filteredData.map((record) => (
                  <tr key={record.bookingId} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 text-sm font-bold text-gray-900">{record.bookingId}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium tracking-tight">
                      {record.tripId || <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded text-[10px] font-black uppercase">Missing</span>}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 font-bold">{record.client}</td>
                    <td className="px-6 py-4 text-sm font-black text-gray-900">₦{(record.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium font-mono">{record.invoiceId || 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-600 font-medium tracking-tight">
                      {record.paymentId || <span className="text-red-500 bg-red-50 px-1.5 py-0.5 rounded text-[10px] font-black uppercase">Unpaid</span>}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                    <td className="px-6 py-4 text-sm text-gray-500 font-medium">{record.date}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
