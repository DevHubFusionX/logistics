import { motion } from 'framer-motion'

export default function QuickLinks({ itemVariants }) {
  const links = [
    { href: "#services", text: "Our Services" },
    { href: "#tracking", text: "Track Package" },
    { href: "#solutions", text: "Enterprise Solutions" },
    { href: "#about", text: "About Us" },
    { href: "#careers", text: "Careers" },
    { href: "#news", text: "News & Updates" }
  ]

  return (
    <motion.div className="space-y-6" variants={itemVariants}>
      <motion.h3 
        className="text-lg font-semibold"
        whileHover={{ color: "#0ea5e9" }}
        transition={{ duration: 0.3 }}
      >
        Quick Links
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
        {links.map((link, index) => (
          <motion.a 
            key={index}
            href={link.href} 
            className="block text-gray-400 hover:text-sky-400 transition-colors"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: { opacity: 1, x: 0 }
            }}
            whileHover={{ x: 5, color: "#0ea5e9" }}
            transition={{ duration: 0.2 }}
          >
            {link.text}
          </motion.a>
        ))}
      </motion.div>
    </motion.div>
  )
}