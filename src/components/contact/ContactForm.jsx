import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { useState } from 'react'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl"
    >
      <h2 className="text-3xl font-black text-gray-900 mb-3">Send Us a Message</h2>
      <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 2 hours during business hours.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
              placeholder="Adebayo Ogundimu"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
              placeholder="adebayo@company.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
              placeholder="+234 809 123 4567"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Company Name</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
              placeholder="Your Company Ltd"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Subject *</label>
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all"
          >
            <option value="">Select a topic</option>
            <option value="General Inquiry">General Inquiry</option>
            <option value="Shipping Quote">Shipping Quote</option>
            <option value="Enterprise Solutions">Enterprise Solutions</option>
            <option value="Track Shipment">Track Shipment</option>
            <option value="Partnership">Partnership Opportunity</option>
            <option value="Support">Technical Support</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Message *</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows="6"
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-sky-500 focus:ring-4 focus:ring-sky-500/10 outline-none transition-all resize-none"
            placeholder="Tell us about your logistics needs and how we can help your business..."
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 bg-sky-500 text-white rounded-xl font-bold shadow-lg hover:bg-sky-600 hover:shadow-xl transition-all flex items-center justify-center gap-2"
        >
          Send Message
          <Send className="w-5 h-5" />
        </motion.button>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CheckCircle className="w-4 h-4 text-green-500" />
          We typically respond within 2 hours
        </div>
      </form>
    </motion.div>
  )
}