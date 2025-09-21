import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Home, Package, DollarSign, Zap, Info, Phone, Briefcase, LogIn, X } from 'lucide-react'

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
              <span className="font-bold text-xl text-gray-800">Dora Logistics</span>
            </motion.div>
            
            {/* Navigation Links - Desktop */}
            <motion.div 
              className="hidden md:flex items-center gap-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <a href="/" id='home' className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group">
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link to="/services" className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group">
                Our Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link to="/pricing" className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group">
                Pricing
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a href="#solutions" className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group">
                Solutions
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <Link to="/about" className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group">
                About Us
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <a href="#contact" className="hover:text-sky-500 transition-all duration-300 text-sm font-medium relative group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-sky-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </motion.div>
            
            {/* Action Buttons & Mobile Menu */}
            <motion.div 
              className="flex items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link to="/auth/signup">
                <motion.button 
                  className="hidden sm:block border border-sky-400/50 text-sky-500 hover:bg-sky-50 px-5 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Quote
                </motion.button>
              </Link>
              <Link to="/auth/login">
                <motion.button 
                  className="hidden sm:block bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Client Portal
                </motion.button>
              </Link>
              
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
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                >
                  <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                    <Home className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                    <span className="font-medium">Home</span>
                  </a>
                  <Link to="/services" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                    <Package className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                    <span className="font-medium">Logistics Services</span>
                  </Link>
                  <Link to="/pricing" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                    <DollarSign className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                    <span className="font-medium">Pricing Plans</span>
                  </Link>
                  <a href="#solutions" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                    <Zap className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                    <span className="font-medium">Enterprise Solutions</span>
                  </a>
                  <Link to="/about" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                    <Info className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                    <span className="font-medium">About Company</span>
                  </Link>
                  <a href="#contact" className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-800 hover:bg-sky-100 hover:text-sky-600 transition-all duration-200 group" onClick={() => setIsOpen(false)}>
                    <Phone className="w-5 h-5 text-sky-500 group-hover:text-sky-600" />
                    <span className="font-medium">Contact Support</span>
                  </a>
                </motion.div>
                
                {/* Divider */}
                <div className="my-6 border-t border-sky-200"></div>
                
                {/* Action Buttons */}
                <motion.div 
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                >
                  <Link to="/auth/signup" onClick={() => setIsOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 border border-sky-400/50 text-sky-600 hover:bg-sky-100 px-6 py-3 rounded-lg font-medium transition-all duration-300">
                      <Briefcase className="w-4 h-4" />
                      Request Consultation
                    </button>
                  </Link>
                  <Link to="/auth/login" onClick={() => setIsOpen(false)}>
                    <button className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 px-6 py-3 rounded-lg font-semibold transition-all duration-300 text-white shadow-lg">
                      <LogIn className="w-4 h-4" />
                      Client Portal Access
                    </button>
                  </Link>
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
                    +1 (800) DORA-LOG
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