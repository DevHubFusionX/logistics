import { useState } from 'react'
import SEO from '@/components/common/SEO'
import { ScheduleDemoModal } from '@/features/landing/components/landing/demo'

// Import modular components
import PlatformHero from './PlatformHero'
import PlatformOverview from './PlatformOverview'
import PlatformCapabilities from './PlatformCapabilities'
import PlatformTemperature from './PlatformTemperature'
import PlatformHowItWorks from './PlatformHowItWorks'
import PlatformOnboarding from './PlatformOnboarding'

export default function Platform() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <SEO
        title="DaraOS — Cold-Chain Fleet Aggregation & Logistics Technology Platform"
        description="Discover DaraOS, Africa's leading cold-chain fleet aggregation platform. Real-time IoT temperature monitoring, reefer fleet orchestration, GPS tracking, and automated proof of delivery."
        keywords="Cold-chain fleet aggregation platforms in Africa, Technology-enabled cold-chain logistics providers in Africa, Cold-chain logistics technology platforms, IoT temperature monitoring for logistics, Enterprise logistics solutions in Nigeria, B2B logistics companies in Nigeria, Supply-chain technology startups in Africa"
        canonical="/platform"
        breadcrumbs={[{ name: 'Platform', url: '/platform' }]}
      />

      <div className="bg-white min-h-screen text-left">
        <div id="hero"><PlatformHero onBookDemo={() => setIsDemoOpen(true)} /></div>
        <div id="overview"><PlatformOverview onBookDemo={() => setIsDemoOpen(true)} /></div>
        <div id="capabilities"><PlatformCapabilities /></div>
        <div id="temperature"><PlatformTemperature /></div>
        <div id="how-it-works"><PlatformHowItWorks /></div>
        <div id="onboarding"><PlatformOnboarding /></div>
      </div>

      {/* Global schedule demo modal */}
      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
