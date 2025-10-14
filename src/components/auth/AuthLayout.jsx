import { motion } from 'framer-motion'
import { BarChart3, Users, TrendingUp, Award } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }) {
  const stats = [
    { icon: BarChart3, value: "99.9%", label: "Delivery Success Rate" },
    { icon: Users, value: "10K+", label: "Active Businesses" },
    { icon: TrendingUp, value: "40%", label: "Cost Reduction" },
    { icon: Award, value: "#1", label: "Logistics Platform" }
  ]

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Column - Content */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 to-blue-700 p-12 flex-col justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-lg">
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <span className="text-sky-600 font-bold text-xl">D</span>
            </div>
            <span className="text-white text-2xl font-bold">Dara Logistics</span>
          </motion.div>

          <motion.h1
            className="text-4xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            {title || "Welcome to Your Logistics Command Center"}
          </motion.h1>

          <motion.p
            className="text-sky-100 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            {subtitle || "Access your comprehensive dashboard to manage shipments, track deliveries, and optimize your supply chain operations with real-time insights and analytics."}
          </motion.p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sky-200 text-sm">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>

          <motion.div
            className="p-6 bg-sky-500/20 rounded-xl border border-sky-400/30"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <h3 className="text-white font-semibold mb-2">Secure & Compliant</h3>
            <p className="text-sky-100 text-sm">
              Your data is protected with enterprise-grade security, SOC 2 compliance, and end-to-end encryption for complete peace of mind.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  )
}