import { motion } from 'framer-motion'
import { Truck, Shield, Clock, Globe } from 'lucide-react'

export default function AuthLayout({ children }) {
  const features = [
    {
      icon: <Truck className="w-6 h-6" />,
      title: "Global Shipping",
      description: "Worldwide logistics solutions"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure Platform",
      description: "Enterprise-grade security"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "24/7 Support",
      description: "Round-the-clock assistance"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Real-time Tracking",
      description: "Live shipment monitoring"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-100 flex">
      {/* Left Side - Features */}
      <motion.div
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 to-blue-700 p-12 flex-col justify-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-md">
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
            className="text-4xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Streamline Your Global Logistics
          </motion.h1>

          <motion.p
            className="text-sky-100 text-lg mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Join thousands of businesses worldwide who trust us with their shipping and logistics needs.
          </motion.p>

          <div className="space-y-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="w-12 h-12 bg-sky-500 rounded-lg flex items-center justify-center text-white">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-white font-semibold">{feature.title}</h3>
                  <p className="text-sky-100 text-sm">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right Side - Auth Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        {children}
      </div>
    </div>
  )
}