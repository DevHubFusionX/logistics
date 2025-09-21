import { motion } from 'framer-motion'
import { CheckCircle, Package, MapPin, Calendar, Download, Share, Home } from 'lucide-react'
import { useLocation, Link } from 'react-router-dom'

export default function Confirmation() {
  const location = useLocation()
  const { bookingData, quote, bookingId, paymentId } = location.state || {}

  if (!bookingData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Booking Not Found</h1>
          <Link to="/dashboard" className="text-sky-500 hover:text-sky-600">
            Return to Dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <motion.div 
            className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          >
            <CheckCircle className="w-12 h-12 text-green-600" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed!</h1>
          <p className="text-lg text-gray-600">Your shipment has been successfully booked</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Booking Details */}
          <motion.div 
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Booking Details</h2>
            
            <div className="space-y-6">
              {/* Booking IDs */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-sky-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Booking ID</h3>
                  <p className="font-mono text-sky-600 text-lg">{bookingId}</p>
                </div>
                <div className="p-4 bg-green-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-1">Payment ID</h3>
                  <p className="font-mono text-green-600 text-lg">{paymentId}</p>
                </div>
              </div>

              {/* Route Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Route Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Pickup Location</h4>
                    <p className="text-gray-600 text-sm">{bookingData.fromAddress}</p>
                    <p className="text-sky-600 text-sm mt-2">Date: {bookingData.pickupDate}</p>
                  </div>
                  <div className="p-4 border border-gray-200 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-2">Delivery Location</h4>
                    <p className="text-gray-600 text-sm">{bookingData.toAddress}</p>
                    <p className="text-sky-600 text-sm mt-2">Expected: {bookingData.deliveryDate}</p>
                  </div>
                </div>
              </div>

              {/* Package Information */}
              <div>
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Package className="w-5 h-5" />
                  Package Information
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Type</h4>
                    <p className="text-gray-600 capitalize">{bookingData.packageType}</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Weight</h4>
                    <p className="text-gray-600">{bookingData.weight} kg</p>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <h4 className="font-semibold text-gray-900 mb-1">Value</h4>
                    <p className="text-gray-600">${bookingData.value}</p>
                  </div>
                </div>
              </div>

              {/* Next Steps */}
              <div className="bg-sky-50 border border-sky-200 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  What Happens Next?
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                    <div>
                      <p className="font-semibold text-gray-900">Pickup Scheduled</p>
                      <p className="text-gray-600 text-sm">Our team will contact you to confirm pickup details</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-sky-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                    <div>
                      <p className="font-semibold text-gray-900">Package Collection</p>
                      <p className="text-gray-600 text-sm">Your package will be collected on {bookingData.pickupDate}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-gray-300 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                    <div>
                      <p className="font-semibold text-gray-900">Real-time Tracking</p>
                      <p className="text-gray-600 text-sm">Track your shipment progress in real-time</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Action Panel */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {/* Payment Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Summary</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
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
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total Paid</span>
                    <span className="text-green-600">${quote.total}</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  Payment Successful
                </span>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-center gap-2 bg-sky-500 text-white py-3 rounded-lg hover:bg-sky-600 transition-colors">
                  <Download className="w-4 h-4" />
                  Download Receipt
                </button>
                
                <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <Share className="w-4 h-4" />
                  Share Tracking Info
                </button>
                
                <Link to="/dashboard" className="block">
                  <button className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Home className="w-4 h-4" />
                    Go to Dashboard
                  </button>
                </Link>
              </div>
            </div>

            {/* Support */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
              <p className="text-gray-600 text-sm mb-4">
                Our support team is available 24/7 to assist you with your shipment.
              </p>
              <div className="space-y-2">
                <a href="tel:+18003672564" className="block text-sky-600 hover:text-sky-700 font-medium text-sm">
                  📞 +1 (800) DORA-LOG
                </a>
                <a href="mailto:support@doralogistics.com" className="block text-sky-600 hover:text-sky-700 font-medium text-sm">
                  ✉️ support@doralogistics.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}