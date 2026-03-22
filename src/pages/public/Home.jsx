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
        title="Global Logistics & Cold Chain Freight Solutions"
        description="Dara Express provides reliable freight forwarding, cold chain logistics, and last-mile delivery across Nigeria. Trusted by businesses for fast, secure, temperature-controlled cargo shipping."
        keywords="logistics company Nigeria, freight forwarding Lagos, cold chain logistics, last-mile delivery Nigeria, cargo shipping, pharmaceutical logistics, temperature-controlled delivery, Dara Express"
        canonical="/"
      />
      {homeComponents.map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  )
}
