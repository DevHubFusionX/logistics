import { motion } from 'framer-motion'
import { Leaf, Heart, ShoppingCart, Handshake } from 'lucide-react'

const services = [
  {
    icon: Leaf,
    image: "/assets/img/service-1.jpg",
    title: "Farm to Market",
    subtitle: "Preserving Nigeria's harvest",
    story: "When farmers in Kaduna harvest their tomatoes at dawn, we ensure they reach Lagos markets with the same freshness. Every crate tells a story of hard work—we make sure that story has a happy ending.",
    impact: "40% reduction in post-harvest losses for our farming partners",
    examples: [
      "Fresh produce from northern farms to southern cities",
      "Dairy products maintaining cold chain integrity",
      "Export-quality goods reaching international ports"
    ]
  },
  {
    icon: Heart,
    image: "/assets/img/service-2.jpg",
    title: "Healthcare Lifelines",
    subtitle: "Every degree protects a life",
    story: "A child's vaccine in Maiduguri. Insulin for a diabetic in Port Harcourt. Cancer medications for a patient in Abuja. We don't just transport medicine—we deliver hope, one temperature-controlled mile at a time.",
    impact: "99.9% vaccine potency maintained across all deliveries",
    examples: [
      "Life-saving vaccines to remote health centers",
      "Critical medications for chronic conditions",
      "Laboratory samples requiring precise temperatures"
    ]
  },
  {
    icon: ShoppingCart,
    image: "/assets/img/service-3.jpg",
    title: "Everyday Essentials",
    subtitle: "Quality you can taste",
    story: "The ice cream that makes a child smile. The frozen fish that feeds a family. The yogurt that starts someone's morning right. We understand that behind every product is a moment that matters.",
    impact: "Zero temperature breaches in retail deliveries this year",
    examples: [
      "Frozen foods maintaining perfect texture",
      "Dairy products with extended shelf life",
      "Premium goods for discerning consumers"
    ]
  },
  {
    icon: Handshake,
    image: "/assets/img/service-4.jpg",
    title: "Partnership Solutions",
    subtitle: "Growing together",
    story: "We don't just provide logistics—we become part of your success story. Whether you're a startup with big dreams or an established company expanding reach, we adapt our solutions to fit your journey.",
    impact: "Average 25% cost savings through optimized routing",
    examples: [
      "Custom solutions for unique business needs",
      "Scalable services that grow with your company",
      "Data insights that drive smarter decisions"
    ]
  }
]

export default function DaraServices() {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
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
            How We Make a <span style={{ color: 'var(--color-primary)' }}>Difference</span>
          </h2>
          <p style={{
            fontSize: 'var(--text-lg)',
            color: 'var(--text-secondary)',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: 'var(--leading-relaxed)'
          }}>
            Four ways we're transforming lives through reliable cold chain logistics
          </p>
        </motion.div>

        {/* Services */}
        <div className="space-y-16">
          {services.map((service, index) => {
            const IconComponent = service.icon
            const isEven = index % 2 === 0
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}
              >
                {/* Content */}
                <div className={`space-y-6 ${!isEven ? 'lg:col-start-2' : ''}`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--color-primary)', opacity: 0.1 }}>
                      <IconComponent className="w-6 h-6" style={{ color: 'var(--color-primary)' }} />
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: 'var(--text-2xl)',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--text-primary)',
                        marginBottom: '0.25rem'
                      }}>
                        {service.title}
                      </h3>
                      <p style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-primary)',
                        fontWeight: 'var(--font-medium)'
                      }}>
                        {service.subtitle}
                      </p>
                    </div>
                  </div>

                  <p style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-secondary)',
                    lineHeight: '1.7',
                    fontStyle: 'italic'
                  }}>
                    {service.story}
                  </p>

                  <div className="p-4 rounded-lg" style={{ backgroundColor: 'var(--bg-secondary)' }}>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-primary)',
                      marginBottom: '0.5rem'
                    }}>
                      Real Impact:
                    </p>
                    <p style={{
                      fontSize: 'var(--text-base)',
                      color: 'var(--text-primary)'
                    }}>
                      {service.impact}
                    </p>
                  </div>

                  <div>
                    <p style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem'
                    }}>
                      What we handle:
                    </p>
                    <ul className="space-y-2">
                      {service.examples.map((example, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span style={{ color: 'var(--color-primary)', fontSize: 'var(--text-sm)' }}>•</span>
                          <span style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--text-secondary)',
                            lineHeight: 'var(--leading-relaxed)'
                          }}>
                            {example}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Image */}
                <div className={!isEven ? 'lg:col-start-1' : ''}>
                  <motion.div
                    className="relative overflow-hidden rounded-2xl"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={service.image}
                      alt={`${service.title} - ${service.subtitle}`}
                      className="w-full h-80 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}