import { DaraHero, DaraAbout, DaraServices, DaraClimateTech, DaraWhyUs, DaraClients, DaraTestimonials, DaraContact } from '../../components/landing'
import SEO from '../../components/common/SEO'

const homeComponents = [
  DaraHero,
  DaraAbout,
  DaraServices,
  DaraClimateTech,
  DaraWhyUs,
  DaraClients,
  DaraTestimonials,
  DaraContact
]

export default function Home() {
  return (
    <>
      <SEO
        title="Nigeria's Leading Cold Chain & Temp-Controlled Logistics"
        description="Dara Express - Best cold chain logistics Nigeria. Specialized reefer trucks in Nigeria, pharma logistics, and refrigerated transport Lagos. Expert haulage services Nigeria and reefer trucking."
        keywords="cold chain logistics Nigeria, refrigerated transport Lagos, reefer trucks in Nigeria, logistics companies in Nigeria, trucking services in Lagos, transport company in Abuja, haulage services Nigeria, pharma logistics, frozen food transport, temperature controlled logistics"
        canonical="/"
      />
      {homeComponents.map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  )
}
