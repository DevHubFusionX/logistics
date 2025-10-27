import { motion } from 'framer-motion'
import { Truck, Shield, Clock, Users, CheckCircle } from 'lucide-react'

export default function AuthLayout({ children, title, subtitle }) {
  const features = [
    { icon: Truck, title: "Real-Time Tracking", desc: "Monitor every shipment" },
    { icon: Shield, title: "Secure Operations", desc: "Enterprise-grade security" },
    { icon: Clock, title: "24/7 Support", desc: "Round-the-clock assistance" },
    { icon: Users, title: "Trusted by 10K+", desc: "Businesses nationwide" }
  ]

  const achievements = [
    "99.9% On-Time Delivery Rate",
    "ISO 9001:2015 Certified",
    "24/7 Customer Support",
    "Real-Time GPS Tracking"
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex">
      {/* Left Column - Branding & Features */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 via-sky-700 to-blue-800 p-12 flex-col justify-center relative overflow-hidden"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-32 h-32 border border-white rounded-full"></div>
          <div className="absolute bottom-32 right-16 w-24 h-24 border border-white rounded-full"></div>
          <div className="absolute top-1/2 right-32 w-16 h-16 border border-white rounded-full"></div>
        </div>

        <div className="max-w-lg relative z-10">
          {/* Logo Section */}
          <motion.div
            className="flex items-center gap-4 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <img 
              src="/src/assets/img/logo/DARA 1.png" 
              alt="Dara Logistics" 
              className="w-48 h-48 object-contain filter brightness-0 invert"
            />
          </motion.div>

          {/* Main Content */}
          <motion.h2
            className="text-4xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Nigeria's Leading
            <br />
            <span className="text-sky-200">Logistics Platform</span>
          </motion.h2>

          <motion.p
            className="text-sky-100 text-lg mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Streamline your supply chain with our comprehensive logistics management system. 
            From last-mile delivery to enterprise solutions.
          </motion.p>

          {/* Features Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  className="bg-sky-500/20 backdrop-blur-sm p-4 rounded-xl border border-sky-400/30"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                >
                  <IconComponent className="w-8 h-8 text-sky-200 mb-2" />
                  <h4 className="text-white font-semibold text-sm mb-1">{feature.title}</h4>
                  <p className="text-sky-200 text-xs">{feature.desc}</p>
                </motion.div>
              )
            })}
          </div>

          {/* Achievements */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 + index * 0.1 }}
              >
                <CheckCircle className="w-5 h-5 text-sky-300" />
                <span className="text-sky-100 text-sm font-medium">{achievement}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Right Column - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <motion.div
            className="lg:hidden flex items-center justify-center gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <img 
              src="/src/assets/img/logo/DARA 1.png" 
              alt="Dara Logistics" 
              className="w-32 h-32 object-contain filter brightness-0 invert"
            />
          </motion.div>
          {children}
        </div>
      </div>
    </div>
  )
}