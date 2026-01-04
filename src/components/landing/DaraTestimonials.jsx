import { motion } from 'framer-motion'
import { Quote, Star, MessageSquare } from 'lucide-react'
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
      {/* Upper quote and stars */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex gap-1">
          {[...Array(testimonial.rating || 5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
        </div>
        <Quote className="w-10 h-10 text-accent/10 group-hover:text-accent/20 transition-colors" />
      </div>

      {/* Main Content */}
      <div className="flex-1">
        <p className="text-gray-700 mb-8 italic leading-relaxed text-lg">"{testimonial.content}"</p>
      </div>

      {/* Impact Badge */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50/50 rounded-xl border border-blue-100/50">
          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
          <span className="text-sm font-bold text-primary">{testimonial.impact}</span>
        </div>
      </div>

      {/* Author info */}
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

export default function DaraTestimonials() {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <SectionHeader
          badge={{ icon: MessageSquare, text: testimonialsData.header.badge }}
          title={testimonialsData.header.title}
          subtitle={testimonialsData.header.subtitle}
          description={testimonialsData.header.description}
        />

        {/* Featured Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          {testimonialsData.featured.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>

        {/* Marquee Section */}
        <div className="full-width-bg bg-blue-50 py-16 -mx-[calc((100vw-100%)/2)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-blue-50 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-blue-50 to-transparent z-10" />

          <div className="flex items-center gap-12 mb-8 animate-marquee whitespace-nowrap">
            {marqueeTestimonials.map((item, idx) => (
              <div key={idx} className="inline-block bg-white px-8 py-4 rounded-full shadow-sm border border-blue-100">
                <span className="text-gray-600 font-medium">"{item.content}"</span>
                <span className="text-accent font-bold mx-2">—</span>
                <span className="text-gray-900 text-sm font-semibold">{item.author}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-12 animate-marquee-reverse whitespace-nowrap">
            {marqueeTestimonials.map((item, idx) => (
              <div key={idx} className="inline-block bg-white px-8 py-4 rounded-full shadow-sm border border-blue-100">
                <span className="text-gray-600 font-medium">"{item.content}"</span>
                <span className="text-accent font-bold mx-2">—</span>
                <span className="text-gray-900 text-sm font-semibold">{item.author}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-gray-100 pt-12">
          {testimonialsData.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl font-black text-gray-900 mb-2">{stat.number}</h3>
              <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
