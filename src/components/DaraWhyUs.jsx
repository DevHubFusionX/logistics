import { motion, AnimatePresence } from 'framer-motion'
import { Thermometer, Radar, Truck, Users, TrendingUp, Shield, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const features = [
  {
    icon: Thermometer,
    title: "Precision Temperature Management",
    description: "Advanced thermal control systems maintaining pharmaceutical-grade environments: 0°C to 4°C for fresh produce, -20°C for frozen commodities, and 2°C to 8°C for vaccine distribution, ensuring optimal product integrity."
  },
  {
    icon: Radar,
    title: "Intelligent Monitoring Systems", 
    description: "Comprehensive IoT-enabled tracking infrastructure with real-time GPS positioning, temperature logging, and automated alert systems for immediate response to environmental deviations or route disruptions."
  },
  {
    icon: Truck,
    title: "Advanced Fleet Architecture",
    description: "State-of-the-art refrigerated vehicle fleet spanning 1-ton to 20-ton capacity configurations, featuring multi-zone temperature control, advanced insulation technology, and predictive maintenance protocols."
  },
  {
    icon: Users,
    title: "Specialized Logistics Expertise",
    description: "Highly trained cold chain professionals certified in temperature-sensitive cargo handling, pharmaceutical transport protocols, and international food safety standards, ensuring operational excellence at every touchpoint."
  },
  {
    icon: TrendingUp,
    title: "Enterprise-Grade Scalability",
    description: "Flexible logistics infrastructure capable of accommodating diverse operational requirements, from single-vehicle deployments to comprehensive fleet solutions supporting large-scale distribution networks."
  },
  {
    icon: Shield,
    title: "Comprehensive Regulatory Adherence",
    description: "Full compliance with NAFDAC pharmaceutical standards, WHO Prequalification Scheme requirements, and SON quality assurance protocols, ensuring regulatory alignment across all cold chain operations."
  }
]

export default function DaraWhyUs() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % features.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [isMobile])

  return (
    <section 
      id="whyus" 
      className="py-20 relative"
      style={{ 
        background: 'linear-gradient(135deg, var(--gray-900) 0%, var(--sky-900) 50%, var(--blue-900) 100%)'
      }}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 space-y-6"
        >
          <div
            className="inline-block px-6 py-2 rounded-full"
            style={{ 
              backgroundColor: 'var(--bg-brand-subtle)', 
              color: 'var(--text-brand)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            Working Process
          </div>
          
          <h2 style={{
            fontSize: 'var(--text-4xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-inverse)',
            lineHeight: 'var(--leading-tight)'
          }}>
            Operational Excellence Through Advanced Infrastructure
          </h2>
          
          <p style={{
            fontSize: 'var(--text-xl)',
            color: 'var(--text-inverse)',
            fontWeight: 'var(--font-light)',
            maxWidth: '800px',
            margin: '0 auto',
            opacity: 0.9
          }}>
            Our sophisticated cold chain methodology integrates cutting-edge technology, 
            regulatory compliance, and operational expertise to deliver unparalleled 
            temperature-controlled logistics solutions across Nigeria's diverse commercial landscape.
          </p>
        </motion.div>

        {/* Features Grid/Carousel */}
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                  className="p-8 rounded-2xl"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                >
                  {(() => {
                    const feature = features[currentSlide]
                    const IconComponent = feature.icon
                    return (
                      <>
                        <div
                          className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                          style={{ 
                            backgroundColor: 'var(--color-primary)',
                            color: 'var(--text-inverse)'
                          }}
                        >
                          <IconComponent className="w-8 h-8" />
                        </div>
                        <div className="space-y-4">
                          <h3 style={{
                            fontSize: 'var(--text-xl)',
                            fontWeight: 'var(--font-bold)',
                            color: 'var(--text-inverse)'
                          }}>
                            {feature.title}
                          </h3>
                          <p style={{
                            fontSize: 'var(--text-base)',
                            color: 'var(--text-inverse)',
                            fontWeight: 'var(--font-light)',
                            lineHeight: 'var(--leading-relaxed)',
                            opacity: 0.9
                          }}>
                            {feature.description}
                          </p>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Navigation */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + features.length) % features.length)}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <div className="flex gap-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? 'bg-white' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % features.length)}
                className="p-2 rounded-full bg-white/20 text-white hover:bg-white/30 transition-all"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group p-8 rounded-2xl transition-all duration-300"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: 'var(--radius-2xl)'
                  }}
                  whileHover={{ 
                    y: -5,
                    backgroundColor: 'rgba(255, 255, 255, 0.15)'
                  }}
                >
                  <motion.div
                    className="w-16 h-16 rounded-xl flex items-center justify-center mb-6"
                    style={{ 
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--text-inverse)'
                    }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                  >
                    <IconComponent className="w-8 h-8" />
                  </motion.div>
                  <div className="space-y-4">
                    <h3 style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-inverse)'
                    }}>
                      {feature.title}
                    </h3>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-inverse)',
                      fontWeight: 'var(--font-light)',
                      lineHeight: 'var(--leading-relaxed)',
                      opacity: 0.9
                    }}>
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}