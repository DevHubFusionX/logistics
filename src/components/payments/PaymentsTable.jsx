import { Download, Eye, DollarSign } from 'lucide-react'

export default function PaymentsTable({ data, onDownloadReceipt, onViewInvoice }) {
  const getStatusBadge = (status) => {
    const styles = {
      paid: 'bg-green-100 text-green-700',
      pending: 'bg-yellow-100 text-yellow-700',
      overdue: 'bg-red-100 text-red-700'
    }
    return `px-3 py-1 rounded-full text-xs font-semibold uppercase ${styles[status]}`
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Trip ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Client</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Amount</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Payment Date</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Invoice ID</th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {data.map((payment) => (
            <tr key={payment.id} className="hover:bg-green-50 transition-colors">
              <td className="px-6 py-4 text-sm font-semibold text-gray-900">{payment.tripId}</td>
              <td className="px-6 py-4 text-sm text-gray-600">{payment.client}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-gray-900">
                    ₦{payment.amount.toLocaleString()}
                  </span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={getStatusBadge(payment.status)}>
                  {payment.status}
                </span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">
                {payment.paymentDate || '—'}
              </td>
              <td className="px-6 py-4 text-sm text-gray-600">{payment.invoiceId}</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onViewInvoice(payment)}
                    className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                    title="View Invoice"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  {payment.status === 'paid' && (
                    <button
                      onClick={() => onDownloadReceipt(payment)}
                      className="p-1.5 text-green-600 hover:bg-green-50 rounded transition-colors"
                      title="Download Receipt"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
