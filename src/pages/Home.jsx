import { DaraHero, DaraAbout, DaraServices, DaraWhyUs, DaraTestimonials, DaraContact } from '../components/landing'

const homeComponents = [
  DaraHero,
  DaraAbout,
  DaraServices,
  DaraWhyUs,
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