export default function Services() {
  const services = [
    {
      icon: "✈️",
      title: "Air Freight",
      desc: "Express global delivery in 24-48 hours",
      features: ["Real-time tracking", "Temperature control", "Priority handling"]
    },
    {
      icon: "🚢",
      title: "Ocean Freight",
      desc: "Cost-effective bulk shipping worldwide",
      features: ["Container tracking", "Port-to-port", "Customs clearance"]
    },
    {
      icon: "🚛",
      title: "Ground Transport",
      desc: "Last-mile delivery and regional distribution",
      features: ["Route optimization", "Live GPS", "Same-day delivery"]
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Complete Logistics Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From air to sea to ground, we handle every aspect of your supply chain with precision and speed.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{service.title}</h3>
              <p className="text-gray-600 mb-6">{service.desc}</p>
              <ul className="space-y-2">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}