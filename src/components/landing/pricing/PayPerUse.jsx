import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Calculator } from 'lucide-react'

export default function PayPerUse({ services }) {
  return (
    <section className="bg-gradient-to-br from-gray-50 to-sky-50 py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Pay-As-You-Ship Pricing
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            No monthly commitments? No problem. Pay only for what you ship with our transparent Nigerian pricing.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-primary hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors text-lg">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-1">{service.unit}</p>
                  <p className="text-xs text-primary font-semibold">{service.time}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-black text-primary">
                    {service.price}
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-100">
                <button className="text-sm text-primary hover:text-primary/80 font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                  Get Quote
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            to="/booking/request"
            className="inline-flex items-center gap-3 px-8 py-4 bg-white text-primary rounded-xl font-bold hover:shadow-xl transition-all border-2 border-primary/20 hover:border-primary"
          >
            <Calculator className="w-5 h-5" />
            Calculate Your Shipping Cost
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
