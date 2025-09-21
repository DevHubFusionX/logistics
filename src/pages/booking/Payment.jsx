import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Lock, CheckCircle, XCircle, ArrowLeft, Loader } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Payment() {
  const location = useLocation()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [processing, setProcessing] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null)
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  })

  const { bookingData, quote, bookingId } = location.state || {}

  if (!bookingData || !quote) {
    navigate('/booking/request')
    return null
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setProcessing(true)
    
    // Simulate payment processing
    setTimeout(() => {
      const success = Math.random() > 0.2 // 80% success rate
      setPaymentStatus(success ? 'success' : 'failed')
      setProcessing(false)
      
      if (success) {
        setTimeout(() => {
          navigate('/booking/confirmation', {
            state: {
              bookingData,
              quote,
              bookingId,
              paymentId: 'PAY-' + Date.now()
            }
          })
        }, 2000)
      }
    }, 3000)
  }

  const retryPayment = () => {
    setPaymentStatus(null)
    setProcessing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button 
            onClick={() => navigate('/booking/quotation', { state: { bookingData } })}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Quote
          </button>
        </motion.div>

        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h1>
          <p className="text-gray-600">Complete your booking with secure payment</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {paymentStatus === 'success' ? (
              <div className="text-center py-8">
                <motion.div 
                  className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <CheckCircle className="w-10 h-10 text-green-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
                <p className="text-gray-600">Redirecting to confirmation page...</p>
              </div>
            ) : paymentStatus === 'failed' ? (
              <div className="text-center py-8">
                <motion.div 
                  className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <XCircle className="w-10 h-10 text-red-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Payment Failed</h2>
                <p className="text-gray-600 mb-6">There was an issue processing your payment. Please try again.</p>
                <button
                  onClick={retryPayment}
                  className="px-6 py-3 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Retry Payment
                </button>
              </div>
            ) : processing ? (
              <div className="text-center py-8">
                <motion.div 
                  className="w-20 h-20 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-6"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Loader className="w-10 h-10 text-sky-600" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Processing Payment</h2>
                <p className="text-gray-600">Please wait while we process your payment securely...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Payment Method</h2>
                
                {/* Payment Method Selection */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <motion.div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'card' ? 'border-sky-500 bg-sky-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                    whileHover={{ scale: 1.02 }}
                  >
                    <CreditCard className="w-6 h-6 text-sky-500 mb-2" />
                    <h3 className="font-semibold">Credit/Debit Card</h3>
                    <p className="text-sm text-gray-600">Visa, Mastercard, American Express</p>
                  </motion.div>
                  
                  <motion.div
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      paymentMethod === 'paypal' ? 'border-sky-500 bg-sky-50' : 'border-gray-200'
                    }`}
                    onClick={() => setPaymentMethod('paypal')}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="w-6 h-6 bg-blue-600 rounded mb-2"></div>
                    <h3 className="font-semibold">PayPal</h3>
                    <p className="text-sm text-gray-600">Pay with your PayPal account</p>
                  </motion.div>
                </div>

                {/* Card Form */}
                {paymentMethod === 'card' && (
                  <form onSubmit={handlePayment} className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Card Number</label>
                      <input
                        type="text"
                        value={cardData.number}
                        onChange={(e) => setCardData({...cardData, number: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        placeholder="1234 5678 9012 3456"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Expiry Date</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({...cardData, expiry: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          placeholder="MM/YY"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">CVV</label>
                        <input
                          type="text"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({...cardData, cvv: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                          placeholder="123"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        value={cardData.name}
                        onChange={(e) => setCardData({...cardData, name: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        placeholder="John Doe"
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-sky-400 hover:to-blue-500 transition-all duration-300"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Lock className="w-5 h-5" />
                      Pay ${quote.total}
                    </motion.button>
                  </form>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="text-center py-8">
                    <button
                      onClick={handlePayment}
                      className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Continue with PayPal
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>

          {/* Order Summary */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Booking ID</span>
                <span className="font-mono text-sm">{bookingId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Service</span>
                <span className="capitalize">{bookingData.serviceType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Weight</span>
                <span>{bookingData.weight} kg</span>
              </div>
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${quote.basePrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Insurance</span>
                <span>${quote.insurance}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Handling</span>
                <span>${quote.handling}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total</span>
                <span className="text-sky-600">${quote.total}</span>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4 text-green-600" />
                <span className="text-sm font-semibold text-gray-900">Secure Payment</span>
              </div>
              <p className="text-xs text-gray-600">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}