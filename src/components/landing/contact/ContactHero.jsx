import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function ContactHero() {
  return (
    <div className="text-center mb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-6 py-3  rounded-full mb-8"
      >
        <MessageCircle className="w-4 h-4 text-primary" />
        <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">Get In Touch</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-4xl md:text-5xl lg:text-6xl font-heading text-gray-900 mb-8"
      >
        Let's Start Your
        <br />
        <span className="text-primary">Logistics Journey</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
      >
        Get in touch with our team for personalized logistics solutions.
      </motion.p>
    </div>
  )
}
