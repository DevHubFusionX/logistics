
import { useMemo } from 'react'
import { PageHeader } from '../../components/dashboard'
import { CreditCard, CheckCircle, Clock, Download, RefreshCw, AlertCircle, TrendingUp } from 'lucide-react'
import { usePaymentHistoryQuery } from '../../hooks/queries/usePaymentQueries'

export default function PaymentHistory() {
  const { data: payments = [], isLoading, isError, refetch } = usePaymentHistoryQuery()

  const stats = useMemo(() => {
    return {
      success: payments.length,
      totalAmount: payments.reduce((sum, p) => sum + (p.amount || 0), 0),
      thisMonth: payments.filter(p => {
        const d = new Date(p.date || p.createdAt)
        const now = new Date()
        return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
      }).length
    }
  }, [payments])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p className="text-gray-500 animate-pulse font-medium">Securing financial records...</p>
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
          <p className="text-xs font-bold text-blue-700/60 mt-1 uppercase">All-time Spending</p>
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

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
        <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gray-50/30">
          <h2 className="text-xl font-black text-gray-900 tracking-tight">Transactional Ledger</h2>
          <div className="px-4 py-1.5 bg-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-gray-500">Live Data Sync</div>
        </div>

        {payments.length === 0 ? (
          <div className="p-24 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <CreditCard className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 mb-2">No Records Found</h3>
            <p className="text-gray-500 max-w-xs mx-auto font-medium">Your financial history is currently empty. Complete a booking to see records here.</p>
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
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Valor</th>
                  <th className="px-8 py-4 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Status</th>
                  <th className="px-8 py-4 text-center text-[10px] font-black text-gray-400 uppercase tracking-widest border-b border-gray-100">Audit</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {payments.map((payment) => (
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
                      <button className="p-2 text-gray-300 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm">
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
