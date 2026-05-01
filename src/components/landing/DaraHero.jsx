import { motion, AnimatePresence } from 'framer-motion'
import HeroVideo from '../common/HeroVideo'
import { ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { heroData } from './Data'
import { ScheduleDemoModal } from './demo'

const headlines = [
  { line1: "Nigeria's Cold", line2: 'Chain Standard.' },
  { line1: 'Keep It Cold.', line2: 'Move It Fast.' },
]

const subtitles = [
  'Temperature-controlled transport for pharmaceuticals, vaccines & perishables — tracked in real time across Nigeria.',
  'Reefer trucks built for Nigeria — delivering frozen foods, fresh produce and medical supplies with zero compromise.',
  'From Lagos to Abuja and all 36 states — your cold chain, on time, every time.',
  'Goods-in-Transit insured. IoT monitored. Hospital-grade precision. This is how cold chain should work.',
]

export default function DaraHero() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [subIndex, setSubIndex] = useState(0)
  const [headIndex, setHeadIndex] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => {
      setSubIndex(p => (p + 1) % subtitles.length)
      setHeadIndex(p => (p + 1) % headlines.length)
    }, 4000)
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-sky-700"
      style={{ height: '100dvh', minHeight: 600 }}
    >
      {/* ── Video ── */}
      <HeroVideo />
      {/* overlays */}
      <div className="absolute inset-0 bg-sky-800/55" />
      <div className="absolute inset-0 bg-gradient-to-r from-sky-900/80 via-sky-800/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-sky-900 via-transparent to-transparent" />

      {/* ── All content ── */}
      <div className="relative z-10 h-full flex flex-col px-8 sm:px-14 lg:px-20">

        {/* ── MIDDLE: headline + CTA card ── */}
        <div className="flex-1 flex items-end justify-between gap-8 py-6 pb-12">

          {/* Left — headline */}
          <div className="max-w-xl">
            <div
              className="font-heading font-black text-white leading-[0.95] tracking-tight"
              style={{ fontSize: 'clamp(2.4rem, 4.5vw, 4.5rem)' }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={headIndex}
                  initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
                  exit={{    opacity: 0, y: -24, filter: 'blur(4px)' }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="block text-white">{headlines[headIndex].line1}</span>
                  <span className="block text-blue-400">{headlines[headIndex].line2}</span>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-5 h-16 max-w-sm">
              <AnimatePresence mode="wait">
                <motion.p
                  key={subIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="text-white/55 text-sm sm:text-base leading-relaxed"
                >
                  {subtitles[subIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.42 }}
              className="flex items-center gap-3 mt-7"
            >
              <Link
                to={heroData.buttons.primary.link}
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-sm transition-colors"
              >
                Start Shipping
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <button
                onClick={() => setIsDemoOpen(true)}
                className="px-6 py-3 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-semibold rounded-xl text-sm transition-all"
              >
                Book a Demo
              </button>
            </motion.div>
          </div>

          {/* Right — white CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.45 }}
            className="hidden lg:block flex-shrink-0 w-80"
          >
            <div className="bg-white rounded-2xl p-7 shadow-2xl shadow-black/50">
              <p className="text-sky-800 font-black text-xl leading-snug">
                Get an Instant quote for your shipment
              </p>
              <p className="text-gray-400 text-xs mt-2 mb-6">
                Get an instant rate estimate for your cargo move across Lagos, Abuja, and Port Harcourt.
              </p>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => navigate(heroData.buttons.primary.link)}
                  className="inline-flex items-center gap-2 bg-sky-700 hover:bg-sky-600 text-white text-xs font-bold px-5 py-3 rounded-xl transition-all active:scale-95"
                >
                  Get Instant Rate
                  <ArrowUpRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsDemoOpen(true)}
                  className="text-xs font-semibold text-gray-400 hover:text-sky-700 transition-colors underline underline-offset-2"
                >
                  Book a demo
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM: company story card ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex-shrink-0 pb-6 pt-4 flex justify-center"
        >
          <div className="w-full bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl px-8 py-5 flex items-center justify-between gap-8">
            <div>
              <p className="text-white/35 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Est. 2025 · Lagos, Nigeria</p>
              <p className="text-white/70 text-sm leading-relaxed max-w-xl">
                Founded to fix Nigeria's broken cold chain — Dara was built from the ground up to move pharmaceuticals, vaccines and perishables with the precision they deserve.
              </p>
            </div>
            <div className="hidden sm:block flex-shrink-0 text-right">
              <p className="text-white/20 text-[10px] font-bold tracking-[0.2em] uppercase mb-1">Headquarters</p>
              <p className="text-white/50 text-sm font-semibold">Yaba, Lagos</p>
            </div>
          </div>
        </motion.div>

      </div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </section>
  )
}
