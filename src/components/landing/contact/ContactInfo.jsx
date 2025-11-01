import { motion } from 'framer-motion'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function ContactInfo() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Call Us",
      content: "+2348115779007\n+2349121168485",
      color: "bg-accent"
    },
    {
      icon: Mail,
      title: "Email Us",
      content: "hello@daraexpress.com\ncontact@daraexpress.com",
      color: "bg-primary"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "35, Lateef Jakande Road, Agidigbi Lagos\n10, Hughes Avenue, Yaba, Lagos State",
      color: "bg-primary"
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white p-6 sm:p-8 rounded-3xl shadow-lg border border-gray-100"
    >
        <h3 className="text-xl sm:text-2xl font-heading text-gray-900 mb-4 sm:mb-6">Contact Information</h3>
        <div className="space-y-6">
          {contactMethods.map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex items-start gap-3 sm:gap-4"
              >
                <div className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
    </motion.div>
  )
}
