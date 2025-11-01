import { motion } from 'framer-motion'

export default function AboutLeadership() {
  const leadership = [
    {
      name: "Adebayo Ogundimu",
      position: "Chief Executive Officer",
      bio: "15+ years in Nigerian logistics, former operations director at major courier companies",
      initials: "AO"
    },
    {
      name: "Kemi Adebayo",
      position: "Chief Technology Officer",
      bio: "Tech innovator with deep understanding of Nigerian market and mobile-first solutions",
      initials: "KA"
    },
    {
      name: "Ibrahim Musa",
      position: "Chief Operations Officer",
      bio: "Operations expert with extensive knowledge of Nigerian transportation networks",
      initials: "IM"
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-heading text-gray-900 mb-6">
            Leadership Team
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Meet the experienced Nigerian professionals leading Dara Logistics into the future
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {leadership.map((leader, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-28 h-28 bg-primary rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-4xl font-heading text-white">{leader.initials}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{leader.name}</h3>
              <p className="text-primary font-bold mb-4">{leader.position}</p>
              <p className="text-gray-600 leading-relaxed">{leader.bio}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
