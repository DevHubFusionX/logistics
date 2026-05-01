import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Thermometer, Shield, MapPin, Clock, Truck, Star } from 'lucide-react'

const items = [
  { icon: Thermometer, text: '±0.1°C Precision' },
  { icon: Shield,      text: 'GIT Insured' },
  { icon: Truck,       text: '69+ Reefer Trucks' },
  { icon: MapPin,      text: 'All 36 States' },
  { icon: Clock,       text: 'Same-Day Available' },
  { icon: Star,        text: '137+ Trips Completed' },
  { icon: Thermometer, text: 'IoT Monitored' },
  { icon: Shield,      text: 'Pharma Grade' },
  { icon: Truck,       text: 'Cold Chain Experts' },
  { icon: MapPin,      text: 'Lagos · Abuja · PH' },
]

// duplicate for seamless loop
const track = [...items, ...items]

export default function SectionDivider() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="bg-sky-800 overflow-hidden py-4 border-y border-white/5"
    >
      <div className="flex items-center gap-0 w-max">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          className="flex items-center gap-0"
        >
          {track.map(({ icon: Icon, text }, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-2 px-8 text-white/30 text-xs font-bold tracking-[0.15em] uppercase whitespace-nowrap border-r border-white/8 last:border-0"
            >
              <Icon className="w-3 h-3 text-blue-500/60 flex-shrink-0" />
              {text}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}
