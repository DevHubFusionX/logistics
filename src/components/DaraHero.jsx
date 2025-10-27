import { motion } from 'framer-motion'
import { ArrowRight, Package, Truck, MapPin, Clock } from 'lucide-react'
import { useState, useEffect } from 'react'
import { HERO_FEATURES, HERO_BACKGROUND_IMAGES, HERO_STATS } from '../constants/mockData'
import Button from './ui/Button'
import Badge from './ui/Badge'
import { fadeInUp, scaleIn, hoverScale } from '../utils/animations'

export default function DaraHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % HERO_FEATURES.length)
    }, 3000)
    return () => clearInterval(featureInterval)
  }, [])

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % HERO_BACKGROUND_IMAGES.length)
    }, 5000)
    return () => clearInterval(imageInterval)
  }, [])
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Images with Zoom Effect */}
      {HERO_BACKGROUND_IMAGES.map((image, index) => (
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
                  {HERO_FEATURES[currentFeature]}
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
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Button to="/booking/request" size="lg" className="shadow-2xl">
                Start Shipping Now
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </Button>

              <Button to="/tracking" variant="secondary" size="lg">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                Track Shipment
              </Button>
            </motion.div>

            {/* Trust Indicators & Stats */}
            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-2"
            >
              {HERO_STATS.map((stat, index) => {
                const IconComponent = { Truck, Clock, MapPin }[stat.icon]
                return (
                  <div key={index} className="flex flex-col items-center text-center text-white/90">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 backdrop-blur-sm">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mb-1">{stat.value}</div>
                    <div className="text-xs sm:text-sm font-medium opacity-80">{stat.label}</div>
                  </div>
                )
              })}
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