import { useState, useEffect } from 'react'
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

  // Handle URL params for verification
  const queryParams = new URLSearchParams(location.search)
  const reference = queryParams.get('reference') || queryParams.get('trxref')

  const { bookingData, quote, bookingId: stateBookingId, amount, email } = location.state || {}

  // Fallback to localStorage if state is lost after redirect
  const bookingId = stateBookingId || localStorage.getItem('currentBookingId')

  useEffect(() => {
    if (reference && bookingId && !paymentStatus) {
      verifyPaymentOnReturn()
    }
  }, [reference, bookingId])

  const verifyPaymentOnReturn = async () => {
    setProcessing(true)
    try {
      await paymentService.verifyPayment(bookingId)
      setPaymentStatus('success')
      toast.success('Payment verified successfully!')
      // Clear storage
      localStorage.removeItem('currentBookingId')

      setTimeout(() => {
        navigate('/booking/confirmation', {
          state: { bookingId, paymentId: reference }
        })
      }, 2000)
    } catch (error) {
      console.error(error)
      // Even if verification fails initially, we show failed state
      setPaymentStatus('failed')
    } finally {
      setProcessing(false)
    }
  }

  const isExistingBooking = amount && bookingId && !bookingData
  const paymentAmount = isExistingBooking ? amount : quote?.total
  const userEmail = email || bookingData?.email || localStorage.getItem('userEmail') || 'user@example.com'

  // Allow access if processing a return from payment gateway
  if (!reference && !isExistingBooking && (!bookingData || !quote)) {
    navigate('/booking/request')
    return null
  }

  const handlePaymentSuccess = async (reference) => {
    setProcessing(true)
    try {
      const response = await paymentService.verifyPayment(bookingId)
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
                <div className="space-y-6">
                  {/* Payment Method Selection */}
                  <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 flex items-center justify-between cursor-pointer ring-2 ring-blue-500 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center border border-blue-100 shadow-sm">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Pay with Card / Bank</h3>
                        <p className="text-sm text-gray-600">Secured by Paystack</p>
                      </div>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border border-gray-100 p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-gray-400 mt-0.5" />
                      <div className="text-sm text-gray-500">
                        Your transaction is secured with end-to-end encryption. You will be redirected to Paystack to complete the payment.
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (processing) return
                      setProcessing(true)
                      try {
                        // Persist bookingId for return
                        if (bookingId) localStorage.setItem('currentBookingId', bookingId)

                        const response = await paymentService.initializePayment(bookingId)
                        if (response.data && response.data.authorization_url) {
                          window.location.href = response.data.authorization_url
                        } else {
                          toast.error('Failed to initialize payment')
                          setProcessing(false)
                        }
                      } catch (error) {
                        console.error('Payment init error:', error)
                        if (error.message === 'Payment already processing') {
                          toast.error('Payment session active. This expires in 15-30 minutes. Wait or contact support to reset.', { duration: 8000 })
                          setTimeout(() => {
                            if (window.confirm('Payment is locked. Options:\n\n1. Wait 15-30 minutes\n2. Contact support\n3. Create new booking\n\nGo back to My Bookings?')) {
                              navigate('/my-bookings')
                            }
                          }, 1000)
                        } else {
                          toast.error(error.message || 'Could not initialize payment')
                        }
                        setProcessing(false)
                      }
                    }}
                    disabled={processing}
                    className="w-full py-4 px-6 bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 transform active:scale-[0.99]"
                  >
                    {processing ? (
                      <>
                        <Loader className="w-6 h-6 animate-spin" />
                        Processing Secure Payment...
                      </>
                    ) : (
                      <>
                        Pay ₦{paymentAmount?.toLocaleString()} Securely
                        <ArrowLeft className="w-5 h-5 rotate-180" />
                      </>
                    )}
                  </button>

                  <div className="flex justify-center items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-300">
                    {/* Placeholder for card logos if needed, for now just text/icons */}
                    <div className="flex gap-2">
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                      <div className="h-6 w-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
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
