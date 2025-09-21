import { Calendar, Package, MapPin, CheckCircle, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function HowItWorks() {
  const steps = [
    {
      icon: Calendar,
      title: "Request Pickup",
      description: "Schedule your shipment online or via phone. Our system instantly calculates optimal routes and pricing for your delivery needs.",
      step: "01"
    },
    {
      icon: Package,
      title: "We Collect & Process",
      description: "Our professional team collects your items, handles documentation, and processes shipments through our automated sorting facilities.",
      step: "02"
    },
    {
      icon: MapPin,
      title: "Real-Time Tracking",
      description: "Monitor your shipment's journey with live GPS tracking, automated notifications, and detailed status updates every step of the way.",
      step: "03"
    },
    {
      icon: CheckCircle,
      title: "On-Time Delivery",
      description: "Your package arrives safely at its destination with proof of delivery, signature confirmation, and customer satisfaction guaranteed.",
      step: "04"
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            How It Works
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Our streamlined logistics process ensures your shipments are handled with precision, 
            transparency, and efficiency from pickup to delivery.
          </motion.p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <motion.div 
                  key={index} 
                  className="relative"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.2,
                    ease: "easeOut" 
                  }}
                >
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <motion.div 
                      className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-sky-200 transform translate-x-4 z-0"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.5 }}
                      style={{ originX: 0 }}
                    >
                      <motion.div 
                        className="absolute right-0 top-1/2 transform -translate-y-1/2"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.2 + 1.0 }}
                      >
                        <ArrowRight className="w-4 h-4 text-sky-400" />
                      </motion.div>
                    </motion.div>
                  )}
                  
                  <div className="relative z-10 text-center">
                    {/* Step Number */}
                    <motion.div 
                      className="inline-flex items-center justify-center w-8 h-8 bg-sky-500 text-white text-sm font-bold rounded-full mb-4"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: index * 0.2 + 0.3,
                        type: "spring",
                        stiffness: 200
                      }}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                    >
                      {step.step}
                    </motion.div>
                    
                    {/* Icon */}
                    <motion.div 
                      className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-6 group-hover:shadow-xl transition-shadow duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                      whileHover={{ 
                        y: -5, 
                        rotate: 5,
                        transition: { duration: 0.3 }
                      }}
                    >
                      <IconComponent className="w-10 h-10 text-sky-500" />
                    </motion.div>
                    
                    {/* Content */}
                    <motion.h3 
                      className="text-xl font-bold text-gray-900 mb-4"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.5 }}
                    >
                      {step.title}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 leading-relaxed"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 + 0.6 }}
                    >
                      {step.description}
                    </motion.p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <motion.h3 
              className="text-2xl font-bold text-gray-900 mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Ready to Get Started?
            </motion.h3>
            <motion.p 
              className="text-gray-600 mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Experience our seamless logistics process today. Schedule your first pickup 
              and see why thousands of businesses trust Dora Logistics.
            </motion.p>
            <Link to="/auth/signup">
              <motion.button 
                className="bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Schedule Pickup Now
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}