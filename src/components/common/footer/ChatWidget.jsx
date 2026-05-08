import { MessageCircle } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ChatWidget() {
  return (
    <motion.div 
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, rotate: -180 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 200, 
        damping: 15,
        delay: 1.5
      }}
    >
      <motion.button 
        className="bg-sky-500 hover:bg-sky-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 group"
        whileHover={{ 
          scale: 1.1,
          boxShadow: "0 20px 40px rgba(14, 165, 233, 0.4)"
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -5, 0]
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }
        }}
      >
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <MessageCircle className="w-6 h-6" />
        </motion.div>
        <motion.div 
          className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [1, 0.7, 1]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute right-full mr-4 bottom-0 bg-gray-900 text-white px-4 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: 10, opacity: 0 }}
          whileHover={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          Need help? Chat with us!
        </motion.div>
      </motion.button>
    </motion.div>
  )
}