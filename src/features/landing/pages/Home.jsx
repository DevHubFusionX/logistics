import { lazy, Suspense } from 'react'
import DaraHero from '../components/landing/DaraHero'
import SectionDivider from '@/components/common/SectionDivider'
import SEO from '@/components/common/SEO'

// Lazy-load below-the-fold sections — only DaraHero is above the fold
const DaraHowItWorks = lazy(() => import('../components/landing/DaraHowItWorks'))
const DaraTrustedBy = lazy(() => import('../components/landing/DaraTrustedBy'))
const DaraServices = lazy(() => import('../components/landing/DaraServices'))
const DaraJourney = lazy(() => import('../components/landing/DaraJourney'))
const DaraFAQ = lazy(() => import('../components/landing/DaraFAQ'))
const DaraCTA = lazy(() => import('../components/landing/DaraCTA'))

import LazyViewportRender from '@/components/common/LazyViewportRender'

export default function Home() {
  return (
    <>
      <SEO
        title="Darafort— Cold Chain Logistics & Reefer Trucks Nigeria"
        description="Darafortis Nigeria's #1 cold chain logistics company. 120+ reefer trucks for pharma logistics, frozen food transport Lagos to Abuja, refrigerated transport, and haulage services across all 36 Nigerian states."
        keywords="Dara Express, cold chain logistics Nigeria, reefer trucks Nigeria, refrigerated transport Lagos, pharma logistics Nigeria, frozen food transport Lagos, haulage services Nigeria, logistics companies in Nigeria, transport company Abuja, temperature controlled logistics Nigeria"
        canonical="/"
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Service',
          'serviceType': 'Cold Chain Logistics',
          'provider': { '@type': 'LocalBusiness', 'name': 'Dara Express', 'url': 'https://daraexpress.com' },
          'areaServed': { '@type': 'Country', 'name': 'Nigeria' },
          'description': 'Nigeria\'s #1 cold chain logistics company offering reefer trucks, pharma logistics, frozen food transport, and refrigerated haulage services across all 36 states.',
          'offers': [
            { '@type': 'Offer', 'name': 'Pharma Logistics Nigeria', 'description': 'Temperature-controlled pharma transport 2°C–8°C with IoT monitoring' },
            { '@type': 'Offer', 'name': 'Frozen Food Transport Lagos', 'description': 'Sub-zero reefer trucking at -18°C nationwide' },
            { '@type': 'Offer', 'name': 'Refrigerated Transport Lagos', 'description': 'Farm-to-market cold chain across all 36 Nigerian states' },
            { '@type': 'Offer', 'name': 'Haulage Services Nigeria', 'description': 'Enterprise long-haul trucking and port-to-warehouse logistics' }
          ]
        }}
      />

      <DaraHero />

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
