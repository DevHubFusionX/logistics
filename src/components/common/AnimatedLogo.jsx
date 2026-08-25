import { motion } from 'framer-motion'

export default function AnimatedLogo({ className = "h-5 sm:h-6", isDarkText = false }) {
  const logoSrc = isDarkText ? "/black.svg" : "/white.svg"
  return (
    <motion.div
      className={`${className} flex items-center`}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      whileHover={{ scale: 1.03 }}
    >
      <img
        src={logoSrc}
        alt="Dara Logo"
        className="h-full w-auto object-contain"
      />
    </motion.div>
  )
}
