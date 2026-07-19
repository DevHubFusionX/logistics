import { motion } from 'framer-motion'
import { ArrowUpRight, Thermometer, Clock, MapPin, Shield, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '@/components/common/SEO'

import PharmaImg from '@/assets/climateImage/Pharma.jpg'
import FrozenImg from '@/assets/climateImage/frozen-foods.jpg'
import FreshImg from '@/assets/climateImage/fresh-produce.jpg'
import HaulageImg from '@/assets/climateImage/enterprise-Haulage.png'

const ease = [0.16, 1, 0.3, 1]

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

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease
    }
  }
}

const services = [
  {
    num: '01',
    tag: 'Pharmaceutical',
    title: 'Pharma Logistics',
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
    accent: 'bg-[#0056B8] hover:bg-blue-755',
    accentText: 'text-[#0056B8]',
    accentLight: 'bg-blue-50 text-[#0056B8]',
  },
  {
    num: '02',
    tag: 'Frozen Cargo',
    title: 'Frozen Food Transport',
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
    delivery: '1–3 days delivery',
    coverage: 'Nationwide coverage',
    img: FrozenImg,
    accent: 'bg-sky-600 hover:bg-sky-700',
    accentText: 'text-sky-600',
    accentLight: 'bg-sky-50 text-sky-600',
  },
  {
    num: '03',
    tag: 'Fresh Produce',
    title: 'Refrigerated Transport',
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
    delivery: '12–48 hours delivery',
    coverage: 'All 36 States',
    img: FreshImg,
    accent: 'bg-emerald-600 hover:bg-emerald-700',
    accentText: 'text-emerald-600',
    accentLight: 'bg-emerald-50 text-emerald-600',
  },
  {
    num: '04',
    tag: 'Enterprise Haulage',
    title: 'Enterprise Haulage Services',
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
    accent: 'bg-slate-700 hover:bg-slate-800',
    accentText: 'text-slate-700',
    accentLight: 'bg-slate-100 text-slate-700',
  },
]

