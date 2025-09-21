import { Truck, Package, Globe, Building2, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function KeyServices() {
  const services = [
    {
      icon: Truck,
      title: "Freight & Cargo",
      description: "Comprehensive freight solutions for bulk shipments across air, sea, and ground networks with real-time tracking and customs clearance.",
      link: "#freight"
    },
    {
      icon: Package,
      title: "Last-Mile Delivery",
      description: "Precision delivery services ensuring your packages reach customers efficiently with flexible scheduling and proof of delivery.",
      link: "#delivery"
    },
    {
      icon: Globe,
      title: "International Shipping",
      description: "Global logistics expertise connecting 200+ countries with streamlined documentation and regulatory compliance management.",
      link: "#international"
    },
    {
      icon: Building2,
      title: "Warehouse & Storage",
      description: "Strategic distribution centers with climate-controlled environments, inventory management, and automated fulfillment systems.",
      link: "#warehouse"
    }
  ]

  return (
    <section id="solutions" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.h2 
            className="text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Comprehensive Logistics Solutions
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            From origin to destination, our integrated services ensure seamless supply chain management 
            with industry-leading reliability and transparency.
          </motion.p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon
            return (
              <motion.div 
                key={index} 
                className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-sky-200 hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1,
                  ease: "easeOut" 
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                <motion.div 
                  className="mb-6"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                >
                  <motion.div 
                    className="w-16 h-16 bg-sky-100 rounded-xl flex items-center justify-center group-hover:bg-sky-500 transition-colors duration-300"
                    whileHover={{ rotate: 5 }}
                  >
                    <IconComponent className="w-8 h-8 text-sky-500 group-hover:text-white transition-colors duration-300" />
                  </motion.div>
                </motion.div>
                
                <motion.h3 
                  className="text-xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3 }}
                >
                  {service.title}
                </motion.h3>
                <motion.p 
                  className="text-gray-600 mb-6 leading-relaxed"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}
                >
                  {service.description}
                </motion.p>
                
                <motion.a 
                  href={service.link} 
                  className="inline-flex items-center gap-2 text-sky-500 hover:text-sky-600 font-medium transition-colors group/link"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Learn More
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </motion.a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}