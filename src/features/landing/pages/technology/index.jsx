import { useState } from 'react'
import SEO from '@/components/common/SEO'
import { ScheduleDemoModal } from '@/features/landing/components/landing/demo'
import TechnologyHero from './TechnologyHero'
import TechnologyChallenge from './TechnologyChallenge'
import TechnologyArchitecture from './TechnologyArchitecture'
import TechnologyFleet from './TechnologyFleet'
import TechnologyTemperature from './TechnologyTemperature'
import TechnologyVisibility from './TechnologyVisibility'
import TechnologyAnalytics from './TechnologyAnalytics'
import TechnologyCTA from './TechnologyCTA'

export default function Technology() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <SEO
        title="DaraOS Technology — IoT, GPS & Cold-Chain Intelligence"
        description="Explore the technology driving DaraOS. Real-time IoT temperature telemetry, GPS fleet tracking, shipment visibility, and operational analytics for cold-chain logistics across Nigeria."
        keywords="cold chain technology, IoT logistics Nigeria, temperature monitoring, GPS fleet tracking, DaraOS, shipment visibility, cold chain analytics"
        canonical="/technology"
        breadcrumbs={[{ name: 'Technology', url: '/technology' }]}
      />

      <div className="bg-white min-h-screen text-left">
        <div id="hero"><TechnologyHero /></div>
        <div id="problem"><TechnologyChallenge /></div>
        <div id="architecture"><TechnologyArchitecture /></div>
        <div id="fleet"><TechnologyFleet /></div>
        <div id="temperature"><TechnologyTemperature /></div>
        <div id="visibility"><TechnologyVisibility /></div>
        <div id="analytics"><TechnologyAnalytics /></div>
        <TechnologyCTA onBookDemo={() => setIsDemoOpen(true)} />
      </div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
