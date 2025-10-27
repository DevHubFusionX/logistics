import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-8"
        >
          <Zap className="w-4 h-4" />
          Complete Logistics Solutions
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
        >
          Services Built for
          <br />
          <span className="text-sky-600">Your Success</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          From express delivery to enterprise solutions, we provide comprehensive logistics services 
          that scale with your business across Nigeria and beyond.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/booking/request"
              className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-xl font-bold shadow-lg hover:bg-sky-600 transition-colors"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-sky-300 hover:bg-sky-50 transition-all"
            >
              View Pricing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}