import { motion } from 'framer-motion'
import { Package, TrendingUp, Clock, DollarSign } from 'lucide-react'

export default function PerformanceStats({ bookings, loading }) {
  const activeCount = bookings.filter(b => ['pending', 'confirmed', 'in-transit'].includes(b.status?.toLowerCase())).length;
  const deliveredCount = bookings.filter(b => b.status?.toLowerCase() === 'delivered').length;
  
  const stats = [
    { title: 'Active', value: loading ? '...' : activeCount.toString(), icon: Package, color: 'from-sky-400 to-sky-600' },
    { title: 'Total', value: loading ? '...' : bookings.length.toString(), icon: TrendingUp, color: 'from-green-400 to-green-600' },
    { title: 'Delivered', value: loading ? '...' : deliveredCount.toString(), icon: Clock, color: 'from-blue-400 to-blue-600' }
  ]

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-6">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon
        return (
          <motion.div 
            key={index}
            className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className={`w-10 h-10 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center mb-3`}>
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.title}</p>
          </motion.div>
        )
      })}
    </div>
  )
}