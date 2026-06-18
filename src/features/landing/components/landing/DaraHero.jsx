import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScheduleDemoModal } from './demo'
import { heroData } from './Data'



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

export default function DaraHero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-end bg-black pt-28 pb-16 md:py-0 md:h-screen">

      {/* Background Looping Video — poster shows instantly as LCP, video loads after */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover z-0 select-none pointer-events-none opacity-90"
      >
        <source
          src="/hero.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Dark Overlay Layer - Reduced to 35% opacity for brighter video */}
      <div className="absolute inset-0 z-10 bg-black/35 mix-blend-multiply pointer-events-none" />

      {/* Content Container (Bottom-Left Aligned) */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 max-w-7xl w-full mx-auto px-6 md:px-12 flex flex-col items-start text-left"
      >

        {/* Title / Headline (Space Grotesk) using info from Data.jsx with Playful Underline */}
        <h1
          className="font-heading-unique tracking-tight leading-[1.08] text-white mb-6 max-w-4xl"
          style={{ fontSize: 'clamp(2.0rem, 4.8vw, 3.8rem)' }}
        >
          {heroData.title.prefix}{' '}
          <span className="relative inline-block whitespace-nowrap">
            {heroData.title.highlight}
            <svg
              className="absolute left-0 bottom-[-8px] w-full h-[8px] text-[#38bdf8]"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M1 8C20 3 60 1 99 5"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
          </span>{' '}
          {heroData.title.suffix}
        </h1>

        {/* Subtitle / Description (Outfit) using info from Data.jsx */}
        <motion.div
          variants={itemVariants}
          className="font-body-unique text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mb-8 space-y-4"
        >
          {heroData.description.split('\n\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </motion.div>

        {/* Action Buttons using info from Data.jsx */}
        <motion.div
          variants={itemVariants}
          className="flex flex-row items-center gap-4 w-full sm:w-auto mb-12"
        >
          {/* Start shipping (Brand Blue Button) */}
          <Link
            to={heroData.buttons.primary.link}
            className="font-body-unique px-6 py-3 bg-[#0056B8] hover:bg-blue-750 text-white font-bold rounded-sm text-sm transition-all active:scale-97 shadow-lg shadow-black/10"
          >
            {heroData.buttons.primary.text}
          </Link>

          {/* Book a demo (Outline Glass Button) */}
          <button
            onClick={() => setIsDemoOpen(true)}
            className="font-body-unique px-6 py-3 border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold rounded-sm text-sm transition-all active:scale-97 backdrop-blur-sm shadow-md"
          >
            {heroData.buttons.secondary.text}
          </button>
        </motion.div>



      </motion.div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  )
}
