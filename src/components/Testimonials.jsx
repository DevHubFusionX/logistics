import { Star, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Testimonials() {
  const testimonials = [
    {
      quote: "They delivered our goods faster than expected. Very professional service and excellent communication throughout the entire process.",
      author: "Sarah Johnson",
      position: "Supply Chain Director",
      company: "TechCorp Industries",
      rating: 5
    },
    {
      quote: "Dora Logistics transformed our international shipping operations. Their global network and real-time tracking saved us countless hours.",
      author: "Michael Chen",
      position: "Operations Manager",
      company: "Global Manufacturing Co.",
      rating: 5
    },
    {
      quote: "Outstanding reliability and cost-effective solutions. They've been our trusted logistics partner for over three years running.",
      author: "Emily Rodriguez",
      position: "Procurement Lead",
      company: "Retail Solutions Inc.",
      rating: 5
    }
  ]

  const partners = [
    { name: "TechCorp", logo: "TC" },
    { name: "GlobalMfg", logo: "GM" },
    { name: "RetailSol", logo: "RS" },
    { name: "LogiTech", logo: "LT" },
    { name: "ShipFast", logo: "SF" },
    { name: "CargoMax", logo: "CM" }
  ]

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            What Our Clients Say
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Trusted by industry leaders worldwide for exceptional logistics solutions and customer service excellence.
          </motion.p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut" 
              }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.3 }
              }}
            >
              <motion.div 
                className="mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <Quote className="w-8 h-8 text-sky-500 mb-4" />
                </motion.div>
                <motion.p 
                  className="text-gray-700 leading-relaxed italic"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 + 0.4 }}
                >
                  "{testimonial.quote}"
                </motion.p>
              </motion.div>
              
              <motion.div 
                className="flex items-center gap-2 mb-4"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
              >
                {[...Array(testimonial.rating)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.3, 
                      delay: index * 0.2 + 0.6 + i * 0.1,
                      type: "spring",
                      stiffness: 200
                    }}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                  >
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div 
                className="border-t border-gray-100 pt-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.7 }}
              >
                <p className="font-semibold text-gray-900">{testimonial.author}</p>
                <p className="text-sm text-gray-600">{testimonial.position}</p>
                <p className="text-sm text-sky-600 font-medium">{testimonial.company}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Trusted Partners */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h3 
            className="text-2xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trusted by Industry Leaders
          </motion.h3>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <motion.div 
                key={index} 
                className="group"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.4 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ scale: 1.1 }}
              >
                <motion.div 
                  className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center mx-auto group-hover:bg-sky-100 transition-colors duration-300"
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-xl font-bold text-gray-600 group-hover:text-sky-600 transition-colors duration-300">
                    {partner.logo}
                  </span>
                </motion.div>
                <motion.p 
                  className="text-sm text-gray-500 mt-2 font-medium"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                >
                  {partner.name}
                </motion.p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}