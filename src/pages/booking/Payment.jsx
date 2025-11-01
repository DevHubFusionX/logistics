import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard, CheckCircle, XCircle, ArrowLeft, Loader, DollarSign, Shield } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import toast from 'react-hot-toast'
import PaystackPayment from '../../components/payments/PaystackPayment'
import paymentService from '../../services/paymentService'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)

  const { bookingData, quote, bookingId, amount, email } = location.state || {}

  const isExistingBooking = amount && bookingId && !bookingData
  const paymentAmount = isExistingBooking ? amount : quote?.total
  const userEmail = email || bookingData?.email || localStorage.getItem('userEmail') || 'user@example.com'

  if (!isExistingBooking && (!bookingData || !quote)) {
    navigate('/booking/request')
    return null
  }

  const handlePaymentSuccess = async (reference) => {
    setProcessing(true)
    try {
      const response = await paymentService.verifyPayment(reference.reference, bookingId)
      setPaymentStatus('success')
      toast.success('Payment verified successfully!')
      setTimeout(() => {
        if (isExistingBooking) {
          navigate('/my-bookings', { state: { paymentSuccess: true } })
        } else {
          navigate('/booking/confirmation', {
            state: { bookingData, quote, bookingId, paymentId: reference.reference }
          })
        }
      }, 2000)
    } catch (error) {
      setPaymentStatus('failed')
      toast.error('Payment verification failed. Please contact support.')
    } finally {
      setProcessing(false)
    }
  }

  const handlePaymentClose = () => {
    toast.error('Payment cancelled')
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Secure Payment"
        subtitle="Complete your booking with secure payment processing"
      />

      {!isExistingBooking && (
        <button onClick={() => navigate('/booking/quotation', { state: { bookingData, bookingId } })} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Quote
        </button>
      )}
      {isExistingBooking && (
        <button onClick={() => navigate('/my-bookings')} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to My Bookings
        </button>
      )}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            {paymentStatus === 'success' ? (
              <div className="p-8">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h2>
                  <p className="text-gray-600">Redirecting to confirmation...</p>
                </div>
              </div>
            ) : paymentStatus === 'failed' ? (
              <div className="p-8">
                <div className="text-center py-8">
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="w-10 h-10 text-red-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h2>
                  <p className="text-gray-600 mb-6">There was an issue processing your payment</p>
                  <button onClick={() => setPaymentStatus(null)} className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                    Retry Payment
                  </button>
                </div>
              </div>
            ) : processing ? (
              <div className="p-8">
                <div className="text-center py-8">
                  <Loader className="w-10 h-10 text-blue-600 mx-auto mb-6 animate-spin" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Processing Payment</h2>
                  <p className="text-gray-600">Please wait while we securely process your payment...</p>
                </div>
              </div>
            ) : (
              <div className="p-6">
                <div className="flex items-center gap-2 mb-6">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">Secure Payment with Paystack</h2>
                </div>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-gray-700">
                      You will be redirected to Paystack's secure payment page to complete your transaction.
                    </p>
                  </div>
                  <PaystackPayment
                    amount={paymentAmount}
                    email={userEmail}
                    bookingId={bookingId}
                    onSuccess={handlePaymentSuccess}
                    onClose={handlePaymentClose}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-sm font-semibold text-gray-900">Secure Payment</span>
            </div>
            <p className="text-xs text-gray-600">
              Your payment information is encrypted and secure. We never store your card details.
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-t-xl border-b">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-5 h-5 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono text-sm font-semibold">{bookingId}</span>
              </div>
              {!isExistingBooking && (
                <>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service</span>
                    <span className="font-semibold capitalize">{bookingData.serviceType}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Weight</span>
                    <span className="font-semibold">{bookingData.weight} kg</span>
                  </div>
                </>
              )}
            </div>
            {!isExistingBooking && quote && (
              <div className="border-t pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₦{quote.subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">₦{quote.tax}</span>
                </div>
                <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₦{quote.total}</span>
                </div>
              </div>
            )}
            {isExistingBooking && (
              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-blue-600">₦{amount?.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
