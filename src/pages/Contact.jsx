import { ContactHero, ContactInfo, OfficeLocations, ContactForm, SupportInfo } from '../components/landing'

export default function Contact() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <ContactHero />
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <OfficeLocations />
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div className="space-y-6">
              <ContactInfo />
              <SupportInfo />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
