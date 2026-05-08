import { motion } from 'framer-motion'

export default function Badge({ children, variant = 'default', className = '', animate = true }) {
  const variants = {
    default: 'bg-sky-50 text-gray-700',
    success: 'bg-green-50 text-green-700',
    primary: 'bg-blue-50 text-blue-700'
  }

  const Component = animate ? motion.div : 'div'
  const animationProps = animate ? {
    initial: { opacity: 0, scale: 0.8 },
    whileInView: { opacity: 1, scale: 1 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  } : {}

  return (
    <Component
      {...animationProps}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${variants[variant]} ${className}`}
    >
      {children}
    </Component>
  )
}