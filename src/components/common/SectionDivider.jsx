import { Thermometer, Shield, Truck, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const highlightItems = [
  { icon: Thermometer, text: '±0.1°C Precision' },
  { icon: Shield,      text: 'GIT Insured' },
  { icon: Truck,       text: '120 Reefer Trucks' },
  { icon: MapPin,      text: 'All 36 States' },
  { icon: Shield,      text: 'Pharma Grade' },
  { icon: Truck,       text: 'Cold Chain Experts' }
]

// Duplicate the items array for infinite looping ticker
const duplicatedItems = [...highlightItems, ...highlightItems]

export default function SectionDivider() {
  return (
    <div className="w-full bg-white border-y border-slate-100 py-6 overflow-hidden">
      
      {/* Mobile View: Infinite Auto-scrolling Carousel */}
      <div className="md:hidden w-full relative">
        {/* Soft edge gradient fade overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-12 whitespace-nowrap w-max"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 18, // speed of scrolling
            repeat: Infinity
          }}
        >
          {duplicatedItems.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 text-slate-500 text-[10px] font-bold tracking-wider uppercase select-none"
            >
              <Icon className="w-4 h-4 text-[#0056B8] flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Desktop View: Standard Flex Wrap Row */}
      <div className="hidden md:block max-w-7xl mx-auto px-6">
        <div className="flex flex-wrap items-center justify-center gap-y-4 gap-x-12 md:gap-x-16">
          {highlightItems.map(({ icon: Icon, text }, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2.5 text-slate-500 text-xs font-bold tracking-wider uppercase select-none"
            >
              <Icon className="w-4 h-4 text-[#0056B8] flex-shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
