import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Package, DollarSign, Zap, Info, Phone, Briefcase, LogIn, X } from 'lucide-react'

const navItems = [
  { label: 'Home', href: '/', icon: Home },
  { label: 'Our Services', to: '/services', icon: Package },
  { label: 'Pricing', to: '/pricing', icon: DollarSign },
  { label: 'Solutions', href: '#solutions', icon: Zap },
  { label: 'About Us', to: '/about', icon: Info },
  { label: 'Contact', href: '#contact', icon: Phone }
]

const actionButtons = [
  { label: 'Get Quote', to: '/auth/signup', variant: 'outline', icon: Briefcase },
  { label: 'Client Portal', to: '/auth/login', variant: 'primary', icon: LogIn }
]

const navAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.6, delay: 0.2 }
}

const buttonAnimation = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 }
}

const mobileItemAnimation = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.4, delay: 0.2 }
}

const mobileButtonAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.4, delay: 0.3 }
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-6xl px-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <motion.div
          className="bg-white/90 backdrop-blur-xl border border-sky-200 rounded-full px-8 py-4 shadow-2xl"
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
        >
          <div className="flex items-center justify-between text-gray-800">
            {/* Logo Section */}
            <motion.div
              className="flex items-center gap-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <motion.div
                className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
              >
                <span className="text-white font-bold text-sm">D</span>
              </motion.div>
              <span className="font-bold text-xl text-gray-800">Dara Logistics</span>
            </motion.div>

            {/* Navigation Links - Desktop */}
            <motion.div
              className="hidden md:flex items-center gap-10"
              {...navAnimation}
            >
              {navItems.map((item, index) => {
                const Component = item.to ? Link : 'a'
                const props = item.to ? { to: item.to } : { href: item.href }
                return (
                  <Component
                    key={index}
                    {...props}
                    className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
                  </Component>
                )
              })}
            </motion.div>

            {/* Action Buttons & Mobile Menu */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {actionButtons.map((button, index) => (
                <Link key={index} to={button.to}>
                  <motion.button
                    className={`hidden sm:block px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${button.variant === 'primary'
                      ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 px-6 font-semibold shadow-lg text-white'
                      : 'border border-sky-400/50 text-sky-500 hover:bg-sky-50'
                      }`}
                    {...buttonAnimation}
                  >
                    {button.label}
                  </motion.button>
                </Link>
              ))}

              {/* Mobile Menu Button */}
              <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-sky-50 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <motion.span
                    className="block w-5 h-0.5 bg-gray-800"
                    animate={isOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block w-5 h-0.5 bg-gray-800 mt-1"
                    animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="block w-5 h-0.5 bg-gray-800 mt-1"
                    animate={isOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-60 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="absolute inset-0 bg-black/50"
              onClick={() => setIsOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-80 bg-gradient-to-b from-white to-sky-50 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              {/* Header with Close Button */}
              <div className="flex items-center justify-between p-6 border-b border-sky-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">D</span>
                  </div>
                  <span className="font-bold text-lg text-gray-800">Navigation</span>
                </div>
                <motion.button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-sky-100 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X className="w-5 h-5 text-gray-600" />
                </motion.button>
              </div>

              {/* Navigation Menu */}
              <div className="p-6">
                <motion.div
                  className="space-y-1"
                  {...mobileItemAnimation}
                >
                  {navItems.map((item, index) => {
                    const Component = item.to ? Link : 'a'
                    const props = item.to ? { to: item.to } : { href: item.href }
                    const Icon = item.icon
                    return (
                      <Component
                        key={index}
                        {...props}
                        className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group"
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                        <span className="font-medium">{item.label}</span>
                      </Component>
                    )
                  })}
                </motion.div>

                {/* Divider */}
                <div className="my-6 border-t border-sky-200"></div>

                {/* Action Buttons */}
                <motion.div
                  className="space-y-3 flex flex-col gap-2"
                  {...mobileButtonAnimation}
                >
                  {actionButtons.map((button, index) => {
                    const Icon = button.icon
                    return (
                      <Link key={index} to={button.to} onClick={() => setIsOpen(false)}>
                        <button className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${button.variant === 'primary'
                          ? 'bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 font-semibold text-white shadow-lg'
                          : 'border border-sky-400/50 text-sky-600 hover:bg-sky-100'
                          }`}>
                          <Icon className="w-4 h-4" />
                          {button.label}
                        </button>
                      </Link>
                    )
                  })}
                </motion.div>

                {/* Footer Info */}
                <motion.div
                  className="mt-8 p-4 bg-sky-100/50 rounded-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                >
                  <p className="text-xs text-gray-600 text-center">
                    24/7 Global Operations
                  </p>
                  <p className="text-xs text-sky-600 text-center font-medium mt-1">
                    +1 (800) Dara-LOG
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}