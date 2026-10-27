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
        title="Cold-Chain Network & Solar-Powered Cold Storage in Nigeria — Darafort"
        description="Access Darafort's nationwide cold-chain network: 300 reliable refrigerated trucks for businesses, solar-powered cold storage solutions, and 36-state distribution routes orchestrated via DaraOS."
        keywords="Solar-powered cold storage solutions in Nigeria, Reliable refrigerated trucks for businesses, Refrigerated truck hire in Nigeria, Cold-chain fleet aggregation platforms in Africa, Cold-chain infrastructure investment opportunities in Africa, Best cold-chain logistics companies in Nigeria"
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
