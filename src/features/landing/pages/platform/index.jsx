import { useState } from 'react'
import SEO from '@/components/common/SEO'
import { ScheduleDemoModal } from '@/features/landing/components/landing/demo'

// Import modular components
import PlatformHero from './PlatformHero'
import PlatformProofBar from './PlatformProofBar'
import PlatformCapabilities from './PlatformCapabilities'
import PlatformCTA from './PlatformCTA'

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

      {/* Redesigned split-screen hero section */}
      <PlatformHero
        onBookDemo={() => setIsDemoOpen(true)}
      />

      {/* Immediate proof statistics bar */}
      <PlatformProofBar />

      {/* Actual platform capabilities section (Stacker layout) */}
      <PlatformCapabilities />

      {/* Bottom CTA block */}
      <PlatformCTA onBookDemo={() => setIsDemoOpen(true)} />

      {/* Global schedule demo modal */}
      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}


