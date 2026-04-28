import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Thermometer, Shield, Zap, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import SEO from '../../components/common/SEO'

const ease = [0.22, 1, 0.36, 1]

const stats = [
  { value: '69+',  label: 'Reefer trucks on network' },
  { value: '137+', label: 'Cold chain trips completed' },
  { value: '36',   label: 'States covered' },
  { value: '2025', label: 'Year founded' },
]

const values = [
  { icon: Shield,      num: '01', title: 'Reliability',    body: 'We show up. Every shipment, every route, every time — your cargo arrives safely and on schedule.' },
  { icon: Thermometer, num: '02', title: 'Precision',      body: 'Temperature is not a suggestion. We maintain ±0.1°C accuracy from pickup to delivery, with full documentation.' },
  { icon: Zap,         num: '03', title: 'Innovation',     body: 'IoT sensors, real-time GPS, live dashboards — we use technology to give you visibility and control.' },
  { icon: MapPin,      num: '04', title: 'Customer Focus', body: 'Every solution is tailored. We learn your cargo, your routes, your timelines — and we build around them.' },
]

const timeline = [
  { year: '2025', title: 'Founded',              body: "Dara Cold Chain Logistics established in Yaba, Lagos — built to fix Nigeria's broken cold chain." },
  { year: '2025', title: 'Tech Integration',     body: 'Deployed real-time GPS and IoT temperature monitoring across the entire fleet.' },
  { year: '2025', title: 'Enterprise Launch',    body: 'Launched dedicated cold chain services for pharma and food industries. GIT insurance added.' },
  { year: '2026', title: 'Nationwide Expansion', body: 'Extended coverage to all 36 states with regional hubs and partner network.' },
  { year: '2027', title: 'Market Leader',        body: "Positioned as Nigeria's most trusted cold chain logistics partner." },
]

const missions = [
  {
    label: 'Our Mission',
    heading: "Move Nigeria's most sensitive cargo — safely.",
    body: 'To transform Nigerian commerce by providing reliable, affordable, and technology-driven cold chain logistics that connect every corner of Nigeria.',
    bg: 'bg-white',
  },
  {
    label: 'Our Vision',
    heading: "Nigeria's most trusted cold chain network.",
    body: 'Building a logistics network where distance is no barrier to business growth — where every vaccine, every meal, every product arrives exactly as it left.',
    bg: 'bg-[#e8f0f7]',
  },
]

function Reveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, filter: 'blur(6px)' }}
      animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
      transition={{ duration: 0.75, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function ValueRow({ icon: Icon, num, title, body, alt }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease }}
      className={`border-b border-gray-100 px-8 sm:px-14 lg:px-20 py-12 flex flex-col sm:flex-row items-start sm:items-center gap-8 ${alt ? 'bg-[#f8fafc]' : 'bg-white'}`}
    >
      <span
        className="font-heading font-black text-gray-100 leading-none flex-shrink-0 select-none"
        style={{ fontSize: '5rem', minWidth: '7rem' }}
      >
        {num}
      </span>
      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-blue-500" />
      </div>
      <div className="flex-1">
        <h3 className="font-heading font-black text-[#1e3a5f] text-2xl mb-2">{title}</h3>
        <p className="text-[#4a6080] text-base leading-relaxed max-w-2xl">{body}</p>
      </div>
    </motion.div>
  )
}

