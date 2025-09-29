import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react'
import { motion } from 'framer-motion'

export default function CompanyInfo({ itemVariants, socialVariants }) {
  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <motion.div
          className="w-10 h-10 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full flex items-center justify-center"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-white font-bold text-lg">D</span>
        </motion.div>
        <span className="text-2xl font-bold">Dara Logistics</span>
      </motion.div>

      <motion.p
        className="text-gray-400 leading-relaxed"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        Global logistics solutions connecting businesses worldwide with reliable,
        efficient, and transparent supply chain management.
      </motion.p>

      <motion.div
        className="flex gap-4"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.4
            }
          }
        }}
      >
        <motion.a
          href="#"
          className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
          variants={socialVariants}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Facebook className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="#"
          className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
          variants={socialVariants}
          whileHover={{ scale: 1.2, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Twitter className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="#"
          className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
          variants={socialVariants}
          whileHover={{ scale: 1.2, rotate: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Linkedin className="w-5 h-5" />
        </motion.a>
        <motion.a
          href="#"
          className="w-10 h-10 bg-gray-800 hover:bg-sky-500 rounded-full flex items-center justify-center transition-colors"
          variants={socialVariants}
          whileHover={{ scale: 1.2, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <Instagram className="w-5 h-5" />
        </motion.a>
      </motion.div>
    </motion.div>
  )
}