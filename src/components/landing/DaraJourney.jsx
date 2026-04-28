import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'

const ease = [0.22, 1, 0.36, 1]

const nodes = [
  { x: 168, y: 200, label: 'QUOTE\nREQUESTED' },
  { x: 460, y: 188, label: 'WAITING FOR\nCLEARANCE' },
  { x: 316, y: 272, label: 'CARGO\nDETAILS SENT' },
  { x: 530, y: 296, label: 'JUST A\nSMALL DELAY' },
  { x: 178, y: 348, label: 'REEFER TRUCK\nASSIGNED' },
  { x: 348, y: 408, label: 'CAN WE ADD\nONE MORE STOP' },
  { x: 494, y: 402, label: 'REROUTING\nNOW' },
  { x: 158, y: 548, label: 'CHASE FINAL\nCONFIRM' },
  { x: 262, y: 630, label: 'FINAL_FINAL\nMANIFEST' },
  { x: 516, y: 624, label: 'DELIVERED' },
]

// Organic winding path — smooth S-curves and loops enclosing nodes, matching reference
const PATH = [
  'M 168,200',
  // arc up-right toward node 1 (top right)
  'C 240,155 380,155 460,188',
  // loop clockwise around node 1, descend to node 3
  'C 510,200 555,250 530,296',
  // curve back left, looping back through node 2 (mid)
  'C 505,340 400,310 316,272',
  // loop back left enclosing node 0 area, down to node 4
  'C 230,240 160,280 178,348',
  // small clockwise loop around node 4
  'C 155,390 175,420 240,415',
  // sweep right to node 5
  'C 285,410 320,408 348,408',
  // arc right to node 6
  'C 400,408 460,405 494,402',
  // loop clockwise around node 6, come back down-left
  'C 545,398 555,450 510,490',
  // long sweep left down to node 7
  'C 460,530 310,525 158,548',
  // small loop around node 7
  'C 118,568 130,608 190,622',
  // sweep right to node 8
  'C 220,630 242,632 262,630',
  // continue right to node 9
  'C 360,622 450,622 516,624',
].join(' ')

export default function DaraJourney() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <section ref={ref} className="bg-[#e8ecef] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20 py-24 flex flex-col lg:flex-row items-center gap-0 lg:gap-8">

        {/* ── Left: SVG journey map ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, ease }}
          className="flex-1 w-full"
        >
          <svg
            viewBox="60 140 620 540"
            className="w-full max-w-[640px] mx-auto lg:mx-0"
            style={{ height: 'clamp(420px, 55vw, 620px)' }}
          >
            {/* Animated winding path */}
            <motion.path
              d={PATH}
              fill="none"
              stroke="#b0bec5"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 2.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Nodes + labels */}
            {nodes.map(({ x, y, label }, i) => {
              const lines = label.split('\n')
              const isRight = x > 350
              const lx = isRight ? x + 14 : x - 14
              const anchor = isRight ? 'start' : 'end'

              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    duration: 0.4,
                    delay: 0.3 + i * 0.15,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  style={{ transformOrigin: `${x}px ${y}px` }}
                >
                  {/* dot — solid filled like reference */}
                  <circle cx={x} cy={y} r={6} fill="#1a1a1a" />

                  {/* label lines */}
                  {lines.map((line, li) => (
                    <text
                      key={li}
                      x={lx}
                      y={y - (lines.length - 1) * 7 + li * 14}
                      textAnchor={anchor}
                      fontSize="11"
                      fontFamily="inherit"
                      letterSpacing="0.06em"
                      fill="#1a1a1a"
                      opacity="0.7"
                    >
                      {line}
                    </text>
                  ))}
                </motion.g>
              )
            })}
          </svg>
        </motion.div>

        {/* ── Right: text content ── */}
        <div className="flex-1 max-w-md lg:pl-8">

          {/* icon mark */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease }}
            className="mb-6"
          >
            <svg width="32" height="24" viewBox="0 0 32 24" fill="none">
              <rect x="0" y="4" width="10" height="16" rx="2" fill="#1e3a5f" />
              <rect x="13" y="0" width="10" height="24" rx="2" fill="#1e3a5f" />
              <rect x="26" y="6" width="6" height="12" rx="2" fill="#1e3a5f" />
            </svg>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 32, filter: 'blur(6px)' }}
            animate={inView ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            className="font-heading font-black text-[#1e3a5f] leading-tight tracking-tight"
            style={{ fontSize: 'clamp(1.8rem, 3vw, 2.6rem)' }}
          >
            We get it. Cold chain logistics isn't just a simple delivery
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.28, ease }}
            className="mt-6 text-[#4a6080] text-base leading-relaxed"
          >
            It's last-minute route changes, temperature excursions, missed
            clearances, and anxious calls at midnight. Plus compliance paperwork,
            driver coordination, and second-guessing when you're doing it all alone.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="mt-4 text-[#4a6080] text-base leading-relaxed"
          >
            Dara replaces the constant chaos with one reliable, tech-powered cold
            chain — so your cargo arrives safe, on time, every time.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5, ease }}
            className="mt-4 text-[#1e3a5f] text-base font-bold leading-relaxed"
          >
            Built for how Nigerian businesses{' '}
            <em className="italic">actually</em> move cargo.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.6, ease }}
            className="mt-8"
          >
            <Link
              to="/booking/request"
              className="inline-flex items-center gap-3 px-7 py-4 bg-[#c8f135] hover:bg-[#b8e020] active:scale-95 text-[#1e3a5f] font-bold rounded-xl text-sm transition-all duration-200"
            >
              See how it works
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <polygon points="5,2 13,8 5,14" fill="#1e3a5f" />
              </svg>
            </Link>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
