import { motion } from 'framer-motion'
import { Download, Printer, Mail, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function Invoice() {
  const navigate = useNavigate()

  const invoiceData = {
    invoiceNumber: 'INV-2024-001',
    bookingId: 'DL-1001',
    date: '2024-01-15',
    dueDate: '2024-01-30',
    status: 'Paid',
    company: {
      name: 'ABC Corporation',
      address: '123 Business Ave\nNew York, NY 10001',
      email: 'billing@abccorp.com',
      phone: '+1 (555) 123-4567'
    },
    shipment: {
      from: 'New York, NY 10001',
      to: 'Los Angeles, CA 90210',
      service: 'Ground Transport',
      weight: '25 kg',
      dimensions: '50 x 40 x 30 cm',
      pickupDate: '2024-01-13',
      deliveryDate: '2024-01-15'
    },
    charges: [
      { description: 'Base Shipping Rate', quantity: '25 kg', rate: '$2.50', amount: '$62.50' },
      { description: 'Fuel Surcharge', quantity: '1', rate: '$15.00', amount: '$15.00' },
      { description: 'Insurance (2%)', quantity: '1', rate: '$1.55', amount: '$1.55' },
      { description: 'Handling Fee', quantity: '1', rate: '$25.00', amount: '$25.00' }
    ],
    subtotal: '$104.05',
    tax: '$8.32',
    total: '$112.37'
  }

  const handleDownload = () => {
    // Simulate PDF download
    const link = document.createElement('a')
    link.href = '#'
    link.download = `invoice-${invoiceData.invoiceNumber}.pdf`
    link.click()
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header Actions */}
        <motion.div
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </button>

          <div className="flex gap-3">
            <motion.button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Printer className="w-4 h-4" />
              Print
            </motion.button>

            <motion.button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download className="w-4 h-4" />
              Download PDF
            </motion.button>
          </div>
        </motion.div>

        {/* Invoice */}
        <motion.div
          className="bg-white rounded-2xl shadow-lg p-8 print:shadow-none print:rounded-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-xl">D</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Dara Logistics</h1>
                  <p className="text-gray-600">Global Shipping Solutions</p>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <p>500 Logistics Blvd</p>
                <p>New York, NY 10001</p>
                <p>+1 (800) Dara-LOG</p>
                <p>billing@Daralogistics.com</p>
              </div>
            </div>

            <div className="text-right">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">INVOICE</h2>
              <div className="space-y-1 text-sm">
                <p><span className="font-semibold">Invoice #:</span> {invoiceData.invoiceNumber}</p>
                <p><span className="font-semibold">Booking ID:</span> {invoiceData.bookingId}</p>
                <p><span className="font-semibold">Date:</span> {invoiceData.date}</p>
                <p><span className="font-semibold">Due Date:</span> {invoiceData.dueDate}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${invoiceData.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {invoiceData.status}
                </span>
              </div>
            </div>
          </div>

          {/* Bill To */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Bill To:</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="font-semibold text-gray-900">{invoiceData.company.name}</p>
              <div className="text-gray-600 text-sm mt-1">
                {invoiceData.company.address.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
                <p className="mt-2">{invoiceData.company.email}</p>
                <p>{invoiceData.company.phone}</p>
              </div>
            </div>
          </div>

          {/* Shipment Details */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Shipment Details:</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">From:</span> {invoiceData.shipment.from}</p>
                <p><span className="font-semibold">To:</span> {invoiceData.shipment.to}</p>
                <p><span className="font-semibold">Service:</span> {invoiceData.shipment.service}</p>
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="font-semibold">Weight:</span> {invoiceData.shipment.weight}</p>
                <p><span className="font-semibold">Dimensions:</span> {invoiceData.shipment.dimensions}</p>
                <p><span className="font-semibold">Pickup:</span> {invoiceData.shipment.pickupDate}</p>
                <p><span className="font-semibold">Delivery:</span> {invoiceData.shipment.deliveryDate}</p>
              </div>
            </div>
          </div>

          {/* Charges Table */}
          <div className="mb-8">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 font-semibold text-gray-900">Description</th>
                  <th className="text-center py-3 font-semibold text-gray-900">Qty</th>
                  <th className="text-right py-3 font-semibold text-gray-900">Rate</th>
                  <th className="text-right py-3 font-semibold text-gray-900">Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.charges.map((charge, index) => (
                  <tr key={index} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{charge.description}</td>
                    <td className="py-3 text-center text-gray-700">{charge.quantity}</td>
                    <td className="py-3 text-right text-gray-700">{charge.rate}</td>
                    <td className="py-3 text-right font-semibold text-gray-900">{charge.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end mb-8">
            <div className="w-64">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-700">Subtotal:</span>
                  <span className="font-semibold">{invoiceData.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-700">Tax (8%):</span>
                  <span className="font-semibold">{invoiceData.tax}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between text-lg">
                    <span className="font-bold text-gray-900">Total:</span>
                    <span className="font-bold text-sky-600">{invoiceData.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t pt-6 text-center text-sm text-gray-600">
            <p className="mb-2">Thank you for choosing Dara Logistics!</p>
            <p>For questions about this invoice, contact us at billing@Daralogistics.com or +1 (800) Dara-LOG</p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          className="mt-8 text-center print:hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <button className="flex items-center gap-2 mx-auto px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
            <Mail className="w-4 h-4" />
            Email Invoice
          </button>
        </motion.div>
      </div>
    </div>
  )
}