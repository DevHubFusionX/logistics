import { motion } from 'framer-motion'
import { ArrowUpRight, Thermometer, Shield, Zap, MapPin, Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'

const ease = [0.16, 1, 0.3, 1]

const stats = [
  { value: '120',  label: 'Reefer trucks on network' },
  { value: '200+', label: 'Cold chain trips completed' },
  { value: '36',   label: 'States covered' },
  { value: '99.8%', label: 'Delivery success rate' },
]

const values = [
  { icon: Shield,      num: '01', title: 'Reliability',    body: 'We show up. Every shipment, every route, every time — your cargo arrives safely and on schedule.' },
  { icon: Thermometer, num: '02', title: 'Precision',      body: 'Temperature is not a suggestion. We maintain ±0.1°C accuracy from pickup to delivery, with full documentation.' },
  { icon: Zap,         num: '03', title: 'Innovation',     body: 'IoT sensors, real-time GPS, live dashboards — we use technology to give you visibility and control.' },
  { icon: MapPin,      num: '04', title: 'Customer Focus', body: 'Every solution is tailored. We learn your cargo, your routes, your timelines — and we build around them.' },
]

const chapters = [
  {
    num: 'Chapter I',
    title: 'The Fragile State',
    subtitle: 'Laying bare Nigeria\'s cold chain fragmentation.',
    body: 'We noticed a critical vulnerability in Nigeria\'s supply chain: cold chain logistics was fragmented. Essential medicines, life-saving vaccines, fresh produce, and food products were regularly lost to heat excursions, uncoordinated transport, and a complete lack of visibility. We set out to change that.',
    metric: '60%+ spoilage rate of perishables prior to modern cold chain intervention.',
    img: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=85'
  },
  {
    num: 'Chapter II',
    title: 'Laying the Foundation',
    subtitle: 'From a small hub in Yaba, Lagos to a dedicated reefer fleet.',
    body: 'We established our first operations hub in Yaba, Lagos. We didn\'t just purchase cargo trucks; we custom-retrofitted them with advanced insulation, hermetic seals, and secondary power backups. We wanted to build a fleet that wouldn\'t fail under pressure, ensuring every cargo stays safe from pickup to delivery.',
    metric: '100% custom-built thermal insulation panels on all reefers.',
    img: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=85'
  },
  {
    num: 'Chapter III',
    title: 'The Telemetry Revolution',
    subtitle: 'Logistics is blind without live compliance data.',
    body: 'We integrated real-time GPS tracking and precise IoT temperature telemetry loggers into every single reefer vehicle on our network. For the first time, cargo owners and logistics managers could watch their temperature charts live, receiving instant alerts if a reefer drifted by even a fraction of a degree.',
    metric: '±0.1°C sensor accuracy logging active telemetry every 30 seconds.',
    img: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=85'
  },
  {
    num: 'Chapter IV',
    title: 'Nationwide Scale',
    subtitle: 'Connecting all 36 states with absolute temperature security.',
    body: 'Today, Dara operates across Nigeria, connecting pharmaceutical manufacturing hubs, fresh farm centers, and consumer markets with a precise, seamless cold chain that never stops. We believe distance shouldn\'t compromise food safety or medical integrity.',
    metric: '36 states covered with regional hubs and dedicated dispatch crews.',
    img: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=85'
  }
]

export default function About() {
  return (
    <>
      <SEO
        title="About Dara Express — Nigeria's Cold Chain Logistics Company"
        description="Dara Express is Nigeria's leading cold chain logistics company, built in Lagos to move pharma, frozen food, and perishables safely across all 36 states. Learn how we're building Nigeria's cold chain backbone."
        keywords="about Dara Express, cold chain logistics company Nigeria, logistics company Lagos, transport company Abuja, reefer trucks history Nigeria, cold chain Nigeria, logistics company Nigeria"
        canonical="/about"
        breadcrumbs={[{ name: 'About', url: '/about' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          'name': 'Dara Express',
          'alternateName': 'Dara Cold Chain Logistics',
          'url': 'https://daraexpress.com',
          'logo': 'https://daraexpress.com/og-image.png?v=2',
          'foundingLocation': { '@type': 'Place', 'name': 'Yaba, Lagos, Nigeria' },
          'description': "Nigeria's leading cold chain logistics company specializing in pharma logistics, frozen food transport, refrigerated haulage and temperature-controlled supply chain solutions across all 36 states.",
          'address': {
            '@type': 'PostalAddress',
            'streetAddress': 'MJS House, 366 Murtala Muhammed Road, Yaba',
            'addressLocality': 'Lagos',
            'addressRegion': 'Lagos State',
            'addressCountry': 'NG'
          },
          'numberOfEmployees': { '@type': 'QuantitativeValue', 'minValue': 10, 'maxValue': 100 },
          'sameAs': ['https://twitter.com/daraexpress', 'https://linkedin.com/company/dara-express']
        }}
      />

      {/* Hero Header */}
      <section className="bg-slate-50 pt-28 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-[#0056B8] font-bold text-xs tracking-[0.2em] uppercase mb-4"
          >
            Our Story
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.08, ease }}
            className="font-heading-unique font-extrabold text-slate-900 leading-[1.08] tracking-tight mb-5 text-3xl sm:text-4xl lg:text-5xl"
          >
            Building the backbone
            <br />
            of Nigeria's cold chain.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.15, ease }}
            className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Every vaccine preserved, every harvest saved, every community nourished. This is the journey of how we built a trusted network to move Nigeria's most sensitive cargo.
          </motion.p>

          {/* Quick numbers */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.22, ease }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto pt-6 border-t border-slate-200/50"
          >
            {stats.map(({ value, label }) => (
              <div key={label} className="text-left md:text-center px-4">
                <p className="font-heading-unique font-extrabold text-[#0056B8] text-2xl sm:text-3xl leading-none mb-1">{value}</p>
                <p className="font-body-unique text-slate-400 text-[10px] uppercase font-bold tracking-wider">{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Chapters Narrative Storybook */}
      <section className="bg-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-24 lg:space-y-36">
          {chapters.map((ch, index) => {
            const isEven = index % 2 === 0
            return (
              <div
                key={ch.num}
                className={`flex flex-col lg:flex-row items-center gap-10 lg:gap-20 ${
                  isEven ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image panel */}
                <div className="w-full lg:w-1/2">
                  <motion.div
                    initial={{ opacity: 0, scale: 1.03 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 0.85, ease }}
                    className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.015)] border border-slate-100"
                  >
                    <img
                      src={ch.img}
                      alt={ch.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease"
                    />
                    <div className="absolute inset-0 bg-sky-950/10" />
                  </motion.div>
                </div>

                {/* Text narrative panel */}
                <div className="w-full lg:w-1/2 text-left space-y-5">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease }}
                    className="font-heading-unique font-bold text-xs uppercase tracking-[0.2em] text-[#0056B8] block"
                  >
                    {ch.num}
                  </motion.span>

                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.05, ease }}
                    className="font-heading-unique font-extrabold text-slate-800 text-2xl sm:text-3xl leading-tight"
                  >
                    {ch.title}
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.1, ease }}
                    className="font-body-unique text-[#0056B8] font-bold text-sm leading-relaxed"
                  >
                    {ch.subtitle}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.15, ease }}
                    className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed"
                  >
                    {ch.body}
                  </motion.p>

                  {/* Fact box */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.22, ease }}
                    className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-start gap-3 w-full"
                  >
                    <div className="flex items-center justify-center w-5.5 h-5.5 rounded-full bg-blue-50 text-[#0056B8] flex-shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3 h-3" strokeWidth={3} />
                    </div>
                    <div>
                      <p className="font-body-unique text-slate-600 text-xs sm:text-sm font-semibold">{ch.metric}</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Core Values Section */}
      <section className="bg-slate-50 py-20 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-left">
          <div className="max-w-2xl mb-12">
            <p className="text-[#0056B8] font-bold text-xs tracking-[0.2em] uppercase mb-3">Our Values</p>
            <h2 className="font-heading-unique font-extrabold text-slate-800 text-2xl sm:text-3xl leading-tight">
              The principles that guide us.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => {
              const IconComp = val.icon
              return (
                <div
                  key={val.num}
                  className="bg-white border border-slate-100 rounded-3xl p-6 shadow-[0_15px_35px_rgba(0,0,0,0.012)] flex flex-col group hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50/60 flex items-center justify-center text-[#0056B8]">
                      <IconComp className="w-5 h-5" />
                    </div>
                    <span className="font-heading-unique font-black text-slate-200 text-3xl select-none">{val.num}</span>
                  </div>
                  
                  <h3 className="font-heading-unique font-bold text-slate-800 text-lg mb-2">{val.title}</h3>
                  <p className="font-body-unique text-slate-400 text-xs leading-relaxed flex-1">{val.body}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-white pb-20 max-w-7xl mx-auto px-6 md:px-12">
        <div className="bg-[#0056B8] rounded-3xl p-8 sm:p-12 lg:p-14 text-white text-left relative overflow-hidden shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 relative z-10">
            <p className="text-blue-300 font-bold text-xs tracking-[0.2em] uppercase mb-4">Work with us</p>
            <h2 className="font-heading-unique font-extrabold text-white text-2xl sm:text-3xl lg:text-4xl leading-tight mb-5">
              Ready to move your
              <br />
              cargo with Dara?
            </h2>
            <p className="font-body-unique text-white/70 text-sm sm:text-base leading-relaxed mb-8 max-w-md">
              Join businesses across Nigeria who trust Dara to move their most sensitive cargo — on time, every time.
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
                Contact us
              </Link>
            </div>
          </div>

          {/* Quick stats highlights */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4 relative z-10 w-full">
            {stats.map(({ value, label }) => (
              <div
                key={label}
                className="bg-white/10 backdrop-blur border border-white/10 rounded-2xl px-5 py-4 text-left"
              >
                <p className="font-heading-unique font-extrabold text-white text-xl sm:text-2xl mb-1 leading-none">{value}</p>
                <p className="font-body-unique text-white/50 text-[10px] leading-snug">{label}</p>
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
