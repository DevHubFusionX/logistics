import { Phone, Mail, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ContactInfo({ itemVariants }) {
  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      <motion.h3 
        className="text-lg font-semibold"
        whileHover={{ color: "#0ea5e9" }}
        transition={{ duration: 0.3 }}
      >
        Contact Us
      </motion.h3>
      <motion.div 
        className="space-y-4"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.2
            }
          }
        }}
      >
        <motion.div 
          className="flex items-center gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: 10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Phone className="w-5 h-5 text-sky-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">+1 (800) DORA-LOG</p>
            <p className="text-gray-400 text-sm">24/7 Customer Support</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.2, rotate: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Mail className="w-5 h-5 text-sky-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">support@doralogistics.com</p>
            <p className="text-gray-400 text-sm">General Inquiries</p>
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-3"
          variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0 }
          }}
          whileHover={{ x: 5 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            whileHover={{ scale: 1.2, y: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MapPin className="w-5 h-5 text-sky-400" />
          </motion.div>
          <div>
            <p className="text-white font-medium">Global Headquarters</p>
            <p className="text-gray-400 text-sm">New York, NY 10001</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}