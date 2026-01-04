import { motion } from 'framer-motion'
import { Truck, MapPin } from 'lucide-react'

// City Skyline SVG Component - Origin (Left)
const OriginCity = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
    {/* Buildings */}
    <rect x="5" y="30" width="12" height="50" fill="currentColor" opacity="0.8" />
    <rect x="20" y="20" width="15" height="60" fill="currentColor" opacity="0.9" />
    <rect x="38" y="35" width="10" height="45" fill="currentColor" opacity="0.7" />
    <rect x="50" y="15" width="18" height="65" fill="currentColor" opacity="1" />
    <rect x="70" y="40" width="12" height="40" fill="currentColor" opacity="0.6" />
    <rect x="85" y="25" width="14" height="55" fill="currentColor" opacity="0.8" />
    <rect x="102" y="45" width="10" height="35" fill="currentColor" opacity="0.5" />
    {/* Windows */}
    <rect x="52" y="20" width="3" height="3" fill="#38bdf8" opacity="0.8" />
    <rect x="58" y="20" width="3" height="3" fill="#38bdf8" opacity="0.6" />
    <rect x="52" y="28" width="3" height="3" fill="#38bdf8" opacity="0.7" />
    <rect x="58" y="28" width="3" height="3" fill="#38bdf8" opacity="0.9" />
    <rect x="22" y="25" width="3" height="3" fill="#38bdf8" opacity="0.5" />
    <rect x="28" y="25" width="3" height="3" fill="#38bdf8" opacity="0.8" />
    <rect x="87" y="30" width="3" height="3" fill="#38bdf8" opacity="0.6" />
    <rect x="93" y="30" width="3" height="3" fill="#38bdf8" opacity="0.7" />
  </svg>
)

// City Skyline SVG Component - Destination (Right)
const DestinationCity = () => (
  <svg viewBox="0 0 120 80" className="w-full h-full" preserveAspectRatio="xMidYMax meet">
    {/* Buildings */}
    <rect x="8" y="35" width="10" height="45" fill="currentColor" opacity="0.5" />
    <rect x="22" y="20" width="16" height="60" fill="currentColor" opacity="0.9" />
    <rect x="42" y="40" width="12" height="40" fill="currentColor" opacity="0.6" />
    <rect x="56" y="10" width="20" height="70" fill="currentColor" opacity="1" />
    <rect x="78" y="30" width="14" height="50" fill="currentColor" opacity="0.8" />
    <rect x="95" y="25" width="12" height="55" fill="currentColor" opacity="0.7" />
    <rect x="108" y="50" width="8" height="30" fill="currentColor" opacity="0.4" />
    {/* Windows */}
    <rect x="60" y="15" width="3" height="3" fill="#38bdf8" opacity="0.9" />
    <rect x="66" y="15" width="3" height="3" fill="#38bdf8" opacity="0.7" />
    <rect x="60" y="23" width="3" height="3" fill="#38bdf8" opacity="0.6" />
    <rect x="66" y="23" width="3" height="3" fill="#38bdf8" opacity="0.8" />
    <rect x="24" y="25" width="3" height="3" fill="#38bdf8" opacity="0.7" />
    <rect x="30" y="25" width="3" height="3" fill="#38bdf8" opacity="0.5" />
    <rect x="80" y="35" width="3" height="3" fill="#38bdf8" opacity="0.8" />
    <rect x="86" y="35" width="3" height="3" fill="#38bdf8" opacity="0.6" />
  </svg>
)

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50 overflow-hidden">
      {/* Stars Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 bg-white rounded-full"
            style={{
              left: `${ Math.random() * 100 }% `,
              top: `${ Math.random() * 50 }% `,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 3
            }}
          />
        ))}
      </div>

      {/* Main Scene Container */}
      <div className="relative w-full max-w-2xl px-4">
        {/* City Scene */}
        <div className="relative h-48 sm:h-56 flex items-end justify-between">
          
          {/* Origin City - Left */}
          <motion.div 
            className="absolute left-0 bottom-0 w-28 sm:w-36 h-24 sm:h-28 text-slate-600"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <OriginCity />
            {/* Origin Label */}
            <motion.div 
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <MapPin className="w-5 h-5 text-emerald-400 mb-1" />
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Origin</span>
            </motion.div>
          </motion.div>

          {/* Destination City - Right */}
          <motion.div 
            className="absolute right-0 bottom-0 w-28 sm:w-36 h-24 sm:h-28 text-slate-600"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <DestinationCity />
            {/* Destination Label */}
            <motion.div 
              className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <MapPin className="w-5 h-5 text-sky-400 mb-1" />
              </motion.div>
              <span className="text-xs text-slate-400 font-medium whitespace-nowrap">Destination</span>
            </motion.div>
          </motion.div>

          {/* Road */}
          <div className="absolute bottom-0 left-0 right-0 h-8">
            {/* Road Surface */}
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700 rounded-sm" />
            {/* Road Markings */}
            <div className="absolute bottom-2.5 left-20 right-20 h-0.5 flex justify-between overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-4 h-full bg-yellow-400/60 rounded-full"
                  animate={{
                    opacity: [0.4, 0.8, 0.4]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </div>
          </div>

          {/* Animated Truck */}
          <motion.div
            className="absolute bottom-5 z-10"
            initial={{ left: '15%' }}
            animate={{ left: '75%' }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Truck Glow */}
            <motion.div
              className="absolute -inset-3 bg-sky-400/30 rounded-full blur-lg"
              animate={{
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 1,
                repeat: Infinity,
              }}
            />
            
            {/* Truck Container */}
            <motion.div
              className="relative w-14 h-10 bg-gradient-to-br from-sky-400 to-blue-600 rounded-lg shadow-lg flex items-center justify-center"
              animate={{
                y: [0, -2, 0, -1, 0],
              }}
              transition={{
                duration: 0.4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                boxShadow: '0 4px 20px rgba(56, 189, 248, 0.5)'
              }}
            >
              <Truck className="w-7 h-7 text-white" strokeWidth={2.5} />
            </motion.div>

            {/* Motion Lines */}
            <motion.div className="absolute top-1/2 -translate-y-1/2 -left-8 flex gap-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-0.5 bg-gradient-to-l from-sky-400/80 to-transparent rounded-full"
                  animate={{
                    opacity: [1, 0.3, 1],
                    scaleX: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    delay: i * 0.1
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Journey Progress Section */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {/* Progress Bar */}
          <div className="relative h-2 bg-slate-700/50 rounded-full overflow-hidden mb-4">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-400 via-sky-400 to-blue-500 rounded-full"
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />
            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </div>

          {/* Loading Text */}
          <div className="flex items-center justify-center gap-2">
            <motion.span 
              className="text-lg sm:text-xl text-slate-300 font-medium tracking-wide"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              En route to your destination
            </motion.span>
            <motion.div className="flex gap-0.5">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 bg-sky-400 rounded-full"
                  animate={{
                    y: [0, -4, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}