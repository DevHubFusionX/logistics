import { motion } from 'framer-motion'
import { Truck, Package, Plane, Ship } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-sky-900 to-blue-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main Logo Container */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            duration: 1.2,
            ease: "backOut",
            delay: 0.3
          }}
        >
          {/* Central Hub */}
          <div className="relative w-32 h-32 mx-auto">
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-2xl flex items-center justify-center"
              animate={{ 
                boxShadow: [
                  "0 0 20px rgba(56, 189, 248, 0.5)",
                  "0 0 40px rgba(56, 189, 248, 0.8)",
                  "0 0 20px rgba(56, 189, 248, 0.5)"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Package className="w-16 h-16 text-white" />
            </motion.div>
            
            {/* Orbiting Vehicles */}
            {[Truck, Plane, Ship].map((Icon, index) => (
              <motion.div
                key={index}
                className="absolute w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-24px',
                  marginLeft: '-24px'
                }}
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                  delay: index * 0.5
                }}
                transformTemplate={({ rotate }) => 
                  `translate(-50%, -50%) rotate(${rotate}) translateY(-60px) rotate(-${rotate})`
                }
              >
                <Icon className="w-6 h-6 text-sky-500" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Company Name with Typewriter Effect */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <motion.h1 
            className="text-7xl font-bold text-white mb-4 tracking-wider"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8 }}
          >
            {'DORA'.split('').map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: 1.8 + i * 0.1,
                  duration: 0.5,
                  ease: "backOut"
                }}
              >
                {letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div
            className="flex items-center justify-center gap-2 text-2xl text-sky-200 font-light"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 2.2, duration: 0.6 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Global
            </motion.span>
            <motion.div 
              className="w-2 h-2 bg-sky-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            >
              Logistics
            </motion.span>
          </motion.div>
        </motion.div>

        {/* Progress Bar */}
        <motion.div 
          className="mt-12 w-64 h-1 bg-white/20 rounded-full mx-auto overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ 
              delay: 2.5,
              duration: 0.8,
              ease: "easeOut"
            }}
          />
        </motion.div>
      </div>
    </div>
  )
}