import { motion } from 'framer-motion'
import Badge from './Badge'

export default function SectionHeader({ 
  badge, 
  title, 
  subtitle, 
  description, 
  className = '' 
}) {
  return (
    <div className={`text-center mb-20 ${className}`}>
      {badge && (
        <Badge className="mb-8">
          {badge.icon && <badge.icon className="w-4 h-4" />}
          <span className="text-sm font-bold uppercase tracking-wide">{badge.text}</span>
        </Badge>
      )}
      
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8"
      >
        {title}
        {subtitle && (
          <>
            <br />
            <span className="text-sky-600">{subtitle}</span>
          </>
        )}
      </motion.h2>
      
      {description && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}