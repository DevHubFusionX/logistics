import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Users, Target, Award, Globe, ArrowRight, Heart, Zap, Shield, TrendingUp, MapPin, Package, CheckCircle, Clock, Truck } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To transform Nigerian commerce by providing reliable, affordable, and technology-driven logistics solutions that connect every corner of Nigeria.",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: Heart,
      title: "Our Vision",
      description: "Building Nigeria's most trusted logistics network where distance is no barrier to business growth and economic prosperity.",
      color: "from-pink-400 to-rose-600"
    },
    {
      icon: Award,
      title: "Our Excellence",
      description: "Industry-leading 99.2% delivery success rate across Nigeria, with a commitment to continuous improvement and customer satisfaction.",
      color: "from-amber-400 to-orange-600"
    },
    {
      icon: Globe,
      title: "Our Reach",
      description: "Comprehensive network covering all 36 Nigerian states with local expertise, strategic partnerships, and deep understanding of Nigerian markets.",
      color: "from-green-400 to-emerald-600"
    }
  ]

  const stats = [
    { icon: MapPin, number: "36", label: "States Covered", color: "from-blue-500 to-indigo-600" },
    { icon: Package, number: "50K+", label: "Successful Deliveries", color: "from-green-500 to-emerald-600" },
    { icon: Users, number: "1K+", label: "Happy Businesses", color: "from-purple-500 to-pink-600" },
    { icon: TrendingUp, number: "99.2%", label: "On-Time Performance", color: "from-orange-500 to-red-600" }
  ]

  const timeline = [
    { year: "2020", title: "Founded", description: "Dara Logistics launched with a vision to transform Nigerian commerce" },
    { year: "2021", title: "Nationwide Expansion", description: "Expanded operations to cover all 36 Nigerian states" },
    { year: "2022", title: "Tech Innovation", description: "Launched real-time tracking and mobile app for Nigerian customers" },
    { year: "2023", title: "Enterprise Solutions", description: "Introduced dedicated enterprise services for large Nigerian businesses" },
    { year: "2024", title: "Market Leader", description: "Became Nigeria's fastest-growing logistics company" }
  ]

  const leadership = [
    {
      name: "Adebayo Ogundimu",
      position: "Chief Executive Officer",
      bio: "15+ years in Nigerian logistics, former operations director at major courier companies",
      initials: "AO",
      color: "from-sky-500 to-blue-600"
    },
    {
      name: "Kemi Adebayo",
      position: "Chief Technology Officer",
      bio: "Tech innovator with deep understanding of Nigerian market and mobile-first solutions",
      initials: "KA",
      color: "from-purple-500 to-indigo-600"
    },
    {
      name: "Ibrahim Musa",
      position: "Chief Operations Officer",
      bio: "Operations expert with extensive knowledge of Nigerian transportation networks",
      initials: "IM",
      color: "from-pink-500 to-rose-600"
    }
  ]

  const achievements = [
    "Nigerian Business Certified",
    "Eco-Friendly Delivery Options",
    "24/7 WhatsApp Support",
    "Real-Time SMS Tracking",
    "99.2% Delivery Success",
    "All 36 States Coverage"
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.6, 0.2]
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-sky-100 text-sky-700 rounded-full text-sm font-bold mb-8"
            >
              <Zap className="w-4 h-4" />
              Trusted by 1,000+ Nigerian businesses
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
            >
              About
              <br />
              <span className="text-sky-600">Dara Logistics</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-10 max-w-4xl mx-auto"
            >
              Since 2020, we've been transforming Nigerian commerce through intelligent logistics solutions.
              Our commitment to innovation, reliability, and customer success has made us a trusted partner
              for businesses of all sizes across Nigeria.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/booking/request"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-sky-500 text-white rounded-xl font-bold shadow-lg hover:bg-sky-600 transition-colors"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:border-sky-300 hover:bg-sky-50 transition-all"
                >
                  Our Services
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 5 }}
                    className="inline-flex items-center justify-center w-16 h-16 bg-sky-500 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-all"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm font-semibold text-gray-600">{stat.label}</div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Our core values and principles that guide every decision and shape our company culture
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl transition-all"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Milestones that shaped Dara Logistics into the trusted partner we are today
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-sky-500 to-blue-600 rounded-full"></div>
              
              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: index * 0.2 }}
                    className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                      <motion.div
                        whileHover={{ scale: 1.02, y: -5 }}
                        className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                      >
                        <div className="text-3xl font-black text-sky-600 mb-3">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed">{item.description}</p>
                      </motion.div>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                      className="hidden md:block absolute left-1/2 w-6 h-6 bg-sky-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Our Achievements
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Recognition and certifications that demonstrate our commitment to excellence
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {achievements.map((achievement, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg hover:shadow-xl transition-all border border-gray-100 group"
              >
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 transition-colors"
                >
                  <CheckCircle className="w-6 h-6 text-green-500 group-hover:text-white transition-colors" />
                </motion.div>
                <span className="font-bold text-gray-900 group-hover:text-sky-600 transition-colors">{achievement}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-6">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Meet the experienced Nigerian professionals leading Dara Logistics into the future
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="w-28 h-28 bg-sky-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-all"
                >
                  <span className="text-4xl font-black text-white">{leader.initials}</span>
                </motion.div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-sky-600 transition-colors">{leader.name}</h3>
                <p className="text-sky-600 font-bold mb-4">{leader.position}</p>
                <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 py-20">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-black text-white mb-6"
            >
              Ready to Work Together?
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-sky-100 mb-10"
            >
              Join 1,000+ Nigerian businesses that trust Dara Logistics for their shipping needs.
              Let's build Nigeria's future together.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/booking/request"
                  className="inline-flex items-center gap-2 bg-white text-sky-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all"
                >
                  Start Shipping Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </motion.div>
              
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-xl font-bold text-lg transition-all"
                >
                  Contact Us
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-sky-100 text-sm mt-6"
            >
              ✓ No hidden fees  ✓ Nigerian-owned business  ✓ 24/7 WhatsApp support
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  )
}
