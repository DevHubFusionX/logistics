import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function AboutAchievements() {
  const achievements = [
    "Nigerian Business Certified",
    "Eco-Friendly Delivery Options",
    "24/7 WhatsApp Support",
    "Real-Time SMS Tracking",
    "99.2% Delivery Success",
    "All 36 States Coverage"
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-blue-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">
            Our Achievements
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Recognition and certifications that demonstrate our commitment to excellence
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 flex items-center gap-4 shadow-lg border border-gray-100"
            >
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#00843D' }}>
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-gray-900">{achievement}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
