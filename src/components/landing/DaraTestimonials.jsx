import { motion } from 'framer-motion'
import { Star, Quote, Users, TrendingUp } from 'lucide-react'
import { SectionHeader, Button } from '../ui'
import { TESTIMONIALS_DATA, MARQUEE_TESTIMONIALS_DATA, TRUST_STATS_DATA } from '../../constants/mockData'

export default function DaraTestimonials() {
  // No state needed for the new design

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <SectionHeader
          badge={{ icon: Users, text: 'Customer Stories' }}
          title="Trusted by 1000+"
          subtitle="Growing Businesses"
          description="From startups to enterprises, see how businesses across Nigeria are achieving remarkable growth with Dara's logistics solutions."
        />

        {/* Trust Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16"
        >
          {TRUST_STATS_DATA.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              className="text-center"
            >
              <div className="text-2xl md:text-3xl font-black text-sky-600 mb-1">{stat.number}</div>
              <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

       

        {/* Testimonials Marquee */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-sky-50 rounded-3xl p-8 overflow-hidden"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">What Our Customers Say</h3>
            <p className="text-gray-600">Real feedback from businesses across Nigeria</p>
          </div>

          {/* Marquee Container */}
          <div className="relative">
            <div className="flex animate-marquee gap-6">
              {[...MARQUEE_TESTIMONIALS_DATA, ...MARQUEE_TESTIMONIALS_DATA].map((testimonial, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-80 bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                >
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 mb-4 text-sm leading-relaxed">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">{testimonial.author}</div>
                    <div className="text-gray-500 text-xs">{testimonial.position}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        
      </div>
    </section>
  )
}
