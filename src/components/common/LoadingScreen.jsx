import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Subtle Background Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sky-400/30 rounded-full"
            style={{
              left: `${15 + Math.random() * 70}%`,
              top: `${30 + Math.random() * 40}%`,
            }}
            animate={{
              opacity: [0, 0.6, 0],
              scale: [0.5, 1.2, 0.5]
            }}
            transition={{
              duration: 2 + Math.random() * 1.5,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        {/* Road Container */}
        <div className="relative w-80 sm:w-96 h-32 flex items-center justify-center">
          {/* Animated Road Line */}
          <div className="absolute bottom-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />

          {/* Moving Road Dashes */}
          <div className="absolute bottom-8 left-0 right-0 h-0.5 overflow-hidden">
            <motion.div
              className="flex gap-4 absolute"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-8 h-0.5 bg-sky-400/40 rounded-full" />
              ))}
            </motion.div>
          </div>

          {/* Truck Container */}
          <motion.div
            className="relative"
            initial={{ x: -180, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.25, 0.46, 0.45, 0.94],
              delay: 0.2
            }}
          >
            {/* Truck Glow Effect */}
            <motion.div
              className="absolute -inset-4 bg-sky-400/20 rounded-full blur-xl"
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Truck Icon Container */}
            <motion.div
              className="relative w-20 h-20 bg-gradient-to-br from-sky-400 to-blue-600 rounded-2xl shadow-2xl flex items-center justify-center"
              animate={{
                y: [0, -3, 0],
                rotate: [0, -1, 0, 1, 0]
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                boxShadow: '0 10px 40px rgba(56, 189, 248, 0.4), 0 0 20px rgba(56, 189, 248, 0.2)'
              }}
            >
              <Truck className="w-10 h-10 text-white" strokeWidth={2} />

              {/* Wheels Animation */}
              <motion.div
                className="absolute -bottom-1 left-3 w-3 h-3 bg-slate-700 rounded-full border-2 border-slate-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -bottom-1 right-3 w-3 h-3 bg-slate-700 rounded-full border-2 border-slate-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>

            {/* Motion Trail */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2 -left-16 flex gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-6 h-1 bg-gradient-to-l from-sky-400/60 to-transparent rounded-full"
                  animate={{
                    opacity: [0.8, 0.3, 0.8],
                    scaleX: [1, 0.7, 1]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Loading Text */}
        <motion.div
          className="mt-8 flex items-center gap-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-lg text-slate-400 font-medium tracking-wide">Loading</span>
          <motion.div className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="w-1.5 h-1.5 bg-sky-400 rounded-full"
                animate={{
                  y: [0, -6, 0],
                  opacity: [0.4, 1, 0.4]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                  delay: i * 0.15
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}