import { motion } from 'framer-motion'
import AnimatedCounter from './AnimatedCounter'

export default function ImpactStats() {
  const stats = [
    { number: '50K+', label: 'Successful Deliveries' },
    { number: '1000+', label: 'Business Partners' },
    { number: '36', label: 'States Covered' },
    { number: '99.2%', label: 'On-Time Performance' }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      viewport={{ once: true }}
      className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
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
          <div className="text-3xl md:text-4xl font-black text-sky-600 mb-2">
            <AnimatedCounter end={stat.number} />
          </div>
          <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
        </motion.div>
      ))}
    </motion.div>
  )
}