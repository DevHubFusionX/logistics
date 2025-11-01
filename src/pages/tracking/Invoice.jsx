import { Download, Printer, Mail, ArrowLeft, FileText } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'

export default function Invoice() {
  const navigate = useNavigate()

  const handlePrint = () => window.print()

  const invoiceData = {
    invoiceNumber: 'INV-2024-001',
    bookingId: 'BK-1001',
    date: '2024-01-15',
    dueDate: '2024-01-30',
    status: 'Paid',
    company: {
      name: 'ABC Corporation',
      address: '123 Business Ave, Lagos',
      email: 'billing@abccorp.com',
      phone: '+234 800 123 4567'
    },
    charges: [
      { description: 'Base Shipping Rate', quantity: '25 kg', rate: '₦2.50', amount: '₦62.50' },
      { description: 'Fuel Surcharge', quantity: '1', rate: '₦15.00', amount: '₦15.00' },
      { description: 'Insurance (2%)', quantity: '1', rate: '₦1.55', amount: '₦1.55' },
      { description: 'Handling Fee', quantity: '1', rate: '₦25.00', amount: '₦25.00' }
    ],
    subtotal: '₦104.05',
    tax: '₦8.32',
    total: '₦112.37'
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Invoice Details"
        subtitle="View and manage invoice information"
      />

      <div className="flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Back</span>
        </button>
        <div className="flex gap-3">
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            <span className="text-sm font-medium">Print</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download PDF</span>
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 bg-gradient-to-r from-blue-50 via-cyan-50 to-indigo-50 border-b">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-md">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Invoice {invoiceData.invoiceNumber}</h3>
              <p className="text-xs text-gray-600">Booking ID: {invoiceData.bookingId}</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">From:</h4>
              <div className="bg-gradient-to-br from-gray-50 to-blue-50 p-4 rounded-lg border border-gray-200">
                <p className="font-bold text-gray-900">Dara Logistics</p>
                <p className="text-sm text-gray-600 mt-1">500 Logistics Blvd</p>
                <p className="text-sm text-gray-600">Lagos, Nigeria</p>
                <p className="text-sm text-gray-600">+234 800 LOGISTICS</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-3">Bill To:</h4>
              <div className="bg-gradient-to-br from-gray-50 to-purple-50 p-4 rounded-lg border border-gray-200">
                <p className="font-bold text-gray-900">{invoiceData.company.name}</p>
                <p className="text-sm text-gray-600 mt-1">{invoiceData.company.address}</p>
                <p className="text-sm text-gray-600">{invoiceData.company.email}</p>
                <p className="text-sm text-gray-600">{invoiceData.company.phone}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-3 border border-blue-200">
              <div className="text-xs font-medium text-gray-600 mb-1">Invoice Date</div>
              <div className="text-lg font-bold text-gray-900">{invoiceData.date}</div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-3 border border-purple-200">
              <div className="text-xs font-medium text-gray-600 mb-1">Due Date</div>
              <div className="text-lg font-bold text-gray-900">{invoiceData.dueDate}</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-3 border border-green-200">
              <div className="text-xs font-medium text-gray-600 mb-1">Status</div>
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-800">
                {invoiceData.status}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg border border-gray-200 overflow-hidden mb-6">
            <table className="w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-100 to-gray-50 border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 text-sm">Description</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-900 text-sm">Qty</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Rate</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-900 text-sm">Amount</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {invoiceData.charges.map((charge, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-gray-900">{charge.description}</td>
                    <td className="py-3 px-4 text-center text-sm text-gray-600">{charge.quantity}</td>
                    <td className="py-3 px-4 text-right text-sm text-gray-600">{charge.rate}</td>
                    <td className="py-3 px-4 text-right text-sm font-semibold text-gray-900">{charge.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end">
            <div className="w-full lg:w-80 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold text-gray-900">{invoiceData.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">Tax (8%):</span>
                  <span className="font-semibold text-gray-900">{invoiceData.tax}</span>
                </div>
                <div className="border-t border-blue-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-xl text-blue-600">{invoiceData.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gradient-to-r from-gray-50 to-blue-50 border-t text-center">
          <p className="text-sm text-gray-700 font-medium mb-1">Thank you for choosing Dara Logistics!</p>
          <p className="text-xs text-gray-600">For questions, contact billing@daralogistics.com</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button className="flex items-center gap-2 px-6 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors bg-white">
          <Mail className="w-4 h-4" />
          <span className="text-sm font-medium">Email Invoice</span>
        </button>
      </div>
    </div>
  )
}
