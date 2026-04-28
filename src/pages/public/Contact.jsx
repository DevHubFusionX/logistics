import { motion, useInView } from 'framer-motion'
import { useState, useRef } from 'react'
import { ArrowUpRight, Phone, Mail, MapPin, Clock, MessageSquare, Truck } from 'lucide-react'
import { Link } from 'react-router-dom'
import SEO from '../../components/common/SEO'

const ease = [0.22, 1, 0.36, 1]

const contactDetails = [
  {
    icon: Phone,
    label: 'Call us',
    lines: ['+234 811 577 9007', '+234 912 116 8485'],
    sub: '24/7 available',
    href: 'tel:+2348115779007',
  },
  {
    icon: Mail,
    label: 'Email us',
    lines: ['hello@daraexpress.com', 'contact@daraexpress.com'],
    sub: 'We reply within the hour',
    href: 'mailto:hello@daraexpress.com',
  },
  {
    icon: MapPin,
    label: 'Visit us',
    lines: ['10, Hughes Avenue,', 'Yaba, Lagos State'],
    sub: 'Mon – Sat, 8am – 6pm',
    href: 'https://maps.google.com/?q=Hughes+Avenue+Yaba+Lagos',
  },
]

const reasons = [
  { icon: Truck,         label: 'Get a shipping quote' },
  { icon: MessageSquare, label: 'General enquiry' },
  { icon: Clock,         label: 'Schedule a demo' },
]

