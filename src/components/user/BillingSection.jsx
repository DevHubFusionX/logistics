import { useMemo } from 'react'
import { CreditCard, Download, Calendar, RefreshCw, AlertCircle, ShieldCheck, Plus, ExternalLink } from 'lucide-react'
import { usePaymentHistoryQuery, useInitializePaymentMutation } from '../../hooks/queries/usePaymentQueries'

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true, brandColor: 'from-blue-600 to-blue-800' },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/24', isDefault: false, brandColor: 'from-orange-500 to-rose-600' }
]

export default function BillingSection() {
  const { data: payments = [], isLoading, isError, refetch } = usePaymentHistoryQuery()
  const initializePayment = useInitializePaymentMutation()

  const invoices = useMemo(() => {
    return payments.map(p => ({
      id: p.reference || `INV-${p.id?.slice(-6).toUpperCase() || Math.random().toString(36).substr(2, 6).toUpperCase()}`,
      date: new Date(p.date || p.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }),
      amount: `₦${(p.amount || 0).toLocaleString()}`,
      status: 'Paid'
    }))
  }, [payments])

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12">
        <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mb-3" />
        <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Auditing Balances...</p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-100">
      {/* Payment Methods Section */}
      <div className="p-6 lg:p-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-blue-600" />
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Authorized Fiscal Instruments</span>
          </div>
          <button className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-blue-600 transition-all font-black text-[10px] uppercase tracking-widest shadow-lg shadow-gray-200 active:scale-95">
            <Plus className="w-3.5 h-3.5" /> Add Vault Entry
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="group relative overflow-hidden flex flex-col p-6 bg-gray-50/50 hover:bg-white border border-transparent hover:border-gray-100 rounded-3xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gray-100/50 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-blue-50 transition-colors" />

              <div className="relative z-10">
                <div className="flex items-start justify-between mb-8">
                  <div className={`w-12 h-8 bg-gradient-to-br ${method.brandColor} rounded-lg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                    <CreditCard className="w-5 h-5 text-white" />
                  </div>
                  {method.isDefault && (
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white text-blue-600 border border-blue-50 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm">
                      <ShieldCheck className="w-3 h-3" /> Default
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <p className="text-base font-black text-gray-900 tracking-tight">{method.type} ••• {method.last4}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Expires {method.expiry}</p>
                </div>

                <div className="flex items-center gap-4 mt-6">
                  <button className="text-[10px] font-black text-gray-900 uppercase tracking-widest py-1 border-b-2 border-transparent hover:border-blue-600 transition-all">Configure</button>
                  <button className="text-[10px] font-black text-rose-500 uppercase tracking-widest py-1 border-b-2 border-transparent hover:border-rose-100 transition-all">Revoke</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing Ledger Section */}
      <div className="p-6 lg:p-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-purple-600" />
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Archived Statement Ledger</span>
          </div>
          <button
            onClick={() => refetch()}
            className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-xl transition-all border border-gray-100/50"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </button>
        </div>

        {isError ? (
          <div className="p-8 lg:p-12 text-center bg-rose-50/50 rounded-3xl border border-rose-100">
            <AlertCircle className="w-10 h-10 text-rose-500 mx-auto mb-4" />
            <h4 className="text-lg font-black text-gray-900 mb-2 tracking-tight">Telemetry Interruption</h4>
            <p className="text-xs text-gray-500 max-w-xs mx-auto mb-6 leading-relaxed">Failed to connect to ledger vault.</p>
            <button onClick={() => refetch()} className="px-6 py-2.5 bg-rose-600 text-white rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-rose-100">Re-sync Ledger</button>
          </div>
        ) : invoices.length === 0 ? (
          <div className="p-12 lg:p-16 text-center bg-gray-50/50 rounded-3xl border border-dashed border-gray-200">
            <div className="w-16 h-16 bg-white rounded-[1.5rem] flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Calendar className="w-8 h-8 text-gray-200" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Dormant Account</h4>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">No transactions detected</p>
          </div>
        ) : (
          <div className="bg-white rounded-3xl lg:rounded-[1.8rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto min-w-full no-scrollbar">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="py-4 lg:py-5 px-4 lg:px-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Certificate ID</th>
                    <th className="py-4 lg:py-5 px-4 lg:px-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Date</th>
                    <th className="py-4 lg:py-5 px-4 lg:px-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Amount</th>
                    <th className="py-4 lg:py-5 px-4 lg:px-6 text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Audit State</th>
                    <th className="py-4 lg:py-5 px-4 lg:px-6 text-right text-[9px] font-black text-gray-400 uppercase tracking-[0.15em]">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {invoices.map((invoice) => (
                    <tr key={invoice.id} className="hover:bg-blue-50/30 transition-colors duration-200 cursor-default group">
                      <td className="py-4 lg:py-5 px-4 lg:px-6">
                        <span className="text-xs lg:text-sm font-black text-gray-900 group-hover:text-blue-600 transition-colors uppercase tracking-tight">{invoice.id}</span>
                      </td>
                      <td className="py-4 lg:py-5 px-4 lg:px-6">
                        <span className="text-[10px] lg:text-[11px] font-bold text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded-md">{invoice.date}</span>
                      </td>
                      <td className="py-4 lg:py-5 px-4 lg:px-6">
                        <span className="text-xs lg:text-sm font-black text-gray-900 group-hover:scale-105 inline-block transition-transform">{invoice.amount}</span>
                      </td>
                      <td className="py-4 lg:py-5 px-4 lg:px-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[9px] font-black uppercase tracking-widest border border-emerald-100">
                          Paid
                        </span>
                      </td>
                      <td className="py-4 lg:py-5 px-4 lg:px-6 text-right">
                        <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-blue-100">
                          <Download className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
