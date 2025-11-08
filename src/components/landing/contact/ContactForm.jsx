import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function ContactForm({ formData: externalFormData, handleInputChange: externalHandleChange, handleSubmit: externalHandleSubmit }) {
  const [internalFormData, setInternalFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    serviceType: '',
    message: ''
  })

  const formData = externalFormData || internalFormData
  
  const handleInputChange = externalHandleChange || ((e) => {
    setInternalFormData({
      ...internalFormData,
      [e.target.name]: e.target.value
    })
  })

  const navigate = useNavigate()

  const handleSubmit = externalHandleSubmit || ((e) => {
    e.preventDefault()
    navigate('/booking/request')
  })
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="lg:col-span-2 bg-white p-6 sm:p-8 lg:p-10 rounded-3xl shadow-lg border border-gray-100"
    >
      <div className="mb-6 sm:mb-8">
        <h3 className="text-2xl sm:text-3xl font-heading text-gray-900 mb-4">
          Get Your Custom Quote
        </h3>
        <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
          Tell us about your shipping needs and we'll provide a personalized solution 
          with transparent pricing and delivery timelines.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-primary transition-all text-sm sm:text-base"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-primary transition-all text-sm sm:text-base"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-primary transition-all text-sm sm:text-base"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-primary transition-all text-sm sm:text-base"
          />
        </div>

        <select
          name="serviceType"
          value={formData.serviceType}
          onChange={handleInputChange}
          className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-primary transition-all text-sm sm:text-base"
        >
          <option value="">Select Service Type</option>
          <option value="express">Express Delivery</option>
          <option value="standard">Standard Shipping</option>
          <option value="freight">Freight & Cargo</option>
          <option value="enterprise">Enterprise Solutions</option>
          <option value="ecommerce">E-commerce Logistics</option>
          <option value="other">Other Services</option>
        </select>

        <textarea
          name="message"
          placeholder="Tell us about your logistics needs..."
          rows="4"
          value={formData.message}
          onChange={handleInputChange}
          className="w-full p-3 sm:p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-primary transition-all resize-none text-sm sm:text-base"
        />

        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 text-white text-base sm:text-lg font-bold rounded-xl shadow-lg hover:shadow-xl transition-all"
          style={{ backgroundColor: '#00843D' }}
        >
          <span className="hidden sm:inline">Get My Custom Quote</span>
          <span className="sm:hidden">Get Quote</span>
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        
        <p className="text-center text-sm text-gray-500 mt-4">
          By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.
        </p>
      </form>
    </motion.div>
  )
}
