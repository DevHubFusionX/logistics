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
        title="IoT Temperature Monitoring & Cold-Chain Logistics Technology — Darafort"
        description="Explore the proprietary technology behind DaraOS: end-to-end IoT temperature monitoring for logistics, live reefer telemetry, GPS fleet tracking, automated excursion alerts, and cold-chain analytics."
        keywords="IoT temperature monitoring for logistics, Cold-chain logistics technology platforms, Technology-enabled cold-chain logistics providers in Africa, Temperature-controlled transportation services, Supply-chain technology startups in Africa, Best cold-chain logistics companies in Nigeria"
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
