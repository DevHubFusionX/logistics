import { motion } from 'framer-motion'
import { ArrowRight, Package, Truck, MapPin, Clock, Users, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'
import { heroData } from './Data'
import { Button, Badge } from '../ui'
import { fadeInUp, scaleIn, hoverScale } from '../../utils'
import { ScheduleDemoModal } from './demo'

export default function DaraHero() {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [currentImage, setCurrentImage] = useState(0)
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  useEffect(() => {
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % heroData.features.length)
    }, 3000)
    return () => clearInterval(featureInterval)
  }, [])

  useEffect(() => {
    const imageInterval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroData.backgroundImages.length)
    }, 5000)
    return () => clearInterval(imageInterval)
  }, [])
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden px-4 sm:px-6 lg:px-8"
    >
      {/* Background Images with Zoom Effect */}
      {heroData.backgroundImages.map((image, index) => (
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
            <div className="space-y-4 sm:space-y-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold text-white leading-[1.1] tracking-tight"
              >
                {heroData.title.prefix}
                <br />
                <span className="text-blue-400">{heroData.title.highlight}</span> {heroData.title.suffix}
              </motion.h1>

              {/* Rotating Features */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="h-14 sm:h-16 lg:h-20 overflow-hidden"
              >
                <motion.p
                  key={currentFeature}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 font-medium leading-relaxed tracking-wide px-2"
                  aria-live="polite"
                >
                  {heroData.features[currentFeature]}
                </motion.p>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-normal leading-relaxed tracking-wide px-4"
            >
              Temperature-controlled logistics for pharmaceuticals, vaccines, and perishable goods.
              <br className="hidden sm:block" />
              Reliable cold chain solutions across Nigeria.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center"
            >
              <Button to={heroData.buttons.primary.link} size="lg" className="shadow-2xl">
                {heroData.buttons.primary.text}
                <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </Button>

              <Button
                onClick={() => setIsDemoModalOpen(true)}
                variant="secondary"
                size="lg"
              >
                <Package className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-12 transition-transform" />
                {heroData.buttons.secondary.text}
              </Button>
            </motion.div>

            {/* Trust Indicators & Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
              className="grid grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto px-2"
            >
              {heroData.stats.map((stat, index) => {
                const IconComponent = { Truck, Clock, MapPin, Users, TrendingUp }[stat.icon]
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.6 + (index * 0.1), ease: "easeOut" }}
                    className="flex flex-col items-center text-center text-white/90"
                  >
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/10 rounded-xl sm:rounded-2xl flex items-center justify-center mb-3 sm:mb-4 backdrop-blur-sm">
                      <IconComponent className="w-6 h-6 sm:w-8 sm:h-8" />
                    </div>
                    <div className="text-2xl sm:text-3xl font-black mb-1">
                      {stat.value === 'TrendingUp' ? <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" /> : stat.value}
                    </div>
                    <div className="text-xs sm:text-sm font-medium opacity-80">{stat.label}</div>
                  </motion.div>
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


      <ScheduleDemoModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
      />
    </section>
  )
}
