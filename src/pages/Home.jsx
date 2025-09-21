import Hero from '../components/Hero'
import KeyServices from '../components/KeyServices'
import WhyChooseUs from '../components/WhyChooseUs'
import TrackingWidget from '../components/TrackingWidget'
import Testimonials from '../components/Testimonials'
import HowItWorks from '../components/HowItWorks'
import FlowDiagram from '../components/FlowDiagram'

export default function Home() {
  return (
    <>
      <Hero />
      <KeyServices />
      <WhyChooseUs />
      <HowItWorks />
      <FlowDiagram />
      <TrackingWidget />
      <Testimonials />
    </>
  )
}