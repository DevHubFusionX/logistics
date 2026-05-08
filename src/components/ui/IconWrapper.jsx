import { motion } from 'framer-motion'
import { getColorClasses } from '../../utils/helpers'

export default function IconWrapper({ 
  icon: Icon, 
  color = 'blue', 
  size = 'md', 
  animate = true,
  className = '' 
}) {
  const sizes = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12', 
    lg: 'w-16 h-16'
  }

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  }

  const colors = getColorClasses(color)
  const Component = animate ? motion.div : 'div'
  
  const animationProps = animate ? {
    initial: { scale: 0, rotate: -180 },
    whileInView: { scale: 1, rotate: 0 },
    viewport: { once: true },
    transition: { duration: 0.6, type: "spring", stiffness: 200 },
    whileHover: { rotate: 5, scale: 1.1 }
  } : {}

  return (
    <Component
      {...animationProps}
      className={`${sizes[size]} ${colors.bg} rounded-2xl flex items-center justify-center ${className}`}
    >
      <Icon className={`${iconSizes[size]} ${colors.text}`} />
    </Component>
  )
}