import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { servicesData } from './Data'

import PharmaImg from '../../../../assets/climateImage/Pharma.jpg'
import FrozenImg from '../../../../assets/climateImage/frozen-foods.jpg'
import FreshImg from '../../../../assets/climateImage/fresh-produce.jpg'
import HaulageImg from '../../../../assets/climateImage/enterprise-Haulage.png'
import LastMileImg from '../../../../assets/climateImage/1.jpg'

const localImages = [
  PharmaImg,
  FrozenImg,
  FreshImg,
  HaulageImg,
  LastMileImg,
]

const fallbackImages = [
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1516576880352-25e2e80a068a?auto=format&fit=crop&w=600&q=80"
]

// Framer Motion variants for Section Header columns
const headerColVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] }
  }
}

// Slide up animation variants for individual cards
const cardEntranceVariants = {
  hidden: {
    opacity: 0,
    y: 30
  },
  visible: (idx) => ({
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 280, // high stiffness
      damping: 17,    // bounce
      mass: 1.25,     // heavier feel
      delay: idx * 0.08
    }
  })
}

// Custom quote helper block animations
const footerVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.45
    }
  }
}

export default function DaraServices() {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section id="services" className="relative bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden font-sans">

      {/* Background Dot Grid Layer */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between mb-16 text-left">

          {/* Left Column: Badge & Title */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={headerColVariants}
            className="lg:col-span-8"
          >
            <span className="font-body-unique text-xs font-bold tracking-widest text-[#0056B8] uppercase mb-3 block">
              🚚 USE CASES
            </span>
            <h2 className="font-heading-unique text-3xl sm:text-4.5xl font-bold text-slate-900 tracking-tight leading-[1.15]">
              We cover everything that keeps <br className="hidden sm:inline" />
              your cold cargo fresh
            </h2>
          </motion.div>

          {/* Right Column: Paragraph */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={headerColVariants}
            className="lg:col-span-4 lg:pl-6 pb-1"
          >
            <p className="font-body-unique text-slate-600 text-sm sm:text-base leading-relaxed">
              Dispatch reefer trucks, track temperature <br />
              <span className="text-slate-400">and deliver your perishables safely.</span>
            </p>
          </motion.div>

        </div>

        {/* ── RESPONSIVE ACCORDION (VERTICAL ON MOBILE, HORIZONTAL ON DESKTOP) ── */}
        <div
          className="w-full flex flex-col md:flex-row gap-4 h-auto md:h-[500px] overflow-hidden"
        >
          {servicesData.map((service, idx) => {
            const displayImg = localImages[idx] || fallbackImages[idx]
            const isActive = activeIndex === idx

            return (
              <motion.div
                key={service.title}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => setActiveIndex(idx)}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-out flex w-full md:w-auto ${isActive
                    ? 'h-[400px] sm:h-[380px] md:h-full md:flex-[5] shadow-xl shadow-black/10'
                    : 'h-[80px] md:h-full md:flex-[1] md:min-w-[70px] lg:min-w-[80px]'
                  }`}
              >
                {/* Background Image Frame */}
                <div className="absolute inset-0 z-0 w-full h-full">
                  <img
                    src={displayImg}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 ease-out"
                    style={{
                      transform: isActive ? 'scale(1.05)' : 'scale(1.0)',
                      filter: isActive ? 'brightness(0.85)' : 'brightness(0.55)'
                    }}
                    onError={(e) => {
                      e.target.src = fallbackImages[idx]
                    }}
                  />
                  {/* Black Soft Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20" />
                </div>

                {/* Inactive Title Text */}
                <AnimatePresence>
                  {!isActive && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.8 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4"
                    >
                      <span className="md:rotate-180 md:[writing-mode:vertical-lr] text-center uppercase tracking-widest text-xs sm:text-sm font-bold text-white whitespace-normal md:whitespace-nowrap">
                        <span className="hidden md:inline">{service.title.split(' ')[0]}</span>
                        <span className="inline md:hidden">{service.title}</span>
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Active Content Block */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={{
                        hidden: { opacity: 0 },
                        visible: {
                          opacity: 1,
                          transition: {
                            staggerChildren: 0.08,
                            delayChildren: 0.1
                          }
                        }
                      }}
                      className="absolute inset-0 z-10 flex flex-col justify-between p-6 sm:p-8 text-left h-full w-full"
                    >

                      {/* Top Bar inside active card */}
                      <motion.span
                        variants={{
                          hidden: { opacity: 0, y: -10 },
                          visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                        }}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 rounded-lg text-[9px] font-bold text-[#0056B8] tracking-widest uppercase shadow-sm self-start font-heading-unique"
                      >
                        {service.coverage}
                      </motion.span>

                      {/* Bottom details block */}
                      <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between w-full gap-6">

                        <div className="max-w-xl">
                          {/* Subtitle Badge */}
                          <motion.span
                            variants={{
                              hidden: { opacity: 0, y: 10 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                            }}
                            className="font-body-unique text-[10px] font-bold tracking-widest text-blue-300 uppercase mb-2 block"
                          >
                            {service.subtitle}
                          </motion.span>

                          {/* Title */}
                          <motion.h3
                            variants={{
                              hidden: { opacity: 0, y: 12 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                            className="font-heading-unique font-bold text-white text-lg sm:text-2xl mb-3 leading-tight"
                          >
                            {service.title}
                          </motion.h3>

                          {/* Description */}
                          <motion.p
                            variants={{
                              hidden: { opacity: 0, y: 12 },
                              visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
                            }}
                            className="font-body-unique text-slate-200/90 text-xs sm:text-sm leading-relaxed"
                          >
                            {service.description}
                          </motion.p>
                        </div>

                        {/* Start Shipping Link Button */}
                        <motion.div
                          className="w-full sm:w-auto self-start lg:self-auto"
                          variants={{
                            hidden: { opacity: 0, scale: 0.95 },
                            visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } }
                          }}
                        >
                          <Link
                            to="/booking/request"
                            className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-6 py-3 bg-white text-[#0056B8] hover:bg-blue-50 font-bold rounded-sm text-xs sm:text-sm transition-all active:scale-95 shadow-md flex-shrink-0 cursor-pointer"
                          >
                            Book
                            <ArrowUpRight className="w-4 h-4" />
                          </Link>
                        </motion.div>

                      </div>

                    </motion.div>
                  )}
                </AnimatePresence>

              </motion.div>
            )
          })}
        </div>

        {/* Bottom CTA Block */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={footerVariants}
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-white border border-slate-100 rounded-xl p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.015)] mt-8"
        >
          <p className="font-heading-unique text-slate-900 font-bold text-base text-left">
            Not sure which service fits your cargo?
          </p>
          <Link
            to="/booking/request"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#0056B8] hover:bg-blue-750 text-white font-bold rounded-sm text-sm transition-all active:scale-97 shadow-lg shadow-black/10 flex-shrink-0"
          >
            Get a custom quote
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
