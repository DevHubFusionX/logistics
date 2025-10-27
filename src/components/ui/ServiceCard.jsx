import { motion } from 'framer-motion'
import { Clock, Package, Truck, Users } from 'lucide-react'
import Button from './Button'
import { slideInUp, hoverLift, fadeInUp } from '../../utils/animations'

const iconMap = { Clock, Package, Truck, Users }

export default function ServiceCard({ service, index }) {
  const IconComponent = iconMap[service.icon]

  return (
    <motion.div
      {...slideInUp}
      transition={{ ...slideInUp.transition, delay: index * 0.1 }}
      {...hoverLift}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
    >
      {/* Service Image */}
      <div className="relative h-48 overflow-hidden">
        <motion.img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
          className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
        >
          <IconComponent className="w-6 h-6 text-sky-600" />
        </motion.div>
      </div>

      {/* Service Content */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
          className="mb-6"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
          <p className="text-sky-600 font-semibold mb-4">{service.subtitle}</p>
          <p className="text-gray-600 leading-relaxed">{service.description}</p>
        </motion.div>

        {/* Service Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
          className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl"
        >
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{service.pricing}</div>
            <div className="text-xs text-gray-500">Starting price</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{service.deliveryTime}</div>
            <div className="text-xs text-gray-500">Delivery time</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-gray-900">{service.coverage}</div>
            <div className="text-xs text-gray-500">Coverage</div>
          </div>
        </motion.div>

        {/* Features List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
          className="space-y-3 mb-6"
        >
          {service.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-600">{feature}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          {...fadeInUp}
          transition={{ ...fadeInUp.transition, delay: index * 0.1 + 0.7 }}
        >
          <Button className="w-full" variant="primary">
            Get Quote
          </Button>
        </motion.div>
      </div>
    </motion.div>
  )
}