import { useEffect } from 'react'
import {motion} from 'framer-motion'
import { HeroSection, StatsSection, CoreServicesSection, ProcessSection, SpecializedServicesSection, CTASection } from '../components/landing'

export default function Services() {
  useEffect(() => {
    // Update page title for SEO
    document.title = 'Logistics & Supply Chain Services | Dara Express'
  }, [])

  return (
    <main className="pt-20 ">

       {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
            
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(15)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-30"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                  }}
                  animate={{
                    y: [-20, 20, -20],
                    opacity: [0.3, 0.7, 0.3]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2
                  }}
                />
              ))}
            </div>
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

