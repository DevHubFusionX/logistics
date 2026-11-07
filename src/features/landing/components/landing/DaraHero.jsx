import { useState, useRef, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ScheduleDemoModal } from './demo'
import { heroData, clientsData } from './Data'
import solarColdroomInterior from '@/assets/climateImage/solar-coldroom-interior.jpg'
import solarColdroomUnit from '@/assets/climateImage/solar-coldroom-unit.jpg'

const SLIDES = [
  { id: 'video', type: 'video', src: '/hero.mp4', label: 'Fleet Video' },
  { id: 'image-1', type: 'image', src: solarColdroomInterior, duration: 6000, label: 'Cold Storage Room' },
  { id: 'image-2', type: 'image', src: solarColdroomUnit, duration: 6000, label: 'Solar Cold Room Unit' },
]

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '8%' : '-8%',
    opacity: 0,
    scale: 1.03,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    zIndex: 0,
    x: direction > 0 ? '-8%' : '8%',
    opacity: 0,
    scale: 0.98,
  }),
}

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
  const [activeSlide, setActiveSlide] = useState(0)
  const [direction, setDirection] = useState(1)
  const videoRef = useRef(null)

  const advanceNext = useCallback(() => {
    setDirection(1)
    setActiveSlide((prev) => (prev + 1) % SLIDES.length)
  }, [])

  const handleDotClick = useCallback((index) => {
    if (index === activeSlide) return
    setDirection(index > activeSlide ? 1 : -1)
    setActiveSlide(index)
  }, [activeSlide])

  // Bulletproof transition timing with single trigger guarantee
  useEffect(() => {
    let timer = null
    let hasTriggered = false

    const triggerAdvance = () => {
      if (hasTriggered) return
      hasTriggered = true
      advanceNext()
    }

    if (activeSlide === 0) {
      // Slide 0: Play video and listen for completion
      const video = videoRef.current
      if (video) {
        video.currentTime = 0
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {})
        }
      }

      const onEnded = () => {
        triggerAdvance()
      }

      const currentVid = videoRef.current
      if (currentVid) {
        currentVid.addEventListener('ended', onEnded, { once: true })
      }

      // Safety fallback: if video is paused, blocked, or stalls, advance after 16s
      timer = setTimeout(() => {
        triggerAdvance()
      }, 16000)

      return () => {
        if (currentVid) {
          currentVid.removeEventListener('ended', onEnded)
        }
        if (timer) clearTimeout(timer)
      }
    } else {
      // Slide 1 & Slide 2: Display images for exactly 6 seconds each
      const current = SLIDES[activeSlide]
      timer = setTimeout(() => {
        triggerAdvance()
      }, current?.duration || 6000)

      return () => {
        if (timer) clearTimeout(timer)
      }
    }
  }, [activeSlide, advanceNext])

  return (
    <div className="relative min-h-screen w-full overflow-hidden flex items-end bg-black pt-28 pb-16 md:py-0 md:h-screen">

      {/* Background Sliding Carousel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={activeSlide}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 1.2, ease: [0.25, 1, 0.5, 1] },
              opacity: { duration: 1.1, ease: 'easeInOut' },
              scale: { duration: 1.3, ease: [0.25, 1, 0.5, 1] },
            }}
            className="absolute inset-0 w-full h-full"
          >
            {activeSlide === 0 && (
              <video
                ref={videoRef}
                autoPlay
                muted
                defaultMuted
                playsInline
                preload="auto"
                className="w-full h-full object-cover"
              >
                <source src="/hero.mp4" type="video/mp4" />
              </video>
            )}

            {activeSlide === 1 && (
              <div className="w-full h-full relative bg-slate-950">
                <img
                  src={solarColdroomInterior}
                  alt="Solar cold storage room interior with fresh produce"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            )}

            {activeSlide === 2 && (
              <div className="w-full h-full relative flex items-center justify-center bg-white">
                <img
                  src={solarColdroomUnit}
                  alt="Solar cold room unit"
                  className="w-full h-full object-contain object-center"
                />
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark Overlay Layer - ensures text and buttons stay legible across all slides */}
      <div className="absolute inset-0 z-10 bg-black/40 mix-blend-multiply pointer-events-none" />
      <div className="absolute inset-0 z-10 bg-gradient-to-t from-black via-black/40 to-black/20 pointer-events-none" />

      {/* Slide Indicators */}
      <div className="absolute top-24 right-6 sm:right-12 z-20 flex items-center gap-2">
        {SLIDES.map((slide, idx) => (
          <button
            key={slide.id}
            onClick={() => handleDotClick(idx)}
            title={slide.label}
            aria-label={slide.label}
            className={`h-1.5 transition-all duration-500 rounded-full cursor-pointer ${
              activeSlide === idx
                ? 'w-8 bg-[#38bdf8]'
                : 'w-2 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

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
          style={{ fontSize: 'clamp(1.75rem, 6vw, 3.8rem)' }}
        >
          {heroData.title.prefix}{' '}
          <span className="relative inline-block sm:whitespace-nowrap">
            {heroData.title.highlight}
            <svg
              className="absolute left-0 bottom-[-8px] w-full h-[8px] text-[#38bdf8] hidden sm:block"
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
          className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8 sm:mb-10"
        >
          {/* Calculate Rates (Primary SEM Conversion Action) */}
          <Link
            to="/booking-calculator"
            className="font-body-unique px-6 py-3 bg-[#0056B8] hover:bg-[#004494] text-white font-bold rounded-sm text-sm transition-all active:scale-[0.97] shadow-lg shadow-black/10 cursor-pointer text-center w-full sm:w-auto"
          >
            Calculate Freight Rates
          </Link>

          {/* Book a Demo (Secondary Modal Action) */}
          <button
            onClick={() => setIsDemoOpen(true)}
            className="font-body-unique px-6 py-3 border border-white/20 hover:border-white/40 bg-white/10 hover:bg-white/20 text-white font-bold rounded-sm text-sm transition-all active:scale-[0.97] backdrop-blur-sm shadow-md text-center w-full sm:w-auto cursor-pointer"
          >
            Schedule a Demo
          </button>

          {/* Explore Our Technology */}
          <Link
            to="/technology"
            className="font-body-unique px-6 py-3 text-slate-300 hover:text-white font-semibold text-sm transition-colors text-center w-full sm:w-auto"
          >
            Explore Tech →
          </Link>
        </motion.div>

        {/* Clients Marquee Row */}
        <motion.div
          variants={itemVariants}
          className="w-full border-t border-white/10 pt-4 pb-4 md:pb-6 flex flex-col gap-2.5 overflow-hidden"
        >
          <span className="text-white/45 text-[9.5px] font-bold tracking-[0.22em] uppercase font-body-unique">
            Trusted by our clients
          </span>
          <div
            className="relative w-full overflow-hidden flex select-none group"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
            }}
          >
            {/* Track 1 */}
            <div className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16 animate-marquee">
              {[...clientsData, ...clientsData, ...clientsData].map((client, idx) => (
                <img
                  key={`t1-${client.name}-${idx}`}
                  src={client.logo}
                  alt={client.name}
                  title={client.name}
                  className="h-5 sm:h-6 w-auto max-w-[90px] sm:max-w-[105px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none"
                />
              ))}
            </div>

            {/* Track 2 (Duplicate for continuous infinite loop) */}
            <div className="flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16 animate-marquee" aria-hidden="true">
              {[...clientsData, ...clientsData, ...clientsData].map((client, idx) => (
                <img
                  key={`t2-${client.name}-${idx}`}
                  src={client.logo}
                  alt={client.name}
                  title={client.name}
                  className="h-5 sm:h-6 w-auto max-w-[90px] sm:max-w-[105px] object-contain brightness-0 invert opacity-60 hover:opacity-100 transition-opacity duration-300 shrink-0 select-none"
                />
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </div>
  )
}
