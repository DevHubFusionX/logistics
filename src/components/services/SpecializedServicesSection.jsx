import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react'
import { additionalServices } from './servicesData'

export default function SpecializedServicesSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % additionalServices.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + additionalServices.length) % additionalServices.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-sky-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl sm:text-5xl font-black text-gray-900 mb-6"
          >
            Specialized Services
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto"
          >
            Additional solutions to complement your logistics needs
          </motion.p>
        </div>

        {/* Desktop: Sticky Scroll Layout */}
        {!isMobile ? (
          <div className="grid lg:grid-cols-2 gap-16 max-w-7xl mx-auto">
            {/* Sticky Images */}
            <div className="lg:sticky lg:top-24 lg:h-fit">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-4"
              >
                {additionalServices.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="relative rounded-2xl overflow-hidden shadow-lg group"
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h4 className="text-white font-bold text-lg mb-1">{service.title}</h4>
                      <p className="text-white/90 text-sm">{service.pricing}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Service Details */}
            <div className="space-y-16">
              {additionalServices.map((service, index) => {
                const Icon = service.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.1 }}
                    className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
                  >
                    <div className="flex items-start gap-6 mb-6">
                      <motion.div
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg"
                      >
                        <Icon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{service.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {service.features.map((feature, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.1 }}
                          className="flex items-center gap-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          <span className="text-gray-700 font-medium">{feature}</span>
                        </motion.div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                      <span className="text-sky-600 font-bold text-xl">{service.pricing}</span>
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                          to="/booking/request"
                          className="inline-flex items-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors"
                        >
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ) : (
          /* Mobile: Carousel Layout */
          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden rounded-3xl">
              <motion.div
                className="flex transition-transform duration-300 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {additionalServices.map((service, index) => {
                  const Icon = service.icon
                  return (
                    <div key={index} className="w-full flex-shrink-0 px-4">
                      <div className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden">
                        {/* Service Image */}
                        <div className="relative h-48">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40" />
                          <div className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center">
                            <Icon className="w-6 h-6 text-sky-600" />
                          </div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <h3 className="text-white font-bold text-xl mb-1">{service.title}</h3>
                            <p className="text-white/90">{service.pricing}</p>
                          </div>
                        </div>

                        {/* Service Content */}
                        <div className="p-6">
                          <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                          
                          <div className="grid grid-cols-2 gap-3 mb-6">
                            {service.features.map((feature, i) => (
                              <div key={i} className="flex items-center gap-2">
                                <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                                <span className="text-gray-700 text-sm font-medium">{feature}</span>
                              </div>
                            ))}
                          </div>

                          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link
                              to="/booking/request"
                              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-xl font-semibold hover:bg-sky-600 transition-colors"
                            >
                              Learn More
                              <ArrowRight className="w-4 h-4" />
                            </Link>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </motion.div>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between mt-8">
              <motion.button
                onClick={prevSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-sky-600 transition-colors"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              <div className="flex gap-2">
                {additionalServices.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      currentSlide === index ? 'bg-sky-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gray-600 hover:text-sky-600 transition-colors"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}