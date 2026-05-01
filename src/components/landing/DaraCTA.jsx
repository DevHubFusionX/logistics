import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Thermometer, Shield, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'

const ease = [0.22, 1, 0.36, 1]

const trust = [
  { icon: Thermometer, label: 'IoT temp monitoring' },
  { icon: Shield,      label: 'GIT insured cargo' },
  { icon: Clock,       label: 'Same-day available' },
]

export default function DaraCTA() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  return (
    <section ref={ref} className="bg-white px-8 sm:px-14 lg:px-20 py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto">

        {/* ── Main card ── */}
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.75, ease }}
          className="relative bg-[#e8f0f7] rounded-3xl overflow-hidden px-10 sm:px-16 py-16 flex flex-col lg:flex-row items-center justify-between gap-12"
        >

          {/* decorative blue blob top-right */}
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-blue-400/10 rounded-full blur-2xl pointer-events-none" />

          {/* Left — text */}
          <div className="relative z-10 max-w-xl">

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15, ease }}
              className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-4"
            >
              Ready to ship?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 32 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2, ease }}
              className="font-heading font-black text-sky-900 leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Your cold chain,{' '}
              <span className="text-blue-500">handled right.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.32, ease }}
              className="mt-5 text-[#4a6080] text-base leading-relaxed"
            >
              Get a quote in minutes. We'll match you with a verified reefer truck,
              monitor your cargo in real time, and deliver with full temperature
              documentation — Lagos, Abuja, Port Harcourt and all 36 states.
            </motion.p>

            {/* trust pills */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.44, ease }}
              className="mt-7 flex flex-wrap gap-3"
            >
              {trust.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-xl text-xs font-bold text-sky-900 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 text-blue-500" />
                  {label}
                </span>
              ))}
            </motion.div>

            {/* buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.54, ease }}
              className="mt-8 flex flex-wrap items-center gap-4"
            >
              <Link
                to="/booking/request"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-500/25"
              >
                Get a free quote
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 active:scale-95 text-sky-900 font-bold rounded-xl text-sm transition-all duration-200 shadow-sm"
              >
                Talk to us
              </Link>
            </motion.div>
          </div>

          {/* Right — stat stack */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.35, ease }}
            className="relative z-10 flex-shrink-0 grid grid-cols-2 gap-4 w-full lg:w-auto"
          >
            {[
              { value: '69+',    label: 'Reefer trucks\non network' },
              { value: '137+',   label: 'Cold chain\ntrips completed' },
              { value: '36',     label: 'States\ncovered' },
              { value: '±0.1°C', label: 'Temperature\nprecision' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 24, scale: 0.92 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.45 + i * 0.09, ease }}
                className="bg-white rounded-2xl px-6 py-5 shadow-sm"
              >
                <p className="font-heading font-black text-sky-900 text-2xl leading-none mb-1">
                  {value}
                </p>
                <p className="text-gray-400 text-xs leading-snug whitespace-pre-line">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>

      </div>
    </section>
  )
}
