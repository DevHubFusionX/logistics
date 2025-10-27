import { motion } from 'framer-motion'
import { Package, Shield, MapPin, Zap, TrendingUp } from 'lucide-react'
import SectionHeader from './ui/SectionHeader'
import Button from './ui/Button'
import ServiceCard from './ui/ServiceCard'
import FeatureCard from './ui/FeatureCard'
import { fadeInUp } from '../utils/animations'
import { SERVICES_DATA, ADDITIONAL_SERVICES_DATA } from '../constants/mockData'

const iconMap = { Shield, MapPin, Zap, TrendingUp }

export default function DaraServices() {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          badge={{ icon: Package, text: 'Our Services' }}
          title="Logistics Solutions for"
          subtitle="Every Business Need"
          description="From express delivery to enterprise solutions, we provide comprehensive logistics services that scale with your business. Choose the perfect solution for your shipping needs."
        />

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gray-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Additional Services & Features</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every shipment comes with these value-added services to ensure your complete satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {ADDITIONAL_SERVICES_DATA.map((service, index) => (
              <FeatureCard
                key={index}
                icon={iconMap[service.icon]}
                title={service.title}
                description={service.description}
                index={index}
              />
            ))}
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
            <h3 className="text-3xl font-bold mb-4">Ready to Ship with Dara?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses already shipping smarter with Nigeria's most trusted logistics partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className=" text-sky-600 hover:bg-gray-100">
                Start Shipping Now
              </Button>
              <Button variant="secondary">
                Compare All Services
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}