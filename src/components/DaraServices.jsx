import { motion } from 'framer-motion'
import { Truck, Package, Clock, MapPin, Shield, Zap, Users, TrendingUp } from 'lucide-react'

const services = [
  {
    icon: Clock,
    image: "https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Express Delivery",
    subtitle: "Speed that drives success",
    description: "When time is money, we deliver both. Same-day delivery in major cities, next-day nationwide coverage, and emergency logistics for urgent shipments.",
    features: [
      "Same-day delivery in Lagos, Abuja, Port Harcourt",
      "Next-day delivery to 36 states nationwide",
      "Emergency logistics for urgent shipments",
      "Real-time tracking and delivery updates"
    ],
    pricing: "From ₦2,500",
    deliveryTime: "2-24 hours",
    coverage: "Nationwide"
  },
  {
    icon: Package,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Standard Shipping",
    subtitle: "Reliable, affordable, everywhere",
    description: "Our most popular service combines reliability with affordability. Perfect for e-commerce, retail, and regular business shipments across Nigeria.",
    features: [
      "Door-to-door delivery service",
      "Flexible pickup scheduling",
      "Package insurance included",
      "SMS and email notifications"
    ],
    pricing: "From ₦1,200",
    deliveryTime: "2-5 days",
    coverage: "All 36 states"
  },
  {
    icon: Truck,
    image: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Freight & Cargo",
    subtitle: "Moving big, thinking bigger",
    description: "Heavy-duty logistics for businesses that need to move large volumes. From pallets to containers, we handle the heavy lifting so you can focus on growth.",
    features: [
      "Full truckload (FTL) and less-than-truckload (LTL)",
      "Specialized equipment for different cargo types",
      "Warehouse and distribution services",
      "Cross-docking and consolidation"
    ],
    pricing: "Custom quotes",
    deliveryTime: "1-7 days",
    coverage: "Major routes"
  },
  {
    icon: Users,
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    title: "Enterprise Solutions",
    subtitle: "Logistics that scale with you",
    description: "Comprehensive logistics partnerships for growing businesses. Custom solutions, dedicated support, and technology integration that grows with your success.",
    features: [
      "Dedicated account management",
      "API integration and custom solutions",
      "Volume discounts and flexible contracts",
      "Advanced analytics and reporting"
    ],
    pricing: "Custom pricing",
    deliveryTime: "Flexible",
    coverage: "Nationwide+"
  }
]

const additionalServices = [
  {
    icon: Shield,
    title: "Insurance & Protection",
    description: "Comprehensive coverage for your valuable shipments"
  },
  {
    icon: MapPin,
    title: "Real-Time Tracking",
    description: "Know exactly where your package is, every step of the way"
  },
  {
    icon: Zap,
    title: "API Integration",
    description: "Seamlessly integrate our services into your business systems"
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description: "Data-driven insights to optimize your logistics operations"
  }
]

export default function DaraServices() {
  return (
    <section id="services" className="py-20" style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-sky-50 rounded-full mb-8"
          >
            <Package className="w-4 h-4 text-sky-600" />
            <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Our Services</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8"
          >
            Logistics Solutions for
            <br />
            <span className="text-sky-600">Every Business Need</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          >
            From express delivery to enterprise solutions, we provide comprehensive logistics services 
            that scale with your business. Choose the perfect solution for your shipping needs.
          </motion.p>
        </div>

        {/* Main Services Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.7, delay: index * 0.1, type: "spring", stiffness: 100 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden group hover:shadow-xl transition-all duration-300"
              >
                {/* Service Image */}
                <div className="relative h-48 overflow-hidden">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring", stiffness: 200 }}
                    className="absolute top-4 left-4 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center"
                  >
                    <IconComponent className="w-6 h-6 text-sky-600" />
                  </motion.div>
                </div>

                {/* Service Content */}
                <div className="p-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="mb-6"
                  >
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-sky-600 font-semibold mb-4">{service.subtitle}</p>
                    <p className="text-gray-600 leading-relaxed">{service.description}</p>
                  </motion.div>

                  {/* Service Details */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{service.pricing}</div>
                      <div className="text-xs text-gray-500">Starting price</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{service.deliveryTime}</div>
                      <div className="text-xs text-gray-500">Delivery time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-gray-900">{service.coverage}</div>
                      <div className="text-xs text-gray-500">Coverage</div>
                    </div>
                  </motion.div>

                  {/* Features List */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
                    className="space-y-3 mb-6"
                  >
                    {service.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-sky-500 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </motion.div>

                  {/* CTA Button */}
                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.7 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 bg-sky-500 text-white font-bold rounded-xl hover:bg-sky-600 transition-colors"
                  >
                    Get Quote
                  </motion.button>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Additional Services */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="bg-gray-50 rounded-3xl p-12"
        >
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Additional Services & Features</h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every shipment comes with these value-added services to ensure your complete satisfaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {additionalServices.map((service, index) => {
              const IconComponent = service.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1, type: "spring", stiffness: 100 }}
                  whileHover={{ y: -5, scale: 1.05 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-sky-600 transition-colors"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-20"
        >
          <div className="bg-sky-500 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Ship with Dara?</h3>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Join thousands of businesses already shipping smarter with Nigeria's most trusted logistics partner.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-sky-600 font-bold rounded-xl hover:bg-gray-100 transition-colors"
              >
                Start Shipping Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
              >
                Compare All Services
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}