import { useState } from 'react'
import SEO from '@/components/common/SEO'
import { ScheduleDemoModal } from '@/features/landing/components/landing/demo'
import SolutionsHero from './SolutionsHero'
import SolutionsPillars from './SolutionsPillars'
import SolutionsAccordion from './SolutionsAccordion'
import SolutionsStats from './SolutionsStats'
import SolutionsFAQ from './SolutionsFAQ'
import SolutionsCTA from './SolutionsCTA'

export default function Solutions() {
  const [isDemoOpen, setIsDemoOpen] = useState(false)

  return (
    <>
      <SEO
        title="Cold-Chain Logistics for Pharmaceutical Companies & Frozen Foods — Darafort"
        description="Purpose-built cold-chain logistics solutions for pharmaceutical supply chains, hospital distribution, frozen food transport, and FMCG manufacturing across Nigeria. GDP-compliant with continuous IoT telemetry."
        keywords="Cold-chain logistics for pharmaceutical companies, Pharmaceutical supply-chain logistics partners, Refrigerated transport for frozen foods, Temperature-controlled transportation services, Enterprise logistics solutions in Nigeria, Reliable refrigerated trucks for businesses, Best cold-chain logistics companies in Nigeria"
        canonical="/solutions"
        breadcrumbs={[{ name: 'Solutions', url: '/solutions' }]}
      />

      <div className="bg-white min-h-screen">
        <div id="hero"><SolutionsHero onBookDemo={() => setIsDemoOpen(true)} /></div>
        <SolutionsPillars />
        <SolutionsAccordion />
        <SolutionsStats />
        <SolutionsFAQ />
        <SolutionsCTA onBookDemo={() => setIsDemoOpen(true)} />
      </div>

      <ScheduleDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} />
    </>
  )
}
