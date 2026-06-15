import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { ScheduleDemoModal } from './demo'
import { ArrowRight } from 'lucide-react'

export default function DaraCTA() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <section className="relative bg-white py-12 md:py-24 px-4 md:px-12 lg:px-20 overflow-hidden">

      {/* Background Dot Grid Layer */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* Main CTA Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-[#0056B8] text-white rounded-2xl md:rounded-3xl py-8 px-6 md:p-16 shadow-[0_24px_60px_rgba(0,86,184,0.18)] relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
        >
          {/* Decorative Background Glows */}
          <div className="absolute right-[-10%] top-[-10%] w-96 h-96 rounded-full bg-blue-600/25 blur-3xl pointer-events-none" />
          <div className="absolute left-[-5%] bottom-[-10%] w-80 h-80 bg-sky-600/20 blur-3xl pointer-events-none" />

          {/* Left Side: Content Block (Col span 7) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">

            <span className="font-body-unique text-[10px] md:text-xs font-bold tracking-widest text-blue-200 uppercase mb-3 lg:mb-4">
              GET STARTED TODAY
            </span>

            <h2 className="font-heading-unique text-2xl sm:text-3xl lg:text-4.5xl font-bold leading-[1.2] lg:leading-[1.15] mb-4 lg:mb-6 tracking-tight">
              Start shipping with <br />
              Dara today.
            </h2>

            <p className="font-body-unique text-blue-100/90 text-xs sm:text-sm lg:text-base leading-relaxed mb-6 lg:mb-8 max-w-xl">
              Join thousands of businesses using our simple app to move food, medicines, and chemicals across Nigeria with complete temperature safety, zero stress, and low prices.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">

              {/* Start shipping (Solid White) */}
              <Link
                to="/booking/request"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 md:px-7 md:py-3.5 bg-white text-[#0056B8] hover:bg-blue-50 font-bold rounded-sm text-xs md:text-sm transition-all active:scale-97 shadow-lg shadow-black/10 group"
              >
                Book
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>

              {/* Book a demo (Outline Glass) */}
              <button
                onClick={() => setIsDemoOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center px-5 py-3 md:px-7 md:py-3.5 border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold rounded-sm text-xs md:text-sm transition-all active:scale-97 backdrop-blur-sm"
              >
                Book a demo
              </button>

            </div>

          </div>

          {/* Right Side: Glowing Route Vector (Col span 5) - hidden on mobile */}
          <div className="hidden lg:flex lg:col-span-5 relative w-full h-64 lg:h-80 items-center justify-center z-10 pointer-events-none select-none">
            <svg className="w-full h-full max-w-[340px]" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Perspective Grid Background Paths */}
              <path d="M10 160 H190 M10 130 H190 M10 100 H190 M10 70 H190" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
              <path d="M100 20 L20 180 M100 20 L60 180 M100 20 L100 180 M100 20 L140 180 M100 20 L180 180" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

              {/* Glowing Route Line */}
              <motion.path
                d="M 60 160 Q 110 120 100 80 T 140 40"
                stroke="#38bdf8"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="6 4"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
              />

              {/* Glowing Pulse Nodes */}
              <circle cx="60" cy="160" r="4.5" fill="#38bdf8" />
              <circle cx="60" cy="160" r="1.5" fill="white" />

              <circle cx="140" cy="40" r="4.5" fill="#38bdf8" />
              <circle cx="140" cy="40" r="1.5" fill="white" />

              {/* Center Transit Dot Pulse */}
              <motion.g
                animate={{
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <circle cx="103" cy="98" r="8" fill="rgba(56, 189, 248, 0.2)" />
                <circle cx="103" cy="98" r="3" fill="#38bdf8" />
              </motion.g>
            </svg>
          </div>

        </motion.div>
      </div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  )
}
