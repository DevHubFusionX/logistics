import { motion as Motion, useInView } from 'framer-motion'
import { ArrowUpRight, ChevronRight, Thermometer, Clock, MapPin } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { servicesData } from './Data'

import PharmaImg from '../../assets/climateImage/Pharma.jpg'
import FrozenImg from '../../assets/climateImage/frozen-foods.jpg'
import FreshImg from '../../assets/climateImage/fresh-produce.jpg'
import HaulageImg from '../../assets/climateImage/enterprise-Haulage.png'

const ease = [0.22, 1, 0.36, 1]

const images = [
  PharmaImg,
  FrozenImg,
  FreshImg,
  HaulageImg,
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.25 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 56, scale: 0.96 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.65, ease },
  },
}

const headerAnim = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

export default function DaraServices() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })

  const [featured, ...rest] = servicesData.map((s, i) => ({ ...s, img: images[i] }))

  return (
    <section ref={ref} className="relative bg-[#e8f0f7] overflow-hidden">
      <div className="px-8 sm:px-14 lg:px-20 pt-24 pb-20">

        {/* ── Header ── */}
        <Motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="flex items-end justify-between mb-16"
        >
          <Motion.div variants={headerAnim}>
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
              What we move
            </p>
            <h2 className="font-heading font-black text-sky-900 text-3xl sm:text-4xl lg:text-5xl leading-tight">
              Services built for{' '}
              <Motion.span
                className="text-blue-500 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease }}
              >
                cold cargo
              </Motion.span>
            </h2>
          </Motion.div>

          <Motion.div variants={headerAnim} className="hidden sm:block">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              All services
              <ChevronRight className="w-4 h-4" />
            </Link>
          </Motion.div>
        </Motion.div>

        {/* ── Grid: 1 featured + 3 cards ── */}
        <Motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >

          {/* Featured card — spans 1 col, tall */}
          <Motion.div
            variants={cardAnim}
            whileHover={{ y: -6, transition: { duration: 0.25 } }}
            className="relative bg-white rounded-2xl overflow-hidden shadow-sm group flex flex-col min-h-[520px] lg:row-span-2"
          >
            {/* image */}
            <div className="relative h-56 overflow-hidden flex-shrink-0">
              <img
                src={featured.img}
                alt={featured.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/60 to-transparent" />
              {/* temp badge */}
              <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-lg text-[11px] font-black text-blue-600 tracking-wider uppercase shadow-sm">
                <Thermometer className="w-3 h-3" />
                2°C – 8°C
              </span>
            </div>

            {/* ghost number */}
            <span
              className="absolute bottom-2 right-3 font-black leading-none text-blue-50 select-none pointer-events-none"
              style={{ fontSize: '7rem' }}
            >
              01
            </span>

            <div className="relative z-10 p-7 flex flex-col flex-1">
              <div className="flex items-start justify-between mb-4">
                <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-500 text-[10px] font-black tracking-widest uppercase">
                  Featured
                </span>
                <Motion.div
                  initial={{ rotate: 0, opacity: 0.3 }}
                  whileHover={{ rotate: 45, opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowUpRight className="w-4 h-4 text-blue-300 group-hover:text-blue-500 transition-colors" />
                </Motion.div>
              </div>

              <h3 className="font-heading font-black text-sky-900 text-2xl leading-tight mb-2">
                {featured.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">{featured.description}</p>

              <ul className="mt-auto space-y-2">
                {featured.features.slice(0, 3).map((f, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-gray-500">
                    <span className="mt-0.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex items-center gap-4 text-xs text-gray-400 font-semibold">
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.deliveryTime}</span>
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{featured.coverage}</span>
              </div>
            </div>

            {/* hover accent line */}
            <Motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.3 }}
            />
          </Motion.div>

          {/* 3 smaller cards */}
          {rest.map(({ title, subtitle, description, features, deliveryTime, coverage, img }, i) => (
            <Motion.div
              key={title}
              variants={cardAnim}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="relative bg-white rounded-2xl overflow-hidden shadow-sm group flex flex-col min-h-[240px]"
            >
              {/* image strip */}
              <div className="relative h-36 overflow-hidden flex-shrink-0">
                <img
                  src={img}
                  alt={title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/50 to-transparent" />
              </div>

              {/* ghost number */}
              <span
                className="absolute bottom-1 right-3 font-black leading-none text-blue-50 select-none pointer-events-none"
                style={{ fontSize: '5rem' }}
              >
                0{i + 2}
              </span>

              <div className="relative z-10 p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-3">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-blue-50 text-blue-500 text-[10px] font-black tracking-widest uppercase">
                    {subtitle}
                  </span>
                  <Motion.div
                    initial={{ rotate: 0, opacity: 0.3 }}
                    whileHover={{ rotate: 45, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowUpRight className="w-4 h-4 text-blue-300 group-hover:text-blue-500 transition-colors" />
                  </Motion.div>
                </div>

                <h3 className="font-heading font-black text-sky-900 text-lg leading-tight mb-2">
                  {title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{description}</p>

                <div className="mt-auto pt-4 flex items-center gap-4 text-xs text-gray-400 font-semibold">
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{deliveryTime}</span>
                  <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{coverage}</span>
                </div>
              </div>

              {/* hover accent line */}
              <Motion.div
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </Motion.div>
          ))}

        </Motion.div>

        {/* ── Bottom CTA strip ── */}
        <Motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl px-8 py-5 shadow-sm"
        >
          <p className="text-sky-900 font-bold text-base">
            Not sure which service fits your cargo?
          </p>
          <Link
            to="/booking/request"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-sm transition-colors flex-shrink-0"
          >
            Get a custom quote
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </Motion.div>

      </div>
    </section>
  )
}
