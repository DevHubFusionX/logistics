import { motion, useInView } from 'framer-motion'
import { Phone, Mail, MapPin, Linkedin, Instagram, ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import { AnimatedLogo } from './index'

const ease = [0.22, 1, 0.36, 1]

const quickLinks = [
  { label: 'Services',   to: '/services' },
  { label: 'About Us',   to: '/about' },
  { label: 'Tracking',   to: '/tracking' },
  { label: 'Pricing',    to: '/pricing' },
  { label: 'Contact',    to: '/contact' },
]

const serviceLinks = [
  { label: 'Pharma Logistics',        to: '/services' },
  { label: 'Frozen Food Transport',   to: '/services' },
  { label: 'Refrigerated Transport',  to: '/services' },
  { label: 'Haulage Services',        to: '/services' },
]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
}

const col = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

export default function Footer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6% 0px' })

  return (
    <footer ref={ref} className="bg-[#1e3a5f] text-white overflow-hidden">

      {/* ── Top divider accent ── */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.2, ease }}
        className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-left"
      />

      <div className="px-8 sm:px-14 lg:px-20 pt-16 pb-10">

        {/* ── Main grid ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-14"
        >

          {/* Col 1 — Brand */}
          <motion.div variants={col} className="lg:col-span-1">
            <Link to="/">
              <AnimatedLogo className="h-8 brightness-0 invert mb-6" />
            </Link>
            <p className="text-white/45 text-sm leading-relaxed mb-7">
              Nigeria's most trusted cold chain logistics partner — moving
              pharmaceuticals, frozen foods and perishables with precision
              across all 36 states.
            </p>

            {/* socials */}
            <div className="flex items-center gap-3">
              {[
                { icon: Linkedin,  href: 'https://www.linkedin.com/company/darafort-global-services/' },
                { icon: Instagram, href: 'https://instagram.com/dara.express' },
              ].map(({ icon: Icon, href }) => (
                <motion.a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-9 h-9 rounded-xl bg-white/8 hover:bg-blue-500 flex items-center justify-center transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Col 2 — Quick Links */}
          <motion.div variants={col}>
            <p className="text-white/30 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              Company
            </p>
            <ul className="space-y-3">
              {quickLinks.map(({ label, to }) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-blue-400 transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 3 — Services */}
          <motion.div variants={col}>
            <p className="text-white/30 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              Services
            </p>
            <ul className="space-y-3">
              {serviceLinks.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-blue-400 transition-all duration-300 inline-block" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Col 4 — Contact */}
          <motion.div variants={col}>
            <p className="text-white/30 text-[11px] font-bold tracking-[0.2em] uppercase mb-6">
              Contact
            </p>
            <ul className="space-y-4">
              {[
                { icon: Phone,  lines: ['+234 811 577 9007', '+234 912 116 8485'] },
                { icon: Mail,   lines: ['hello@daraexpress.com'] },
                { icon: MapPin, lines: ['10, Hughes Avenue,', 'Yaba, Lagos State'] },
              ].map(({ icon: Icon, lines }) => (
                <li key={lines[0]} className="flex items-start gap-3">
                  <span className="mt-0.5 w-7 h-7 rounded-lg bg-white/6 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-3.5 h-3.5 text-blue-400" />
                  </span>
                  <div className="space-y-0.5">
                    {lines.map(l => (
                      <p key={l} className="text-sm text-white/50">{l}</p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>

        </motion.div>

        {/* ── Bottom bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease }}
          className="border-t border-white/8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/25 text-xs">
            © {new Date().getFullYear()} Dara Express Logistics. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {/* online pill */}
            <span className="inline-flex items-center gap-2 text-xs text-white/30 font-semibold">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Available 24/7
            </span>

            <Link
              to="/booking/request"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300 transition-colors"
            >
              Ship now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

      </div>
    </footer>
  )
}
