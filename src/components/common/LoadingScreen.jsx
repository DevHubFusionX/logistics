import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'

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
          {/* Professional Truck Icon */}
          <div className="relative w-40 h-40 mx-auto flex items-center justify-center">
            {/* Outer Ring - Subtle rotating border */}
            <motion.div
              className="absolute w-40 h-40 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, transparent, rgba(56, 189, 248, 0.4), transparent)',
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />

            {/* Middle Ring - Static elegant border */}
            <div className="absolute w-36 h-36 rounded-full border border-white/10" />

            {/* Inner Glow Ring */}
            <motion.div
              className="absolute w-32 h-32 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(56, 189, 248, 0.15) 0%, transparent 70%)',
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Main Icon Container - Glassmorphism style */}
            <motion.div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.15)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
              }}
              animate={{
                boxShadow: [
                  '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                  '0 8px 48px rgba(56, 189, 248, 0.3), inset 0 1px 0 rgba(255,255,255,0.15)',
                  '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)',
                ]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Truck className="w-12 h-12 text-white/90" strokeWidth={1.5} />
            </motion.div>
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
            {'Dara'.split('').map((letter, i) => (
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