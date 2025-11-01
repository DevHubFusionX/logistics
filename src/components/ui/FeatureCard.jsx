import { motion } from 'framer-motion'
import { slideInUp, hoverLift } from '../../utils/animations'

export default function FeatureCard({ icon: Icon, title, description, index, iconColor = 'bg-primary' }) {
  return (
    <motion.div
      {...slideInUp}
      transition={{ ...slideInUp.transition, delay: index * 0.1 }}
      {...hoverLift}
      className="text-center group p-6 rounded-2xl hover:bg-white transition-colors"
    >
      <motion.div
        whileHover={{ rotate: 5, scale: 1.1 }}
        className={`w-20 h-20 ${iconColor} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-accent transition-colors shadow-lg`}
      >
        <Icon className="w-10 h-10 text-white" />
      </motion.div>
      <h4 className="text-xl font-bold text-gray-900 mb-3 tracking-tight">{title}</h4>
      <p className="text-gray-600 text-base leading-relaxed">{description}</p>
    </motion.div>
  )
}