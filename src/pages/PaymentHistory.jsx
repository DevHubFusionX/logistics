import { useState, useEffect } from 'react'
import { PageHeader } from '../components/dashboard'
import { CreditCard, CheckCircle, XCircle, Clock, Download } from 'lucide-react'
import { useBookings } from '../hooks/useBookings'

export default function PaymentHistory() {
  const { bookings, loading } = useBookings()
  const [payments, setPayments] = useState([])

  useEffect(() => {
    if (bookings.length > 0) {
      const paymentHistory = bookings
        .filter(b => b.paymentStatus === 'paid')
        .map(b => ({
          id: b._id,
          bookingId: b.bookingId || b._id,
          amount: b.totalCost || b.estimatedCost,
          date: b.createdAt,
          status: 'success',
          method: 'Paystack',
          reference: `PAY-${b._id?.slice(-8)}`
        }))
      setPayments(paymentHistory)
    }
  }, [bookings])

  if (loading) {
    return (
      <div className="space-y-6 pb-6">
        <PageHeader title="Payment History" subtitle="View all your payment transactions" />
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader title="Payment History" subtitle="View all your payment transactions" />

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">Successful</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{payments.length}</p>
          <p className="text-sm text-gray-600 mt-1">Total payments</p>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Total Amount</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            ₦{payments.reduce((sum, p) => sum + (p.amount || 0), 0).toFixed(2)}
          </p>
          <p className="text-sm text-gray-600 mt-1">All time</p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">This Month</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">
            {payments.filter(p => new Date(p.date).getMonth() === new Date().getMonth()).length}
          </p>
          <p className="text-sm text-gray-600 mt-1">Payments made</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-900">Transaction History</h2>
        </div>

        {payments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No payments yet</h3>
            <p className="text-gray-600">Your payment history will appear here</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Booking ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reference</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {payments.map((payment) => (
                  <tr key={payment.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(payment.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-900">
                      {payment.bookingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono text-gray-600">
                      {payment.reference}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {payment.method}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₦{payment.amount?.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                        <CheckCircle className="w-3 h-3" />
                        Success
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        Receipt
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
