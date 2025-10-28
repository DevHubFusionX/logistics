import { useState } from 'react'
import { PageHeader } from '../components/dashboard'
import { CheckCircle, XCircle, AlertTriangle, Download, RefreshCw, Search } from 'lucide-react'
import { useToast } from '../components/ui/advanced'

export default function Reconciliation() {
  const [dateRange, setDateRange] = useState('today')
  const [searchTerm, setSearchTerm] = useState('')
  const { showToast, ToastContainer } = useToast()

  const reconciliationData = [
    {
      bookingId: 'BK-1001',
      tripId: 'TR-5001',
      client: 'ABC Corporation',
      amount: 112.37,
      invoiceId: 'INV-2024-001',
      paymentId: 'PAY-8001',
      status: 'matched',
      date: '2024-01-15'
    },
    {
      bookingId: 'BK-1002',
      tripId: 'TR-5002',
      client: 'XYZ Logistics',
      amount: 245.80,
      invoiceId: 'INV-2024-002',
      paymentId: null,
      status: 'missing_payment',
      date: '2024-01-15'
    },
    {
      bookingId: 'BK-1003',
      tripId: null,
      client: 'Global Traders',
      amount: 189.50,
      invoiceId: 'INV-2024-003',
      paymentId: null,
      status: 'missing_trip',
      date: '2024-01-14'
    },
    {
      bookingId: 'BK-1004',
      tripId: 'TR-5004',
      client: 'Fast Delivery Co',
      amount: 320.00,
      invoiceId: 'INV-2024-004',
      paymentId: 'PAY-8004',
      status: 'amount_mismatch',
      date: '2024-01-14'
    }
  ]

  const filteredData = reconciliationData.filter(item =>
    item.bookingId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const matched = filteredData.filter(d => d.status === 'matched').length
  const mismatched = filteredData.filter(d => d.status !== 'matched').length

  const getStatusBadge = (status) => {
    const badges = {
      matched: { icon: CheckCircle, text: 'Matched', class: 'bg-green-100 text-green-700' },
      missing_payment: { icon: XCircle, text: 'Missing Payment', class: 'bg-red-100 text-red-700' },
      missing_trip: { icon: AlertTriangle, text: 'Missing Trip', class: 'bg-yellow-100 text-yellow-700' },
      amount_mismatch: { icon: AlertTriangle, text: 'Amount Mismatch', class: 'bg-orange-100 text-orange-700' }
    }
    const badge = badges[status]
    const Icon = badge.icon
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${badge.class}`}>
        <Icon className="w-3 h-3" />
        {badge.text}
      </span>
    )
  }

  const handleReconcile = () => {
    showToast.success('Reconciliation started', 'Processing records...')
  }

  const handleExport = () => {
    showToast.success('Report exported', 'reconciliation_report.xlsx')
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Financial Reconciliation"
        subtitle="Verify bookings → trips → payments match"
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Matched Records</p>
              <p className="text-3xl font-bold text-green-600">{matched}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-green-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl p-4 border border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Discrepancies</p>
              <p className="text-3xl font-bold text-red-600">{mismatched}</p>
            </div>
            <AlertTriangle className="w-10 h-10 text-red-500" />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Match Rate</p>
              <p className="text-3xl font-bold text-blue-600">{((matched / filteredData.length) * 100).toFixed(0)}%</p>
            </div>
            <CheckCircle className="w-10 h-10 text-blue-500" />
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
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
            />
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-gray-50"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button
            onClick={handleReconcile}
            className="flex items-center gap-2 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm"
          >
            <RefreshCw className="w-4 h-4" />
            Run Reconciliation
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 border-b">
          <h3 className="text-lg font-semibold text-gray-900">Reconciliation Records</h3>
          <p className="text-sm text-gray-600 mt-1">{filteredData.length} records found</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Booking ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Trip ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Client</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Payment</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-700 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.map((record) => (
                <tr key={record.bookingId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{record.bookingId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {record.tripId || <span className="text-red-500">Missing</span>}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">{record.client}</td>
                  <td className="px-6 py-4 text-sm font-semibold text-gray-900">₦{record.amount.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.invoiceId}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {record.paymentId || <span className="text-red-500">Missing</span>}
                  </td>
                  <td className="px-6 py-4">{getStatusBadge(record.status)}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ToastContainer />
    </div>
  )
}
