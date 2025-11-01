import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Zap } from 'lucide-react'

export default function AboutHero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">


      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-primary rounded-full text-sm font-bold mb-8"
          >
            <Zap className="w-4 h-4" />
            Trusted by 1,000+ Nigerian businesses
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-heading text-gray-900 mb-6 leading-tight"
          >
            About
            <br />
            <span className="text-primary">Dara Logistics</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-4xl mx-auto"
          >
            Since 2020, we've been transforming Nigerian commerce through intelligent logistics solutions.
            Our commitment to innovation, reliability, and customer success has made us a trusted partner
            for businesses of all sizes across Nigeria.
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
              className="inline-flex items-center gap-2 px-8 py-4 text-white rounded-xl font-bold shadow-lg transition-colors"
              style={{ backgroundColor: '#00843D' }}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
            
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-primary text-primary rounded-xl font-semibold hover:bg-blue-50 transition-all"
            >
              Our Services
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
