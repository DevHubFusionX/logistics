import { motion } from 'framer-motion'

export default function AnimatedLogo({ className = "h-10" }) {
  return (
    <motion.img
      src="/assets/img/dara-logo.png"
      alt="Dara Logistics"
      className={className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.05 }}
    />
  )
}
