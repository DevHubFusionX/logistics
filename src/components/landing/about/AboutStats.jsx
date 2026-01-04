import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import { aboutData } from '../../../pages/AboutData'

export default function AboutStats() {
  const stats = aboutData.stats

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary rounded-2xl mb-4 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl sm:text-4xl font-heading text-gray-900 mb-2 flex justify-center items-center">
                  {stat.number === 'TrendingUp' ? <TrendingUp className="w-10 h-10 text-primary" /> : stat.number}
                </div>
                <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
