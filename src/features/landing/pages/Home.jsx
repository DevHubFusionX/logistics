import { lazy, Suspense } from 'react'
import DaraHero from '../components/landing/DaraHero'
import DaraProofBar from '../components/landing/DaraProofBar'
import SectionDivider from '@/components/common/SectionDivider'
import SEO from '@/components/common/SEO'

// Lazy-load below-the-fold sections — only DaraHero is above the fold
const DaraHowItWorks = lazy(() => import('../components/landing/DaraHowItWorks'))
const DaraTrustedBy = lazy(() => import('../components/landing/DaraTrustedBy'))
const DaraServices = lazy(() => import('../components/landing/DaraServices'))
const DaraJourney = lazy(() => import('../components/landing/DaraJourney'))
const DaraFAQ = lazy(() => import('../components/landing/DaraFAQ'))
const DaraAppShowcase = lazy(() => import('../components/landing/DaraAppShowcase'))
const DaraCTA = lazy(() => import('../components/landing/DaraCTA'))

import LazyViewportRender from '@/components/common/LazyViewportRender'

export default function Home() {
  return (
    <>
      <SEO
        title="Darafort — Best Cold-Chain Logistics & Reefer Trucks in Nigeria"
        description="Darafort is Nigeria's leading climate-tech cold-chain logistics platform. 300+ refrigerated reefer trucks and 500 dry trucks for pharmaceutical supply chains, frozen food transport Lagos to Abuja, IoT temperature monitoring, and nationwide haulage."
        keywords="Best cold-chain logistics companies in Nigeria, Refrigerated truck hire in Nigeria, Pharmaceutical logistics companies in Nigeria, Temperature-controlled transportation services, Cold-chain logistics for pharmaceutical companies, Refrigerated transport for frozen foods, Cold-chain fleet aggregation platforms in Africa, Enterprise logistics solutions in Nigeria, IoT temperature monitoring for logistics, Solar-powered cold storage solutions in Nigeria, Cold-chain logistics technology platforms, Reliable refrigerated trucks for businesses, B2B logistics companies in Nigeria, Supply-chain technology startups in Africa, Climate-tech logistics companies in Africa, Technology-enabled cold-chain logistics providers in Africa, Darafort"
        canonical="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Cold Chain Logistics',
          'provider': {
            '@type': 'LocalBusiness',
            '@id': 'https://daraexpress.com/#organization',
            'name': 'Darafort',
            'url': 'https://daraexpress.com',
            'telephone': '+2348115779007',
            'address': {
              '@type': 'PostalAddress',
              'streetAddress': '3 Kudirat Abiola Way, Oregun',
              'addressLocality': 'Ikeja',
              'addressRegion': 'Lagos',
              'addressCountry': 'NG'
            }
          },
          'areaServed': { '@type': 'Country', 'name': 'Nigeria' },
          'description': "Nigeria's #1 technology-enabled cold chain logistics company offering 300 reefer trucks, pharma logistics, frozen food transport, and refrigerated haulage services across all 36 states.",
          'offers': [
            { '@type': 'Offer', 'name': 'Pharmaceutical Logistics Companies in Nigeria', 'description': 'Temperature-controlled pharma transport 2°C–8°C with NIST-calibrated IoT monitoring and GDP compliance' },
            { '@type': 'Offer', 'name': 'Refrigerated Transport for Frozen Foods', 'description': 'Sub-zero reefer trucking at -18°C nationwide for seafood, meats and perishable cargo' },
            { '@type': 'Offer', 'name': 'Refrigerated Truck Hire in Nigeria', 'description': 'Dedicated and on-demand cold chain reefer haulage across all 36 Nigerian states' },
            { '@type': 'Offer', 'name': 'Enterprise Logistics Solutions in Nigeria', 'description': 'Enterprise long-haul trucking, fleet aggregation, and port-to-warehouse logistics' },
            { '@type': 'Offer', 'name': 'Solar-Powered Cold Storage Solutions in Nigeria', 'description': 'Sustainable off-grid and hybrid cold rooms reducing post-harvest losses and emissions' },
            { '@type': 'Offer', 'name': 'Cold-Chain Fleet Aggregation Platforms in Africa', 'description': 'Technology-enabled fleet network connecting 300 reefer and 500 dry trucks across Nigeria' }
          ]
        }}
      />

      <DaraHero />
      <DaraProofBar />

      <LazyViewportRender placeholderHeight="600px">
        <DaraAppShowcase />
      </LazyViewportRender>

      <SectionDivider />

      <LazyViewportRender placeholderHeight="600px">
        <DaraHowItWorks />
      </LazyViewportRender>

      <SectionDivider />

      <LazyViewportRender placeholderHeight="400px">
        <DaraTrustedBy />
      </LazyViewportRender>

      <SectionDivider />

      <LazyViewportRender placeholderHeight="600px">
        <DaraServices />
      </LazyViewportRender>

      <SectionDivider />

      <LazyViewportRender placeholderHeight="600px">
        <DaraJourney />
      </LazyViewportRender>

      <SectionDivider />

      <LazyViewportRender placeholderHeight="500px">
        <DaraFAQ />
      </LazyViewportRender>

      <SectionDivider />

      <LazyViewportRender placeholderHeight="300px">
        <DaraCTA />
      </LazyViewportRender>
    </>
  )
}
