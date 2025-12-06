import { DaraHero, DaraAbout, DaraServices, DaraWhyUs, DaraClients, DaraTestimonials, DaraContact } from '../components/landing'

const homeComponents = [
  DaraHero,
  DaraAbout,
  DaraServices,
  DaraWhyUs,
  DaraClients,
  DaraTestimonials,
  DaraContact
]

export default function Home() {
  return (
    <>
      {homeComponents.map((Component, index) => (
        <Component key={index} />
      ))}
    </>
  )
}