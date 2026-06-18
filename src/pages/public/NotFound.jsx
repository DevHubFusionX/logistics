import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-yellow-100 to-orange-100 px-6 py-12 relative overflow-hidden font-sans">
      
      {/* Decorative floating clouds/bubbles in background for a playful feel */}
      <div className="absolute top-12 left-12 w-24 h-8 bg-white/60 rounded-full blur-sm animate-pulse" />
      <div className="absolute top-24 right-20 w-32 h-10 bg-white/60 rounded-full blur-sm animate-pulse" style={{ animationDuration: '4s' }} />
      <div className="absolute bottom-20 left-20 w-40 h-12 bg-white/50 rounded-full blur-sm animate-pulse" style={{ animationDuration: '5s' }} />

      <div className="max-w-md w-full text-center relative z-10">
        
        {/* Cute Crying Truck Animation Container */}
        <div className="relative w-64 h-48 mx-auto mb-8 flex items-center justify-center">
          
          {/* Sobbing Truck SVG */}
          <motion.div
            animate={{ 
              y: [0, -6, 0, -6, 0],
              scaleY: [1, 0.94, 1, 0.94, 1],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-48 h-36 relative z-10"
          >
            <svg viewBox="0 0 160 120" fill="none" className="w-full h-full drop-shadow-lg">
              {/* Truck Cabin (Blue/Sky) */}
              <path d="M100 45 C100 35, 115 30, 130 30 L150 30 C155 30, 160 35, 160 40 L160 85 C160 90, 155 90, 150 90 L100 90 Z" fill="#0284c7" />
              
              {/* Truck Cargo Box (Light Grey/White) */}
              <rect x="10" y="20" width="95" height="70" rx="8" fill="#f1f5f9" stroke="#cbd5e1" strokeWidth="2" />
              {/* Stripe on Cargo */}
              <rect x="10" y="45" width="95" height="12" fill="#38bdf8" />
              
              {/* Windshield / Eyes (Sad looking slant) */}
              <path d="M125 38 L148 38 L142 58 L122 58 Z" fill="#e2e8f0" stroke="#0284c7" strokeWidth="2" />
              
              {/* Sad Eyebrows / Eyelids */}
              <motion.path 
                d="M122 36 L135 44" 
                stroke="#0f172a" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                animate={{ rotate: [0, -5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
              <motion.path 
                d="M148 36 L136 44" 
                stroke="#0f172a" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />

              {/* Sad Mouth / Bumper */}
              <path d="M135 78 C135 72, 150 72, 150 78" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" />
              
              {/* Wheels */}
              <circle cx="35" cy="95" r="16" fill="#1e293b" />
              <circle cx="35" cy="95" r="7" fill="#94a3b8" />
              <circle cx="125" cy="95" r="16" fill="#1e293b" />
              <circle cx="125" cy="95" r="7" fill="#94a3b8" />
            </svg>
            
            {/* Left Tear */}
            <motion.div
              className="absolute left-[76%] top-[38%] w-2.5 h-3.5 bg-sky-400 rounded-full"
              style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }}
              animate={{ 
                y: [0, 10, 24],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.1, 0.8]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 0.2,
                ease: "easeIn"
              }}
            />
            {/* Right Tear */}
            <motion.div
              className="absolute left-[88%] top-[38%] w-2.5 h-3.5 bg-sky-400 rounded-full"
              style={{ borderRadius: '50% 50% 50% 50% / 40% 40% 60% 60%' }}
              animate={{ 
                y: [0, 12, 26],
                opacity: [0, 1, 1, 0],
                scale: [0.6, 1.1, 0.8]
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                delay: 1.0,
                ease: "easeIn"
              }}
            />
          </motion.div>

          {/* Crying puddle on the floor */}
          <motion.div
            className="absolute bottom-6 right-2 w-16 h-2.5 bg-sky-455/30 rounded-full blur-[1px]"
            animate={{
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        {/* Big 404 Heading */}
        <h1 className="text-8xl font-black text-amber-500/30 tracking-tight mb-2 select-none">
          404
        </h1>

        {/* Text */}
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">
          Page Not Found
        </h2>
        <p className="text-slate-650 text-sm sm:text-base mb-8 leading-relaxed max-w-sm mx-auto">
          Our little truck got lost in transit and started crying! We couldn't find the route you requested.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm shadow-md hover:shadow-lg transition-all active:scale-97 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Go Home</span>
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold rounded-xl text-sm transition-all active:scale-97 cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Go Back</span>
          </button>
        </div>

      </div>
    </div>
  )
}
