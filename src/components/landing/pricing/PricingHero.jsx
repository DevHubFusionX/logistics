import { motion } from 'framer-motion'
import { Users } from 'lucide-react'

export default function PricingHero({ billingCycle, setBillingCycle }) {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">


      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-blue-100 text-primary rounded-full text-sm font-bold mb-8"
        >
          <Users className="w-4 h-4" />
          Trusted by 1,000+ Nigerian businesses
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-heading text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
        >
          Pricing That
          <br />
          <span className="text-primary">Makes Sense</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
        >
          Transparent pricing designed for Nigerian businesses. No hidden fees, no surprises.
          Pay in Naira and scale as your business grows.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-1 p-1 bg-gray-100 rounded-xl mb-4"
        >
          <button
            onClick={() => setBillingCycle('monthly')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              billingCycle === 'monthly'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBillingCycle('annual')}
            className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
              billingCycle === 'annual'
                ? 'bg-white text-gray-900 shadow-md'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Annual
          </button>
        </motion.div>
        {billingCycle === 'annual' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-sm text-green-600 font-bold bg-green-50 px-4 py-2 rounded-full inline-block"
          >
            🎉 Save up to 25% with annual billing
          </motion.div>
        )}
      </div>
    </section>
  )
}
