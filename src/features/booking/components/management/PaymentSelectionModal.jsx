import { useState, useEffect } from 'react'
import { X, Loader2, AlertCircle, CheckCircle, XCircle, RefreshCw, Shield, CreditCard, Building2, Banknote } from 'lucide-react'
import bookingService from '@/features/booking/services/bookingService'
import { useInitializePaymentMutation, useVerifyPaymentMutation } from '@/hooks/queries/usePaymentQueries'
import toast from 'react-hot-toast'

const METHODS = [
  { id: 'card',          icon: CreditCard, label: 'Pay with Paystack', desc: 'Card, bank transfer & USSD' },
  { id: 'bank_transfer', icon: Building2,  label: 'Bank transfer',     desc: 'Upload proof of payment' },
  { id: 'cash',          icon: Banknote,   label: 'Cash on delivery',  desc: 'Pay when shipment arrives' },
]

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <span className="text-xs font-semibold text-gray-800">{value || '—'}</span>
    </div>
  )
}

export default function PaymentSelectionModal({ booking, user, onSuccess, onClose }) {
  const [fullBooking, setFullBooking]   = useState(null)
  const [fetchError, setFetchError]     = useState(null)
  const [fetching, setFetching]         = useState(true)
  const [method, setMethod]             = useState('card')
  const [payStatus, setPayStatus]       = useState(null) // null | 'processing' | 'success' | 'failed'

  const initializePayment = useInitializePaymentMutation()
  const verifyPayment     = useVerifyPaymentMutation()

  const bookingId = booking?._id || booking?.id || booking?.tracking_number

  // Fetch full booking from backend when modal opens
  useEffect(() => {
    if (!bookingId) return
    setFetching(true)
    setFetchError(null)
    bookingService.getBookingById(bookingId)
      .then(res => {
        const data = res.data?.data || res.data
        setFullBooking(data)
      })
      .catch(err => {
        setFetchError(err.message || 'Failed to load booking details')
      })
      .finally(() => setFetching(false))
  }, [bookingId])

  const amount    = fullBooking?.price || fullBooking?.shipping_fee || fullBooking?.amount || booking?.amount || booking?.calculatedPrice || 0
  const email     = user?.email || fullBooking?.email || booking?.email || ''
  const origin    = fullBooking?.pickupLocation?.city  || booking?.pickupLocation?.city  || '—'
  const dest      = fullBooking?.dropoffLocation?.city || booking?.dropoffLocation?.city || '—'
  const goodsType = fullBooking?.goodsType || fullBooking?.cargoType || booking?.goodsType || '—'
  const weight    = fullBooking?.cargoWeightKg || fullBooking?.weight || booking?.cargoWeightKg || '—'
  const payStatus_ = fullBooking?.paymentStatus || booking?.paymentStatus || 'unpaid'

  const handlePay = async () => {
    if (method !== 'card') {
      toast.info('Please use Paystack for online payment. Other methods coming soon.')
      return
    }
    setPayStatus('processing')
    try {
      const res        = await initializePayment.mutateAsync(bookingId)
      const authUrl    = res.data?.data?.authorization_url
      if (!authUrl) throw new Error(res.data?.message || 'Could not get payment URL')

      // Store bookingId for verification on return
      localStorage.setItem('currentBookingId', bookingId)
      window.location.href = authUrl
    } catch (err) {
      setPayStatus('failed')
      toast.error(err.message || 'Payment initialization failed')
    }
  }

  if (!booking) return null

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[92vh] flex flex-col shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 flex-shrink-0">
          <div>
            <h2 className="font-heading font-bold text-gray-900">Pay now</h2>
            <p className="text-xs text-gray-400 mt-0.5 font-mono">{bookingId}</p>
          </div>
          <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-4">

          {/* Loading state */}
          {fetching && (
            <div className="flex flex-col items-center py-10 gap-3">
              <Loader2 className="w-8 h-8 text-sky-700 animate-spin" />
              <p className="text-sm text-gray-400">Loading booking details…</p>
            </div>
          )}

          {/* Fetch error */}
          {!fetching && fetchError && (
            <div className="flex flex-col items-center py-10 gap-3 text-center">
              <AlertCircle className="w-8 h-8 text-red-400" />
              <p className="text-sm font-semibold text-gray-700">Couldn't load booking</p>
              <p className="text-xs text-gray-400">{fetchError}</p>
              <button
                onClick={() => { setFetchError(null); setFetching(true); bookingService.getBookingById(bookingId).then(r => setFullBooking(r.data?.data || r.data)).catch(e => setFetchError(e.message)).finally(() => setFetching(false)) }}
                className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-sky-700 text-white text-xs font-semibold rounded-xl hover:bg-sky-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Retry
              </button>
            </div>
          )}

          {/* Payment status screens */}
          {!fetching && !fetchError && payStatus === 'processing' && (
            <div className="flex flex-col items-center py-10 gap-3 text-center">
              <Loader2 className="w-10 h-10 text-sky-700 animate-spin" />
              <p className="font-heading font-bold text-gray-900">Redirecting to Paystack…</p>
              <p className="text-xs text-gray-400">Please don't close this window.</p>
            </div>
          )}

          {!fetching && !fetchError && payStatus === 'failed' && (
            <div className="flex flex-col items-center py-10 gap-3 text-center">
              <XCircle className="w-10 h-10 text-red-400" />
              <p className="font-heading font-bold text-gray-900">Payment failed</p>
              <p className="text-xs text-gray-400">Something went wrong. Please try again.</p>
              <button
                onClick={() => setPayStatus(null)}
                className="mt-1 inline-flex items-center gap-1.5 px-4 py-2 bg-sky-700 text-white text-xs font-semibold rounded-xl hover:bg-sky-600 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Try again
              </button>
            </div>
          )}

          {/* Main content — shown once booking is loaded and no active pay status */}
          {!fetching && !fetchError && !payStatus && (
            <>
              {/* Amount */}
              <div className="flex items-center justify-between p-4 bg-sky-50 rounded-xl border border-sky-100">
                <div>
                  <p className="text-xs text-sky-700 font-semibold uppercase tracking-wider">Amount due</p>
                  <p className="font-heading font-black text-2xl text-sky-700 mt-0.5">
                    ₦{amount.toLocaleString(undefined, { minimumFractionDigits: 0 })}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  payStatus_ === 'paid' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'
                }`}>
                  {payStatus_ === 'paid' ? 'Paid' : 'Unpaid'}
                </span>
              </div>

              {/* Booking summary */}
              <div className="bg-gray-50 rounded-xl border border-gray-100 px-4 py-1">
                <Row label="From"      value={origin} />
                <Row label="To"        value={dest} />
                <Row label="Cargo"     value={goodsType} />
                <Row label="Weight"    value={weight ? `${weight} kg` : null} />
                <Row label="Customer"  value={fullBooking?.fullNameOrBusiness || user?.firstName} />
              </div>

              {/* Method selection */}
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Payment method</p>
                {METHODS.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setMethod(m.id)}
                    className={`w-full flex items-center gap-3 p-3.5 rounded-xl border text-left transition-all ${
                      method === m.id
                        ? 'border-sky-700 bg-sky-50'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      method === m.id ? 'bg-sky-700 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <m.icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-semibold ${method === m.id ? 'text-sky-700' : 'text-gray-800'}`}>{m.label}</p>
                      <p className="text-xs text-gray-400">{m.desc}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                      method === m.id ? 'border-sky-700' : 'border-gray-300'
                    }`}>
                      {method === m.id && <div className="w-2 h-2 rounded-full bg-sky-700" />}
                    </div>
                  </button>
                ))}
              </div>

              {/* Security note */}
              <div className="flex items-start gap-2 text-xs text-gray-400">
                <Shield className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-sky-700" />
                <span>Payments are processed securely via Paystack. Your card details are never stored.</span>
              </div>
            </>
          )}
        </div>

        {/* Footer CTA */}
        {!fetching && !fetchError && !payStatus && (
          <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-gray-100 space-y-2">
            <button
              onClick={handlePay}
              disabled={initializePayment.isPending}
              className="w-full py-3.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
            >
              {initializePayment.isPending
                ? <><Loader2 className="w-4 h-4 animate-spin" /> Initializing…</>
                : `Pay ₦${amount.toLocaleString(undefined, { minimumFractionDigits: 0 })} securely`
              }
            </button>
            <button onClick={onClose} className="w-full py-2.5 text-sm font-semibold text-gray-400 hover:text-gray-600 transition-colors">
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
