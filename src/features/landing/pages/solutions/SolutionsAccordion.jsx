import { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import { FlaskConical, Utensils, ShoppingBag, Leaf, Factory, LayoutGrid } from 'lucide-react'

const sectors = [
  {
    icon: FlaskConical,
    num: '01',
    title: 'Pharmaceuticals',
    desc: 'GDP-compliant logistics with real-time calibration for vaccines and temperature-sensitive biologics.',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=800&q=80',
    bg: 'bg-white',
  },
  {
    icon: Utensils,
    num: '02',
    title: 'Food & Beverage',
    desc: 'Dual-compartment reefers supporting chilled and frozen shipments on the same routing run.',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    bg: 'bg-slate-50',
  },
  {
    icon: ShoppingBag,
    num: '03',
    title: 'FMCG Goods',
    desc: 'High-velocity consolidated distribution and live status feeds to major supermarket depots.',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80',
    bg: 'bg-white',
  },
  {
    icon: Leaf,
    num: '04',
    title: 'Agriculture',
    desc: 'Packhouse and field-cooling transit optimization to reduce fresh harvest spoilage.',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=800&q=80',
    bg: 'bg-slate-50',
  },
  {
    icon: Factory,
    num: '05',
    title: 'Manufacturing',
    desc: 'Safe transport of raw chemical components and temperature-sensitive industrial materials.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    bg: 'bg-white',
  },
  {
    icon: LayoutGrid,
    num: '06',
    title: 'Other Verticals',
    desc: 'Custom cold-chain solutions for cosmetics, floriculture, and specialized chemical assets.',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&w=800&q=80',
    bg: 'bg-slate-50',
  },
]

function SectorCard({ sector, index, total }) {
  const ref = useRef(null)

  // Entry: card scaling in as it enters viewport
  const { scrollYProgress: enterProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  })

  // Exit: card being pushed up as next card stacks over it
  const { scrollYProgress: exitProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const entryScale   = useTransform(enterProgress, [0, 1], [0.93, 1])
  const entryOpacity = useTransform(enterProgress, [0, 0.5], [0, 1])

  const exitScale   = useTransform(exitProgress, [0.5, 1], [1, 0.93])
  const exitOpacity = useTransform(exitProgress, [0.5, 1], [1, 0.5])
  const exitBlur    = useTransform(exitProgress, [0.5, 1], [0, 7])

  const isLast = index === total - 1
  const { icon: Icon, num, title, desc, image, bg } = sector

  const cardId = title.toLowerCase().replace(/[^a-z0-9]/g, '-')

  return (
    <div id={cardId} ref={ref} className="sticky" style={{ top: `${80 + index * 16}px` }}>
      <motion.div
        style={{
          scale: isLast ? entryScale : exitScale,
          opacity: isLast ? entryOpacity : exitOpacity,
          transformOrigin: 'top center',
        }}
        className={`relative ${bg} border border-slate-200 rounded-3xl overflow-hidden shadow-sm`}
      >
        {/* Blur overlay — appears as next card pushes this one up */}
        {!isLast && (
          <motion.div
            className="absolute inset-0 z-10 rounded-3xl pointer-events-none"
            style={{
              backdropFilter: useTransform(exitBlur, (v) => `blur(${v}px)`),
              backgroundColor: useTransform(exitProgress, [0.5, 1], ['rgba(255,255,255,0)', 'rgba(255,255,255,0.3)']),
            }}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[380px]">

          {/* Left: content */}
          <div className="flex flex-col justify-between p-8 lg:p-12">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px] font-bold text-slate-300">{num}</span>
              <span className="w-9 h-9 rounded-xl bg-[#0056B8]/8 text-[#0056B8] flex items-center justify-center">
                <Icon className="w-4 h-4" />
              </span>
            </div>

            <div className="mt-auto pt-12">
              <h3 className="font-heading-unique font-extrabold text-slate-900 text-2xl sm:text-3xl leading-tight tracking-tight mb-4">
                {title}
              </h3>
              <p className="font-body-unique text-slate-400 text-sm leading-relaxed max-w-xs">
                {desc}
              </p>
            </div>
          </div>

          {/* Right: image */}
          <div className="relative min-h-[220px] lg:min-h-0">
            <img
              src={image}
              alt={title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

        </div>
      </motion.div>
    </div>
  )
}

export default function SolutionsAccordion() {
  return (
    <section className="py-24 border-t border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-20">
          <div>
            <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase block mb-4">
              Industry Verticals
            </span>
            <h2 className="font-heading-unique font-extrabold text-slate-900 text-3xl sm:text-5xl leading-tight tracking-tight">
              Who we serve.
            </h2>
          </div>
          <p className="font-body-unique text-slate-400 text-sm max-w-xs leading-relaxed md:text-right">
            Purpose-built cold-chain solutions across six major industries.
          </p>
        </div>

        {/* Stacking cards */}
        <div className="flex flex-col gap-4">
          {sectors.map((sector, idx) => (
            <SectorCard
              key={sector.title}
              sector={sector}
              index={idx}
              total={sectors.length}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
