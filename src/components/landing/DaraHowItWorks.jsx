import { motion, useInView } from 'framer-motion'
import { ChevronRight, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const steps = [
  {
    step: '01',
    title: 'Request a Quote',
    description: 'Tell us your cargo type, route and temperature needs. We respond within the hour.',
    icon: '📋',
  },
  {
    step: '02',
    title: 'Get Matched',
    description: 'We assign a verified reefer truck and driver suited for your cargo requirements.',
    icon: '🚛',
  },
  {
    step: '03',
    title: 'Track Live',
    description: 'IoT sensors monitor temperature in real time. You get updates throughout transit.',
    icon: '📡',
  },
  {
    step: '04',
    title: 'Delivered',
    description: 'Your cargo arrives safely with a full delivery confirmation and temperature report.',
    icon: '✅',
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const headerVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
}

const lineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.5 },
  },
}

const numberVariants = {
  hidden: { opacity: 0, scale: 0.4 },
  visible: {
    opacity: 1, scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
}

const bottomVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.8 },
  },
}

export default function DaraHowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section id="how-it-works" ref={ref} className="relative bg-[#e8f0f7] overflow-hidden">

      {/* ── Top zone ── */}
      <div className="relative z-10 px-8 sm:px-14 lg:px-20 pt-24 pb-0">

        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-end justify-between mb-20"
        >
          <motion.div variants={headerVariants}>
            <motion.p
              variants={headerVariants}
              className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-3"
            >
              How it works
            </motion.p>
            <h2 className="font-heading font-black text-[#1e3a5f] text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Our processes are{' '}
              <motion.span
                className="text-blue-500 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                simple
              </motion.span>
            </h2>
          </motion.div>

          <motion.div
            variants={headerVariants}
            className="hidden sm:block"
          >
            <Link
              to="/booking/request"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              For Shippers
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Connecting line */}
        <div className="hidden lg:block relative mb-0 px-[calc(12.5%-1rem)]">
          <div className="relative h-px bg-blue-200/50">
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="absolute inset-0 bg-blue-400 origin-left"
            />
            {/* dots on the line */}
            {steps.map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.5 + i * 0.12, ease: [0.34, 1.56, 0.64, 1] }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow-sm"
                style={{ left: `${(i / 3) * 100}%`, transform: 'translate(-50%, -50%)' }}
              />
            ))}
          </div>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10"
        >
          {steps.map(({ step, title, description }, i) => (
            <motion.div
              key={step}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-white rounded-2xl p-7 shadow-sm relative overflow-hidden flex flex-col justify-between min-h-[240px] group cursor-default"
            >
              {/* big number bg */}
              <motion.span
                variants={numberVariants}
                className="absolute top-1 left-3 font-black leading-none text-blue-50 select-none pointer-events-none"
                style={{ fontSize: '6rem' }}
              >
                {step}
              </motion.span>

              {/* top: step badge */}
              <div className="relative z-10 flex items-center justify-between mb-auto">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-500 text-[10px] font-black tracking-widest uppercase">
                  Step {step}
                </span>
                <motion.div
                  initial={{ rotate: 0, opacity: 0.3 }}
                  whileHover={{ rotate: 45, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-blue-300 group-hover:text-blue-500 transition-colors" />
                </motion.div>
              </div>

              {/* bottom: title + description */}
              <div className="relative z-10 mt-12">
                <h3 className="font-heading font-black text-[#1e3a5f] text-xl mb-2 leading-tight">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
              </div>

              {/* hover accent line */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      

    </section>
  )
}