export default function Contact() {
  const formRef = useRef(null)
  const formInView = useInView(formRef, { once: true, margin: '-8% 0px' })

  const [form, setForm] = useState({ name: '', email: '', phone: '', cargo: '', message: '' })
  const [sent, setSent] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      <SEO
        title="Contact Dara — Get a Cold Chain Quote Nigeria"
        description="Contact Dara Express for cold chain logistics quotes, pharma transport, frozen food haulage and refrigerated transport across Nigeria."
        keywords="contact Dara logistics, cold chain quote Nigeria, freight quote Lagos, logistics inquiry Nigeria"
        canonical="/contact"
      />

      {/* ── 1. Hero ── */}
      <section className="relative w-full overflow-hidden bg-[#1e3a5f]" style={{ minHeight: '85vh' }}>
        <video
          src="/herovideo.mp4"
          autoPlay muted loop playsInline
          className="absolute inset-0 w-full h-full object-cover object-bottom"
        />
        <div className="absolute inset-0 bg-[#1e3a5f]/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a5f]/95 via-[#1e3a5f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e3a5f] via-transparent to-transparent" />

        <div className="relative z-10 flex flex-col lg:flex-row items-end justify-between h-full px-8 sm:px-14 lg:px-20 pb-20 pt-40 gap-12">

          {/* Left — headline + contact details */}
          <div className="flex-1 max-w-xl">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="text-blue-400 font-bold text-sm tracking-[0.2em] uppercase mb-5"
            >
              Get in touch
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 48, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.85, delay: 0.1, ease }}
              className="font-heading font-black text-white leading-[0.92] tracking-tight mb-10"
              style={{ fontSize: 'clamp(3rem, 7vw, 6rem)' }}
            >
              {"Let's move"}
              <br />
              <span className="text-blue-400">your cargo.</span>
            </motion.h1>

            {/* contact detail rows */}
            <div className="space-y-5">
              {contactDetails.map(({ icon: Icon, label, lines, sub, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.3 + i * 0.1, ease }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500 transition-colors">
                    <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-0.5">{label}</p>
                    {lines.map(l => (
                      <p key={l} className="text-white font-semibold text-sm leading-snug">{l}</p>
                    ))}
                    <p className="text-white/35 text-xs mt-0.5">{sub}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Right — reason pills */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="flex-shrink-0"
          >
            <div className="bg-white/8 backdrop-blur-md border border-white/10 rounded-2xl p-6 space-y-3 w-64">
              <p className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-4">How can we help?</p>
              {reasons.map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-3 px-4 py-3 bg-white/5 hover:bg-white/10 rounded-xl cursor-pointer transition-colors">
                  <Icon className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="text-white/70 text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 2. Form + info split ── */}
      <section ref={formRef} className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-5 min-h-[700px]">

          {/* Form — 3 cols */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={formInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, ease }}
            className="lg:col-span-3 px-8 sm:px-14 lg:px-16 py-20 border-r border-gray-100"
          >
            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="flex flex-col items-start justify-center h-full gap-6 py-20"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <ArrowUpRight className="w-6 h-6 text-blue-500" />
                </div>
                <h2 className="font-heading font-black text-[#1e3a5f] text-3xl leading-tight">
                  Message received!
                </h2>
                <p className="text-[#4a6080] text-base leading-relaxed max-w-md">
                  We will get back to you within the hour. In the meantime, feel free to call us directly.
                </p>
                <Link
                  to="/booking/request"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-sm transition-colors"
                >
                  Get a quote now <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <>
                <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">Send a message</p>
                <h2
                  className="font-heading font-black text-[#1e3a5f] leading-tight mb-10"
                  style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
                >
                  Tell us about
                  <br />
                  <span className="text-blue-500">your cargo.</span>
                </h2>

                <form onSubmit={handleSubmit} className="space-y-0">
                  {/* Name + Email row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="border-b border-gray-200 pb-4">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Full name</label>
                      <input
                        type="text"
                        required
                        placeholder="Adebayo Ogundimu"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-transparent text-[#1e3a5f] placeholder-gray-300 text-base outline-none font-semibold"
                      />
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Email</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className="w-full bg-transparent text-[#1e3a5f] placeholder-gray-300 text-base outline-none font-semibold"
                      />
                    </div>
                  </div>

                  {/* Phone + Cargo type row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                    <div className="border-b border-gray-200 pb-4">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Phone</label>
                      <input
                        type="tel"
                        placeholder="+234 800 000 0000"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                        className="w-full bg-transparent text-[#1e3a5f] placeholder-gray-300 text-base outline-none font-semibold"
                      />
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Cargo type</label>
                      <select
                        value={form.cargo}
                        onChange={e => setForm(f => ({ ...f, cargo: e.target.value }))}
                        className="w-full bg-transparent text-[#1e3a5f] text-base outline-none font-semibold appearance-none cursor-pointer"
                      >
                        <option value="">Select cargo type</option>
                        <option>Pharmaceuticals / Vaccines</option>
                        <option>Frozen Food</option>
                        <option>Fresh Produce</option>
                        <option>Enterprise Haulage</option>
                        <option>Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="border-b border-gray-200 pb-4 mb-10">
                    <label className="text-[10px] font-bold tracking-widest uppercase text-gray-400 block mb-2">Message</label>
                    <textarea
                      rows={4}
                      placeholder="Tell us your route, volume, temperature requirements..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className="w-full bg-transparent text-[#1e3a5f] placeholder-gray-300 text-base outline-none resize-none font-semibold"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-8 py-4 bg-blue-500 hover:bg-blue-400 text-white font-bold rounded-xl text-sm transition-colors"
                  >
                    Send message
                    <ArrowUpRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </>
            )}
          </motion.div>

          {/* Info panel — 2 cols */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={formInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.2, ease }}
            className="lg:col-span-2 bg-[#e8f0f7] px-8 sm:px-10 py-20 flex flex-col justify-between gap-12"
          >
            <div>
              <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-8">Contact details</p>
              <div className="space-y-8">
                {contactDetails.map(({ icon: Icon, label, lines, sub, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center flex-shrink-0 shadow-sm group-hover:bg-blue-500 transition-colors">
                      <Icon className="w-4 h-4 text-blue-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <p className="text-[#4a6080] text-[10px] font-bold tracking-widest uppercase mb-1">{label}</p>
                      {lines.map(l => (
                        <p key={l} className="text-[#1e3a5f] font-bold text-sm leading-snug">{l}</p>
                      ))}
                      <p className="text-[#4a6080] text-xs mt-0.5">{sub}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="space-y-3">
              <p className="text-[#4a6080] text-[10px] font-bold tracking-widest uppercase mb-4">Quick actions</p>
              <Link
                to="/booking/request"
                className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <span className="font-bold text-[#1e3a5f] text-sm">Get an instant quote</span>
                <ArrowUpRight className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <Link
                to="/tracking"
                className="flex items-center justify-between px-5 py-4 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all group"
              >
                <span className="font-bold text-[#1e3a5f] text-sm">Track a shipment</span>
                <ArrowUpRight className="w-4 h-4 text-blue-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ── 3. Map strip ── */}
      <section className="h-[360px] sm:h-[440px] relative overflow-hidden">
        <iframe
          title="Dara Express Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7!2d3.3792!3d6.5095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8c5!2sHughes+Avenue+Yaba+Lagos!5e0!3m2!1sen!2sng!4v1"
          className="absolute inset-0 w-full h-full border-0 grayscale"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        {/* overlay card */}
        <div className="absolute bottom-6 left-6 sm:left-14 bg-[#1e3a5f] rounded-2xl px-6 py-4 shadow-2xl">
          <p className="text-white/40 text-[10px] font-bold tracking-widest uppercase mb-1">Headquarters</p>
          <p className="text-white font-bold text-sm">10, Hughes Avenue, Yaba, Lagos</p>
          <a
            href="https://maps.google.com/?q=Hughes+Avenue+Yaba+Lagos"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 text-xs font-semibold mt-1 hover:text-blue-300 transition-colors"
          >
            Get directions <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </section>
    </>
  )
}
