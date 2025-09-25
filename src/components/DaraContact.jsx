import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowRight, Clock, Globe } from 'lucide-react'
import { useState } from 'react'

export default function DaraContact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section 
      id="contact" 
      className="py-32"
      style={{ backgroundColor: 'var(--bg-primary)' }}
    >
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
            Get In Touch
          </div>
          
          <h2 style={{
            fontSize: 'clamp(var(--text-3xl), 4vw, var(--text-5xl))',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
            lineHeight: 'var(--leading-tight)'
          }}>
            Ready to Transform Your
            <br />
            <span style={{ color: 'var(--color-primary)' }}>Supply Chain?</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="glass p-10 rounded-3xl"
          >
            <div className="mb-8">
              <h3 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-4)'
              }}>
                Start Your Partnership Journey
              </h3>
              <p style={{
                fontSize: 'var(--text-lg)',
                color: 'var(--text-secondary)',
                fontWeight: 'var(--font-light)',
                lineHeight: 'var(--leading-relaxed)'
              }}>
                Connect with our logistics specialists for customized cold chain solutions.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
              </div>

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
              >
                <option value="">Select Service Type</option>
                <option value="agriculture">Agricultural Cold Chain</option>
                <option value="pharmaceutical">Pharmaceutical Logistics</option>
                <option value="fmcg">FMCG Distribution</option>
                <option value="contract">Contract Logistics</option>
              </select>

              <textarea
                name="message"
                placeholder="Tell us about your logistics needs..."
                rows="4"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all resize-none"
              />

              <motion.button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full transition-all duration-300"
                style={{
                  background: 'var(--gradient-brand-primary)',
                  color: 'white',
                  fontSize: 'var(--text-lg)',
                  fontWeight: 'var(--font-semibold)',
                  boxShadow: 'var(--shadow-brand-lg)'
                }}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Send Message
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {[
              {
                icon: MapPin,
                title: "Headquarters",
                content: "15 Admiralty Way, Lekki Phase 1\nLagos, Nigeria"
              },
              {
                icon: Phone,
                title: "Phone",
                content: "+234 (0) 1-327-2564\n+234 (0) 1-DARA-LOG"
              },
              {
                icon: Mail,
                title: "Email",
                content: "info@daralogistics.ng\npartnerships@daralogistics.ng"
              },
              {
                icon: Clock,
                title: "Business Hours",
                content: "Monday - Friday: 8:00 AM - 6:00 PM\nSaturday: 9:00 AM - 2:00 PM"
              },
              {
                icon: Globe,
                title: "Coverage",
                content: "All 36 States + FCT\nNationwide Cold Chain Network"
              }
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h4 style={{
                      fontSize: 'var(--text-xl)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-primary)',
                      marginBottom: 'var(--space-2)'
                    }}>
                      {item.title}
                    </h4>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-secondary)',
                      fontWeight: 'var(--font-light)',
                      lineHeight: 'var(--leading-relaxed)',
                      whiteSpace: 'pre-line'
                    }}>
                      {item.content}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}