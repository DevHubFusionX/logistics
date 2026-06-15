import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const problems = [
  {
    num: '01',
    title: 'Hard to find trucks',
    desc: 'Finding a cold truck is hard. Shippers have to make too many phone calls to find a driver.',
  },
  {
    num: '02',
    title: 'No live updates',
    desc: 'You cannot see the temperature of your food during the trip. Items get spoiled easily.',
  },
  {
    num: '03',
    title: 'Slow and expensive',
    desc: 'Getting a price quote takes too long. Prices change everyday and drivers are late.',
  }
]

// Framer Motion Variants for Section Header
const headerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
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

// Framer Motion Variants for Problem Grid & Cards
const gridContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
}

const problemCardVariants = {
  hidden: { opacity: 0, y: 25 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1]
    }
  }
}

const cardItemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] }
  }
}

// Framer Motion Variants for Solution Banner
const bannerContainerVariants = {
  hidden: { opacity: 0, y: 35 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.08,
      delayChildren: 0.15
    }
  }
}

const bannerItemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
  }
}

const bannerGlowVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 1.6, ease: "easeOut" }
  }
}

export default function DaraHowItWorks() {
  return (
    <section id="how-it-works" className="relative bg-white py-24 px-6 md:px-12 lg:px-20 overflow-hidden">

      {/* Background Dot Grid Layer */}
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
            CHALLENGES
          </motion.p>
          <motion.h2
            variants={headerItemVariants}
            className="font-heading-unique text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight"
          >
            The problem today
          </motion.h2>

          {/* Animated border bottom line */}
          <motion.div
            variants={headerLineVariants}
            className="absolute bottom-0 left-0 right-0 h-[1.2px] bg-slate-100 origin-left"
          />
        </motion.div>

        {/* Clean Typographic 3-Column Problems Grid */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-24"
        >
          {problems.map((prob) => (
            <motion.div
              key={prob.num}
              variants={problemCardVariants}
              className="flex flex-col items-start group"
            >
              {/* Clean Step Number */}
              <motion.div
                variants={cardItemVariants}
                className="font-heading-unique text-4xl font-light text-slate-300 mb-5 select-none leading-none group-hover:text-[#0056B8] transition-colors duration-300"
              >
                {prob.num}
              </motion.div>

              {/* Title */}
              <motion.h3
                variants={cardItemVariants}
                className="font-heading-unique font-bold text-slate-950 text-lg mb-2"
              >
                {prob.title}
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={cardItemVariants}
                className="font-body-unique text-slate-500 text-sm leading-relaxed max-w-[280px]"
              >
                {prob.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        {/* Dynamic Solution Banner Block at the Bottom */}
        <motion.div
          variants={bannerContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="bg-[#0056B8] text-white rounded-2xl p-8 md:p-12 shadow-[0_20px_50px_rgba(0,86,184,0.15)] relative overflow-hidden"
        >
          {/* Decorative Background Circles */}
          <motion.div
            variants={bannerGlowVariants}
            className="absolute right-[-10%] top-[-20%] w-96 h-96 rounded-full bg-blue-600/20 blur-3xl pointer-events-none"
          />
          <motion.div
            variants={bannerGlowVariants}
            className="absolute left-[-10%] bottom-[-20%] w-96 h-96 rounded-full bg-sky-600/10 blur-2xl pointer-events-none"
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Column: Content */}
            <div className="lg:col-span-7 flex flex-col items-start text-left relative z-10">
              {/* Tag */}
              <motion.span
                variants={bannerItemVariants}
                className="font-body-unique text-xs font-bold tracking-widest text-blue-200 uppercase mb-4"
              >
                THE DARA SOLUTION
              </motion.span>

              {/* Headline */}
              <motion.h3
                variants={bannerItemVariants}
                className="font-heading-unique text-xl sm:text-3xl font-bold leading-tight mb-4"
              >
                We build a simple system to connect you to cold trucks, show you the live temperature, and deliver your items safely on time.
              </motion.h3>

              {/* Description */}
              <motion.p
                variants={bannerItemVariants}
                className="font-body-unique text-blue-100 text-sm sm:text-base leading-relaxed mb-8"
              >
                A simple way to move food, medicines, and chemicals across Nigeria – with zero stress, low prices, and complete safety.
              </motion.p>

              {/* Action CTA */}
              <motion.div variants={bannerItemVariants}>
                <Link
                  to="/booking/request"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0056B8] hover:bg-blue-50 font-bold rounded-sm text-sm transition-all active:scale-97 shadow-lg shadow-black/10 group cursor-pointer"
                >
                  Book
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            </div>

            {/* Right Column: Image */}
            <div className="absolute lg:relative right-[-8%] bottom-[-10%] sm:right-[-4%] sm:bottom-[-8%] lg:right-auto lg:bottom-auto z-0 lg:z-10 lg:col-span-5 w-[220px] sm:w-[320px] lg:w-full opacity-20 lg:opacity-100 pointer-events-none lg:pointer-events-auto">
              <motion.img
                variants={bannerItemVariants}
                src="/assets/img/reefer-truck.png"
                alt="Dara Reefer Truck"
                className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
              />
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  )
}
