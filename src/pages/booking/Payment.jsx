import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { CreditCard, Lock, CheckCircle, XCircle, ArrowLeft, Loader, DollarSign, Shield } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { useToast } from '../../components/ui/advanced'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [cardData, setCardData] = useState({ number: '', expiry: '', cvv: '', name: '' })

  const { bookingData, quote, bookingId } = location.state || {}

  if (!bookingData || !quote) {
    navigate('/booking/request')
    return null
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setProcessing(true)
    showToast.info('Processing payment', 'Please wait...')
    
    setTimeout(() => {
      const success = Math.random() > 0.2
      setPaymentStatus(success ? 'success' : 'failed')
      setProcessing(false)
      
      if (success) {
        showToast.success('Payment successful', 'Redirecting...')
        setTimeout(() => {
          navigate('/booking/confirmation', {
            state: { bookingData, quote, bookingId, paymentId: 'PAY-' + Date.now() }
          })
        }, 2000)
      } else {
        showToast.error('Payment failed', 'Please try again')
      }
    }, 3000)
  }

  return (
    <div className="space-y-6 pb-6">
      <PageHeader
        title="Secure Payment"
        subtitle="Complete your booking with secure payment processing"
      />

      <button onClick={() => navigate('/booking/quotation', { state: { bookingData, bookingId } })} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors">
        <ArrowLeft className="w-5 h-5" /> Back to Quote
      </button>

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
                  <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div onClick={() => setPaymentMethod('card')} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <CreditCard className="w-6 h-6 text-blue-500 mb-2" />
                    <h3 className="font-semibold text-gray-900">Credit/Debit Card</h3>
                    <p className="text-xs text-gray-600 mt-1">Visa, Mastercard, Amex</p>
                  </div>
                  <div onClick={() => setPaymentMethod('paypal')} className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}>
                    <div className="w-6 h-6 bg-blue-600 rounded mb-2"></div>
                    <h3 className="font-semibold text-gray-900">PayPal</h3>
                    <p className="text-xs text-gray-600 mt-1">Fast & secure</p>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                      <input type="text" value={cardData.number} onChange={(e) => setCardData({...cardData, number: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="1234 5678 9012 3456" required />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                        <input type="text" value={cardData.expiry} onChange={(e) => setCardData({...cardData, expiry: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="MM/YY" required />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                        <input type="text" value={cardData.cvv} onChange={(e) => setCardData({...cardData, cvv: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="123" required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                      <input type="text" value={cardData.name} onChange={(e) => setCardData({...cardData, name: e.target.value})} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder="John Doe" required />
                    </div>
                    <button type="submit" className="w-full flex items-center justify-center gap-3 bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-sm">
                      <Lock className="w-5 h-5" /> Pay ${quote.total}
                    </button>
                  </form>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <button onClick={handlePayment} className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Continue with PayPal
                    </button>
                  </div>
                )}
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
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Service</span>
                <span className="font-semibold capitalize">{bookingData.serviceType}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Weight</span>
                <span className="font-semibold">{bookingData.weight} kg</span>
              </div>
            </div>
            <div className="border-t pt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-semibold">${quote.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (8%)</span>
                <span className="font-semibold">${quote.tax}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-3 mt-3">
                <span>Total Amount</span>
                <span className="text-blue-600">${quote.total}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
