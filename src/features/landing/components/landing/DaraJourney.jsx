import { motion } from 'framer-motion'
import { aboutData } from './Data'

// Left Image wipe reveal variants
const imageWipeVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.95
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.8, 
      ease: [0.16, 1, 0.3, 1] 
    }
  }
}

// Text mask reveal slide-up variants
const textMaskVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] }
  }
}

// Quote left line variants
const quoteBorderVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 0.8, ease: "easeOut", delay: 0.25 }
  }
}

// Quote text slide-in variants
const quoteTextVariants = {
  hidden: { opacity: 0, x: -15 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 }
  }
}

// Timeline wrapper variants
const timelineContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.1
    }
  }
}

// Timeline vertical line variants
const timelineLineVariants = {
  hidden: { scaleY: 0 },
  visible: {
    scaleY: 1,
    transition: { duration: 1.15, ease: [0.22, 1, 0.36, 1], delay: 0.2 }
  }
}

// Timeline individual item slide-in variants
const timelineItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

// Timeline connector dot scaling spring variants
const dotVariants = {
  hidden: { scale: 0 },
  visible: {
    scale: 1,
    transition: { 
      type: "spring", 
      stiffness: 220, 
      damping: 10,
      delay: 0.15
    }
  }
}

export default function DaraJourney() {
  return (
    <section id="journey" className="relative bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Dot Grid Layer */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left Column: Image & Leadership Quote (Span 5) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={imageWipeVariants}
            className="relative rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.04)] border border-slate-100/80 group"
          >
            <img 
              src={aboutData.image} 
              alt="Dara logistics transport" 
              className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-103 transition-transform duration-700 ease-out pointer-events-none"
            />
          </motion.div>

          {/* Quote block below the image */}
          <div className="relative flex items-stretch gap-5">
            {/* Growing left border line */}
            <motion.div 
              variants={quoteBorderVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="w-[2px] bg-[#0056B8] origin-top"
            />
            
            <motion.div
              variants={quoteTextVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="py-1"
            >
              <p className="font-body-unique italic text-slate-600 text-sm leading-relaxed mb-2">
                "{aboutData.quote.text}"
              </p>
              <p className="font-heading-unique font-bold text-slate-900 text-xs tracking-wider uppercase">
                {aboutData.quote.author}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Title, Description, and Timeline (Span 7) */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="lg:col-span-7 flex flex-col items-start"
        >
          
          {/* Badge (Mask Reveal) */}
          <div className="overflow-hidden mb-3">
            <motion.span 
              variants={textMaskVariants}
              className="font-body-unique text-xs font-bold tracking-widest text-[#0056B8] uppercase block"
            >
              {aboutData.badge}
            </motion.span>
          </div>

          {/* Heading (Mask Reveal) */}
          <div className="overflow-hidden mb-5">
            <motion.h2 
              variants={textMaskVariants}
              className="font-heading-unique text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight leading-tight"
            >
              {aboutData.title.prefix} <span className="text-[#0056B8]">{aboutData.title.highlight}</span>
            </motion.h2>
          </div>

          {/* Description (Mask Reveal) */}
          <div className="overflow-hidden mb-12">
            <motion.p 
              variants={textMaskVariants}
              className="font-body-unique text-slate-500 text-sm sm:text-base leading-relaxed max-w-2xl"
            >
              {aboutData.description}
            </motion.p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative pl-6 w-full">
            {/* Custom Self-drawing Timeline Line */}
            <motion.div
              variants={timelineLineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="absolute left-[0.5px] top-0 bottom-0 w-[1px] bg-slate-200 origin-top"
            />

            <motion.div 
              variants={timelineContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="space-y-10"
            >
              {aboutData.timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={timelineItemVariants}
                  className="relative"
                >
                  {/* Connector Dot */}
                  <motion.div 
                    variants={dotVariants}
                    className="absolute left-[-29.5px] top-[4px] w-2.5 h-2.5 rounded-full bg-[#0056B8] border-2 border-white ring-4 ring-blue-50" 
                  />
                  
                  {/* Year Badge */}
                  <span className="inline-block px-2.5 py-0.5 rounded bg-blue-50 text-[#0056B8] text-[10px] font-bold font-heading-unique tracking-wider uppercase mb-2">
                    {item.year}
                  </span>

                  {/* Milestone Description */}
                  <p className="font-body-unique text-slate-600 text-sm leading-relaxed max-w-xl">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>

        </motion.div>

      </div>
    </section>
  )
}
