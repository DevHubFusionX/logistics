import { useState } from 'react'
import SEO from '@/components/common/SEO'
import { ScheduleDemoModal } from '@/features/landing/components/landing/demo'

// Import modular sections
import NetworkHero from './NetworkHero'
import NetworkGlance from './NetworkGlance'
import NetworkReefer from './NetworkReefer'
import NetworkStorage from './NetworkStorage'
import NetworkCoverage from './NetworkCoverage'
import NetworkPartners from './NetworkPartners'
import NetworkCTA from './NetworkCTA'

export default function Network() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <SEO
        title="Dara Cold-Chain Network — Reefer Capacity, Cold Storage & 36-State Coverage"
        description="Explore Dara's connected cold-chain logistics network. 120+ partner reefer assets, distributed cold storage depots, and 36-state route coverage — all orchestrated through DaraOS."
        keywords="cold chain network Nigeria, reefer trucks Nigeria, cold storage depots, logistics network coverage, 36 states logistics"
        canonical="/network"
        breadcrumbs={[{ name: 'Network', url: '/network' }]}
      />

      <div className="bg-white min-h-screen text-left">
        {/* Hero Section */}
        <div id="hero"><NetworkHero onBookDemo={() => setIsDemoOpen(true)} /></div>

        {/* Network at a Glance Section */}
        <div id="glance"><NetworkGlance /></div>

        {/* Reefer Network Section */}
        <div id="reefer"><NetworkReefer /></div>

        {/* Cold Storage Infrastructure Section */}
        <div id="storage"><NetworkStorage /></div>

        {/* Coverage Map Section */}
        <div id="coverage"><NetworkCoverage /></div>

        {/* Partners & Connected Infrastructure Section */}
        <div id="partners"><NetworkPartners /></div>

        {/* Call to Action Section */}
        <NetworkCTA onBookDemo={() => setIsDemoOpen(true)} />
      </div>

      {/* Booking Demo Modal */}
      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
