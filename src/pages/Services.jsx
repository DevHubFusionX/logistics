import { useEffect } from 'react'
import HeroSection from '../components/services/HeroSection'
import StatsSection from '../components/services/StatsSection'
import CoreServicesSection from '../components/services/CoreServicesSection'
import ProcessSection from '../components/services/ProcessSection'
import SpecializedServicesSection from '../components/services/SpecializedServicesSection'
import CTASection from '../components/services/CTASection'

export default function Services() {
  useEffect(() => {
    // Update page title for SEO
    document.title = 'Logistics & Supply Chain Services | Dara Express'
  }, [])

  return (
    <main className="pt-20 ">
      {/* Services page content */}
      <HeroSection />

      {/* Key statistics and trust indicators */}
      <StatsSection />

      {/* Main service offerings */}
      <div role="region" aria-label="Our services">
        <CoreServicesSection />
        <ProcessSection />
        <SpecializedServicesSection />
      </div>

      {/* Call to action */}
      <CTASection />
    </main>
  )
}

