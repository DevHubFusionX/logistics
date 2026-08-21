import SEO from '@/components/common/SEO'
import SolutionsHero from './SolutionsHero'
import SolutionsPillars from './SolutionsPillars'
import SolutionsAccordion from './SolutionsAccordion'
import SolutionsStats from './SolutionsStats'
import SolutionsFAQ from './SolutionsFAQ'
import SolutionsCTA from './SolutionsCTA'

export default function Solutions() {
  return (
    <>
      <SEO
        title="GDP-Compliant Cold-Chain Solutions — DaraOS"
        description="GDP-compliant cold-chain logistics solutions for Pharmaceuticals, Food, FMCG, and Agriculture across Nigeria."
        keywords="cold chain solutions, pharma logistics, agricultural cold chain, cold storage, FMCG logistics"
        canonical="/solutions"
      />

      <div className="bg-white min-h-screen">
        <SolutionsHero />
        <SolutionsPillars />
        <SolutionsAccordion />
        <SolutionsStats />
        <SolutionsFAQ />
        <SolutionsCTA />
      </div>
    </>
  )
}
