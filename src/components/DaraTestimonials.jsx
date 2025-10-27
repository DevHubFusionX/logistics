import { motion, AnimatePresence } from 'framer-motion'
import { Star, ChevronLeft, ChevronRight, Quote, Users, TrendingUp } from 'lucide-react'
import { useState, useEffect } from 'react'

const featuredTestimonials = [
  {
    rating: 5,
    content: "Dara revolutionized our e-commerce operations. Same-day delivery in Lagos increased our customer satisfaction by 85% and repeat orders by 60%. They're not just a logistics partner—they're a growth enabler.",
    author: "Adunni Bankole",
    position: "CEO, ShopNaija",
    company: "ShopNaija",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    impact: "85% increase in customer satisfaction",
    businessType: "E-commerce"
  },
  {
    rating: 5,
    content: "As a small business owner, I thought reliable logistics was only for big companies. Dara proved me wrong. Their affordable rates and professional service helped us expand from Lagos to 12 states in just 8 months.",
    author: "Chinedu Okafor",
    position: "Founder, Afro Crafts",
    company: "Afro Crafts",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    impact: "Expanded to 12 states in 8 months",
    businessType: "SME"
  },
  {
    rating: 5,
    content: "Dara's enterprise solution transformed our supply chain efficiency. Real-time tracking, API integration, and dedicated support reduced our logistics costs by 35% while improving delivery times by 50%.",
    author: "Fatima Al-Hassan",
    position: "Supply Chain Director, MegaMart Nigeria",
    company: "MegaMart",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    impact: "35% cost reduction, 50% faster delivery",
    businessType: "Enterprise"
  }
]

const marqueeTestimonials = [
  {
    content: "Dara's tracking system is incredible. I always know exactly where my packages are.",
    author: "Kemi Adebayo",
    position: "Fashion Designer",
    rating: 5
  },
  {
    content: "Same-day delivery in Abuja? Dara made it possible for our restaurant supplies.",
    author: "Ibrahim Musa",
    position: "Restaurant Owner",
    rating: 5
  },
  {
    content: "Professional, reliable, and affordable. Dara is our go-to logistics partner.",
    author: "Grace Okonkwo",
    position: "Online Store Owner",
    rating: 5
  },
  {
    content: "From Lagos to Kano in 24 hours. Dara delivers on their promises every time.",
    author: "Ahmed Bello",
    position: "Electronics Retailer",
    rating: 5
  },
  {
    content: "The API integration was seamless. Our customers love the real-time updates.",
    author: "Tolu Adeyemi",
    position: "Tech Startup Founder",
    rating: 5
  },
  {
    content: "Dara helped us scale from 50 to 500 orders per day without missing a beat.",
    author: "Blessing Okoro",
    position: "E-commerce Manager",
    rating: 5
  },
  {
    content: "Their customer service is outstanding. Always responsive and helpful.",
    author: "David Ogundimu",
    position: "Wholesale Distributor",
    rating: 5
  },
  {
    content: "Cost-effective logistics that actually works. Dara exceeded our expectations.",
    author: "Amina Yusuf",
    position: "Import/Export Business",
    rating: 5
  }
]

export default function DaraTestimonials() {
  // No state needed for the new design

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-50 rounded-full mb-8"
          >
            <Users className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Customer Stories</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8"
          >
            Trusted by 1000+
            <br />
            <span className="text-sky-600">Growing Businesses</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            From startups to enterprises, see how businesses across Nigeria are achieving 
            remarkable growth with Dara's logistics solutions.
          </motion.p>

          {/* Trust Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mb-16"
          >
            {[
              { number: '4.9/5', label: 'Average Rating' },
              { number: '98%', label: 'Customer Retention' },
              { number: '1000+', label: 'Happy Businesses' },
              { number: '50K+', label: 'Successful Deliveries' }
            ].map((stat, index) => (
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
        </div>

        {/* Featured Testimonials */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {featuredTestimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 group hover:shadow-xl transition-all duration-300"
            >
              {/* Business Type Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                className="inline-block px-3 py-1 bg-sky-100 text-sky-700 text-xs font-bold rounded-full mb-6"
              >
                {testimonial.businessType}
              </motion.div>

              {/* Quote Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.4, type: "spring", stiffness: 200 }}
                className="w-12 h-12 bg-sky-50 rounded-xl flex items-center justify-center mb-6"
              >
                <Quote className="w-6 h-6 text-sky-600" />
              </motion.div>

              {/* Rating */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                className="flex items-center gap-1 mb-4"
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current text-yellow-400" />
                ))}
              </motion.div>

              {/* Content */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 + 0.6 }}
                className="text-gray-700 leading-relaxed mb-6 text-lg"
              >
                "{testimonial.content}"
              </motion.p>

              {/* Impact Highlight */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6"
              >
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-bold text-green-800">Business Impact</span>
                </div>
                <p className="text-green-700 text-sm font-semibold">{testimonial.impact}</p>
              </motion.div>

              {/* Author */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 + 0.8 }}
                className="flex items-center gap-4 pt-6 border-t border-gray-100"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-14 h-14 rounded-full object-cover"
                />
                <div>
                  <h5 className="text-lg font-bold text-gray-900">{testimonial.author}</h5>
                  <p className="text-gray-600 text-sm">{testimonial.position}</p>
                  <p className="text-sky-600 text-sm font-semibold">{testimonial.company}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

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
              {[...marqueeTestimonials, ...marqueeTestimonials].map((testimonial, index) => (
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

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-sky-500 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Join Our Success Stories?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join 1000+ businesses already growing with Dara's logistics solutions. 
              Your success story could be next.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Your Success Story
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Read More Reviews
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}