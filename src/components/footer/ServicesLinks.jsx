import { motion } from 'framer-motion'

export default function ServicesLinks({ itemVariants }) {
  const services = [
    { href: "#freight", text: "Freight & Cargo" },
    { href: "#delivery", text: "Last-Mile Delivery" },
    { href: "#international", text: "International Shipping" },
    { href: "#warehouse", text: "Warehouse & Storage" },
    { href: "#customs", text: "Customs Clearance" },
    { href: "#insurance", text: "Cargo Insurance" }
  ]

  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      <motion.h3 
        className="text-lg font-semibold"
        whileHover={{ color: "#0ea5e9" }}
        transition={{ duration: 0.3 }}
      >
        Services
      </motion.h3>
      <motion.div 
        className="space-y-3"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.1,
              delayChildren: 0.2
            }
          }
        }}
      >
        {services.map((service, index) => (
          <motion.a 
            key={index}
            href={service.href} 
            className="block text-gray-400 hover:text-sky-400 transition-colors"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ x: 5, color: "#0ea5e9" }}
            transition={{ duration: 0.2 }}
          >
            {service.text}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}