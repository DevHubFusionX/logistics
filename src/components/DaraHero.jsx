import { motion } from 'framer-motion'
import { ArrowRight, Phone, Truck, Package, MapPin, Clock } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'



const features = [
  'Real-time tracking & visibility across your entire supply chain',
  'Multi-modal transportation solutions with nationwide coverage',
  'Express delivery & same-day shipping for urgent shipments',
  'Enterprise-grade API integration & automated workflows'
]

const backgroundImages = [
  'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1605902711834-8b11c3e3ef2f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80'
]

export default function DaraHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(featureInterval)
  }, [])

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageInterval)
  }, [])
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Images with Zoom Effect */}
      {backgroundImages.map((image, index) => (
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1 }}
          animate={{
            opacity: currentImage === index ? 1 : 0,
            scale: currentImage === index ? 1.1 : 1
          }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      ))}
      <div className="container mx-auto pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16 relative z-10">
        <div className="flex justify-center">
          {/* Main Content */}
          <div className="max-w-5xl text-center space-y-6 sm:space-y-8 lg:space-y-10">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-2 sm:py-3 rounded-full glass-brand"
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--success-500)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white text-xs sm:text-sm font-bold tracking-wide uppercase">
                ⚡ Nigeria's Most Trusted Logistics Network
              </span>
            </motion.div>

            {/* Dynamic Heading */}
            <div className="space-y-3 sm:space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black text-white leading-tight"
              >
                Nigeria's Leading Logistics Platform
                <br />
                <span className="text-sky-400">
                  Connecting Every Corner of the Nation
                </span>
              </motion.h1>

              {/* Rotating Features */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="h-12 sm:h-14 lg:h-16 overflow-hidden"
              >
                <motion.p
                  key={currentFeature}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed px-2"
                  aria-live="polite"
                >
                  {features[currentFeature]}
                </motion.p>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="max-w-4xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-white/85 font-light leading-relaxed px-2"
            >
              Transform your business with Nigeria's most advanced logistics platform. 
              We deliver speed, reliability, and complete visibility across your supply chain—
              from first mile to last mile, with technology that scales with your growth.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Link to="/booking/request">
                <motion.button
                  className="group relative overflow-hidden px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl bg-green-500 text-white text-base sm:text-lg font-bold shadow-2xl transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                    Start Shipping Now
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-white/20"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>

              <Link to="/tracking">
                <motion.button
                  className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 lg:py-5 rounded-xl sm:rounded-2xl border-2 border-white/30 text-white text-base sm:text-lg font-semibold bg-white/10 backdrop-blur-md transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255, 255, 255, 0.15)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Package className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                  Track Shipment
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-2"
            >
              <div className="flex flex-col items-center text-center text-white/90">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 backdrop-blur-sm">
                  <Truck className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1">50K+</div>
                <div className="text-xs sm:text-sm font-medium opacity-80">Successful Deliveries</div>
              </div>

              <div className="flex flex-col items-center text-center text-white/90">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 backdrop-blur-sm">
                  <Clock className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1">99.2%</div>
                <div className="text-xs sm:text-sm font-medium opacity-80">On-Time Performance</div>
              </div>

              <div className="flex flex-col items-center text-center text-white/90">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 backdrop-blur-sm">
                  <MapPin className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div className="text-2xl sm:text-3xl font-black mb-1">36</div>
                <div className="text-xs sm:text-sm font-medium opacity-80">States Coverage</div>
              </div>
            </motion.div>
          </div>


        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>


    </section>
  )
}