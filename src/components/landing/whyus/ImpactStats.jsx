import { motion } from 'framer-motion'
import { TrendingUp } from 'lucide-react'
import AnimatedCounter from './AnimatedCounter'

import { heroData } from '../Data'

export default function ImpactStats() {
  const stats = heroData.stats

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="flex justify-center"
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 max-w-5xl mx-auto"
        role="list"
        aria-label="Impact statistics"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
            viewport={{ once: true }}
            className="text-center"
            role="listitem"
          >
            <div className="text-3xl md:text-4xl font-black text-primary mb-2 flex justify-center items-center">
              {stat.value === 'TrendingUp' ? (
                <TrendingUp className="w-10 h-10" />
              ) : (
                <AnimatedCounter end={stat.value} />
              )}
            </div>
            <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}