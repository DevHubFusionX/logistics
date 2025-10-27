import ContactHero from '../components/contact/ContactHero'
import ContactInfo from '../components/contact/ContactInfo'
import OfficeLocations from '../components/contact/OfficeLocations'
import ContactForm from '../components/contact/ContactForm'
import SupportInfo from '../components/contact/SupportInfo'

export default function Contact() {
  return (
    <div className="pt-20">
      <ContactHero />
      
      <ContactInfo />
      
      <div className="container mx-auto px-6 pb-16">
        <OfficeLocations />
      </div>
      
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            <ContactForm />
            <SupportInfo />
          </div>
        </div>
      </section>
    </div>
  )
}
