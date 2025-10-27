import { motion } from 'framer-motion'
import { Phone, MessageCircle, Headphones } from 'lucide-react'

export default function ContactHero() {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
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
          <Headphones className="w-4 h-4" />
          24/7 Customer Support
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
        >
          Get in Touch
          <br />
          <span className="text-sky-600">We're Here to Help</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          Have questions about our logistics services? Need a custom quote? 
          Our Nigerian team is ready to help you find the perfect shipping solution.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
            <a
              href="https://wa.me/2348091234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp Us
            </a>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <a
              href="tel:+2341234567890"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-sky-300 hover:bg-sky-50 transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}