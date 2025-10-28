import { AlertCircle, Send } from 'lucide-react'

export default function OutstandingPayments({ payments, onSendReminder }) {
  const outstanding = payments.filter(p => p.status === 'pending' || p.status === 'overdue')

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-3 sm:p-4">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-orange-500" />
          Outstanding Payments
        </h3>
        <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">
          {outstanding.length}
        </span>
      </div>

      <div className="space-y-2">
        {outstanding.map((payment) => (
          <div key={payment.id} className={`p-3 rounded-lg border ${
            payment.status === 'overdue' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
          }`}>
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-gray-900 text-sm">{payment.client}</div>
                <div className="text-xs text-gray-600">{payment.tripId} • {payment.invoiceId}</div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="font-semibold text-gray-900 text-sm">₦{payment.amount.toLocaleString()}</div>
                <span className={`text-xs font-medium ${
                  payment.status === 'overdue' ? 'text-red-600' : 'text-yellow-600'
                }`}>
                  {payment.status === 'overdue' ? 'Overdue' : 'Pending'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onSendReminder(payment)}
              className="w-full mt-2 px-3 py-1.5 bg-white border border-gray-300 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-1"
            >
              <Send className="w-3 h-3" />
              Send Reminder
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
