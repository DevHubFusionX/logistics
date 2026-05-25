import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard, CheckCircle, XCircle, ArrowLeft, Loader, Shield } from 'lucide-react'
import toast from 'react-hot-toast'
import { useInitializePaymentMutation, useVerifyPaymentMutation } from '../../hooks/queries/usePaymentQueries'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const initializePayment = useInitializePaymentMutation()
  const verifyPayment = useVerifyPaymentMutation()

  const queryParams = new URLSearchParams(location.search)
  const reference = queryParams.get('reference') || queryParams.get('trxref')
  const { bookingData, quote, bookingId: stateBookingId, amount, email } = location.state || {}
  const bookingId = stateBookingId || localStorage.getItem('currentBookingId')

  useEffect(() => {
    if (reference && bookingId && !paymentStatus) verifyPaymentOnReturn()
  }, [reference, bookingId])

  const verifyPaymentOnReturn = async () => {
    setProcessing(true)
    try {
      await verifyPayment.mutateAsync(bookingId)
      setPaymentStatus('success')
      localStorage.removeItem('currentBookingId')
      setTimeout(() => navigate('/booking/confirmation', { state: { bookingId, paymentId: reference } }), 2000)
    } catch {
      setPaymentStatus('failed')
    } finally {
      setProcessing(false)
    }
  }

  const isExistingBooking = amount && bookingId && !bookingData
  const paymentAmount = isExistingBooking ? amount : quote?.total
  const userEmail = email || bookingData?.email || localStorage.getItem('userEmail') || 'user@example.com'

  if (!reference && !isExistingBooking && (!bookingData || !quote)) {
    navigate('/booking/request')
    return null
  }

  const handlePay = async () => {
    if (processing) return
    setProcessing(true)
    try {
      if (bookingId) localStorage.setItem('currentBookingId', bookingId)
      const response = await initializePayment.mutateAsync(bookingId)
      const paymentData = response.data?.data
      if (!response.data?.error && paymentData?.authorization_url) {
        window.location.href = paymentData.authorization_url
      } else {
        throw new Error(response.data?.message || 'Failed to initialize payment')
      }
    } catch (error) {
      if (error.message === 'Payment already processing') {
        toast.error('Payment session active. Wait 15–30 min or contact support.', { duration: 8000 })
        setTimeout(() => {
          if (window.confirm('Payment is locked.\n\nGo back to My Bookings?')) navigate('/my-bookings')
        }, 1000)
      }
      setProcessing(false)
    }
  }

  const handlePaymentSuccess = async (ref) => {
    setProcessing(true)
    try {
      await verifyPayment.mutateAsync(bookingId)
      setPaymentStatus('success')
      setTimeout(() => {
        if (isExistingBooking) navigate('/my-bookings', { state: { paymentSuccess: true } })
        else navigate('/booking/confirmation', { state: { bookingData, quote, bookingId, paymentId: ref.reference } })
      }, 2000)
    } catch {
      setPaymentStatus('failed')
    } finally {
      setProcessing(false)
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-4">
      {/* Page title */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => isExistingBooking ? navigate('/my-bookings') : navigate('/booking/quotation', { state: { bookingData, bookingId } })}
          className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-500"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="font-heading font-bold text-xl text-gray-900">Secure payment</h1>
          <p className="text-sm text-gray-400 mt-0.5">Complete your booking</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-5 gap-4">
        {/* Payment panel */}
        <div className="sm:col-span-3 bg-white rounded-2xl border border-gray-100 overflow-hidden">
          {paymentStatus === 'success' ? (
            <div className="p-8 text-center space-y-3">
              <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <p className="font-heading font-bold text-gray-900">Payment successful!</p>
              <p className="text-sm text-gray-400">Redirecting to confirmation…</p>
            </div>
          ) : paymentStatus === 'failed' ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-12 h-12 bg-red-50 rounded-2xl flex items-center justify-center mx-auto">
                <XCircle className="w-6 h-6 text-red-500" />
              </div>
              <p className="font-heading font-bold text-gray-900">Payment failed</p>
              <p className="text-sm text-gray-400">There was an issue processing your payment.</p>
              <button
                onClick={() => setPaymentStatus(null)}
                className="px-5 py-2.5 bg-sky-700 text-white text-sm font-semibold rounded-xl hover:bg-sky-600 transition-colors"
              >
                Try again
              </button>
            </div>
          ) : processing ? (
            <div className="p-8 text-center space-y-3">
              <Loader className="w-8 h-8 text-sky-700 mx-auto animate-spin" />
              <p className="font-heading font-bold text-gray-900">Processing payment</p>
              <p className="text-sm text-gray-400">Please wait…</p>
            </div>
          ) : (
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-sky-700" />
                <h2 className="font-heading font-semibold text-gray-900 text-sm">Pay with Paystack</h2>
              </div>

              {/* Method tile */}
              <div className="flex items-center gap-4 p-4 rounded-xl border-2 border-sky-700 bg-sky-50">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-sky-100 flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-sky-700" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">Card / Bank transfer</p>
                  <p className="text-xs text-gray-400">Secured by Paystack</p>
                </div>
                <div className="w-5 h-5 rounded-full bg-sky-700 flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 rounded-full bg-white" />
                </div>
              </div>

              {/* Security note */}
              <div className="flex items-start gap-2.5 text-xs text-gray-400">
                <Shield className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>Your transaction is secured with end-to-end encryption. You'll be redirected to Paystack to complete payment.</span>
              </div>

              <button
                onClick={handlePay}
                disabled={processing}
                className="w-full py-3.5 bg-sky-700 hover:bg-sky-600 text-white text-sm font-bold rounded-xl transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {processing ? (
                  <><Loader className="w-4 h-4 animate-spin" /> Processing…</>
                ) : (
                  `Pay ₦${paymentAmount?.toLocaleString()} securely`
                )}
              </button>
            </div>
          )}
        </div>

        {/* Order summary */}
        <div className="sm:col-span-2 bg-white rounded-2xl border border-gray-100 p-5 space-y-4 h-fit">
          <h2 className="font-heading font-semibold text-gray-900 text-sm">Order summary</h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Booking ID</span>
              <span className="font-mono font-semibold text-gray-800 text-xs">{bookingId}</span>
            </div>
            {!isExistingBooking && (
              <>
                <div className="flex justify-between">
                  <span className="text-gray-400">Service</span>
                  <span className="font-semibold capitalize text-gray-800">{bookingData.serviceType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Weight</span>
                  <span className="font-semibold text-gray-800">{bookingData.weight} kg</span>
                </div>
              </>
            )}
          </div>

          {!isExistingBooking && quote && (
            <div className="border-t border-gray-100 pt-3 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-semibold text-gray-800">₦{quote.subtotal?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Tax (8%)</span>
                <span className="font-semibold text-gray-800">₦{quote.tax?.toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-t border-gray-100 pt-2 mt-1">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-sky-700">₦{quote.total?.toLocaleString()}</span>
              </div>
            </div>
          )}

          {isExistingBooking && (
            <div className="border-t border-gray-100 pt-3">
              <div className="flex justify-between text-sm">
                <span className="font-bold text-gray-900">Total</span>
                <span className="font-bold text-sky-700">₦{amount?.toLocaleString()}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
