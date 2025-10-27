import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Lagos Office',
    details: ['Plot 15, Adeola Odeku Street', 'Victoria Island, Lagos', 'Nigeria'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Phone,
    title: 'Phone & WhatsApp',
    details: ['+234 (0) 1 234 5678', '+234 (0) 809 123 4567', 'WhatsApp: +234 809 123 4567'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Mail,
    title: 'Email Support',
    details: ['hello@daralogistics.ng', 'support@daralogistics.ng', 'sales@daralogistics.ng'],
    color: 'from-sky-500 to-blue-600'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', '24/7 WhatsApp Support'],
    color: 'from-purple-500 to-pink-600'
  }
]

export default function ContactInfo() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
            Multiple Ways to Reach Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choose your preferred method of communication - we're available 24/7
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all`}
              >
                <info.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-sky-600 transition-colors">{info.title}</h3>
              <div className="space-y-2">
                {info.details.map((detail, i) => (
                  <p key={i} className="text-gray-600 font-medium">{detail}</p>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}