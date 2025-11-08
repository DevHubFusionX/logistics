import { motion } from 'framer-motion'
import { Clock, Package, Truck, Users, ArrowRight, CheckCircle2 } from 'lucide-react'
import Button from './Button'

const iconMap = { Clock, Package, Truck, Users }

export default function ServiceCard({ service, index }) {
  const IconComponent = iconMap[service.icon]

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: 0.5, 
        delay: index * 0.15,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      whileHover={{ y: -8, transition: { duration: 0.3, ease: "easeOut" } }}
      className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden group hover:shadow-2xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full"
    >
      {/* Service Image */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          loading="lazy"
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: index * 0.15 + 0.2,
            ease: "easeOut"
          }}
          className="absolute top-4 right-4 w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <IconComponent className="w-7 h-7 text-primary" />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
          className="absolute bottom-4 left-4 right-4"
        >
          <span className="inline-block px-3 py-1 bg-accent/90 text-white text-xs font-bold rounded-full">
            {service.coverage}
          </span>
        </motion.div>
      </div>

      {/* Service Content */}
      <div className="p-6 flex-1 flex flex-col">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
          className="mb-5"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-1">{service.title}</h3>
          <p className="text-primary font-semibold text-sm mb-3">{service.subtitle}</p>
          <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.4 }}
          className="grid grid-cols-2 gap-3 mb-5 p-4 bg-gradient-to-br from-blue-50 to-green-50 rounded-xl border border-blue-100"
        >
          <div>
            <div className="text-xs text-gray-500 mb-1">Pricing</div>
            <div className="text-sm font-bold text-gray-900">{service.pricing}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500 mb-1">Delivery</div>
            <div className="text-sm font-bold text-gray-900">{service.deliveryTime}</div>
          </div>
        </motion.div>

        {/* Features List */}
        <div className="space-y-2 mb-6 flex-1">
          {service.features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.15 + 0.5 + (i * 0.05),
                ease: "easeOut"
              }}
              className="flex items-start gap-2"
            >
              <CheckCircle2 className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span className="text-xs text-gray-700 leading-relaxed">{feature}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: index * 0.15 + 0.7 }}
        >
          <Button to="/booking/request" className="w-full group/btn" variant="primary">
            <span>Get Quote</span>
            <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}