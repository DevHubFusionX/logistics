import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { impactAreas, ImpactStats, MobileCarousel, StickyImages, ImpactCard } from './whyus'

export default function DaraWhyUs() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (isMobile) {
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % impactAreas.length)
      }, 4000)
      return () => clearInterval(timer)
    }
  }, [isMobile])

  return (
    <section
      id="difference"
      role="region"
      aria-labelledby="whyus-heading"
      className="py-24 relative bg-white"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-50 rounded-full mb-8"
          >
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Our Impact</span>
          </motion.div>

          <motion.h2
            id="whyus-heading"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-6"
          >
            Why businesses choose Dara
            <br />
            <span className="text-primary">Fast, reliable logistics with local expertise</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10"
          >
            We deliver predictable logistics that reduce cost, save time, and help you scale — backed by tech, local teams and nationwide coverage.
          </motion.p>

          <ImpactStats />
        </div>

        {/* Impact Areas Grid/Carousel */}
        {isMobile ? (
          <MobileCarousel 
            currentSlide={currentSlide}
            setCurrentSlide={setCurrentSlide}
            impactAreas={impactAreas}
          />
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid lg:grid-cols-2 gap-16"
          >
            <StickyImages 
              activeImageIndex={activeImageIndex}
              impactAreas={impactAreas}
            />
            <div className="space-y-24">
              {impactAreas.map((area, index) => (
                <ImpactCard 
                  key={index}
                  area={area}
                  index={index}
                  setActiveImageIndex={setActiveImageIndex}
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-20"
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-50 rounded-3xl p-12 max-w-4xl mx-auto"
          >
            <h3 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses already experiencing the Dara difference.
              Let's build Nigeria's future together, one delivery at a time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link to="/booking/request" className="px-8 py-4 text-white font-bold rounded-xl transition-colors inline-block" style={{ backgroundColor: '#00843D', color: '#fff' }}>
                  Get a quote
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link to="/services" className="px-8 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary hover:bg-blue-50 transition-all inline-block">
                  Learn more
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
