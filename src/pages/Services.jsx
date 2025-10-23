import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Truck, Package, Globe, Building2, Plane, Ship, Clock, Shield, ArrowRight, CheckCircle, Users, MapPin, TrendingUp, Zap } from 'lucide-react'

export default function Services() {
  const [activeTab, setActiveTab] = useState('all')

  const stats = [
    { icon: MapPin, value: '200+', label: 'Countries Served' },
    { icon: Package, value: '1M+', label: 'Shipments Delivered' },
    { icon: Users, value: '10K+', label: 'Happy Clients' },
    { icon: TrendingUp, value: '99.9%', label: 'On-Time Delivery' }
  ]

  const mainServices = [
    {
      icon: Truck,
      title: "Freight & Cargo",
      category: "freight",
      description: "Comprehensive freight solutions for bulk shipments across air, sea, and ground networks with real-time tracking and customs clearance.",
      features: ["Multi-modal transport", "Customs clearance", "Cargo insurance", "Temperature control"],
      pricing: "Starting at $89.99",
      color: "from-orange-400 to-red-600"
    },
    {
      icon: Package,
      title: "Last-Mile Delivery",
      category: "delivery",
      description: "Precision delivery services ensuring your packages reach customers efficiently with flexible scheduling and proof of delivery.",
      features: ["Same-day delivery", "Flexible scheduling", "Proof of delivery", "Route optimization"],
      pricing: "Starting at $8.99",
      color: "from-green-400 to-emerald-600"
    },
    {
      icon: Globe,
      title: "International Shipping",
      category: "international",
      description: "Global logistics expertise connecting 200+ countries with streamlined documentation and regulatory compliance management.",
      features: ["200+ countries", "Documentation support", "Regulatory compliance", "Express options"],
      pricing: "Starting at $19.99",
      color: "from-blue-400 to-indigo-600"
    },
    {
      icon: Building2,
      title: "Warehouse & Storage",
      category: "warehouse",
      description: "Strategic distribution centers with climate-controlled environments, inventory management, and automated fulfillment systems.",
      features: ["Climate control", "Inventory management", "Automated systems", "24/7 security"],
      pricing: "Starting at $2.50/sq ft",
      color: "from-purple-400 to-pink-600"
    }
  ]

  const additionalServices = [
    {
      icon: Plane,
      title: "Express Air Freight",
      description: "Priority air transport for time-sensitive shipments with guaranteed delivery windows.",
      features: ["24-48 hour delivery", "Priority handling", "Live tracking"]
    },
    {
      icon: Ship,
      title: "Ocean Freight",
      description: "Cost-effective sea transport for large volume shipments with full container options.",
      features: ["Full/partial containers", "Port-to-port service", "Competitive rates"]
    },
    {
      icon: Clock,
      title: "Supply Chain Management",
      description: "End-to-end supply chain optimization with analytics and performance monitoring.",
      features: ["Process optimization", "Analytics dashboard", "Performance metrics"]
    },
    {
      icon: Shield,
      title: "Cargo Insurance",
      description: "Comprehensive protection for your shipments with flexible coverage options.",
      features: ["Full coverage options", "Claims support", "Risk assessment"]
    }
  ]

  const process = [
    { step: 1, title: "Request Quote", description: "Tell us your shipping needs" },
    { step: 2, title: "Get Pricing", description: "Receive instant quote" },
    { step: 3, title: "Book Shipment", description: "Confirm and schedule pickup" },
    { step: 4, title: "Track & Deliver", description: "Monitor in real-time" }
  ]

  const filteredServices = activeTab === 'all' 
    ? mainServices 
    : mainServices.filter(s => s.category === activeTab)

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 via-white to-sky-50 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Complete Logistics Solutions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Services Built for Your Success
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            From local deliveries to global freight, we provide reliable, efficient, and cost-effective logistics solutions worldwide.
          </p>
          <Link
            to="/auth/signup"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-sky-500 to-blue-600 text-white rounded-xl font-semibold hover:from-sky-600 hover:to-blue-700 shadow-lg hover:shadow-xl transition-all"
          >
            Get Started Today
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-y border-gray-100">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-sky-100 rounded-xl mb-3">
                    <Icon className="w-6 h-6 text-sky-600" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Main Services with Tabs */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive logistics solutions tailored to your business needs
            </p>

            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {[
                { id: 'all', label: 'All Services' },
                { id: 'freight', label: 'Freight' },
                { id: 'delivery', label: 'Delivery' },
                { id: 'international', label: 'International' },
                { id: 'warehouse', label: 'Warehouse' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-sky-500 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
            {filteredServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="flex items-start gap-4 sm:gap-6">
                    <div className={`w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                      <Icon className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, i) => (
                            <span key={i} className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs sm:text-sm font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <span className="text-sky-600 font-bold text-lg">{service.pricing}</span>
                        <Link
                          to="/auth/signup"
                          className="inline-flex items-center justify-center gap-2 text-sky-500 hover:text-sky-600 font-semibold transition-colors text-sm"
                        >
                          Get Started
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Simple, streamlined process to get your shipments moving
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {process.map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-sky-500 to-blue-600 text-white rounded-2xl font-bold text-2xl mb-4 shadow-lg">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-sky-300 to-transparent"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Specialized Services
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              Additional solutions to complement your logistics needs
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => {
              const Icon = service.icon
              return (
                <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-xl transition-all duration-300 border border-gray-100 group">
                  <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-500 transition-colors">
                    <Icon className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-gray-600 mb-4">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-center justify-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-600 py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Optimize Your Logistics?
            </h2>
            <p className="text-lg sm:text-xl text-sky-100 mb-10">
              Let our experts design a tailored solution that fits your specific requirements and budget.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/auth/signup"
                className="inline-flex items-center justify-center gap-2 bg-white text-sky-600 hover:bg-gray-50 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl transition-all"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/pricing"
                className="inline-flex items-center justify-center gap-2 border-2 border-white text-white hover:bg-white hover:text-sky-600 px-8 py-4 rounded-xl font-bold text-lg transition-all"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
