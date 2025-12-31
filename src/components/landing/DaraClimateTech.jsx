import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Sun, Zap, Thermometer, ArrowRight, FileText, Smartphone, Gauge, Snowflake, Globe } from 'lucide-react'
import { SectionHeader, Button } from '../ui'

const handleLearnMore = () => {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
}

const handleViewBrochure = () => {
  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })
}

const CAROUSEL_SLIDES = [
  {
    id: 1,
    image: "/climateImage/image-3.jpeg",
    title: "Solar-Powered Fleet",
    description: "Our hybrid solar containers harvest energy while in transit, drastically reducing fuel consumption and emissions.",
    icon: Sun,
    color: "bg-green-500"
  },
  {
    id: 2,
    image: "/climateImage/image-1.png",
    title: "Cold Chain Integrity",
    description: "Advanced insulation and active cooling ensuring your perishable goods stay fresh from farm to fork.",
    icon: Snowflake,
    color: "bg-blue-500"
  },
  {
    id: 3,
    image: "/climateImage/image-2.png",
    title: "Global Reach",
    description: "Seamless international logistics network optimized for climate-sensitive cargo transport.",
    icon: Globe,
    color: "bg-amber-500"
  }
]

export default function DaraClimateTech() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="climate-tech" className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]" />

      <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
        <SectionHeader
          badge={{ icon: Leaf, text: 'Climate Technology' }}
          title="Sustainable Cold Chain"
          subtitle="Solutions"
          description="Pioneering eco-friendly logistics with solar-powered refrigeration systems that reduce carbon footprint while maintaining optimal temperature control."
        />

        {/* Enhanced Bento Grid - Asymmetrical Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8 md:mt-16 auto-rows-[minmax(200px,auto)]">

          {/* Card 1: Hero Anchor (2x2) with Carousel */}
          <div className="md:col-span-2 lg:col-span-2 lg:row-span-2 h-[400px] md:h-[500px] lg:h-[600px] relative group overflow-hidden rounded-xl md:rounded-[2rem] shadow-xl bg-gray-900">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                className="absolute inset-0"
              >
                <img
                  src={CAROUSEL_SLIDES[currentSlide].image}
                  alt={CAROUSEL_SLIDES[currentSlide].title}
                  className="w-full h-full object-cover transition-transform duration-[5000ms] ease-linear scale-105 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 p-4 md:p-8 text-white w-full">
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 ${CAROUSEL_SLIDES[currentSlide].color} rounded-xl flex items-center justify-center mb-3 md:mb-4 shadow-lg`}>
                      {(() => {
                        const Icon = CAROUSEL_SLIDES[currentSlide].icon
                        return <Icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                      })()}
                    </div>
                    <h3 className="text-xl md:text-3xl font-bold mb-2">{CAROUSEL_SLIDES[currentSlide].title}</h3>
                    <p className="text-sm md:text-base text-gray-200 leading-relaxed max-w-md">
                      {CAROUSEL_SLIDES[currentSlide].description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Carousel Indicators */}
            <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 flex gap-2 z-20">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === idx ? 'bg-white w-6' : 'bg-white/40 hover:bg-white/60'
                    }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Card 2: High Contrast Stat - Savings */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-1 lg:row-span-1 bg-gradient-to-br from-emerald-600 to-green-700 rounded-xl md:rounded-[2rem] p-6 md:p-8 text-white shadow-lg flex flex-col justify-between group hover:shadow-emerald-500/30 transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-sm">
                <Zap className="w-6 h-6 text-yellow-300" />
              </div>
              <span className="text-emerald-100 font-mono text-sm tracking-wider">EFFICIENCY</span>
            </div>
            <div>
              <div className="text-3xl md:text-5xl font-black tracking-tight mb-1">70%</div>
              <p className="text-emerald-100 text-xs md:text-sm font-medium">Energy Cost Reduction</p>
            </div>
          </motion.div>

          {/* Card 3: Interactive Visual - IoT Control */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-1 lg:row-span-1 bg-white rounded-xl md:rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col justify-between group hover:border-blue-200 transition-colors"
          >
            <div className="flex justify-between items-start">
              <div className="p-3 bg-blue-50 rounded-2xl group-hover:bg-blue-100 transition-colors">
                <Smartphone className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                LIVE
              </span>
            </div>
            <div>
              <h4 className="text-lg md:text-xl font-bold text-gray-900 mb-1">Real-Time IoT</h4>
              <p className="text-gray-500 text-xs md:text-sm">Monitor cargo status 24/7 via mobile app.</p>
            </div>
          </motion.div>

          {/* Card 4: Precision Tech (Wide) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 bg-slate-900 rounded-xl md:rounded-[2rem] p-6 md:p-8 text-white relative overflow-hidden shadow-xl"
          >
            <div className="absolute right-0 top-0 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 md:gap-8">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-slate-800 rounded-lg">
                    <Thermometer className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold">Precise Climate Control</h4>
                </div>
                <p className="text-slate-400 mb-4 md:mb-6 text-sm md:text-base">
                  Advanced sensors regulate internal temperature with hospital-grade precision, ensuring zero spoilage.
                </p>
                <div className="flex gap-6 md:gap-8">
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">±0.1°C</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Accuracy</div>
                  </div>
                  <div>
                    <div className="text-2xl md:text-3xl font-bold text-blue-400">-30°C</div>
                    <div className="text-xs text-slate-500 uppercase tracking-wider mt-1">Min Temp</div>
                  </div>
                </div>
              </div>

              {/* Decorative Gauge UI */}
              <div className="w-24 h-24 md:w-32 md:h-32 relative flex items-center justify-center">
                <Gauge className="w-full h-full text-slate-700 opacity-50 absolute" strokeWidth={1} />
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-white">-18°</div>
                  <div className="text-[10px] text-green-400 font-mono">OPTIMAL</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 5: CTA Card - Right Side Stack */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="md:col-span-2 lg:col-span-2 lg:row-span-1 bg-white rounded-xl md:rounded-[2rem] p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6"
          >
            <div className="text-center md:text-left">
              <h4 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">Detailed Specs?</h4>
              <p className="text-sm md:text-base text-gray-500">Download our technical datasheet.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Button onClick={handleLearnMore} className="bg-slate-900 text-white hover:bg-slate-800 rounded-xl px-4 md:px-6 py-2 md:py-3 w-full sm:w-auto text-sm md:text-base">
                View Solutions
              </Button>
              <Button onClick={handleViewBrochure} variant="outline" className="rounded-xl px-4 md:px-6 py-2 md:py-3 border-slate-200 w-full sm:w-auto justify-center text-sm md:text-base">
                <FileText className="w-4 h-4 mr-2" />
                PDF
              </Button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}