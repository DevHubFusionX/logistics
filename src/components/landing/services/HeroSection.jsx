import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
     

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-primary rounded-full text-sm font-bold mb-8"
        >
          <Zap className="w-4 h-4" />
          Complete Logistics Solutions
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
        >
          Services Built for
          <br />
          <span className="text-primary">Your Success</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          From express delivery to enterprise solutions, we provide comprehensive logistics services 
          that scale with your business across Nigeria and beyond.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/booking/request"
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-bold shadow-lg transition-colors"
              style={{ backgroundColor: '#00843D' }}
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-primary hover:bg-blue-50 transition-all"
            >
              View Pricing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
