import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const offices = [
  {
    city: 'Lagos - Yaba',
    address: '10, Hughes Avenue, Yaba, Lagos State',
    phone: '+234 912 116 8485',
    type: 'Head Office'
  }
]

export default function OfficeLocations() {
  return (
    <div>
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-heading text-gray-900 mb-8 text-center"
      >
        Our Office Locations
      </motion.h3>
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {offices.map((office, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{office.city}</h4>
                <span className="text-xs text-primary font-semibold">{office.type}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{office.address}</p>
            <p className="text-sm font-semibold text-gray-900">{office.phone}</p>
          </motion.div>
        ))}
      </div>
    </div>
  )
}