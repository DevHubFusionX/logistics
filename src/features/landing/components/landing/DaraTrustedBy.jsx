import { useState, useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { whyUsData } from './Data'

const cardImages = [
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80", // delivery
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80", // reach
  "https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?auto=format&fit=crop&w=600&q=80", // secure
  "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=600&q=80", // scale
  "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?auto=format&fit=crop&w=600&q=80", // tech
  "https://images.unsplash.com/photo-1516576880352-25e2e80a068a?auto=format&fit=crop&w=600&q=80"  // excellence
]

// Framer Motion Variants for Header Items
const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
}

const headerItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
}

export default function DaraTrustedBy() {
  const [hoveredIndex, setHoveredIndex] = useState(0) // Autoplay highlights cards
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024)

  // Track window resizing to dynamically update layout-aware offsets
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Autoplay to cycle active card highlight
  useEffect(() => {
    if (isAutoplayPaused) return

    const interval = setInterval(() => {
      setHoveredIndex((prev) => {
        if (prev === null) return 0
        return (prev + 1) % whyUsData.impactAreas.length
      })
    }, 3200)

    return () => clearInterval(interval)
  }, [isAutoplayPaused])

  // Compute layout-aware center-explosion vector offsets
  const cardVariantsList = useMemo(() => {
    const isMobile = windowWidth < 768
    const isTablet = windowWidth >= 768 && windowWidth < 1024

    return whyUsData.impactAreas.map((_, idx) => {
      let initialX = 0
      let initialY = 0

      if (isMobile) {
        // 1 column (center is between index 2 and 3)
        initialX = 0
        initialY = idx < 3 ? 80 - idx * 25 : -25 - (idx - 3) * 25
      } else if (isTablet) {
        // 2 columns
        // Col 0: 0, 2, 4. Center is to the right. x = 80
        // Col 1: 1, 3, 5. Center is to the left. x = -80
        initialX = idx % 2 === 0 ? 80 : -80
        
        // Row 0: 0, 1. Center is below. y = 80
        // Row 1: 2, 3. Center is close. y = 0
        // Row 2: 4, 5. Center is above. y = -80
        if (idx < 2) initialY = 80
        else if (idx < 4) initialY = 0
        else initialY = -80
      } else {
        // 3 columns
        // Row 0: 0, 1, 2. Center is below. y = 80
        // Row 1: 3, 4, 5. Center is above. y = -80
        initialY = idx < 3 ? 80 : -80

        // Column 0: 0, 3. Center is right. x = 80
        // Column 1: 1, 4. Center is same. x = 0
        // Column 2: 2, 5. Center is left. x = -80
        if (idx === 0 || idx === 3) initialX = 80
        else if (idx === 1 || idx === 4) initialX = 0
        else initialX = -80
      }

      return {
        hidden: { 
          opacity: 0, 
          x: initialX, 
          y: initialY,
          scale: 0.92
        },
        visible: {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          transition: {
            type: "spring",
            stiffness: 110,
            damping: 18,
            delay: idx * 0.05
          }
        }
      }
    })
  }, [windowWidth])

  return (
    <section id="why-us" className="relative bg-slate-50 py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">
      
      {/* Background Dot Grid Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Header */}
        <motion.div 
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-3xl mb-16 text-left"
        >
          <motion.span 
            variants={headerItemVariants}
            className="font-body-unique text-xs font-bold tracking-widest text-[#0056B8] uppercase mb-3 block"
          >
            {whyUsData.header.badge}
          </motion.span>
          <motion.h2 
            variants={headerItemVariants}
            className="font-heading-unique text-3xl sm:text-4.5xl font-bold text-slate-900 tracking-tight leading-none mb-4"
          >
            {whyUsData.header.title}
          </motion.h2>
          <motion.p 
            variants={headerItemVariants}
            className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed"
          >
            {whyUsData.header.description}
          </motion.p>
        </motion.div>

        {/* ── CARDS GRID LAYOUT WITH VECTOR FLY-OUT ANIMATIONS ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {whyUsData.impactAreas.map((item, idx) => {
            const bgImage = cardImages[idx] || cardImages[0]
            const isHighlighted = hoveredIndex === idx
            const variants = cardVariantsList[idx]

            return (
              <motion.div
                key={idx}
                variants={variants}
                onMouseEnter={() => {
                  setIsAutoplayPaused(true)
                  setHoveredIndex(idx)
                }}
                onMouseLeave={() => {
                  setIsAutoplayPaused(false)
                  setHoveredIndex(null)
                }}
                className="group relative bg-white border border-slate-100 rounded-2xl h-[340px] shadow-[0_8px_30px_rgba(0,0,0,0.015)] overflow-hidden cursor-pointer flex flex-col justify-between"
              >
                {/* ── DEFAULT STATE: Full-size image ── */}
                <div 
                  className="absolute inset-0 z-0 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url(${bgImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    transform: isHighlighted ? 'scale(1.05)' : 'scale(1.0)'
                  }}
                />

                {/* Soft Light Overlay on default image */}
                <div className="absolute inset-0 z-0 bg-black/10 transition-opacity duration-500 group-hover:opacity-0" />

                {/* ── HOVER STATE: Dark Blue Overlay ── */}
                <div 
                  className="absolute inset-0 z-10 bg-blue-950/90 mix-blend-multiply transition-opacity duration-500 ease-out pointer-events-none"
                  style={{ opacity: isHighlighted ? 1 : 0 }}
                />

                {/* Interactive Plus Icon Indicator (fades out when highlighted) */}
                <div 
                  className="absolute top-6 right-6 z-10 w-8 h-8 rounded-full border border-white/40 bg-black/20 backdrop-blur-sm flex items-center justify-center text-white transition-opacity duration-300 pointer-events-none"
                  style={{ opacity: isHighlighted ? 0 : 1 }}
                >
                  <svg className="w-4 h-4 stroke-current" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                  </svg>
                </div>

                {/* ── TEXT CONTENT: Sequential animated text reveals when highlighted ── */}
                <div className="absolute inset-0 z-20 flex flex-col justify-between p-8 text-left h-full w-full">
                  
                  {/* Top Header Block */}
                  <div className="w-full">
                    {/* Metric Hero Area */}
                    <div className="flex flex-col items-start mb-4">
                      {/* Metric Animated Reveal */}
                      <span 
                        className="font-heading-unique text-3.5xl sm:text-4.5xl font-bold text-white tracking-tight leading-none mb-2 transition-all duration-500 ease-out"
                        style={{
                          opacity: isHighlighted ? 1 : 0,
                          transform: isHighlighted ? 'translateY(0)' : 'translateY(12px)',
                        }}
                      >
                        {item.impact.split(' ')[0]}
                      </span>
                      {/* Metric Description Label Animated Reveal (Slightly delayed) */}
                      <span 
                        className="text-[10px] text-blue-200 font-bold uppercase tracking-wider font-body-unique transition-all duration-500 ease-out"
                        style={{
                          opacity: isHighlighted ? 1 : 0,
                          transform: isHighlighted ? 'translateY(0)' : 'translateY(12px)',
                          transitionDelay: isHighlighted ? '100ms' : '0ms'
                        }}
                      >
                        {item.metric}
                      </span>
                    </div>

                    {/* Divider Line */}
                    <div 
                      className="w-full h-[1px] bg-white/20 transition-all duration-500 ease-out"
                      style={{
                        opacity: isHighlighted ? 1 : 0,
                        transform: isHighlighted ? 'scaleX(1)' : 'scaleX(0)',
                        transformOrigin: 'left',
                        transitionDelay: isHighlighted ? '150ms' : '0ms'
                      }}
                    />
                  </div>

                  {/* Bottom Text Block */}
                  <div className="w-full mt-auto">
                    {/* Title Animated Reveal (Delayed) */}
                    <h3 
                      className="font-heading-unique font-bold text-white text-base mb-2.5 transition-all duration-500 ease-out"
                      style={{
                        opacity: isHighlighted ? 1 : 0,
                        transform: isHighlighted ? 'translateY(0)' : 'translateY(12px)',
                        transitionDelay: isHighlighted ? '200ms' : '0ms'
                      }}
                    >
                      {item.title}
                    </h3>

                    {/* Description Animated Reveal (Delayed further) */}
                    <p 
                      className="font-body-unique text-slate-200 text-xs sm:text-sm leading-relaxed transition-all duration-500 ease-out"
                      style={{
                        opacity: isHighlighted ? 1 : 0,
                        transform: isHighlighted ? 'translateY(0)' : 'translateY(12px)',
                        transitionDelay: isHighlighted ? '280ms' : '0ms'
                      }}
                    >
                      {item.description}
                    </p>
                  </div>

                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Small Bottom Quote/Badge Link */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 text-center"
        >
          <Link
            to="/booking/request"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0056B8] hover:text-blue-750 transition-colors group cursor-pointer"
          >
            Join thousands of businesses who trust Dara Express
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
