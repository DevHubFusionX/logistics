import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

const offices = [
  {
    city: 'Lagos',
    address: 'Plot 15, Adeola Odeku Street, Victoria Island',
    phone: '+234 (0) 1 234 5678',
    type: 'Head Office'
  },
  {
    city: 'Abuja',
    address: 'Suite 45, Aminu Kano Crescent, Wuse II',
    phone: '+234 (0) 9 876 5432',
    type: 'Regional Office'
  },
  {
    city: 'Port Harcourt',
    address: '12 Aba Road, GRA Phase II',
    phone: '+234 (0) 84 123 456',
    type: 'Regional Office'
  },
  {
    city: 'Kano',
    address: '8 Murtala Mohammed Way, Fagge',
    phone: '+234 (0) 64 789 012',
    type: 'Regional Office'
  }
]

export default function OfficeLocations() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="bg-gray-50 rounded-3xl p-8"
    >
      <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Office Locations</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {offices.map((office, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                <MapPin className="w-5 h-5 text-sky-600" />
              </div>
              <div>
                <h4 className="font-bold text-gray-900">{office.city}</h4>
                <span className="text-xs text-sky-600 font-semibold">{office.type}</span>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-2">{office.address}</p>
            <p className="text-sm font-semibold text-gray-900">{office.phone}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}