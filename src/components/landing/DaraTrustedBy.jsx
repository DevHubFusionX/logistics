import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

export default function DaraTrustedBy() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  const trustRef = useRef(null)
  const trustInView = useInView(trustRef, { once: true, margin: '-8% 0px' })

  return (
    <>
      {/* ── Section 1: Cost-Effective operations ── */}
      <section ref={ref} className="bg-[#ddeef8] overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left */}
          <div className="flex-1 max-w-lg">
            <motion.h2
              initial={{ opacity: 0, y: 36 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease }}
              className="font-heading font-black text-sky-900 leading-tight tracking-tight"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Cost-Effective, reliable and seamless operations
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2, ease }}
              className="mt-8 text-[#4a6080] text-base leading-relaxed"
            >
              We pride ourselves in offering our customers cost-effective, reliable
              and seamless operations for their transportation needs. Dara was built
              on customer service and issue resolution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.38, ease }}
            >
              <Link
                to="/contact"
                className="mt-10 inline-block px-8 py-4 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white font-bold rounded-xl text-sm transition-all duration-200"
              >
                Get in touch
              </Link>
            </motion.div>
          </div>

          {/* Right — illustrated card */}
          <div className="flex-1 flex justify-center lg:justify-end">
            <div className="relative w-[340px] h-[380px] sm:w-[400px] sm:h-[420px]">

              {/* Back card */}
              <motion.div
                initial={{ opacity: 0, rotate: 0, x: 40, y: -20 }}
                animate={inView ? { opacity: 1, rotate: -5, x: 10, y: -10 } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease }}
                className="absolute top-0 right-0 w-[78%] h-[88%] bg-sky-800 rounded-2xl"
              />

              {/* Mid card */}
              <motion.div
                initial={{ opacity: 0, rotate: 0, x: 40, y: 20 }}
                animate={inView ? { opacity: 1, rotate: 4, x: 18, y: 4 } : {}}
                transition={{ duration: 0.8, delay: 0.28, ease }}
                className="absolute top-0 right-0 w-[78%] h-[88%] bg-blue-500 rounded-2xl"
              />

              {/* Front — SVG illustration card */}
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.92 }}
                animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
                transition={{ duration: 0.75, delay: 0.42, ease }}
                className="absolute inset-0 flex items-end justify-start"
              >
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-[82%] h-[90%] rounded-2xl overflow-hidden shadow-2xl bg-[#e8f0f7] flex flex-col items-center justify-center p-8 gap-6"
                >
                  {/* Route line SVG */}
                  <svg viewBox="0 0 200 120+" className="w-full max-w-[220px]" fill="none">
                    {/* road */}
                    <path d="M10,100 Q60,40 100,60 Q140,80 190,20" stroke="#075985" strokeWidth="3" strokeLinecap="round" strokeDasharray="6 4" opacity="0.2"/>
                    <path d="M10,100 Q60,40 100,60 Q140,80 190,20" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="6 4"/>
                    {/* origin dot */}
                    <circle cx="10" cy="100" r="6" fill="#075985"/>
                    <circle cx="10" cy="100" r="3" fill="white"/>
                    {/* destination dot */}
                    <circle cx="190" cy="20" r="6" fill="#3b82f6"/>
                    <circle cx="190" cy="20" r="3" fill="white"/>
                    {/* truck icon */}
                    <g transform="translate(88,48)">
                      <rect x="-14" y="-10" width="28" height="18" rx="3" fill="#075985"/>
                      <rect x="-10" y="-14" width="16" height="8" rx="2" fill="#3b82f6"/>
                      <circle cx="-8" cy="10" r="4" fill="#e8f0f7" stroke="#075985" strokeWidth="1.5"/>
                      <circle cx="8" cy="10" r="4" fill="#e8f0f7" stroke="#075985" strokeWidth="1.5"/>
                    </g>
                    {/* temp badge */}
                    <rect x="130" y="55" width="52" height="22" rx="6" fill="white" opacity="0.9"/>
                    <text x="156" y="70" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#3b82f6">2°C–8°C</text>
                  </svg>

                  {/* stat pills */}
                  <div className="flex flex-col gap-3 w-full">
                    {[
                      { label: 'On-time delivery', value: '99.8%' },
                      { label: 'Cost savings', value: 'Up to 30%' },
                      { label: 'Response time', value: '&lt; 1 hour' },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex items-center justify-between bg-white rounded-xl px-4 py-2.5 shadow-sm">
                        <span className="text-xs text-[#4a6080] font-semibold">{label}</span>
                        <span className="text-xs font-black text-sky-900">{value}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>

        </div>
      </section>

      {/* ── Section 2: Trust & Safety ── */}
      <section ref={trustRef} className="bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 py-20 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left — text + trust badges */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={trustInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease }}
            className="flex-1 max-w-lg"
          >
            <h2
              className="font-heading font-black text-sky-900 leading-tight tracking-tight"
              style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)' }}
            >
              Trust and safety are our #1 priority
            </h2>

            <p className="mt-6 text-[#4a6080] text-base leading-relaxed">
              The safety of your cargo is our first priority, and we take your trust
              very seriously. We rigorously vet transporters and trucks to guarantee
              your cargo's safe delivery and require insurance to cover every truck.
            </p>

            <div className="mt-10 grid grid-cols-2 gap-4">
              {[
                { icon: '🛡️', label: 'Vetted Transporters', desc: 'Every driver is background-checked and certified' },
                { icon: '📋', label: 'Full Insurance', desc: 'All trucks are insured for every delivery' },
                { icon: '📍', label: 'Real-time Tracking', desc: 'Monitor your cargo location at all times' },
                { icon: '✅', label: 'Compliance Ready', desc: 'Meets all regulatory and safety standards' },
              ].map(({ icon, label, desc }) => (
                <div key={label} className="bg-[#f0f7ff] rounded-2xl p-4">
                  <span className="text-2xl">{icon}</span>
                  <p className="mt-2 text-sky-900 font-bold text-sm">{label}</p>
                  <p className="mt-1 text-[#4a6080] text-xs leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — truck image */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.96 }}
            animate={trustInView ? { opacity: 1, x: 0, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="flex-1 flex justify-end"
          >
            <img
              src="/assets/img/reefer-truck.png"
              alt="Reefer truck cold chain logistics Nigeria"
              className="w-full h-[380px] sm:h-[460px] object-contain"
            />
          </motion.div>

        </div>
      </section>
    </>
  )
}
