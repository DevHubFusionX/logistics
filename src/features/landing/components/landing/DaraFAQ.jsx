import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus, HelpCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqData = [
  {
    question: "What makes Darafort different from other transport companies?",
    answer: "Unlike regular transport companies, we specialize in moving items that need to stay cold. We have over 120 cold trucks, live temperature tracking, and full insurance to protect your goods if anything goes wrong."
  },
  {
    question: "How do you keep items cold during transport?",
    answer: "We use modern refrigerated trucks and solar-powered cooling systems. We can set the exact temperature your goods need — from deep freeze (-18°C) for food, to cool temperatures (2°C to 8°C) for medicines. We also track the temperature live and get alerts if it changes."
  },
  {
    question: "Can I hire a cold truck in Lagos, Abuja, and other states?",
    answer: "Yes. You can rent our trucks in Lagos, Abuja, Port Harcourt, and any other state in Nigeria. We do local deliveries within cities and long trips across the country."
  },
  {
    question: "How much does it cost to ship with Dara?",
    answer: "You can get a quick price estimate using the Booking Calculator on our website. Just select the distance, weight, and temperature you need. For large businesses with regular shipments, you can contact us for special rates."
  },
  {
    question: "Is it safe to transport medicines and vaccines with you?",
    answer: "Yes, we have clean, sanitized trucks specifically for transporting vaccines and medicines. We keep them at the exact temperature required and provide you with a full history log of the temperature during the trip."
  },
  {
    question: "How can I track my shipment?",
    answer: "Once you book a shipment, you can enter your Booking ID on our tracking page. You will see a live map of where the truck is, the current temperature of your goods, and the driver's contact details."
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
