import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { MetricCard, useToast } from '../components/ui/advanced'
import { useLogisticsShortcuts } from '../hooks/useKeyboardShortcuts'
import { CreditCard, DollarSign, AlertCircle, TrendingUp, Download, Search, FileText } from 'lucide-react'
import PaymentsTable from '../components/payments/PaymentsTable'
import RevenueChart from '../components/payments/RevenueChart'
import OutstandingPayments from '../components/payments/OutstandingPayments'
import { paymentsData, revenueData } from '../components/payments/paymentsData'

export default function Payments() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const { showToast, ToastContainer } = useToast()

  useLogisticsShortcuts({
    onSearch: () => document.querySelector('input[type="search"]')?.focus(),
    onRefresh: () => window.location.reload()
  })

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.tripId.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || payment.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const totalPending = paymentsData.filter(p => p.status === 'pending' || p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)
  const overdueCount = paymentsData.filter(p => p.status === 'overdue').length

  const handleDownloadReceipt = (payment) => {
    showToast.success('Receipt downloaded', `${payment.invoiceId}.pdf`)
  }

  const handleViewInvoice = (payment) => {
    showToast.info('Opening invoice', payment.invoiceId)
  }

  const handleSendReminder = (payment) => {
    showToast.success('Reminder sent', `Email sent to ${payment.client}`)
  }

  const handleExport = () => {
    showToast.success('Report exported', 'payments_report.xlsx')
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Payments & Invoicing"
        subtitle="Financial management, revenue tracking, and invoice processing"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Today's Revenue"
          value={(revenueData.today / 1000).toFixed(0)}
          unit="K"
          icon={DollarSign}
          color="green"
          sparklineData={[280, 320, 290, 310, 345, 345, 345]}
        />
        <MetricCard
          title="This Week"
          value={(revenueData.week / 1000000).toFixed(2)}
          unit="M"
          icon={TrendingUp}
          color="blue"
          sparklineData={[1.6, 1.7, 1.75, 1.8, 1.82, 1.84, 1.85]}
        />
        <MetricCard
          title="Outstanding"
          value={(totalPending / 1000).toFixed(0)}
          unit="K"
          icon={AlertCircle}
          color="orange"
          sparklineData={[180, 170, 165, 160, 160, 160, 160]}
        />
        <MetricCard
          title="Overdue Payments"
          value={overdueCount}
          icon={CreditCard}
          color="red"
          sparklineData={[2, 2, 1, 1, 1, 1, 1]}
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
        <div className="flex flex-wrap gap-3">
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="search"
              placeholder="Search by client or trip ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <FileText className="w-5 h-5 text-green-600" />
            Payment Transactions
          </h2>
          <p className="text-sm text-gray-600 mt-1">{filteredPayments.length} transactions found</p>
        </div>
        <PaymentsTable
          data={filteredPayments}
          onDownloadReceipt={handleDownloadReceipt}
          onViewInvoice={handleViewInvoice}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart data={revenueData.daily} />
        <OutstandingPayments payments={paymentsData} onSendReminder={handleSendReminder} />
      </div>

      <ToastContainer />
    </div>
  )
}
