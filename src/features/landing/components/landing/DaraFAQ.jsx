import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqData = [
  {
    question: "What makes Darafort the best cold-chain logistics company in Nigeria?",
    answer: "Unlike traditional haulage operators, Darafort is a technology-enabled cold-chain infrastructure provider. We coordinate an aggregated network of 300 refrigerated reefer trucks and 500 dry trucks with continuous IoT temperature monitoring (±0.1°C precision), GPS route tracking, and comprehensive cargo transit insurance across all 36 Nigerian states."
  },
  {
    question: "How do your temperature-controlled transportation services work?",
    answer: "We use modern refrigerated trucks and solar-powered cold storage solutions calibrated for specific cargo needs: deep-freeze (-18°C to -25°C) for frozen foods, poultry, and seafood, and controlled chill (2°C to 8°C) for pharmaceuticals and vaccines. Active IoT sensors transmit live telemetry every 15–30 seconds with automated alerts if temperature deviates."
  },
  {
    question: "Can I arrange refrigerated truck hire in Nigeria for interstate corridors?",
    answer: "Yes. We provide dedicated and on-demand refrigerated truck hire across key transit corridors including Lagos to Abuja, Lagos to Port Harcourt, Lagos to Kano, and Onitsha. Available vehicle sizes include 5-ton, 10-ton, 15-ton, and 30-ton reefer trucks with experienced, vetted drivers."
  },
  {
    question: "Why do pharmaceutical logistics companies in Nigeria partner with Darafort?",
    answer: "Darafort operates as a GDP-compliant pharmaceutical supply-chain logistics partner. Our pharmaceutical transport fleet features sanitized reefers, calibrated temperature loggers, real-time excursion alerts, and complete audit-ready trip temperature certificates for regulatory compliance with NAFDAC standards."
  },
  {
    question: "How does Darafort handle refrigerated transport for frozen foods?",
    answer: "Our sub-zero reefer fleet maintains temperatures down to -18°C with dual-compressor refrigeration units, heavy thermal barriers, and backup power to ensure zero thaw cycles for ice cream, frozen seafood, and meat products along interstate highways."
  },
  {
    question: "How can businesses calculate freight rates or access enterprise logistics solutions?",
    answer: "You can generate instant route estimates using the Booking Calculator on our website. For B2B logistics contracts, enterprise fleet aggregation, and supply-chain technology partnerships across Africa, our team provides tailored service level agreements (SLAs) and custom API integrations."
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
              Find simple answers to common questions about our trucks, how we track temperature, and how to book a shipment.
            </p>
            <p className="font-body-unique text-slate-500 text-sm leading-relaxed">
              If your question is not listed here, feel free to visit our{' '}
              <Link to="/contact" className="text-[#0056B8] font-bold hover:underline">
                Contact page
              </Link>{' '}
              to speak with our team.
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
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-blue-50 text-[#0056B8]' : 'bg-slate-50 text-slate-400'
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
