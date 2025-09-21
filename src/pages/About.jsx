import { Users, Target, Award, Globe, ArrowRight } from 'lucide-react'

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To revolutionize global logistics through innovative technology, sustainable practices, and exceptional customer service that connects businesses worldwide."
    },
    {
      icon: Users,
      title: "Our Team",
      description: "Over 5,000 logistics professionals across 50+ countries, dedicated to delivering excellence in every shipment and building lasting partnerships."
    },
    {
      icon: Award,
      title: "Our Excellence",
      description: "Industry-leading 99.9% delivery success rate, ISO 9001 certified operations, and recognition as a top logistics provider for three consecutive years."
    },
    {
      icon: Globe,
      title: "Our Reach",
      description: "Comprehensive network spanning 200+ countries with strategic partnerships, advanced infrastructure, and local expertise in every major market."
    }
  ]

  const stats = [
    { number: "2015", label: "Founded" },
    { number: "200+", label: "Countries" },
    { number: "5,000+", label: "Team Members" },
    { number: "1M+", label: "Happy Customers" }
  ]

  const leadership = [
    {
      name: "Sarah Johnson",
      position: "Chief Executive Officer",
      bio: "15+ years in global logistics, former VP at FedEx, MBA from Wharton",
      initials: "SJ"
    },
    {
      name: "Michael Chen",
      position: "Chief Technology Officer",
      bio: "Tech innovator with 12 years experience, former Amazon logistics engineer",
      initials: "MC"
    },
    {
      name: "Emily Rodriguez",
      position: "Chief Operations Officer",
      bio: "Operations expert with 18 years in supply chain management and optimization",
      initials: "ER"
    }
  ]

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            About Dora Logistics
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Since 2015, we've been transforming global commerce through intelligent logistics solutions. 
            Our commitment to innovation, sustainability, and customer success has made us a trusted partner 
            for businesses of all sizes across the world.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-sky-500 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sky-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Drives Us
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our core values and principles that guide every decision and shape our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => {
              const IconComponent = value.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="w-8 h-8 text-sky-500" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Leadership Team
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Meet the experienced professionals leading Dora Logistics into the future of global commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center">
                <div className="w-24 h-24 bg-sky-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">{leader.initials}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
                <p className="text-sky-600 font-medium mb-4">{leader.position}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-900 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Work Together?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of businesses that trust Dora Logistics for their global shipping needs. 
            Let's build something great together.
          </p>
          <button className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  )
}