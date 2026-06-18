import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqData = [
  {
    question: "What makes Dara Express one of the top logistics companies in Nigeria?",
    answer: "Dara Express is a leading logistics and haulage company in Nigeria specializing in cold chain transport. With a robust network of over 120+ modern reefer trucks, advanced IoT telemetry tracking, and comprehensive Goods-in-Transit (GIT) insurance, we provide enterprise-grade reliability that standard transport companies cannot match."
  },
  {
    question: "How does temperature-controlled cold chain logistics work in Nigeria?",
    answer: "Our cold chain logistics utilizes state-of-the-art refrigerated trucks (reefers) and hybrid solar-powered refrigeration units. We maintain precise temperature controls ranging from deep-freeze (-18°C) to chilled (2°C to 8°C). Real-time telemetry monitoring tracks temperature fluctuation down to ±0.1°C, sending instant alerts if anomalies occur."
  },
  {
    question: "Do you offer reefer truck hire in Lagos, Abuja, and other states?",
    answer: "Yes. We offer flexible reefer truck hire and dry truck services in Lagos, Abuja, Port Harcourt, and across all 36 states in Nigeria. Whether you need last-mile delivery, express cargo transport from Lagos to Abuja, or containerized long-haul haulage from ports to warehouses, our fleet is fully equipped to scale with your demand."
  },
  {
    question: "How do I calculate rates for cargo transport and haulage services in Nigeria?",
    answer: "You can get instant pricing estimates using our interactive Booking Calculator on the website, which accounts for distance, tonnage, temperature specifications, and cargo category. For large enterprise logistics contracts, contract logistics, and bulk haulage services, contact our support team for a custom quote."
  },
  {
    question: "Can you handle pharmaceutical logistics and vaccine transport safely?",
    answer: "Absolutely. We are specialists in pharma logistics in Nigeria, complying with strict healthcare storage guidelines. We regularly transport vaccines, insulin, biologics, and clinical trial supplies. Our vehicles feature hospital-grade sanitization, automated cooling backups, and we provide complete temperature data logs upon delivery."
  },
  {
    question: "What features does your real-time shipment telemetry tracking offer?",
    answer: "Our custom tracking portal provides 24/7 visibility into your shipment. By entering your booking ID at /tracking/track, you can view live GPS coordinates, continuous temperature logs, driver contact details, and estimated time of arrival (ETA) updates."
  }
]

// Animations
const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05
    }
  }
}

const headerItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

const headerLineVariants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.15 }
  }
}

export default function DaraFAQ() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx)
  }

  return (
    <section id="faq" className="relative bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">
      
      {/* Background Dot Grid Layer (exactly matches DaraHowItWorks.jsx) */}
      <div
        className="absolute inset-0 z-0 opacity-[0.25]"
        style={{
          backgroundImage: 'radial-gradient(#cbd5e1 1.2px, transparent 1.2px)',
          backgroundSize: '24px 24px',
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section Heading with Animated Line */}
        <motion.div
          variants={headerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative pb-8 mb-16 text-left"
        >
          <motion.p
            variants={headerItemVariants}
            className="font-body-unique text-xs font-bold tracking-widest text-[#0056B8] uppercase mb-3"
          >
            FAQ & HELP
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="font-heading-unique text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            Common Questions
          </motion.h2>

          {/* Animated border bottom line */}
          <motion.div
            variants={headerLineVariants}
            className="absolute bottom-0 left-0 right-0 h-[1.2px] bg-slate-100 origin-left"
          />
        </motion.div>

        {/* Clean, Spacious Two-Column layout: info callout & questions */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Text Summary */}
          <div className="lg:col-span-4 space-y-6 text-left">
            <h3 className="font-heading-unique font-bold text-slate-950 text-xl leading-snug">
              Frequently Asked Questions
            </h3>
            <p className="font-body-unique text-slate-500 text-sm leading-relaxed">
              Find detailed explanations regarding our fleet capabilities, temperature management systems, coverage network, and booking processes.
            </p>
            <p className="font-body-unique text-slate-500 text-sm leading-relaxed">
              If your question is not listed here, feel free to visit our{' '}
              <Link to="/contact" className="text-[#0056B8] font-bold hover:underline">
                Contact page
              </Link>{' '}
              to speak with our operations desk.
            </p>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-8 space-y-4">
            {faqData.map((item, idx) => {
              const isOpen = openIndex === idx
              return (
                <div 
                  key={idx}
                  className="bg-white border border-slate-100 rounded-lg overflow-hidden transition-all duration-300 hover:border-slate-200"
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between gap-4 text-left font-heading-unique font-bold text-slate-800 hover:text-[#0056B8] text-sm sm:text-base transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span>{item.question}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                      isOpen ? 'bg-blue-50 text-[#0056B8]' : 'bg-slate-50 text-slate-400'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-50 font-body-unique text-slate-500 text-xs sm:text-sm leading-relaxed">
                          {item.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>

        </div>

      </div>
    </section>
  )
}
