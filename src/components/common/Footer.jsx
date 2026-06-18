import { useState } from 'react'
import { Phone, Mail, MapPin, Linkedin, Instagram } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ScheduleDemoModal } from '../../features/landing/components/landing/demo'

const quickLinks = [
  { label: 'Home',          to: '/' },
  { label: 'The Problem',   to: '#why-us' },
  { label: 'How it works',  to: '#how-it-works' },
  { label: 'Services',      to: '/services' },
  { label: 'Contact',       to: '/contact' },
]

const serviceLinks = [
  { label: 'Pharma Logistics',        to: '/services' },
  { label: 'Frozen Food Transport',   to: '/services' },
  { label: 'Refrigerated Transport',  to: '/services' },
  { label: 'Haulage Services',        to: '/services' },
]

export default function Footer() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <footer className="bg-[#0056B8] text-white px-4 sm:px-14 lg:px-20 pt-16 md:pt-20 pb-12 font-sans relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto">
        
        {/* ── TOP SECTION: Large Headline & Action ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start pb-10 md:pb-16 border-b border-white/20">
          
          {/* Headline and Button */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            <h2 className="font-heading-unique text-xl sm:text-4.5xl lg:text-5.5xl font-bold leading-tight tracking-tight max-w-2xl">
              Start shipping with Dara today.
            </h2>
            <button
              onClick={() => setIsDemoOpen(true)}
              className="mt-4 sm:mt-8 inline-flex items-center justify-center px-6 py-2.5 sm:px-8 sm:py-3.5 bg-white text-[#0056B8] hover:bg-blue-50 active:scale-95 font-bold rounded-full text-xs sm:text-sm transition-all duration-200 shadow-md"
            >
              Book a demo
            </button>
          </div>

          {/* Description Block */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end text-left lg:text-right mt-3 lg:mt-0 lg:pt-3">
            <p className="text-blue-100/90 text-xs sm:text-base leading-relaxed max-w-sm font-body-unique">
              Book a free discovery call and learn how Dara can help scale your business.
            </p>
          </div>

        </div>

        {/* ── MIDDLE SECTION: Links Grid ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 py-12 md:py-16 text-left">
          
          {/* Column 1: Company Links */}
          <div className="col-span-1">
            <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 font-body-unique">
              Company
            </p>
            <ul className="space-y-3 font-body-unique">
              {quickLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services Links */}
          <div className="col-span-1">
            <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 font-body-unique">
              Services
            </p>
            <ul className="space-y-3 font-body-unique">
              {serviceLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Direct Contact */}
          <div className="col-span-1">
            <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 font-body-unique">
              Contact
            </p>
            <ul className="space-y-4 font-body-unique">
              {[
                { icon: Phone,  lines: ['+234 811 577 9007', '+234 912 116 8485'] },
                { icon: Mail,   lines: ['hello@daraexpress.com'] },
                { icon: MapPin, lines: ['MJS House, 366 Murtala Muhammed Road, Yaba, Lagos'] },
              ].map(({ icon: Icon, lines }, i) => (
                <li key={i} className="flex items-start gap-3">
                  <Icon className="w-4 h-4 text-blue-200 mt-0.5 flex-shrink-0" />
                  <div className="space-y-0.5">
                    {lines.map(l => (
                      <p key={l} className="text-xs sm:text-sm text-white/85">{l}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div className="col-span-1">
            <p className="text-white/40 text-[10px] font-bold tracking-[0.2em] uppercase mb-6 font-body-unique">
              Connect
            </p>
            <div className="flex flex-col gap-3 font-body-unique">
              <a
                href="https://www.linkedin.com/company/darafort-global-services/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-blue-200" />
                LinkedIn
              </a>
              <a
                href="https://instagram.com/dara.express"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-blue-200" />
                Instagram
              </a>
            </div>
          </div>

        </div>

        {/* ── BOTTOM SECTION: Large Wordmark with Animated Truck ── */}
        <div className="hidden md:flex w-full items-center justify-center py-16 border-t border-white/10 select-none overflow-hidden text-center">
          <div className="flex items-center justify-center gap-2 hover:scale-[1.02] transition-all duration-700 cursor-pointer relative">
            
            {/* Wrapper for the letters */}
            <div className="flex items-center select-none tracking-tighter relative z-0">
              {/* 
                SYNC MATH:
                - Truck: starts at -70vw, ends at 0, duration=3.0s, delay=0.3s
                - Truck arrives at letter[i] at approx: 0.3 + (i / 14) * 3.0
                - Letter 0 (D) rises at 0.3s, Letter 14 (l) rises at 3.3s
              */}
              {"DaraFort Global".split("").map((char, index) => {
                const TRUCK_DELAY = 0.3;
                const TRUCK_DURATION = 3.0;
                const TOTAL_CHARS = 14; // last index
                const letterDelay = TRUCK_DELAY + (index / TOTAL_CHARS) * TRUCK_DURATION;
                return (
                  <motion.span 
                    key={index}
                    initial={{ opacity: 0, y: 36 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: letterDelay, 
                      ease: [0.16, 1, 0.3, 1] 
                    }}
                    className={`inline-block font-heading-unique font-black text-white leading-none tracking-tighter text-[9.5vw] ${char === ' ' ? '' : '-mr-[0.03em]'}`}
                    style={{
                      textShadow: '0px 10px 30px rgba(0, 0, 0, 0.12)',
                      whiteSpace: char === ' ' ? 'pre' : 'normal'
                    }}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>

            {/* Custom Footer Truck SVG (drives across the text and stops next to it) */}
            <motion.div
              initial={{ x: "-70vw" }}
              whileInView={{ x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ 
                duration: 3.0, 
                delay: 0.3, 
                ease: "linear"
              }}
              className="flex items-center relative z-10 self-center"
            >
              {/* Wind / Speed lines — dissolve when truck stops at 3.3s total */}
              <motion.div 
                initial={{ opacity: 0.85, scaleX: 1 }}
                animate={{ opacity: 0, scaleX: 0 }}
                transition={{ 
                  delay: 3.3, 
                  duration: 0.4,
                  ease: "easeOut"
                }}
                className="absolute right-full mr-2 flex flex-col gap-1 items-end origin-right"
              >
                <div className="w-16 h-[2.5px] bg-gradient-to-l from-white/90 to-transparent rounded-full" />
                <div className="w-24 h-[3px] bg-gradient-to-l from-white/75 to-transparent rounded-full" />
                <div className="w-12 h-[2px] bg-gradient-to-l from-white/80 to-transparent rounded-full" />
              </motion.div>

              {/* Speed boost on the SVG itself — squish/stretch + bounce while driving, settle when parked */}
              <motion.svg 
                version="1.1" 
                id="Capa_1" 
                viewBox="0 0 612 612" 
                fill="currentColor"
                className="w-[7.5vw] h-[7.5vw] text-white/85 drop-shadow-[0_8px_20px_rgba(0,0,0,0.12)]"
                animate={{
                  scaleX: [1, 1.12, 0.95, 1.08, 1, 1],
                  scaleY: [1, 0.92, 1.05, 0.94, 1, 1],
                  y:      [0, -4,   2,   -3,   0, 0],
                }}
                transition={{
                  duration: 3.0,
                  delay: 0.3,
                  times: [0, 0.15, 0.35, 0.6, 0.85, 1],
                  ease: "easeInOut",
                }}
              >
                <g>
                  <g>
                    <path d="M226.764,375.35c-28.249,0-51.078,22.91-51.078,51.16c0,28.166,22.829,51.078,51.078,51.078s51.078-22.912,51.078-51.078
                      C277.841,398.26,255.013,375.35,226.764,375.35z M226.764,452.049c-14.125,0-25.54-11.498-25.54-25.541
                      c0-14.123,11.415-25.539,25.54-25.539c14.124,0,25.539,11.416,25.539,25.539C252.302,440.551,240.888,452.049,226.764,452.049z
                       M612,337.561v54.541c0,13.605-11.029,24.635-24.636,24.635h-26.36c-4.763-32.684-32.929-57.812-66.927-57.812
                      c-33.914,0-62.082,25.129-66.845,57.812H293.625c-4.763-32.684-32.93-57.812-66.845-57.812c-33.915,0-62.082,25.129-66.845,57.812
                      h-33.012c-13.606,0-24.635-11.029-24.635-24.635v-54.541H612L612,337.561z M494.143,375.35c-28.249,0-51.16,22.91-51.16,51.16
                      c0,28.166,22.912,51.078,51.16,51.078c28.166,0,51.077-22.912,51.077-51.078C545.22,398.26,522.309,375.35,494.143,375.35z
                       M494.143,452.049c-14.125,0-25.539-11.498-25.539-25.541c0-14.123,11.414-25.539,25.539-25.539
                      c14.042,0,25.539,11.416,25.539,25.539C519.682,440.551,508.185,452.049,494.143,452.049z M602.293,282.637l-96.817-95.751
                      c-6.159-6.077-14.453-9.526-23.076-9.526h-48.86v-18.313c0-13.631-11.004-24.635-24.635-24.635H126.907
                      c-13.55,0-24.635,11.005-24.635,24.635v3.86L2.3,174.429l177.146,23.068L0,215.323l178.814,25.423L0,256.25l102.278,19.29
                      l-0.007,48.403h509.712v-17.985C611.983,297.171,608.452,288.796,602.293,282.637z M560.084,285.839h-93.697
                      c-2.135,0-3.86-1.724-3.86-3.859v-72.347c0-2.135,1.725-3.86,3.86-3.86h17.82c0.985,0,1.971,0.411,2.71,1.068l75.796,72.347
                      C565.257,281.569,563.532,285.839,560.084,285.839z"/>
                  </g>
                </g>
              </motion.svg>
            </motion.div>
          </div>
        </div>

        {/* ── COPYRIGHT ROW ── */}
        <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left font-body-unique text-xs text-blue-100/60">
          <p>
            © {new Date().getFullYear()} Dara Express Logistics. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

      </div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </footer>
  )
}
