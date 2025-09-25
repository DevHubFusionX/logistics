import { motion } from 'framer-motion'
import { Star } from 'lucide-react'

const testimonials = [
  {
    rating: 5,
    title: "Transformative cold chain solutions that revolutionized our agricultural distribution network.",
    content: "Dara's sophisticated logistics infrastructure has fundamentally transformed our supply chain efficiency. Their precision temperature control and real-time monitoring capabilities have eliminated product losses while ensuring consistent quality delivery across our extensive distribution network. The operational excellence and strategic partnership approach have exceeded our most ambitious expectations.",
    author: "Dr. Adebayo Ogundimu",
    position: "Chief Executive Officer, AgroVest Nigeria",
    image: "/assets/img/testimonial-1.jpeg"
  },
  {
    rating: 5,
    title: "Pharmaceutical-grade logistics that ensure therapeutic efficacy across Nigeria's healthcare network.",
    content: "The regulatory compliance and temperature precision demonstrated by Dara's cold chain solutions have been instrumental in maintaining our pharmaceutical product integrity. Their WHO-compliant infrastructure and comprehensive monitoring systems provide the reliability essential for healthcare distribution, enabling us to serve Nigeria's medical institutions with unwavering confidence in product quality.",
    author: "Prof. Kemi Adeleke", 
    position: "Director of Operations, MedSupply West Africa",
    image: "/assets/img/testimonial-2.jpeg"
  },
  {
    rating: 5,
    title: "Strategic logistics partnership that scales with our commercial growth and operational demands.",
    content: "Dara's enterprise-grade scalability and logistics intelligence have proven invaluable as our FMCG distribution requirements have expanded across multiple Nigerian markets. Their data-driven approach to route optimization and cost efficiency, combined with exceptional service reliability, has established them as an indispensable component of our supply chain strategy.",
    author: "Emeka Nwosu",
    position: "Supply Chain Director, FreshMart Retail Group", 
    image: "/assets/img/testimonial-3.jpeg"
  }
]

export default function DaraTestimonials() {
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

        {/* Testimonials Grid */}
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
              {/* Quote Mark */}
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

              {/* Content */}
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

              {/* Rating */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-5 h-5 fill-current" 
                    style={{ color: 'var(--warning-500)' }}
                  />
                ))}
              </div>

              {/* Author */}
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
      </div>
    </section>
  )
}