import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Package, Shield, MapPin, Zap, TrendingUp, ArrowRight, Truck, Globe, Clock, CheckCircle } from 'lucide-react'
import { SectionHeader, Button } from '../ui'
import { SERVICES_DATA } from '../../constants/mockData'

const handleLearnMore = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

const handleContactSales = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

const handleViewServices = () => {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}

const ServiceCard = ({ service, index }) => {
  const Icon = service.icon === 'Package' ? Package
    : service.icon === 'Shield' ? Shield
      : service.icon === 'MapPin' ? MapPin
        : service.icon === 'Zap' ? Zap
          : service.icon === 'TrendingUp' ? TrendingUp
            : Package // Default fallback

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group relative h-full"
    >
      <div className="relative h-full bg-white rounded-xl md:rounded-[2rem] shadow-lg border border-gray-100 hover:shadow-2xl hover:border-emerald-200 transition-all duration-700 flex flex-col overflow-hidden">
        {/* Image */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <motion.img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            whileHover={{ scale: 1.05 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />

          {/* Icon overlay */}
          <motion.div
            className="absolute top-4 right-4 z-10"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-lg">
              <Icon className="w-5 h-5 md:w-6 md:h-6 text-emerald-600" />
            </div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8 flex-1 flex flex-col">
          {/* Subtle background gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 to-green-50/0 group-hover:from-emerald-50/50 group-hover:to-green-50/30 transition-all duration-700 rounded-xl md:rounded-[2rem] pointer-events-none" />
          <motion.h3
            className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.2 }}
          >
            {service.title}
          </motion.h3>
          <motion.p
            className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 flex-1"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: index * 0.15 + 0.3 }}
          >
            {service.description}
          </motion.p>

          {/* Features */}
          {service.features && (
            <motion.div
              className="space-y-3 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 + 0.4, duration: 0.5 }}
            >
              {service.features.slice(0, 3).map((feature, i) => (
                <motion.div
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-600"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 + 0.5 + (i * 0.1) }}
                >
                  <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{feature}</span>
                </motion.div>
              ))}
            </motion.div>
          )}

          {/* Action */}
          <motion.div
            onClick={handleLearnMore}
            className="flex items-center gap-2 text-emerald-600 font-semibold group-hover:text-emerald-700 transition-colors cursor-pointer mt-auto"
            whileHover={{ x: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <span>Learn More</span>
            <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default function DaraServices() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // Add mock features and images if not present in data
  const enhancedServices = SERVICES_DATA.map((s, index) => ({
    ...s,
    features: s.features || [
      "Real-time tracking available",
      "Insurance coverage included",
      "24/7 Customer support"
    ],
    image: s.image || `/serviceImages/${index + 1}.jpg`
  }))

  return (
    <section id="services" className="py-12 md:py-24 bg-gray-50 relative overflow-hidden" ref={containerRef}>
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-8">
          <SectionHeader
            badge={{ icon: Package, text: 'Our Services' }}
            title="Logistics Solutions"
            subtitle="For Every Scale"
            description="Comprehensive shipping and supply chain services designed to move your business forward with speed, security, and precision."
            className="text-left mb-0 md:max-w-2xl"
          />

          <Button
            onClick={handleViewServices}
            className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 py-3 hidden md:flex items-center gap-2"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Responsive Grid: 1 col mobile, 2 col tablet, 3 col desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {enhancedServices.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}

          {/* CTA Card for last slot if odd number or just extra visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: enhancedServices.length * 0.15,
              ease: [0.25, 0.46, 0.45, 0.94]
            }}
            whileHover={{
              scale: 1.05,
              y: -10,
              transition: { duration: 0.3 }
            }}
            className="relative h-full min-h-[400px] flex flex-col justify-center items-center text-center p-8 rounded-xl md:rounded-[2rem] border-2 border-dashed border-gray-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all duration-500 group cursor-pointer overflow-hidden"
          >
            {/* Animated background effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-emerald-100/0 to-green-100/0 group-hover:from-emerald-100/30 group-hover:to-green-100/20 transition-all duration-700 rounded-xl md:rounded-[2rem]"
              whileHover={{ scale: 1.1 }}
            />

            <motion.div
              className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors relative z-10"
              whileHover={{
                rotate: [0, -15, 15, 0],
                scale: 1.1
              }}
              transition={{ duration: 0.6 }}
            >
              <Truck className="w-8 h-8 text-emerald-600 group-hover:text-emerald-700 transition-colors" />
            </motion.div>

            <motion.h3
              className="text-xl font-bold text-gray-900 mb-2 relative z-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: enhancedServices.length * 0.15 + 0.2 }}
            >
              Need a Custom Solution?
            </motion.h3>

            <motion.p
              className="text-gray-600 mb-6 max-w-xs relative z-10"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: enhancedServices.length * 0.15 + 0.3 }}
            >
              We specialize in tailored logistics strategies for complex supply chains.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: enhancedServices.length * 0.15 + 0.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative z-10"
            >
              <Button onClick={handleContactSales} className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-xl px-6 py-2">
                Contact Sales
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <div className="mt-12 md:hidden text-center">
          <Button
            onClick={handleViewServices}
            className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-6 py-3 w-full justify-center flex items-center gap-2"
          >
            View All Services
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}
