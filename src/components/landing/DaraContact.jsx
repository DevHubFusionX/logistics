import { useState } from 'react'
import { ContactHero, ContactForm, ContactInfo } from './contact'

export default function DaraContact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <section id="contact" className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <ContactHero />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12">
          <ContactForm 
            formData={formData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <ContactInfo />
        </div>
      </div>
    </section>
  )
}
