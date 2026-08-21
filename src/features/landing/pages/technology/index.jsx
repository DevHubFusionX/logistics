import SEO from '@/components/common/SEO'
import TechnologyHero from './TechnologyHero'
import TechnologyChallenge from './TechnologyChallenge'
import TechnologyArchitecture from './TechnologyArchitecture'
import TechnologyFleet from './TechnologyFleet'

export default function Technology() {
  return (
    <>
      <SEO
        title="DaraOS Technology Architecture — Cold-Chain Logistics"
        description="Explore the technology driving DaraOS. From IoT sensor integrations to fleet orchestration and geofenced routing, discover how we build modern cold chains."
        keywords="cold chain tech, IoT logistics, cargo monitoring, temperature routing, DaraOS architecture"
        canonical="/technology"
      />

      <div className="bg-white min-h-screen text-left">
        <TechnologyHero />
        <TechnologyChallenge />
        <TechnologyArchitecture />
        <TechnologyFleet />
      </div>
    </>
  )
}
