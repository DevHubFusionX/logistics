
import { useState, useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { CreditCard, CheckCircle, Clock, Download, RefreshCw, AlertCircle, TrendingUp, Search, Calendar } from 'lucide-react'
import { usePaymentHistoryQuery } from '../../hooks/queries/usePaymentQueries'
import { TableSkeleton, StatCardSkeleton } from '../../components/common/SkeletonLoaders'

const DATE_RANGES = [
  { label: 'All Time', value: 'all' },
  { label: 'This Month', value: 'month' },
  { label: 'Last 3 Months', value: '3months' },
  { label: 'Last 6 Months', value: '6months' },
]

function isWithinRange(dateStr, range) {
  if (range === 'all') return true
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now - date
  const diffDays = diffMs / (1000 * 60 * 60 * 24)

  switch (range) {
    case 'month': return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()
    case '3months': return diffDays <= 90
    case '6months': return diffDays <= 180
    default: return true
  }
}

export default function PaymentHistory() {
  const { data: payments = [], isLoading, isError, refetch } = usePaymentHistoryQuery()
  const [dateRange, setDateRange] = useState('all')
  const [search, setSearch] = useState('')

  // Filter pipeline
  const filteredPayments = useMemo(() => {
    let result = payments

    // Date range
    result = result.filter(p => isWithinRange(p.date || p.createdAt, dateRange))

    // Search by reference, bookingId, or method
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        (p.reference || '').toLowerCase().includes(q) ||
        (p.bookingId || '').toLowerCase().includes(q) ||
        (p.method || '').toLowerCase().includes(q) ||
        (p.id || '').toLowerCase().includes(q)
      )
    }

    return result
  }, [payments, dateRange, search])

  const stats = useMemo(() => {
    return {
      success: filteredPayments.length,
      totalAmount: filteredPayments.reduce((sum, p) => sum + (p.amount || 0), 0),
      thisMonth: filteredPayments.filter(p => {
        const d = new Date(p.date || p.createdAt)
        const now = new Date()
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      }).length
    }
  }, [filteredPayments])

  if (isLoading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="Financial History" subtitle="Consolidated view of all completed transactions" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {Array.from({ length: 3 }).map((_, i) => <StatCardSkeleton key={i} />)}
        </div>
        <TableSkeleton rows={5} columns={7} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4 text-center">
        <AlertCircle className="w-12 h-12 text-red-500" />
        <h3 className="text-xl font-bold text-gray-900">Vault Access Interrupted</h3>
        <p className="text-gray-500 max-w-sm">We're having trouble retrieving your transaction history. Please verify your connection.</p>
        <button
          onClick={() => refetch()}
          className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-lg font-bold"
        >
          <RefreshCw className="w-4 h-4" /> Re-sync Records
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <div className="flex items-center justify-between">
        <PageHeader title="Financial History" subtitle="Consolidated view of all completed transactions" />
        <button
          onClick={() => refetch()}
          className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
          title="Refresh history"
        >
          <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-6 border border-green-100 shadow-sm overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform">
            <CheckCircle className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-green-500 rounded-2xl shadow-lg shadow-green-100">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-green-600">Confirmed</span>
          </div>
          <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.success}</p>
          <p className="text-xs font-bold text-green-700/60 mt-1 uppercase">Successful Transactions</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-100 shadow-sm overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform">
            <TrendingUp className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-100">
              <CreditCard className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Turnover</span>
          </div>
          <p className="text-4xl font-black text-gray-900 tracking-tight">
            ₦{stats.totalAmount.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </p>
          <p className="text-xs font-bold text-blue-700/60 mt-1 uppercase">
            {dateRange === 'all' ? 'All-time Spending' : `Filtered Spending`}
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-3xl p-6 border border-purple-100 shadow-sm overflow-hidden relative group">
          <div className="absolute -right-2 -bottom-2 opacity-5 scale-150 rotate-12 group-hover:rotate-0 transition-transform">
            <Clock className="w-24 h-24" />
          </div>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-purple-600 rounded-2xl shadow-lg shadow-purple-100">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Velocity</span>
          </div>
          <p className="text-4xl font-black text-gray-900 tracking-tight">{stats.thisMonth}</p>
          <p className="text-xs font-bold text-purple-700/60 mt-1 uppercase">Payments this Month</p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by reference ID, booking ID…"
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all bg-white"
          />
        </div>
        <div className="flex items-center gap-2 bg-white border border-gray-200 p-1 rounded-xl">
          <Calendar className="w-4 h-4 text-gray-400 ml-2" />
          {DATE_RANGES.map(r => (
            <button
              key={r.value}
              onClick={() => setDateRange(r.value)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${dateRange === r.value
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
                }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Transactional Ledger</h2>
          <div className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">
            {filteredPayments.length} Records
          </div>
        </div>

        {filteredPayments.length === 0 ? (
          <div className="p-24 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              {search.trim() || dateRange !== 'all' ? 'No Matching Records' : 'No Records Found'}
            </h3>
            <p className="text-gray-500 max-w-xs mx-auto font-medium">
              {search.trim() || dateRange !== 'all'
                ? 'Try adjusting your filters or search term.'
                : 'Your financial history is currently empty. Complete a booking to see records here.'
              }
            </p>
            {(search.trim() || dateRange !== 'all') && (
              <button
                onClick={() => { setSearch(''); setDateRange('all') }}
                className="mt-4 text-sm text-blue-600 font-semibold hover:underline"
              >
                Clear filters
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Timestamp</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Source Entity</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Reference ID</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Method</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Amount</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                  <th className="px-8 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredPayments.map((payment) => (
                  <tr key={payment.id || payment._id || payment.reference} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-bold text-gray-600">
                      {new Date(payment.date || payment.createdAt).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-xs font-black text-gray-400 uppercase tracking-tighter">
                      {payment.bookingId || 'DIRECT_SRC'}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap font-mono text-[10px] text-gray-500">
                      {payment.reference || payment.id?.slice(-12).toUpperCase()}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="px-3 py-1 bg-gray-100 rounded-lg text-[10px] font-black uppercase text-gray-600">{payment.method || 'GATEWAY'}</span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-sm font-black text-gray-900">
                      ₦{(payment.amount || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-full text-[10px] font-black uppercase tracking-widest">
                        <CheckCircle className="w-3 h-3" />
                        Valid
                      </span>
                    </td>
                    <td className="px-8 py-5 whitespace-nowrap text-center">
                      <button
                        onClick={() => {
                          // Generate simple receipt blob
                          const text = `DARA Logistics Receipt\n\nRef: ${payment.reference || payment.id}\nDate: ${new Date(payment.date || payment.createdAt).toLocaleDateString()}\nAmount: ₦${(payment.amount || 0).toLocaleString()}\nMethod: ${payment.method || 'Gateway'}\nBooking: ${payment.bookingId || 'N/A'}\nStatus: Successful\n`
                          const blob = new Blob([text], { type: 'text/plain' })
                          const url = URL.createObjectURL(blob)
                          const a = document.createElement('a')
                          a.href = url
                          a.download = `receipt-${payment.reference || payment.id || 'payment'}.txt`
                          a.click()
                          URL.revokeObjectURL(url)
                        }}
                        className="p-2 text-gray-300 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm"
                        title="Download receipt"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
