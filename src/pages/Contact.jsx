import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Users, Headphones, CheckCircle } from 'lucide-react'
import { useState } from 'react'

const contactInfo = [
  {
    icon: MapPin,
    title: 'Lagos Office',
    details: ['Plot 15, Adeola Odeku Street', 'Victoria Island, Lagos', 'Nigeria'],
    color: 'from-blue-500 to-indigo-600'
  },
  {
    icon: Phone,
    title: 'Phone & WhatsApp',
    details: ['+234 (0) 1 234 5678', '+234 (0) 809 123 4567', 'WhatsApp: +234 809 123 4567'],
    color: 'from-green-500 to-emerald-600'
  },
  {
    icon: Mail,
    title: 'Email Support',
    details: ['hello@daralogistics.ng', 'support@daralogistics.ng', 'sales@daralogistics.ng'],
    color: 'from-sky-500 to-blue-600'
  },
  {
    icon: Clock,
    title: 'Business Hours',
    details: ['Monday - Friday: 8:00 AM - 6:00 PM', 'Saturday: 9:00 AM - 4:00 PM', '24/7 WhatsApp Support'],
    color: 'from-purple-500 to-pink-600'
  }
]

const offices = [
  {
    city: 'Lagos',
    address: 'Plot 15, Adeola Odeku Street, Victoria Island',
    phone: '+234 (0) 1 234 5678',
    type: 'Head Office'
  },
  {
    city: 'Abuja',
    address: 'Suite 45, Aminu Kano Crescent, Wuse II',
    phone: '+234 (0) 9 876 5432',
    type: 'Regional Office'
  },
  {
    city: 'Port Harcourt',
    address: '12 Aba Road, GRA Phase II',
    phone: '+234 (0) 84 123 456',
    type: 'Regional Office'
  },
  {
    city: 'Kano',
    address: '8 Murtala Mohammed Way, Fagge',
    phone: '+234 (0) 64 789 012',
    type: 'Regional Office'
  }
]

export default function Contact() {
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
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-8"
          >
            <Headphones className="w-4 h-4" />
            24/7 Customer Support
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
          >
            Get in Touch
            <br />
            <span className="text-sky-600">We're Here to Help</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto mb-10 leading-relaxed"
          >
            Have questions about our logistics services? Need a custom quote? 
            Our Nigerian team is ready to help you find the perfect shipping solution.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <a
                href="https://wa.me/2348091234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <a
                href="tel:+2341234567890"
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-sky-300 hover:bg-sky-50 transition-all"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Multiple Ways to Reach Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose your preferred method of communication - we're available 24/7
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  className={`w-16 h-16 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all`}
                >
                  <info.icon className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-sky-600 transition-colors">{info.title}</h3>
                <div className="space-y-2">
                  {info.details.map((detail, i) => (
                    <p key={i} className="text-gray-600 font-medium">{detail}</p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Office Locations */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Our Office Locations</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-sky-600" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{office.city}</h4>
                      <span className="text-xs text-sky-600 font-semibold">{office.type}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{office.address}</p>
                  <p className="text-sm font-semibold text-gray-900">{office.phone}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Form & Support */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">
            {/* Form */}
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

            {/* Support Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-8"
            >
              {/* Quick Contact */}
              <div className="bg-gradient-to-br from-sky-500 to-blue-600 rounded-3xl p-8 text-white shadow-xl">
                <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
                <p className="text-sky-100 mb-6">
                  Our Nigerian support team is available 24/7 to assist with urgent shipping needs.
                </p>
                <div className="space-y-4">
                  <motion.a 
                    href="https://wa.me/2348091234567" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-white/20 rounded-2xl p-4 text-white hover:bg-white/30 transition-all"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-sky-100">WhatsApp Support</div>
                      <div className="font-bold">+234 809 123 4567</div>
                    </div>
                  </motion.a>
                  
                  <motion.a 
                    href="tel:+2341234567890" 
                    whileHover={{ scale: 1.02 }}
                    className="flex items-center gap-3 bg-white/20 rounded-2xl p-4 text-white hover:bg-white/30 transition-all"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-sm text-sky-100">Call Center</div>
                      <div className="font-bold">+234 (0) 1 234 5678</div>
                    </div>
                  </motion.a>
                </div>
              </div>

              {/* Response Time */}
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Our Response Times</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-600"><strong>WhatsApp:</strong> Instant response</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-600"><strong>Email:</strong> Within 2 hours</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-600"><strong>Phone:</strong> Immediate pickup</span>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="bg-green-50 rounded-2xl p-6 border border-green-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Why Choose Dara?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">Nigerian-owned & operated</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">1,000+ satisfied customers</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">99.2% on-time delivery</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 font-medium">All 36 states coverage</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