export default function About() {
  const timelineRef = useRef(null)
  const timelineInView = useInView(timelineRef, { once: true, margin: '-8% 0px' })
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-8% 0px' })

  return (
    <>
      <SEO
        title="About Dara — Nigeria's Cold Chain Logistics Company"
        description="Learn about Dara Express, Nigeria's leading cold chain logistics company. Specialized in pharma logistics, frozen food transport and refrigerated haulage across all 36 states."
        keywords="about Dara logistics, cold chain Nigeria, logistics company Nigeria, transport company Abuja, cold storage Lagos"
        canonical="/about"
      />

      {/* ── 1. Hero ── */}
      <section className="relative w-full overflow-hidden bg-[#1e3a5f]" style={{ minHeight: '90vh' }}>
        <video
          src="/herovideo.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-[#1e3a5f]/55" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/90 via-[#1e3a5f]/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full px-8 sm:px-14 lg:px-20 pb-20 pt-40">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-5"
          >
            Est. 2025 · Yaba, Lagos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.85, delay: 0.1, ease }}
            className="font-heading font-black text-white leading-[0.92] tracking-tight"
            style={{ fontSize: 'clamp(3.2rem, 8vw, 7.5rem)' }}
          >
            Built to fix
            <br />
            <span className="text-blue-400">{"Nigeria's"}</span>
            <br />
            cold chain.
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease }}
            className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-px bg-white/8 rounded-2xl overflow-hidden border border-white/10"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="bg-white/5 backdrop-blur-md px-6 py-5">
                <p className="font-heading font-black text-white text-2xl sm:text-3xl leading-none mb-1">{value}</p>
                <p className="text-white/35 text-xs leading-snug">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── 2. Pull quote ── */}
      <section className="bg-white px-8 sm:px-14 lg:px-20 py-24 border-b border-gray-100">
        <Reveal>
          <blockquote
            className="font-heading font-black text-[#1e3a5f] leading-tight max-w-5xl"
            style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
          >
            {'"Cold-chain logistics isn\'t just about transportation — it\'s about '}
            <span className="text-blue-500">trust, precision,</span>
            {' and product integrity. We preserve quality and deliver consistency."'}
          </blockquote>
          <p className="mt-6 text-[#4a6080] text-sm font-semibold">— Dara Leadership Team</p>
        </Reveal>
      </section>

      {/* ── 3. Who we are ── */}
      <section className="bg-[#e8f0f7] overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[560px]">
          <div className="relative overflow-hidden" style={{ minHeight: 400 }}>
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=85"
              alt="Dara reefer truck Nigeria"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-[#1e3a5f]/30" />
            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4">
              <p className="text-white/50 text-[10px] font-bold tracking-widest uppercase mb-1">Headquarters</p>
              <p className="font-heading font-black text-white text-xl">Yaba, Lagos</p>
            </div>
          </div>

          <div className="flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-16">
            <Reveal delay={0.15}>
              <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-5">Who we are</p>
              <h2
                className="font-heading font-black text-[#1e3a5f] leading-tight mb-6"
                style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)' }}
              >
                Technology-driven cold chain for Nigeria
              </h2>
              <p className="text-[#4a6080] text-base leading-relaxed mb-5">
                Dara Cold Chain Logistics is a technology-driven logistics company focused on delivering reliable,
                temperature-controlled transportation for Nigeria's pharmaceutical, healthcare, and perishable goods industries.
              </p>
              <p className="text-[#4a6080] text-base leading-relaxed mb-8">
                We ensure that sensitive products — from vaccines and medical supplies to frozen foods and fresh produce —
                are moved safely, efficiently, and in perfect condition from source to destination.
              </p>
              <div className="flex flex-wrap gap-3">
                {['IoT monitored', 'GIT insured', 'GPS tracked', '24/7 support'].map(tag => (
                  <span key={tag} className="px-3 py-1.5 bg-white rounded-xl text-xs font-bold text-[#1e3a5f] shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. Values ── */}
      <section>
        {values.map(({ icon, num, title, body }, i) => (
          <ValueRow key={num} icon={icon} num={num} title={title} body={body} alt={i % 2 === 1} />
        ))}
      </section>

      {/* ── 5. Timeline ── */}
      <section ref={timelineRef} className="bg-[#1e3a5f] overflow-hidden px-8 sm:px-14 lg:px-20 py-24">
        <Reveal>
          <p className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-4">Our journey</p>
          <h2
            className="font-heading font-black text-white leading-tight mb-16"
            style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
          >
            From idea to
            <br />
            <span className="text-blue-400">{"Nigeria's cold chain."}</span>
          </h2>
        </Reveal>

        <div className="relative">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={timelineInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="hidden lg:block absolute top-5 left-0 right-0 h-px bg-blue-500/40 origin-left"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
            {timeline.map(({ year, title, body }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.12, ease }}
              >
                <div className="hidden lg:flex items-center mb-6">
                  <div className="w-3 h-3 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                </div>
                <p className="text-blue-400 font-black text-sm mb-2">{year}</p>
                <h4 className="font-heading font-black text-white text-lg mb-2">{title}</h4>
                <p className="text-white/40 text-sm leading-relaxed">{body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Mission + Vision ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 border-b border-gray-100">
        {missions.map(({ label, heading, body, bg }, i) => (
          <Reveal
            key={label}
            delay={i * 0.15}
            className={`${bg} px-10 sm:px-14 lg:px-16 py-20 border-r border-gray-100 last:border-0`}
          >
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-5">{label}</p>
            <h3
              className="font-heading font-black text-[#1e3a5f] leading-tight mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)' }}
            >
              {heading}
            </h3>
            <p className="text-[#4a6080] text-base leading-relaxed">{body}</p>
          </Reveal>
        ))}
      </section>

      {/* ── 7. CTA ── */}
      <section ref={ctaRef} className="bg-[#1e3a5f] relative overflow-hidden">
        <video
          src="/herovideo.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-[#1e3a5f]/80" />
        <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="max-w-xl"
          >
            <p className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-4">Work with us</p>
            <h2
              className="font-heading font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Ready to move your
              <br />
              <span className="text-blue-400">cargo with Dara?</span>
            </h2>
            <p className="mt-5 text-white/50 text-base leading-relaxed">
              Join businesses across Nigeria who trust Dara to move their most sensitive cargo — on time, every time.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/booking/request"
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-500 hover:bg-blue-400 active:scale-95 text-white font-bold rounded-xl text-sm transition-all"
              >
                Get a free quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/20 hover:border-white/40 text-white/70 hover:text-white font-bold rounded-xl text-sm transition-all"
              >
                Contact us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="grid grid-cols-2 gap-4 flex-shrink-0"
          >
            {stats.map(({ value, label }, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease }}
                className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5"
              >
                <p className="font-heading font-black text-white text-2xl leading-none mb-1">{value}</p>
                <p className="text-white/35 text-xs leading-snug">{label}</p>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </section>
    </>
  )
}
