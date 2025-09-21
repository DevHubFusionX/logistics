import { Truck, Package, Globe, Building2, Plane, Ship, Clock, Shield, ArrowRight } from 'lucide-react'

export default function Services() {
  const mainServices = [
    {
      icon: Truck,
      title: "Freight & Cargo",
      description: "Comprehensive freight solutions for bulk shipments across air, sea, and ground networks with real-time tracking and customs clearance.",
      features: ["Multi-modal transport", "Customs clearance", "Cargo insurance", "Temperature control"],
      pricing: "Starting at $89.99"
    },
    {
      icon: Package,
      title: "Last-Mile Delivery",
      description: "Precision delivery services ensuring your packages reach customers efficiently with flexible scheduling and proof of delivery.",
      features: ["Same-day delivery", "Flexible scheduling", "Proof of delivery", "Route optimization"],
      pricing: "Starting at $8.99"
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "Global logistics expertise connecting 200+ countries with streamlined documentation and regulatory compliance management.",
      features: ["200+ countries", "Documentation support", "Regulatory compliance", "Express options"],
      pricing: "Starting at $19.99"
    },
    {
      icon: Building2,
      title: "Warehouse & Storage",
      description: "Strategic distribution centers with climate-controlled environments, inventory management, and automated fulfillment systems.",
      features: ["Climate control", "Inventory management", "Automated systems", "24/7 security"],
      pricing: "Starting at $2.50/sq ft"
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

  return (
    <div className="pt-32">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Comprehensive logistics solutions designed to meet every shipping need. From local deliveries 
            to global freight, we provide reliable, efficient, and cost-effective services worldwide.
          </p>
        </div>
      </section>

      {/* Main Services */}
      <section className="bg-gray-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our primary logistics services that form the backbone of global commerce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {mainServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-8 h-8 text-sky-500" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {service.features.map((feature, i) => (
                            <span key={i} className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-sm font-medium">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-sky-600 font-semibold text-lg">{service.pricing}</span>
                        <button className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium transition-colors">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Specialized Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Additional logistics solutions to complement your shipping needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-sky-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sky-500 transition-colors duration-300">
                    <IconComponent className="w-10 h-10 text-sky-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-center justify-center gap-2">
                        <div className="w-1.5 h-1.5 bg-sky-500 rounded-full"></div>
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
      <section className="bg-sky-500 py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Need a Custom Solution?
          </h2>
          <p className="text-xl text-sky-100 mb-8 max-w-2xl mx-auto">
            Every business has unique logistics needs. Let our experts design a tailored solution 
            that fits your specific requirements and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-sky-500 hover:bg-gray-50 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              Request Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-sky-500 px-8 py-4 rounded-lg font-semibold text-lg transition-colors">
              View Pricing
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}