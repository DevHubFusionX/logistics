import { motion } from 'framer-motion'
import { Package } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import BookingForm from '../../components/booking/BookingForm'

export default function BookingRequest() {
  const navigate = useNavigate()

  const handleBookingSuccess = (bookingData) => {
    navigate('/booking/confirmation', { state: { bookingData } })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-sky-500 to-blue-600 rounded-2xl mb-6 shadow-lg">
            <Package className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Create New Shipment</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Streamline your logistics operations with our comprehensive booking system. 
            Complete the form below to receive an instant, competitive quote.
          </p>
        </motion.div>

        <motion.div 
          className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-white/50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <BookingForm onSuccess={handleBookingSuccess} />
        </motion.div>
      </div>
    </div>
  )
}