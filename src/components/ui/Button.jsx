import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  to, 
  onClick, 
  className = '',
  animate = true,
  ...props 
}) {
  const variants = {
    primary: 'bg-green-500 text-white hover:bg-green-600',
    secondary: 'border-2 border-white/30 text-white bg-white/10 backdrop-blur-md hover:bg-white/15',
    outline: 'border-2 border-gray-200 text-gray-700 hover:border-sky-300 hover:bg-sky-50'
  }

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  const baseClasses = `font-bold rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2 ${variants[variant]} ${sizes[size]} ${className}`

  const Component = animate ? motion.button : 'button'
  const animationProps = animate ? {
    whileHover: { scale: 1.05, y: -2 },
    whileTap: { scale: 0.95 }
  } : {}

  if (to) {
    return (
      <Link to={to}>
        <Component className={baseClasses} onClick={onClick} {...animationProps} {...props}>
          {children}
        </Component>
      </Link>
    )
  }

  return (
    <Component className={baseClasses} onClick={onClick} {...animationProps} {...props}>
      {children}
    </Component>
  )
}