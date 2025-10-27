import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, ArrowRight, Clock, Globe, MessageCircle, Headphones, Calendar, CheckCircle, Users, Zap } from 'lucide-react'
import { useState } from 'react'

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
    <section
      id="contact"
      className="py-24 bg-gray-50"
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-50 rounded-full mb-8"
          >
            <MessageCircle className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8"
          >
            Let's Start Your
            <br />
            <span className="text-sky-600">Logistics Journey</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-12"
          >
            Ready to transform your business with Nigeria's most trusted logistics partner? 
            Get in touch with our experts for personalized solutions that scale with your growth.
          </motion.p>

          {/* Quick Contact Options */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
          >
            {[
              {
                icon: Phone,
                title: "Call Us Now",
                description: "Speak with our logistics experts",
                action: "+234 800 DARA-LOG",
                color: "bg-green-500"
              },
              {
                icon: Calendar,
                title: "Schedule Meeting",
                description: "Book a consultation call",
                action: "Book 15-min call",
                color: "bg-blue-500"
              },
              {
                icon: MessageCircle,
                title: "Live Chat",
                description: "Get instant support",
                action: "Start chat now",
                color: "bg-purple-500"
              }
            ].map((option, index) => {
              const IconComponent = option.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 cursor-pointer group hover:shadow-xl transition-all duration-300"
                >
                  <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{option.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">{option.description}</p>
                  <div className="text-sky-600 font-semibold text-sm">{option.action}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:col-span-2 bg-white p-10 rounded-3xl shadow-lg border border-gray-100"
          >
            <div className="mb-8">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Get Your Custom Quote
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                Tell us about your shipping needs and we'll provide a personalized solution 
                with transparent pricing and delivery timelines.
              </p>
              
              {/* Form Benefits */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  "Free consultation",
                  "Custom pricing",
                  "24-hour response",
                  "No hidden fees"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all"
                />
              </div>

              <select
                name="serviceType"
                value={formData.serviceType}
                onChange={handleInputChange}
                className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 transition-all"
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
                className="w-full p-4 rounded-xl border-2 border-gray-300 bg-white text-gray-900 focus:border-blue-500 transition-all resize-none"
              />

              <motion.button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-sky-500 text-white text-lg font-bold rounded-xl hover:bg-sky-600 shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Get My Custom Quote
                <ArrowRight className="w-5 h-5" />
              </motion.button>
              
              <p className="text-center text-sm text-gray-500 mt-4">
                By submitting this form, you agree to our privacy policy. We'll respond within 24 hours.
              </p>
            </form>
          </motion.div>

          {/* Contact Info & Support */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Contact Methods */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Call Us",
                    content: "+234 800 DARA-LOG\n+234 1 327 2564",
                    color: "bg-green-500"
                  },
                  {
                    icon: Mail,
                    title: "Email Us",
                    content: "hello@daralogistics.ng\nsupport@daralogistics.ng",
                    color: "bg-blue-500"
                  },
                  {
                    icon: MapPin,
                    title: "Visit Us",
                    content: "15 Admiralty Way, Lekki\nLagos, Nigeria",
                    color: "bg-purple-500"
                  }
                ].map((item, index) => {
                  const IconComponent = item.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="flex items-start gap-4"
                    >
                      <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-gray-600 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>

            {/* Business Hours */}
            <div className="bg-sky-50 p-8 rounded-3xl border border-sky-100">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-sky-600" />
                <h3 className="text-xl font-bold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span className="font-semibold">8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-semibold">9:00 AM - 2:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-semibold text-red-600">Closed</span>
                </div>
                <div className="mt-4 p-3 bg-green-100 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-green-600" />
                    <span className="text-sm font-semibold text-green-800">24/7 Emergency Support Available</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Dara?</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Users, number: "1000+", label: "Happy Clients" },
                  { icon: Zap, number: "99.2%", label: "On-Time Rate" },
                  { icon: Globe, number: "36", label: "States Covered" },
                  { icon: CheckCircle, number: "24/7", label: "Support" }
                ].map((stat, index) => {
                  const IconComponent = stat.icon
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-4 bg-gray-50 rounded-xl"
                    >
                      <IconComponent className="w-6 h-6 text-sky-600 mx-auto mb-2" />
                      <div className="text-2xl font-black text-gray-900">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}