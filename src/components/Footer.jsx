import { motion } from 'framer-motion'
import CompanyInfo from './footer/CompanyInfo'
import QuickLinks from './footer/QuickLinks'
import ServicesLinks from './footer/ServicesLinks'
import ContactInfo from './footer/ContactInfo'
import ChatWidget from './footer/ChatWidget'

export default function Footer() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  const socialVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15
      }
    }
  }

  return (
    <>
      <motion.footer 
        className="bg-gray-900 text-white py-16"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-6">
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
          >
            <CompanyInfo itemVariants={itemVariants} socialVariants={socialVariants} />
            <QuickLinks itemVariants={itemVariants} />
            <ServicesLinks itemVariants={itemVariants} />
            <ContactInfo itemVariants={itemVariants} />
          </motion.div>

          {/* Bottom Bar */}
          <motion.div 
            className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <motion.p 
              className="text-gray-400 text-sm"
              whileHover={{ color: "#9ca3af" }}
              transition={{ duration: 0.3 }}
            >
              &copy; 2024 Dora Logistics. All rights reserved. | Privacy Policy | Terms of Service
            </motion.p>
            <motion.div 
              className="flex items-center gap-4"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="text-gray-400 text-sm">Available 24/7</span>
              <motion.div 
                className="w-2 h-2 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.footer>

      <ChatWidget />
    </>
  )
}