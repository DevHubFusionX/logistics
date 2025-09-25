import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight } from 'lucide-react'
import { useState, useEffect } from 'react'

const testimonials = [
  {
    rating: 5,
    content: "Dara transformed our agricultural distribution with precision temperature control and eliminated product losses completely.",
    author: "Dr. Adebayo Ogundimu",
    position: "CEO, AgroVest Nigeria",
    image: "/assets/img/testimonial-1.jpeg"
  },
  {
    rating: 5,
    content: "Their WHO-compliant infrastructure provides the reliability essential for pharmaceutical distribution across Nigeria.",
    author: "Prof. Kemi Adeleke", 
    position: "Director, MedSupply West Africa",
    image: "/assets/img/testimonial-2.jpeg"
  },
  {
    rating: 5,
    content: "Dara's scalable logistics and route optimization have become indispensable to our FMCG supply chain strategy.",
    author: "Emeka Nwosu",
    position: "Supply Chain Director, FreshMart", 
    image: "/assets/img/testimonial-3.jpeg"
  }
]

export default function DaraTestimonials() {
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
        setCurrentSlide((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [isMobile])

  return (
    <section className="py-32" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20 space-y-6"
        >
          <div
            className="inline-block px-6 py-3 rounded-full"
            style={{ 
              backgroundColor: 'var(--bg-brand-subtle)', 
              color: 'var(--text-brand)',
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-medium)'
            }}
          >
            Client Success Stories
          </div>
          
          <h2 style={{
            fontSize: 'clamp(var(--text-3xl), 4vw, var(--text-5xl))',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
            lineHeight: 'var(--leading-tight)'
          }}>
            Trusted by Nigeria's
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Leading Enterprises</span>
          </h2>
        </motion.div>

        {/* Testimonials Grid/Carousel */}
        {isMobile ? (
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.6 }}
                  className="glass p-8 rounded-3xl"
                >
                  {(() => {
                    const testimonial = testimonials[currentSlide]
                    return (
                      <>
                        <div className="mb-6">
                          <div style={{
                            fontSize: '4rem',
                            color: 'var(--color-primary)',
                            lineHeight: 1,
                            fontFamily: 'serif'
                          }}>
                            "
                          </div>
                        </div>
                        <div className="space-y-6 mb-8">
                          <p style={{
                            fontSize: 'var(--text-lg)',
                            color: 'var(--text-primary)',
                            fontWeight: 'var(--font-light)',
                            lineHeight: 'var(--leading-relaxed)',
                            fontStyle: 'italic'
                          }}>
                            {testimonial.content}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 mb-6">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star 
                              key={i} 
                              className="w-5 h-5 fill-current" 
                              style={{ color: 'var(--warning-500)' }}
                            />
                          ))}
                        </div>
                        <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                          <img
                            src={testimonial.image}
                            alt={testimonial.author}
                            className="w-16 h-16 rounded-full object-cover"
                          />
                          <div>
                            <h5 style={{
                              fontSize: 'var(--text-lg)',
                              fontWeight: 'var(--font-semibold)',
                              color: 'var(--text-primary)'
                            }}>
                              {testimonial.author}
                            </h5>
                            <p style={{
                              fontSize: 'var(--text-base)',
                              color: 'var(--text-secondary)',
                              fontWeight: 'var(--font-medium)'
                            }}>
                              {testimonial.position}
                            </p>
                          </div>
                        </div>
                      </>
                    )
                  })()}
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() => setCurrentSlide((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                className="p-2 rounded-full glass hover:bg-white/20 transition-all"
              >
                <ChevronLeft className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
              </button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className="w-2 h-2 rounded-full transition-all"
                    style={{
                      backgroundColor: index === currentSlide ? 'var(--color-primary)' : 'var(--border-subtle)'
                    }}
                  />
                ))}
              </div>
              
              <button
                onClick={() => setCurrentSlide((prev) => (prev + 1) % testimonials.length)}
                className="p-2 rounded-full glass hover:bg-white/20 transition-all"
              >
                <ChevronRight className="w-6 h-6" style={{ color: 'var(--text-primary)' }} />
              </button>
            </div>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="glass p-8 rounded-3xl group"
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <div className="mb-6">
                  <div style={{
                    fontSize: '4rem',
                    color: 'var(--color-primary)',
                    lineHeight: 1,
                    fontFamily: 'serif'
                  }}>
                    "
                  </div>
                </div>
                <div className="space-y-6 mb-8">
                  <p style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-primary)',
                    fontWeight: 'var(--font-light)',
                    lineHeight: 'var(--leading-relaxed)',
                    fontStyle: 'italic'
                  }}>
                    {testimonial.content}
                  </p>
                </div>
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 fill-current" 
                      style={{ color: 'var(--warning-500)' }}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-4 pt-6 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h5 style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--text-primary)'
                    }}>
                      {testimonial.author}
                    </h5>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-medium)'
                    }}>
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}