export default function Services() {
  return (
    <>
      <SEO
        title="Cold Chain & Reefer Truck Services Nigeria — Pharma, Frozen Food, Haulage"
        description="Darafortoffers Nigeria's best cold chain services — pharma logistics, frozen food transport Lagos to Abuja, refrigerated transport, and enterprise haulage across all 36 states. Get an instant quote."
        keywords="pharma logistics Nigeria, frozen food transport Lagos, refrigerated transport Lagos Abuja, reefer trucks Nigeria, haulage services Nigeria, cold chain services Nigeria, temperature controlled logistics, last mile delivery Nigeria"
        canonical="/services"
        breadcrumbs={[{ name: 'Services', url: '/services' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          'name': 'DarafortCold Chain Services',
          'description': 'Cold chain logistics services offered by Darafortacross Nigeria',
          'itemListElement': [
            {
              '@type': 'ListItem', 'position': 1,
              'item': { '@type': 'Service', 'name': 'Pharma Logistics Nigeria', 'description': 'Hospital-grade cold chain for vaccines, insulin, biologics and temperature-sensitive medicines. IoT-monitored with full compliance documentation. Same-day available in Lagos & Abuja.', 'provider': { '@type': 'LocalBusiness', 'name': 'Dara Express' } }
            },
            {
              '@type': 'ListItem', 'position': 2,
              'item': { '@type': 'Service', 'name': 'Frozen Food Transport Lagos', 'description': 'Sub-zero reefer trucking maintaining -18°C for seafood, meat, poultry and frozen goods. Nationwide frozen haulage network with 24/7 driver support.', 'provider': { '@type': 'LocalBusiness', 'name': 'Dara Express' } }
            },
            {
              '@type': 'ListItem', 'position': 3,
              'item': { '@type': 'Service', 'name': 'Refrigerated Transport Lagos', 'description': 'Farm-to-market cold chain keeping fruits, vegetables and dairy fresh. Advanced reefer trucks covering all 36 states with optimised routing.', 'provider': { '@type': 'LocalBusiness', 'name': 'Dara Express' } }
            },
            {
              '@type': 'ListItem', 'position': 4,
              'item': { '@type': 'Service', 'name': 'Enterprise Haulage Services Nigeria', 'description': 'Scalable freight contracts for enterprises — port-to-warehouse, long-haul trucking, and custom logistics agreements for dry and temperature-controlled cargo.', 'provider': { '@type': 'LocalBusiness', 'name': 'Dara Express' } }
            }
          ]
        }}
      />

      {/* Hero Section */}
      <section className="bg-slate-50 pt-28 pb-14 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-[#0056B8] font-bold text-xs tracking-[0.2em] uppercase mb-4"
          >
            Our Core Capabilities
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="font-heading-unique font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-5 text-3xl sm:text-4xl lg:text-5xl"
          >
            Precision logistics,
            <br />
            tailored to your cargo.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease }}
            className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Explore our temperature-sensitive logistics solutions built for reliability, food safety, and pharmaceutical standards across Nigeria.
          </motion.p>

          {/* Metrics bar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-6 border-t border-slate-200/50"
          >
            {[
              { icon: Thermometer, label: '±0.1°C precision' },
              { icon: Shield, label: 'GIT fully insured' },
              { icon: MapPin, label: 'All 36 states' },
              { icon: Clock, label: 'Same-day available' },
            ].map(({ icon: Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-slate-400 text-xs sm:text-sm font-semibold font-body-unique">
                <Icon className="w-4 h-4 text-[#0056B8]" />
                {label}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="bg-white py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {services.map((service) => (
            <motion.div
              key={service.num}
              variants={cardVariants}
              className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.015)] flex flex-col group"
            >
              {/* Image side */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease"
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-sky-950/20" />

                {/* temperature badge */}
                <div className="absolute bottom-5 left-5 bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-4 py-2.5 text-left">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <Thermometer className="w-3.5 h-3.5 text-blue-400" />
                    <span className="text-white/60 text-[9px] font-bold tracking-widest uppercase">{service.tempLabel}</span>
                  </div>
                  <p className="font-heading-unique font-extrabold text-white text-lg leading-none">{service.temp}</p>
                </div>

                {/* number overlay */}
                <div className="absolute top-5 right-5">
                  <span className="font-heading-unique font-black text-white/15 leading-none text-5xl select-none">
                    {service.num}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col items-start text-left">
                <span className={`inline-block px-2.5 py-1 rounded-lg ${service.accentLight} text-[10px] font-bold tracking-widest uppercase mb-4`}>
                  {service.tag}
                </span>

                <h3 className="font-heading-unique font-extrabold text-slate-800 text-xl sm:text-2xl mb-4 leading-tight">
                  {service.title}
                </h3>

                <p className="font-body-unique text-slate-500 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Checklist points */}
                <div className="space-y-2.5 mb-8 w-full flex-1">
                  {service.points.map((pt, index) => (
                    <div key={index} className="flex items-start gap-2.5">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 text-[#0056B8] flex-shrink-0 mt-0.5 shadow-sm">
                        <Check className="w-3 h-3" strokeWidth={3} />
                      </div>
                      <span className="font-body-unique text-slate-600 text-xs sm:text-sm">{pt}</span>
                    </div>
                  ))}
                </div>

                {/* Footer action bar */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-slate-50 w-full">
                  <Link
                    to="/booking/request"
                    className={`inline-flex items-center gap-2 px-5 py-2.5 ${service.accent} text-white font-bold rounded-sm text-xs sm:text-sm transition-all active:scale-[0.98] shadow-sm`}
                  >
                    Request Quote
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                  <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400 font-body-unique">
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{service.delivery}</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{service.coverage}</span>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Call to Action Section */}
      <section className="bg-white pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#0056B8] rounded-3xl p-8 sm:p-12 lg:p-14 text-white text-left relative overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          <div className="lg:col-span-7 relative z-10">
            <p className="text-blue-300 font-bold text-xs tracking-[0.2em] uppercase mb-4">Ready to ship?</p>
            <h2 className="font-heading-unique font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-5">
              Your cold chain,
              <br />
              handled right.
            </h2>
            <p className="font-body-unique text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Get custom freight rates, fleet allocation schedules, and route proposals from our account managers today.
            </p>

            <div className="flex flex-wrap gap-3.5">
              <Link
                to="/booking/request"
                className="font-body-unique inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0056B8] hover:bg-blue-50 font-bold rounded-sm text-xs sm:text-sm transition-all active:scale-[0.98] shadow-md"
              >
                Get a free quote <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact"
                className="font-body-unique inline-flex items-center gap-2 px-6 py-3 border border-white/25 hover:bg-white/10 text-white font-bold rounded-sm text-xs sm:text-sm transition-all"
              >
                Talk to us
              </Link>
            </div>
          </div>

          {/* Quick highlights grid */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative z-10 w-full">
            {[
              { value: '120', label: 'Reefer trucks\non network' },
              { value: '200+', label: 'Cold chain\ntrips completed' },
              { value: '36', label: 'States\ncovered' },
              { value: '±0.1°C', label: 'Temperature\nprecision' },
            ].map(({ value, label }) => (
              <div
                key={value}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 text-left"
              >
                <p className="font-heading-unique font-extrabold text-white text-xl sm:text-2xl mb-1 leading-none">{value}</p>
                <p className="font-body-unique text-white/50 text-[10px] leading-snug whitespace-pre-line">{label}</p>
              </div>
            ))}
          </div>

          {/* background overlay graphics */}
          <div className="absolute right-0 bottom-0 opacity-15 pointer-events-none scale-110 translate-x-12 translate-y-12">
            <svg className="w-96 h-96 text-white" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="30" stroke="currentColor" strokeWidth="1" />
              <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
            </svg>
          </div>
        </div>
      </section>
    </>
  )
}
