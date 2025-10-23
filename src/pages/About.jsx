import { Link } from 'react-router-dom'
import { Users, Target, Award, Globe, ArrowRight, Heart, Zap, Shield, TrendingUp, MapPin, Package, CheckCircle } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize global logistics through innovative technology, sustainable practices, and exceptional customer service that connects businesses worldwide.",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: Heart,
      title: "Our Vision",
      description: "Building a world where distance is no barrier to commerce, enabling businesses of all sizes to reach global markets effortlessly.",
      color: "from-pink-400 to-rose-600"
    },
    {
      icon: Award,
      title: "Our Excellence",
      description: "Industry-leading 99.9% delivery success rate, ISO 9001 certified operations, and recognition as a top logistics provider for three consecutive years.",
      color: "from-amber-400 to-orange-600"
    },
    {
      icon: Globe,
      title: "Our Reach",
      description: "Comprehensive network spanning 200+ countries with strategic partnerships, advanced infrastructure, and local expertise in every major market.",
      color: "from-green-400 to-emerald-600"
    }
  ]

  const stats = [
    { icon: MapPin, number: "200+", label: "Countries Served", color: "from-blue-500 to-indigo-600" },
    { icon: Package, number: "1M+", label: "Shipments Delivered", color: "from-green-500 to-emerald-600" },
    { icon: Users, number: "10K+", label: "Happy Clients", color: "from-purple-500 to-pink-600" },
    { icon: TrendingUp, number: "99.9%", label: "On-Time Delivery", color: "from-orange-500 to-red-600" }
  ]

  const timeline = [
    { year: "2015", title: "Founded", description: "Dara Express launched with a vision to transform global logistics" },
    { year: "2017", title: "Global Expansion", description: "Expanded operations to 50+ countries across 5 continents" },
    { year: "2019", title: "Tech Innovation", description: "Launched AI-powered tracking and route optimization platform" },
    { year: "2021", title: "Sustainability", description: "Achieved carbon-neutral shipping across all domestic routes" },
    { year: "2023", title: "Industry Leader", description: "Recognized as top 3 logistics provider globally" }
  ]

  const leadership = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      bio: "15+ years in global logistics, former VP at FedEx, MBA from Wharton",
      initials: "SJ",
      color: "from-sky-500 to-blue-600"
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      bio: "Tech innovator with 12 years experience, former Amazon logistics engineer",
      initials: "MC",
      color: "from-purple-500 to-indigo-600"
    },
    {
      name: "Emily Rodriguez",
      position: "Chief Operations Officer",
      bio: "Operations expert with 18 years in supply chain management",
      initials: "ER",
      color: "from-pink-500 to-rose-600"
    }
  ]

  const achievements = [
    "ISO 9001:2015 Certified",
    "Carbon Neutral Shipping",
    "24/7 Customer Support",
    "Real-Time GPS Tracking",
    "99.9% Delivery Success",
    "200+ Country Network"
  ]

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-sky-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              Trusted by 10,000+ businesses worldwide
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About Dara Express
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed mb-8">
              Since 2015, we've been transforming global commerce through intelligent logistics solutions.
              Our commitment to innovation, sustainability, and customer success has made us a trusted partner
              for businesses of all sizes across the world.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/signup"
                className="btn-primary inline-flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/services"
                className="btn-outline inline-flex items-center justify-center gap-2"
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center group">
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br ${stat.color} rounded-2xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values and principles that guide every decision and shape our company culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-xl flex items-center justify-center mb-6 shadow-lg`}>
                    <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Milestones that shaped Dara Express into the logistics leader we are today
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-sky-500 to-blue-600"></div>
              
              <div className="space-y-8">
                {timeline.map((item, index) => (
                  <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                      <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all">
                        <div className="text-2xl font-bold text-sky-600 mb-2">{item.year}</div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                        <p className="text-gray-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="hidden md:block absolute left-1/2 w-4 h-4 bg-sky-500 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-sky-50 to-blue-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Achievements
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Recognition and certifications that demonstrate our commitment to excellence
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white rounded-xl p-4 flex items-center gap-3 shadow-md hover:shadow-lg transition-all border border-gray-100">
                <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                <span className="font-semibold text-gray-900">{achievement}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals leading Dara Express into the future
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center group">
                <div className={`w-24 h-24 sm:w-28 sm:h-28 bg-gradient-to-br ${leader.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                  <span className="text-3xl sm:text-4xl font-bold text-white">{leader.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-sky-600 font-semibold mb-3">{leader.position}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Work Together?
            </h2>
            <p className="text-lg sm:text-xl text-sky-100 mb-10">
              Join 10,000+ businesses that trust Dara Express for their global shipping needs.
              Let's build something great together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all"
                style={{ boxShadow: 'var(--shadow-glass)' }}
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                Contact Us
              </Link>
            </div>
            <p className="text-sky-100 text-sm mt-6">
              ✓ No credit card required  ✓ 14-day free trial  ✓ Cancel anytime
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
