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
        title="Cold-Chain Solutions for Pharma, Food & FMCG — Dara"
        description="Purpose-built cold-chain logistics solutions for Pharmaceuticals, Food & Beverage, FMCG, Agriculture and Manufacturing across Nigeria. GDP-compliant, real-time visibility."
        keywords="cold chain solutions Nigeria, pharma logistics, food cold chain, FMCG logistics, agricultural cold chain, GDP compliant transport"
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
