import { motion, useInView } from 'framer-motion'
import { ArrowUpRight, Thermometer, Clock, MapPin, Shield, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import SEO from '../../components/common/SEO'
import HeroVideo from '../../components/common/HeroVideo'

import PharmaImg from '../../assets/climateImage/Pharma.jpg'
import FrozenImg from '../../assets/climateImage/frozen-foods.jpg'
import FreshImg from '../../assets/climateImage/fresh-produce.jpg'
import HaulageImg from '../../assets/climateImage/enterprise-Haulage.png'

const ease = [0.22, 1, 0.36, 1]

const services = [
  {
    num: '01',
    tag: 'Pharmaceutical',
    title: 'Pharma\nLogistics',
    temp: '2°C – 8°C',
    tempLabel: 'Controlled cold chain',
    description: 'Hospital-grade transport for vaccines, insulin, biologics and temperature-sensitive medicines. Every shipment is IoT-monitored end-to-end with a full temperature excursion report on delivery.',
    points: [
      'Dedicated pharma-grade reefer trucks',
      'Real-time IoT temperature logging',
      'Goods-in-Transit (GIT) insurance',
      'Same-day available in Lagos & Abuja',
      'Full compliance documentation',
    ],
    delivery: 'Same-day available',
    coverage: 'Lagos · Abuja · Port Harcourt',
    img: PharmaImg,
    accent: 'bg-blue-500',
    accentText: 'text-blue-500',
    accentLight: 'bg-blue-50',
  },
  {
    num: '02',
    tag: 'Frozen Cargo',
    title: 'Frozen Food\nTransport',
    temp: '−18°C',
    tempLabel: 'Sub-zero maintained',
    description: 'Sub-zero reefer trucking for seafood, meat, poultry and frozen goods. Our dedicated frozen fleet maintains −18°C throughout transit — from cold store to final destination.',
    points: [
      'Sub-zero −18°C throughout transit',
      'Seafood, meat & poultry specialists',
      'Express Lagos to Abuja corridor',
      'Nationwide frozen haulage network',
      '24/7 driver & cargo support',
    ],
    delivery: '1–3 days',
    coverage: 'Nationwide',
    img: FrozenImg,
    accent: 'bg-cyan-500',
    accentText: 'text-cyan-600',
    accentLight: 'bg-cyan-50',
  },
  {
    num: '03',
    tag: 'Fresh Produce',
    title: 'Refrigerated\nTransport',
    temp: '2°C – 12°C',
    tempLabel: 'Farm-fresh cold chain',
    description: 'Farm-to-market cold chain keeping fruits, vegetables and dairy fresh from source to shelf. Advanced reefer trucks covering all 36 states with optimised routing.',
    points: [
      'Fruits, vegetables & dairy specialists',
      'Farm-to-market optimised routing',
      'Truck hire Lagos for perishables',
      'Direct Lagos–Abuja express lane',
      'All 36 states coverage',
    ],
    delivery: '12–48 hours',
    coverage: 'All 36 States',
    img: FreshImg,
    accent: 'bg-green-500',
    accentText: 'text-green-600',
    accentLight: 'bg-green-50',
  },
  {
    num: '04',
    tag: 'Enterprise',
    title: 'Haulage\nServices',
    temp: 'Ambient',
    tempLabel: 'Dry & temp-controlled',
    description: 'Scalable freight contracts for enterprises — port-to-warehouse, long-haul trucking, and custom logistics agreements. Built for businesses that move volume.',
    points: [
      'Long-haul trucking Nigeria-wide',
      'Port to warehouse logistics',
      'Custom enterprise contracts',
      'Dry & temperature-controlled options',
      'Daily departure schedules',
    ],
    delivery: 'Daily departures',
    coverage: 'Regional Hubs',
    img: HaulageImg,
    accent: 'bg-sky-800',
    accentText: 'text-sky-900',
    accentLight: 'bg-gray-100',
  },
]

function ServiceRow({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className="border-b border-gray-100 last:border-0">
      <div className={`grid grid-cols-1 lg:grid-cols-2 min-h-[600px] ${isEven ? '' : 'lg:[direction:rtl]'}`}>

        {/* Image side */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.9, ease }}
          className="relative overflow-hidden lg:[direction:ltr]"
          style={{ minHeight: 400 }}
        >
          <img
            src={service.img}
            alt={service.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* dark overlay */}
          <div className="absolute inset-0 bg-sky-800/40" />

          {/* temp badge — bottom left */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="absolute bottom-8 left-8"
          >
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-6 py-4">
              <div className="flex items-center gap-2 mb-1">
                <Thermometer className="w-4 h-4 text-blue-400" />
                <span className="text-white/50 text-xs font-bold tracking-widest uppercase">{service.tempLabel}</span>
              </div>
              <p className="font-heading font-black text-white text-3xl leading-none">{service.temp}</p>
            </div>
          </motion.div>

          {/* service number — top right */}
          <div className="absolute top-8 right-8">
            <span className="font-heading font-black text-white/15 leading-none select-none" style={{ fontSize: '6rem' }}>
              {service.num}
            </span>
          </div>
        </motion.div>

        {/* Content side */}
        <motion.div
          initial={{ opacity: 0, x: isEven ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.15, ease }}
          className="lg:[direction:ltr] bg-white flex flex-col justify-center px-10 sm:px-14 lg:px-16 py-16"
        >
          {/* tag */}
          <span className={`inline-flex items-center self-start px-3 py-1 rounded-lg ${service.accentLight} ${service.accentText} text-[10px] font-black tracking-widest uppercase mb-6`}>
            {service.tag}
          </span>

          {/* title */}
          <h2
            className="font-heading font-black text-sky-900 leading-[0.92] tracking-tight mb-6 whitespace-pre-line"
            style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}
          >
            {service.title}
          </h2>

          <p className="text-[#4a6080] text-base leading-relaxed mb-8 max-w-md">
            {service.description}
          </p>

          {/* checklist */}
          <ul className="space-y-3 mb-10">
            {service.points.map((p, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: 16 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07, ease }}
                className="flex items-start gap-3"
              >
                <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${service.accentText}`} />
                <span className="text-sm text-[#4a6080]">{p}</span>
              </motion.li>
            ))}
          </ul>

          {/* meta + CTA */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/booking/request"
              className={`inline-flex items-center gap-2 px-6 py-3 ${service.accent} hover:opacity-90 active:scale-95 text-white font-bold rounded-xl text-sm transition-all`}
            >
              Get a quote
              <ArrowUpRight className="w-4 h-4" />
            </Link>
            <div className="flex items-center gap-4 text-xs text-gray-400 font-semibold">
              <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{service.delivery}</span>
              <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{service.coverage}</span>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  )
}

export default function Services() {
  const heroRef = useRef(null)
  const ctaRef = useRef(null)
  const ctaInView = useInView(ctaRef, { once: true, margin: '-10% 0px' })

  return (
    <>
      <SEO
        title="Precision Cold Chain & Freight Services Nigeria"
        description="Dara Express reefer trucks in Nigeria. Pharma logistics, frozen food transport Lagos, refrigerated transport Lagos to Abuja. Expert haulage services."
        keywords="pharma logistics Nigeria, frozen food transport Lagos, refrigerated transport Lagos, reefer trucks Nigeria, haulage services Nigeria"
        canonical="/services"
      />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden bg-sky-800"
        style={{ minHeight: '80vh' }}
      >
        <HeroVideo />
        <div className="absolute inset-0 bg-sky-800/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-sky-900/90 via-sky-800/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-sky-900 via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col justify-end h-full px-8 sm:px-14 lg:px-20 pb-16 pt-36">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-5"
          >
            What we move
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="font-heading font-black text-white leading-[0.92] tracking-tight max-w-3xl"
            style={{ fontSize: 'clamp(3rem, 7vw, 6.5rem)' }}
          >
            Cold chain
            <br />
            <span className="text-blue-400">done right.</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35, ease }}
            className="mt-10 flex flex-wrap gap-6"
          >
            {[
              { icon: Thermometer, label: '±0.1°C precision' },
              { icon: Shield,      label: 'GIT insured' },
              { icon: MapPin,      label: 'All 36 states' },
              { icon: Clock,       label: 'Same-day available' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-white/55 text-sm font-semibold">
                <Icon className="w-4 h-4 text-blue-400" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Service rows ── */}
      <section className="bg-white">
        {services.map((service, i) => (
          <ServiceRow key={service.num} service={service} index={i} />
        ))}
      </section>

      {/* ── CTA ── */}
      <section ref={ctaRef} className="bg-sky-800 relative overflow-hidden">
        <HeroVideo className="absolute inset-0 w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-sky-800/80" />

        <div className="relative z-10 px-8 sm:px-14 lg:px-20 py-24 flex flex-col lg:flex-row items-center justify-between gap-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="max-w-xl"
          >
            <p className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-4">Ready to ship?</p>
            <h2
              className="font-heading font-black text-white leading-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              Your cold chain,{' '}
              <span className="text-blue-400">handled right.</span>
            </h2>
            <p className="mt-5 text-white/50 text-base leading-relaxed">
              Get a quote in minutes. Lagos, Abuja, Port Harcourt and all 36 states.
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
                Talk to us
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={ctaInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease }}
            className="grid grid-cols-2 gap-4 flex-shrink-0"
          >
            {[
              { value: '69+',    label: 'Reefer trucks\non network' },
              { value: '137+',   label: 'Cold chain\ntrips completed' },
              { value: '36',     label: 'States\ncovered' },
              { value: '±0.1°C', label: 'Temperature\nprecision' },
            ].map(({ value, label }, i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 20 }}
                animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.35 + i * 0.08, ease }}
                className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-5"
              >
                <p className="font-heading font-black text-white text-2xl leading-none mb-1">{value}</p>
                <p className="text-white/35 text-xs leading-snug whitespace-pre-line">{label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}
