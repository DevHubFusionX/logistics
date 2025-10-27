import { motion } from 'framer-motion'
import { slideInUp, hoverLift } from '../../utils/animations'

export default function FeatureCard({ icon: Icon, title, description, index, iconColor = 'bg-sky-500' }) {
  return (
    <motion.div
      {...slideInUp}
      transition={{ ...slideInUp.transition, delay: index * 0.1 }}
      {...hoverLift}
      className="text-center group"
    >
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        className={`w-16 h-16 ${iconColor} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-600 transition-colors`}
      >
        <Icon className="w-8 h-8 text-white" />
      </motion.div>
      <h4 className="text-lg font-bold text-gray-900 mb-2">{title}</h4>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  )
}