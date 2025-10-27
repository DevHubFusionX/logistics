import { CreditCard, Download, Calendar } from 'lucide-react'

const paymentMethods = [
  { id: 1, type: 'Visa', last4: '4242', expiry: '12/25', isDefault: true },
  { id: 2, type: 'Mastercard', last4: '8888', expiry: '09/24', isDefault: false }
]

const invoices = [
  { id: 'INV-001', date: '2024-01-15', amount: '₦125,000', status: 'Paid' },
  { id: 'INV-002', date: '2024-01-01', amount: '₦98,500', status: 'Paid' },
  { id: 'INV-003', date: '2023-12-15', amount: '₦156,000', status: 'Paid' }
]

export default function BillingSection() {
  return (
    <div className="space-y-6">
      {/* Payment Methods */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <CreditCard className="w-5 h-5 text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
          </div>
          <button className="px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            Add New
          </button>
        </div>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{method.type} •••• {method.last4}</p>
                  <p className="text-sm text-gray-600">Expires {method.expiry}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {method.isDefault && (
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Default</span>
                )}
                <button className="text-sm text-gray-600 hover:text-gray-900">Edit</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Billing History</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Invoice</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-900">Status</th>
                <th className="text-right py-3 px-4 text-sm font-semibold text-gray-900">Action</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{invoice.id}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">{invoice.date}</td>
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">{invoice.amount}</td>
                  <td className="py-3 px-4">
                    <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 ml-auto">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
