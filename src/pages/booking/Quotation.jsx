import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Clock, Shield, Truck, CreditCard, ArrowLeft } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function Quotation() {
  const location = useLocation()
  const navigate = useNavigate()
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(true)
  
  const bookingData = location.state?.bookingData

  useEffect(() => {
    if (!bookingData) {
      navigate('/booking/request')
      return
    }
    
    // Simulate price calculation
    setTimeout(() => {
      const basePrice = calculatePrice(bookingData)
      setQuote({
        basePrice,
        insurance: Math.round(basePrice * 0.02),
        handling: 25,
        total: Math.round(basePrice + (basePrice * 0.02) + 25),
        estimatedDays: getEstimatedDays(bookingData.serviceType),
        currency: 'USD'
      })
      setLoading(false)
    }, 2000)
  }, [bookingData, navigate])

  const calculatePrice = (data) => {
    const baseRates = { ground: 2.5, air: 8.5, ocean: 1.2 }
    const weight = parseFloat(data.weight) || 1
    const volume = (parseFloat(data.dimensions.length) * parseFloat(data.dimensions.width) * parseFloat(data.dimensions.height)) / 5000 || 1
    const chargeable = Math.max(weight, volume)
    return Math.round(baseRates[data.serviceType] * chargeable * 100) / 100
  }

  const getEstimatedDays = (serviceType) => {
    const estimates = { ground: '3-5', air: '1-2', ocean: '15-30' }
    return estimates[serviceType] || '3-5'
  }

  const handleConfirmBooking = () => {
    navigate('/booking/payment', { 
      state: { 
        bookingData, 
        quote,
        bookingId: 'DL-' + Date.now()
      } 
    })
  }

  if (!bookingData) return null

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="flex items-center gap-4 mb-8"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <button 
            onClick={() => navigate('/booking/request')}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Request
          </button>
        </motion.div>

        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Shipping Quotation</h1>
          <p className="text-gray-600">Review your quote and confirm booking</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Shipment Summary */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Shipment Details</h2>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">From</h3>
                  <p className="text-gray-600 text-sm">{bookingData.fromAddress}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">To</h3>
                  <p className="text-gray-600 text-sm">{bookingData.toAddress}</p>
                </div>
              </div>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Service</h3>
                  <p className="text-gray-600 text-sm capitalize">{bookingData.serviceType} Transport</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Weight</h3>
                  <p className="text-gray-600 text-sm">{bookingData.weight} kg</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Dimensions</h3>
                  <p className="text-gray-600 text-sm">
                    {bookingData.dimensions.length} × {bookingData.dimensions.width} × {bookingData.dimensions.height} cm
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Quote Card */}
          <motion.div 
            className="bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {loading ? (
              <div className="text-center py-8">
                <motion.div 
                  className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center mx-auto mb-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                >
                  <Calculator className="w-6 h-6 text-sky-500" />
                </motion.div>
                <p className="text-gray-600">Calculating best rates...</p>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold text-gray-900 mb-6">Price Breakdown</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Base Shipping</span>
                    <span className="font-semibold">${quote.basePrice}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Insurance (2%)</span>
                    <span className="font-semibold">${quote.insurance}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Handling Fee</span>
                    <span className="font-semibold">${quote.handling}</span>
                  </div>
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg">
                      <span className="font-bold text-gray-900">Total</span>
                      <span className="font-bold text-sky-600">${quote.total}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 p-3 bg-sky-50 rounded-lg">
                    <Clock className="w-5 h-5 text-sky-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Delivery Time</p>
                      <p className="text-sm text-gray-600">{quote.estimatedDays} business days</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Fully Insured</p>
                      <p className="text-sm text-gray-600">Up to ${bookingData.value}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                    <Truck className="w-5 h-5 text-purple-600" />
                    <div>
                      <p className="font-semibold text-gray-900">Real-time Tracking</p>
                      <p className="text-sm text-gray-600">GPS monitoring included</p>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleConfirmBooking}
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white py-4 rounded-lg font-semibold hover:from-sky-400 hover:to-blue-500 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <CreditCard className="w-5 h-5" />
                  Proceed to Payment
                </motion.button>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}