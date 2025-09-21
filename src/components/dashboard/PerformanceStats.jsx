import { motion } from 'framer-motion'
import { Package, TrendingUp, Clock, DollarSign } from 'lucide-react'

export default function PerformanceStats() {
  const stats = [
    { title: 'Active Shipments', value: '24', change: '+12%', icon: Package, color: 'sky', description: 'Currently in transit' },
    { title: 'Monthly Revenue', value: '$45.2K', change: '+18%', icon: DollarSign, color: 'green', description: 'This month earnings' },
    { title: 'Avg Delivery Time', value: '2.3 days', change: '-8%', icon: Clock, color: 'blue', description: 'Faster than last month' },
    { title: 'Customer Rating', value: '4.9/5', change: '+2%', icon: TrendingUp, color: 'purple', description: 'Satisfaction score' }
  ]

  return (
    <motion.div 
      className="mb-12"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="text-center mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Performance Overview</h2>
        <p className="text-gray-600 text-sm sm:text-base">Real-time insights into your logistics operations</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <motion.div 
              key={index}
              className="bg-white/70 backdrop-blur-sm rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50 hover:shadow-xl transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${stat.color === 'sky' ? 'from-sky-400 to-sky-600' : stat.color === 'green' ? 'from-green-400 to-green-600' : stat.color === 'blue' ? 'from-blue-400 to-blue-600' : 'from-purple-400 to-purple-600'} rounded-xl flex items-center justify-center shadow-lg`}>
                  <IconComponent className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {stat.change}
                </div>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
              <p className="text-gray-900 font-medium mb-1 text-sm sm:text-base">{stat.title}</p>
              <p className="text-gray-600 text-xs sm:text-sm">{stat.description}</p>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}