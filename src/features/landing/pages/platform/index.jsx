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
        title="DaraOS — Cold-Chain Logistics Intelligence Platform"
        description="Discover DaraOS, the intelligence layer for temperature-controlled logistics in Nigeria. Live IoT telemetry, real-time GPS visibility, fleet orchestration, and automated alerts."
        keywords="cold chain software, logistics platform Nigeria, temperature monitoring, fleet capacity, GPS tracking, proof of delivery"
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
