import { motion } from 'framer-motion'
import { Phone, MessageCircle, CheckCircle } from 'lucide-react'

export default function SupportInfo() {
  return (
    <div className="space-y-6">
      {/* Quick Contact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-primary rounded-3xl p-6 text-white shadow-lg"
      >
        <h3 className="text-xl font-heading mb-3">Need Immediate Help?</h3>
        <p className="text-blue-100 mb-4 text-sm">
          Our Nigerian support team is available 24/7 to assist with urgent shipping needs.
        </p>
        <div className="space-y-3">
          <a 
            href="https://wa.me/2348115779007" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition-all"
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#00843D' }}>
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-100">WhatsApp Support</div>
              <div className="font-bold text-sm">+234 811 577 9007</div>
            </div>
          </a>
          
          <a 
            href="tel:+2349121168485" 
            className="flex items-center gap-3 bg-white/20 rounded-xl p-3 text-white hover:bg-white/30 transition-all"
          >
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs text-blue-100">Call Center</div>
              <div className="font-bold text-sm">+234 912 116 8485</div>
            </div>
          </a>
        </div>
      </motion.div>

      {/* Response Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
      >
        <h4 className="text-lg font-heading text-gray-900 mb-4">Response Times</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: '#00843D' }}></div>
            <span className="text-gray-600 text-sm"><strong>WhatsApp:</strong> Instant</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-gray-600 text-sm"><strong>Email:</strong> 2 hours</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-gray-600 text-sm"><strong>Phone:</strong> Immediate</span>
          </div>
        </div>
      </motion.div>

      {/* Trust Indicators */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-green-50 rounded-2xl p-6 border border-green-200"
      >
        <h4 className="text-lg font-heading text-gray-900 mb-4">Why Choose Dara?</h4>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" style={{ color: '#00843D' }} />
            <span className="text-gray-700 text-sm font-medium">Nigerian-owned</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" style={{ color: '#00843D' }} />
            <span className="text-gray-700 text-sm font-medium">1,000+ customers</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" style={{ color: '#00843D' }} />
            <span className="text-gray-700 text-sm font-medium">99.2% on-time</span>
          </div>
          <div className="flex items-center gap-3">
            <CheckCircle className="w-5 h-5" style={{ color: '#00843D' }} />
            <span className="text-gray-700 text-sm font-medium">36 states coverage</span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}