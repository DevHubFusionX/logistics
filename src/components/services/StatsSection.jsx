import { motion } from 'framer-motion'
import { stats } from './servicesData'

export default function StatsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.05 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ rotate: 5 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-2xl mb-4 group-hover:bg-sky-500 transition-colors"
                >
                  <Icon className="w-8 h-8 text-sky-600 group-hover:text-white transition-colors" />
                </motion.div>
                <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}