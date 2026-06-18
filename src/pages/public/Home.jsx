import { DaraHero, DaraHowItWorks, DaraTrustedBy, DaraJourney, DaraServices, DaraCTA } from '../../features/landing/components/landing'
import { SectionDivider } from '../../components/common'
import SEO from '../../components/common/SEO'

export default function Home() {
  return (
    <>
      <SEO
        title="Dara Express — Cold Chain Logistics & Reefer Trucks Nigeria"
        description="Dara Express is Nigeria's #1 cold chain logistics company. 120+ reefer trucks for pharma logistics, frozen food transport Lagos to Abuja, refrigerated transport, and haulage services across all 36 Nigerian states."
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

      <DaraHowItWorks />

      <SectionDivider />

      <DaraTrustedBy />

      <SectionDivider />

      <DaraServices />

      <SectionDivider />

      <DaraJourney />

      <SectionDivider />

      <DaraCTA />
    </>
  )
}
