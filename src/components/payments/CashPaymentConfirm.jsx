import { Banknote, AlertCircle, CheckCircle } from 'lucide-react'

export default function CashPaymentConfirm({ bookingId, amount, onConfirm, onCancel, loading }) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-100 rounded-2xl p-6 sm:p-8 text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-100 rounded-full -mr-16 -mt-16 opacity-50 blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-100 rounded-full -ml-12 -mb-12 opacity-50 blur-2xl"></div>

        <div className="relative">
          <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white rounded-2xl shadow-sm flex items-center justify-center mx-auto mb-6 ring-4 ring-emerald-50">
            <Banknote className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Confirm Cash Payment</h3>
          <p className="text-gray-600 mb-6 max-w-sm mx-auto">Please prepare the cash payment for the driver upon delivery.</p>

          <div className="bg-white/80 backdrop-blur-sm border border-emerald-100 rounded-2xl p-4 sm:p-6 inline-block shadow-sm min-w-[200px] sm:min-w-[280px]">
            <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Total Amount Payable</p>
            <p className="text-3xl sm:text-4xl font-extrabold text-emerald-700 tracking-tight">₦{amount?.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Important Info */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl shrink-0">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3">Important Information</h4>
              <ul className="space-y-2.5">
                {[
                  'Prepare exact amount if possible',
                  'Request invoice/receipt from driver',
                  'Driver verifies payment instantly',
                  'Payment before unloading'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-start gap-4">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl shrink-0">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-gray-900 mb-3">What Happens Next?</h4>
              <ol className="space-y-3">
                {[
                  'Booking confirmation sent instantly',
                  'Driver assigned within 24 hours',
                  'Receive driver contact details',
                  'Pay cash on successful delivery'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-gray-600">
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold mt-0.5 shrink-0">
                      {i + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-100 rounded-xl text-amber-800 text-sm">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <p><strong>Note:</strong> Cash payment option is subject to approval. We may contact you for verification.</p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="w-full sm:w-auto px-6 py-4 border-2 border-gray-100 text-gray-600 rounded-xl hover:bg-gray-50 hover:border-gray-200 font-semibold transition-colors"
          disabled={loading}
        >
          Go Back
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className="w-full sm:flex-1 px-6 py-4 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 font-bold text-base shadow-lg shadow-emerald-200 hover:shadow-emerald-300 transition-all active:scale-[0.99] disabled:opacity-50 disabled:shadow-none"
          disabled={loading}
        >
          {loading ? 'Processing Confirmation...' : 'Confirm Cash Payment'}
        </button>
      </div>
    </div>
  )
}
