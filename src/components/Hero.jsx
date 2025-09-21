import { ArrowRight, Play, Search, Truck, Plane, Ship, CheckCircle, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section id='home' className="bg-white min-h-screen flex items-center">
      <div className="container mx-auto px-6 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Content */}
            <motion.div 
              className="space-y-10"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div 
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-5xl lg:text-7xl font-bold text-gray-900 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  Global Logistics
                  <motion.span 
                    className="block text-sky-500"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    Made Simple
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl text-gray-600 leading-relaxed max-w-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Connect your business to the world with intelligent supply chain solutions, 
                  real-time tracking, and seamless delivery across 200+ countries.
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <Link to="/auth/signup">
                  <motion.button 
                    className="inline-flex items-center gap-3 bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </motion.button>
                </Link>
                <motion.button 
                  className="inline-flex items-center gap-3 border-2 border-gray-200 hover:border-sky-500 text-gray-700 hover:text-sky-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Play className="w-5 h-5" />
                  Watch Demo
                </motion.button>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-8 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                {[
                  { number: "200+", label: "Countries" },
                  { number: "47K+", label: "Monthly Shipments" },
                  { number: "99.9%", label: "Success Rate" }
                ].map((stat, index) => (
                  <motion.div 
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                  >
                    <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
            
            {/* Visual Dashboard */}
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            >
              <motion.div 
                className="bg-gray-50 rounded-2xl p-8 border border-gray-100"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <motion.div 
                  className="flex items-center justify-between mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900">Live Operations</h3>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <motion.div 
                      className="w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    Real-time
                  </div>
                </motion.div>
                
                <div className="space-y-4">
                  {[
                    { icon: Plane, bg: "bg-blue-100", iconColor: "text-blue-600", title: "Air Freight", route: "Frankfurt → Singapore", status: "Delivered", statusColor: "text-green-600", statusIcon: CheckCircle },
                    { icon: Truck, bg: "bg-sky-100", iconColor: "text-sky-600", title: "Ground Transport", route: "Chicago → Milwaukee", status: "In Transit", statusColor: "text-sky-600", statusIcon: Clock },
                    { icon: Ship, bg: "bg-purple-100", iconColor: "text-purple-600", title: "Ocean Freight", route: "Shanghai → Rotterdam", status: "Customs", statusColor: "text-yellow-600", statusIcon: Clock }
                  ].map((item, index) => {
                    const IconComponent = item.icon
                    const StatusIcon = item.statusIcon
                    return (
                      <motion.div 
                        key={index}
                        className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-100"
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                        whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      >
                        <motion.div 
                          className={`w-12 h-12 ${item.bg} rounded-xl flex items-center justify-center`}
                          whileHover={{ rotate: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          <IconComponent className={`w-6 h-6 ${item.iconColor}`} />
                        </motion.div>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{item.title}</div>
                          <div className="text-sm text-gray-500">{item.route}</div>
                        </div>
                        <div className={`flex items-center gap-2 ${item.statusColor}`}>
                          <StatusIcon className="w-4 h-4" />
                          <span className="text-sm font-medium">{item.status}</span>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
                
                <motion.div 
                  className="mt-6 p-4 bg-sky-50 rounded-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="flex items-center gap-3">
                    <Search className="w-5 h-5 text-sky-600" />
                    <span className="text-sky-900 font-medium">Track any shipment instantly</span>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}