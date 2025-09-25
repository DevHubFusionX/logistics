import { motion } from 'framer-motion'
import { ArrowRight, Thermometer, Shield, Clock } from 'lucide-react'

export default function DaraAbout() {
  return (
    <section id="about" className="py-24 relative" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 style={{
            fontSize: 'clamp(var(--text-2xl), 3vw, var(--text-4xl))',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            The Story Behind <span style={{ color: 'var(--color-primary)' }}>Dara</span>
          </h2>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Where precision meets purpose in Nigeria's cold chain revolution
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          {/* Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="prose prose-lg" style={{ color: 'var(--text-primary)' }}>
              <p style={{
                fontSize: 'var(--text-lg)',
                lineHeight: '1.8',
                marginBottom: '1.5rem',
                color: 'var(--text-secondary)'
              }}>
                In 2019, we witnessed a critical gap in Nigeria's healthcare and agricultural supply chains. 
                Life-saving vaccines spoiled in transit. Fresh produce lost its vitality before reaching markets. 
                The cost wasn't just financial—it was human.
              </p>
              
              <p style={{
                fontSize: 'var(--text-lg)',
                lineHeight: '1.8',
                marginBottom: '1.5rem',
                color: 'var(--text-secondary)'
              }}>
                That's when Dara was born—not just as a logistics company, but as guardians of integrity. 
                We understood that behind every temperature-controlled shipment lies someone's health, 
                someone's livelihood, someone's future.
              </p>

              <p style={{
                fontSize: 'var(--text-lg)',
                lineHeight: '1.8',
                color: 'var(--text-secondary)'
              }}>
                Today, we've built Nigeria's most trusted cold chain network, connecting Lagos to Kano, 
                Abuja to Port Harcourt with unwavering precision. Every degree matters. Every delivery counts.
              </p>
            </div>

            <motion.button
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg transition-all"
              style={{
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-medium)'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Read Our Full Story
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>

          {/* Visual Story */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="/assets/img/about-5.jpg"
              alt="Dara's cold chain facility ensuring product integrity"
              className="w-full h-80 object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <p style={{
                fontSize: 'var(--text-sm)',
                fontStyle: 'italic',
                opacity: 0.9
              }}>
                "Every shipment carries someone's trust. We don't take that lightly."
              </p>
              <p style={{
                fontSize: 'var(--text-xs)',
                marginTop: '0.5rem',
                opacity: 0.8
              }}>
                — Dara Founding Team
              </p>
            </div>
          </motion.div>
        </div>

        {/* Impact Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8 text-center"
        >
          {[
            {
              icon: Thermometer,
              metric: '99.8%',
              label: 'Temperature Accuracy',
              description: 'Maintaining precise conditions across every mile'
            },
            {
              icon: Shield,
              metric: '500+',
              label: 'Trusted Partners',
              description: 'Healthcare and agricultural leaders nationwide'
            },
            {
              icon: Clock,
              metric: '24/7',
              label: 'Operations',
              description: 'Round-the-clock monitoring and support'
            }
          ].map((item, index) => {
            const IconComponent = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
                className="p-6 rounded-xl" 
                style={{ backgroundColor: 'var(--bg-primary)' }}
              >
                <IconComponent className="w-8 h-8 mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
                <div style={{
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {item.metric}
                </div>
                <div style={{
                  fontSize: 'var(--text-base)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--text-primary)',
                  marginBottom: '0.5rem'
                }}>
                  {item.label}
                </div>
                <p style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--leading-relaxed)'
                }}>
                  {item.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}