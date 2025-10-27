import DaraHero from '../components/DaraHero'
import DaraAbout from '../components/DaraAbout'
import DaraServices from '../components/DaraServices'
import DaraWhyUs from '../components/DaraWhyUs'
import DaraTestimonials from '../components/DaraTestimonials'
import DaraContact from '../components/DaraContact'

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