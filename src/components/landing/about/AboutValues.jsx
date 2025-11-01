import { motion } from 'framer-motion'
import { Target, Heart, Award, Globe } from 'lucide-react'

export default function AboutValues() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To transform Nigerian commerce by providing reliable, affordable, and technology-driven logistics solutions that connect every corner of Nigeria."
    },
    {
      icon: Heart,
      title: "Our Vision",
      description: "Building Nigeria's most trusted logistics network where distance is no barrier to business growth and economic prosperity."
    },
    {
      icon: Award,
      title: "Our Excellence",
      description: "Industry-leading 99.2% delivery success rate across Nigeria, with a commitment to continuous improvement and customer satisfaction."
    },
    {
      icon: Globe,
      title: "Our Reach",
      description: "Comprehensive network covering all 36 Nigerian states with local expertise, strategic partnerships, and deep understanding of Nigerian markets."
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">
            What Drives Us
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our core values and principles that guide every decision and shape our company culture
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
              >
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-heading text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
