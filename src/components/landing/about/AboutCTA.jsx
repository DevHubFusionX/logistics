import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

export default function AboutCTA() {
  return (
    <section className="bg-primary py-20">
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-6xl font-heading text-white mb-6"
          >
            Ready to Work Together?
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-xl text-blue-100 mb-10"
          >
            Join 1,000+ Nigerian businesses that trust Dara Logistics for their shipping needs.
            Let's build Nigeria's future together.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/booking/request"
              className="inline-flex items-center gap-2 bg-white hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all"
              style={{ color: '#0056B8' }}
            >
              Start Shipping Now
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white px-8 py-4 rounded-xl font-bold text-lg transition-all hover:text-primary"
            >
              Contact Us
            </Link>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-blue-100 text-sm mt-6"
          >
            ✓ No hidden fees  ✓ Nigerian-owned business  ✓ 24/7 WhatsApp support
          </motion.p>
        </div>
      </div>
    </section>
  )
}
