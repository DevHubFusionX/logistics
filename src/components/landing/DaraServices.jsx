import { motion } from 'framer-motion'
import { Package, Shield, MapPin, Zap, TrendingUp } from 'lucide-react'
import { SectionHeader, Button, ServiceCard, FeatureCard } from '../ui'
import { fadeInUp } from '../../utils'
import { SERVICES_DATA, ADDITIONAL_SERVICES_DATA } from '../../constants/mockData'

const iconMap = { Shield, MapPin, Zap, TrendingUp }

export default function DaraServices() {
  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        <SectionHeader
          badge={{ icon: Package, text: 'Our Services' }}
          title="Logistics Solutions for"
          subtitle="Every Business Need"
          description="From express delivery to enterprise solutions, we provide comprehensive logistics services that scale with your business. Choose the perfect solution for your shipping needs."
        />

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
