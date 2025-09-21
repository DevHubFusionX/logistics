import { motion } from 'framer-motion'
import { ArrowRight, User, Shield, LogIn, Building, CheckCircle, CreditCard, Package, Truck, Bell, FileText, Home } from 'lucide-react'

export default function FlowDiagram() {
  const flowSteps = [
    { id: 1, title: 'Start', description: 'Landing Page', icon: Home, color: 'bg-gray-500', route: '/' },
    { id: 2, title: 'Sign Up', description: 'Create Account', icon: User, color: 'bg-blue-500', route: '/auth/signup' },
    { id: 3, title: 'OTP Verification', description: 'Email/SMS Verify', icon: Shield, color: 'bg-green-500', route: '/auth/verify-otp' },
    { id: 4, title: 'Login', description: 'Access Account', icon: LogIn, color: 'bg-purple-500', route: '/auth/login' },
    { id: 5, title: 'Profile Setup', description: 'Company + KYC', icon: Building, color: 'bg-orange-500', route: '/onboarding/profile-setup' },
    { id: 6, title: 'Admin Approval', description: 'KYC Review', icon: CheckCircle, color: 'bg-yellow-500', route: '/onboarding/kyc-pending' },
    { id: 7, title: 'Dashboard', description: 'Company Portal', icon: Package, color: 'bg-sky-500', route: '/dashboard' },
    { id: 8, title: 'Booking Request', description: 'Shipment Details', icon: Package, color: 'bg-indigo-500', route: '/booking/request' },
    { id: 9, title: 'Price Quote', description: 'Calculate Cost', icon: CreditCard, color: 'bg-pink-500', route: '/booking/quotation' },
    { id: 10, title: 'Payment', description: 'Confirm & Pay', icon: CreditCard, color: 'bg-red-500', route: '/booking/payment' },
    { id: 11, title: 'Truck Assigned', description: 'Driver Allocated', icon: Truck, color: 'bg-teal-500', route: '/tracking' },
    { id: 12, title: 'Tracking', description: 'Live Updates', icon: Bell, color: 'bg-cyan-500', route: '/tracking' },
    { id: 13, title: 'Invoice', description: 'Download Receipt', icon: FileText, color: 'bg-emerald-500', route: '/invoice/DL-1001' }
  ]

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Complete User Journey</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From registration to delivery - experience our streamlined logistics platform
          </p>
        </motion.div>

        {/* Desktop Flow */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Flow Steps */}
            <div className="grid grid-cols-7 gap-4 mb-8">
              {flowSteps.slice(0, 7).map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="text-center">
                      <motion.div 
                        className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Arrow */}
                    {index < 6 && (
                      <motion.div 
                        className="absolute top-8 -right-2 transform translate-x-full"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-6 gap-4 mt-12">
              {flowSteps.slice(7).map((step, index) => {
                const IconComponent = step.icon
                return (
                  <motion.div
                    key={step.id}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: (index + 7) * 0.1 }}
                  >
                    <div className="text-center">
                      <motion.div 
                        className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-3 cursor-pointer`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </motion.div>
                      <h3 className="font-semibold text-gray-900 text-sm mb-1">{step.title}</h3>
                      <p className="text-xs text-gray-600">{step.description}</p>
                    </div>
                    
                    {/* Arrow */}
                    {index < 5 && (
                      <motion.div 
                        className="absolute top-8 -right-2 transform translate-x-full"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: (index + 7) * 0.1 + 0.3 }}
                      >
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>

            {/* Connecting Arrow */}
            <motion.div 
              className="absolute top-20 right-0 transform translate-x-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 1.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-0.5 h-8 bg-gray-300"></div>
                <ArrowRight className="w-4 h-4 text-gray-400 transform rotate-90" />
                <div className="w-0.5 h-8 bg-gray-300"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mobile Flow */}
        <div className="lg:hidden">
          <div className="space-y-6">
            {flowSteps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div
                  key={step.id}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <motion.div 
                    className={`w-12 h-12 ${step.color} rounded-full flex items-center justify-center flex-shrink-0`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{step.title}</h3>
                    <p className="text-sm text-gray-600">{step.description}</p>
                  </div>
                  
                  {index < flowSteps.length - 1 && (
                    <ArrowRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Key Features */}
        <motion.div 
          className="mt-16 grid md:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="text-center p-6 bg-sky-50 rounded-xl">
            <Shield className="w-12 h-12 text-sky-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Secure Process</h3>
            <p className="text-gray-600">End-to-end encryption and KYC compliance for maximum security</p>
          </div>
          
          <div className="text-center p-6 bg-green-50 rounded-xl">
            <Bell className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h3>
            <p className="text-gray-600">Live notifications and tracking throughout the entire journey</p>
          </div>
          
          <div className="text-center p-6 bg-purple-50 rounded-xl">
            <Package className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Complete Solution</h3>
            <p className="text-gray-600">From booking to delivery with professional documentation</p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}