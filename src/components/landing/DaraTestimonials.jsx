import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Quote, Star, MessageSquare, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react'
import { SectionHeader } from '../ui'
import { testimonialsData } from './Data'

// Duplicate for marquee effect
const marqueeTestimonials = [...testimonialsData.marquee, ...testimonialsData.marquee, ...testimonialsData.marquee]

const TestimonialCard = ({ testimonial, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl relative group hover:shadow-2xl transition-all duration-300 flex flex-col h-full"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <Quote className="w-10 h-10 text-accent/10 group-hover:text-accent/20 transition-colors" />
      </div>

      <div className="flex-1">
        <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">"{testimonial.content}"</p>
      </div>

      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-xl border border-blue-100/50">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-bold text-primary">{testimonial.impact}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 pt-6 border-t border-gray-50">
        <div className="relative">
          <div className="w-14 h-14 rounded-2xl overflow-hidden bg-gray-100">
            {testimonial.image ? (
              <img src={testimonial.image} alt={testimonial.author} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-accent bg-accent/10">
                {testimonial.author.charAt(0)}
              </div>
            )}
          </div>
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-lg shadow-md flex items-center justify-center border border-gray-50">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
          </div>
        </div>
        <div>
          <h4 className="font-bold text-gray-900 leading-tight">{testimonial.author}</h4>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mt-1">{testimonial.position}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-xs font-bold text-accent">{testimonial.company}</span>
            <span className="text-[10px] text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded uppercase font-bold">{testimonial.businessType}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

const MarqueeCard = ({ item }) => (
  <div className="inline-flex bg-white/80 backdrop-blur-md px-8 py-6 rounded-3xl shadow-lg border border-white/50 min-w-[350px] mx-6 group hover:translate-y-[-4px] transition-transform duration-300">
    <div className="flex flex-col gap-4">
      <div className="flex gap-1">
        {[...Array(item.rating || 5)].map((_, i) => (
          <Star key={i} className="w-3 h-3 text-amber-400 fill-amber-400" />
        ))}
      </div>
      <p className="text-gray-700 font-medium whitespace-normal leading-relaxed overflow-hidden line-clamp-2">"{item.content}"</p>
      <div className="flex items-center gap-3 mt-1">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center font-bold text-primary text-sm shadow-inner">
          {item.author.charAt(0)}
        </div>
        <div>
          <h4 className="text-sm font-bold text-gray-900">{item.author}</h4>
          <p className="text-[10px] font-bold text-accent uppercase tracking-wider">{item.position}</p>
        </div>
      </div>
    </div>
  </div>
)

export default function DaraTestimonials() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const checkSize = () => setIsMobile(window.innerWidth < 1024)
    checkSize()
    window.addEventListener('resize', checkSize)
    return () => window.removeEventListener('resize', checkSize)
  }, [])

  const next = () => setActiveIndex((prev) => (prev + 1) % testimonialsData.featured.length)
  const prev = () => setActiveIndex((prev) => (prev - 1 + testimonialsData.featured.length) % testimonialsData.featured.length)

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader
          badge={{ icon: MessageSquare, text: testimonialsData.header.badge }}
          title={testimonialsData.header.title}
          subtitle={testimonialsData.header.subtitle}
          description={testimonialsData.header.description}
        />

        {/* Featured Testimonials */}
        {isMobile ? (
          <div className="relative mb-20 px-4">
            <div className="overflow-visible pt-10 pb-20">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -50, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                >
                  <TestimonialCard testimonial={testimonialsData.featured[activeIndex]} index={0} />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between mt-8">
              <div className="flex gap-2">
                {testimonialsData.featured.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? 'w-8 bg-primary' : 'w-2 bg-gray-200'
                      }`}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                <button
                  onClick={prev}
                  className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-lg flex items-center justify-center text-gray-600 hover:text-primary active:scale-95 transition-all"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={next}
                  className="w-12 h-12 rounded-2xl bg-primary shadow-lg flex items-center justify-center text-white active:scale-95 transition-all"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {testimonialsData.featured.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} index={index} />
            ))}
          </div>
        )}

        {/* Marquee Section */}
        <div className="full-width-bg bg-gradient-to-b from-blue-50 to-white py-20 -mx-[calc((100vw-100%)/2)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-64 h-full bg-gradient-to-r from-blue-50 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-blue-50 to-transparent z-10" />

          <div className="flex items-center animate-marquee mb-10">
            {marqueeTestimonials.map((item, idx) => (
              <MarqueeCard key={idx} item={item} />
            ))}
          </div>

          <div className="flex items-center animate-marquee-reverse">
            {marqueeTestimonials.map((item, idx) => (
              <MarqueeCard key={idx} item={item} />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-gray-100 pt-16">
          {testimonialsData.stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <h3 className="text-4xl lg:text-5xl font-black text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 flex justify-center items-center">
                {stat.number === 'TrendingUp' ? <TrendingUp className="w-12 h-12" /> : stat.number}
              </h3>
              <p className="text-gray-500 font-bold text-xs uppercase tracking-widest">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
