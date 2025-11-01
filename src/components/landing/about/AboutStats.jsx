import { motion } from 'framer-motion'
import { MapPin, Package, Users, TrendingUp } from 'lucide-react'

export default function AboutStats() {
  const stats = [
    { icon: MapPin, number: "36", label: "States Covered" },
    { icon: Package, number: "50K+", label: "Successful Deliveries" },
    { icon: Users, number: "1K+", label: "Happy Businesses" },
    { icon: TrendingUp, number: "99.2%", label: "On-Time Performance" }
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
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
                <div className="text-3xl sm:text-4xl font-heading text-gray-900 mb-2">{stat.number}</div>
                <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
