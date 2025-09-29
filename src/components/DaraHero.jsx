import { motion } from 'framer-motion'
import { ArrowRight, Phone, Thermometer, Truck, Shield, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const stats = [
  { number: '500+', label: 'Enterprise Clients', icon: TrendingUp },
  { number: '99.8%', label: 'Temperature Accuracy', icon: Thermometer },
  { number: '150+', label: 'Fleet Vehicles', icon: Truck },
  { number: '24/7', label: 'Operations', icon: Shield }
]

const features = [
  'WHO-Compliant Infrastructure',
  'Real-Time Temperature Monitoring',
  'Nationwide Distribution Network',
  'Pharmaceutical-Grade Standards'
]

export default function DaraHero() {
  const [currentFeature, setCurrentFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])
  return (
    <section
      id="home"
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(rgba(14, 165, 233, 0.8), rgba(37, 99, 235, 0.7)), url("/assets/img/slider.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-brand"
            >
              <motion.div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: 'var(--success-500)' }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span style={{
                color: 'white',
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-medium)'
              }}>
                Nigeria's Premier Cold Chain Network
              </span>
            </motion.div>

            {/* Dynamic Heading */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{
                  fontSize: 'clamp(var(--text-4xl), 6vw, var(--text-6xl))',
                  fontWeight: 'var(--font-bold)',
                  color: 'white',
                  lineHeight: 'var(--leading-tight)'
                }}
              >
                Advanced Cold Chain
                <br />
                <span className="text-gradient" style={{
                  background: 'linear-gradient(135deg, var(--sky-400) 0%, var(--blue-500) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  Logistics Excellence
                </span>
              </motion.h1>

              {/* Rotating Features */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="h-8 overflow-hidden"
              >
                <motion.p
                  key={currentFeature}
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -30, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    fontSize: 'var(--text-xl)',
                    color: 'white',
                    fontWeight: 'var(--font-medium)'
                  }}
                >
                  {features[currentFeature]}
                </motion.p>
              </motion.div>
            </div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="max-w-2xl"
              style={{
                fontSize: 'var(--text-lg)',
                color: 'white',
                lineHeight: 'var(--leading-relaxed)',
                fontWeight: 'var(--font-light)',
                opacity: 0.9
              }}
            >
              Orchestrating Nigeria's most sophisticated temperature-controlled logistics infrastructure
              with precision monitoring, regulatory compliance, and enterprise-grade scalability.
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link to="/auth/signup">
                <motion.button
                  className="group relative overflow-hidden px-8 py-4 rounded-full transition-all duration-300"
                  style={{
                    background: 'var(--gradient-brand-primary)',
                    color: 'white',
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-semibold)',
                    boxShadow: 'var(--shadow-brand-lg)'
                  }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Start Cold Chain Partnership
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6 }}
                  />
                </motion.button>
              </Link>

              <motion.button
                className="group inline-flex items-center gap-3 px-6 py-4 rounded-full transition-all duration-300"
                style={{
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  color: 'white',
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-medium)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  backdropFilter: 'blur(10px)'
                }}
                whileHover={{
                  scale: 1.02,
                  backgroundColor: 'rgba(255, 255, 255, 0.2)'
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                Schedule Consultation
              </motion.button>
            </motion.div>
          </div>

          {/* Stats Panel */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="glass p-8 rounded-2xl"
              style={{ borderRadius: 'var(--radius-2xl)' }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-bold)',
                  color: 'white',
                  marginBottom: 'var(--space-6)'
                }}
              >
                Operational Excellence Metrics
              </motion.h3>

              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                      className="text-center space-y-2"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--color-primary)' }}
                        whileHover={{ rotate: 5 }}
                      >
                        <IconComponent className="w-6 h-6" style={{ color: 'white' }} />
                      </motion.div>
                      <div style={{
                        fontSize: 'var(--text-3xl)',
                        fontWeight: 'var(--font-bold)',
                        color: 'white'
                      }}>
                        {stat.number}
                      </div>
                      <div style={{
                        fontSize: 'var(--text-sm)',
                        color: 'white',
                        fontWeight: 'var(--font-medium)',
                        opacity: 0.8
                      }}>
                        {stat.label}
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              {/* Trust Indicators */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-8 pt-6 border-t"
                style={{ borderColor: 'rgba(255, 255, 255, 0.2)' }}
              >
                <div className="flex items-center justify-center gap-4 text-center">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: 'var(--success-500)' }} />
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: 'white',
                      fontWeight: 'var(--font-medium)',
                      opacity: 0.8
                    }}>
                      WHO Certified
                    </span>
                  </div>
                  <div className="w-1 h-1 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }} />
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4" style={{ color: 'var(--success-500)' }} />
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: 'white',
                      fontWeight: 'var(--font-medium)',
                      opacity: 0.8
                    }}>
                      NAFDAC Compliant
                    </span>
                  </div>
                </div>
              </motion.div>
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