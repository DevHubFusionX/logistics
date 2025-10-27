import { motion } from 'framer-motion'
import { Phone, MessageCircle, CheckCircle } from 'lucide-react'

export default function SupportInfo() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Quick Contact */}
      <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
        <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
        <p className="text-sky-100 mb-6">
          Our Nigerian support team is available 24/7 to assist with urgent shipping needs.
        </p>
        <div className="space-y-4">
          <motion.a 
            href="https://wa.me/2348091234567" 
            target="_blank" 
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-white/20 rounded-2xl p-4 text-white hover:bg-white/30 transition-all"
          >
            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-sky-100">WhatsApp Support</div>
              <div className="font-bold">+234 809 123 4567</div>
            </div>
          </motion.a>
          
          <motion.a 
            href="tel:+2341234567890" 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-3 bg-white/20 rounded-2xl p-4 text-white hover:bg-white/30 transition-all"
          >
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
              <Phone className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm text-sky-100">Call Center</div>
              <div className="font-bold">+234 (0) 1 234 5678</div>
            </div>
          </motion.a>
        </div>
      </div>

      {/* Response Time */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Our Response Times</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600"><strong>WhatsApp:</strong> Instant response</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600"><strong>Email:</strong> Within 2 hours</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
            <span className="text-gray-600"><strong>Phone:</strong> Immediate pickup</span>
          </div>
        </div>
      </div>

      {/* Trust Indicators */}
      <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
        <h4 className="text-lg font-bold text-gray-900 mb-4">Why Choose Dara?</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">Nigerian-owned & operated</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">1,000+ satisfied customers</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">99.2% on-time delivery</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-700 font-medium">All 36 states coverage</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}