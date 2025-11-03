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

        {/* Mobile: Stack Layout */}
        <div className="md:hidden space-y-6">
          {values.map((value, index) => {
            const Icon = value.icon
            const colors = [
              { bg: 'bg-gradient-to-br from-blue-50 to-white', iconBg: 'bg-blue-600' },
              { bg: 'bg-gradient-to-br from-green-50 to-white', iconBg: 'bg-green-600' },
              { bg: 'bg-gradient-to-br from-purple-50 to-white', iconBg: 'bg-purple-600' },
              { bg: 'bg-gradient-to-br from-orange-50 to-white', iconBg: 'bg-orange-600' }
            ]
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className={`${colors[index].bg} rounded-3xl p-6 shadow-lg border border-gray-100`}
              >
                <div className={`w-12 h-12 ${colors[index].iconBg} rounded-2xl flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2.5} />
                </div>
                <h3 className="text-xl font-heading text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            )
          })}
        </div>

        {/* Desktop: Diagonal Layout */}
        <div className="hidden md:block relative max-w-7xl mx-auto h-[600px] lg:h-[800px]">
          {/* Diagonal Background */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 to-transparent" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)' }}></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-orange-100/30 to-transparent" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 0)' }}></div>
          </motion.div>

          {/* Top-Left Cards */}
          <motion.div
            initial={{ opacity: 0, x: -60, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
            className="absolute top-0 left-0 w-[45%] h-[35%] bg-gradient-to-br from-blue-50 to-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl border border-gray-100 transition-shadow"
          >
            <motion.div 
              initial={{ rotate: -180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
            >
              <Target className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </motion.div>
            <h3 className="text-lg lg:text-xl font-heading text-gray-900 mb-2">{values[0].title}</h3>
            <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{values[0].description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -60, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
            className="absolute top-[40%] left-[5%] w-[40%] h-[35%] bg-gradient-to-br from-green-50 to-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl border border-gray-100 transition-shadow"
          >
            <motion.div
              initial={{ rotate: -180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.45 }}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-green-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
            >
              <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </motion.div>
            <h3 className="text-lg lg:text-xl font-heading text-gray-900 mb-2">{values[1].title}</h3>
            <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{values[1].description}</p>
          </motion.div>

          {/* Bottom-Right Cards */}
          <motion.div
            initial={{ opacity: 0, x: 60, y: -30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
            className="absolute top-[25%] right-[5%] w-[40%] h-[35%] bg-gradient-to-br from-purple-50 to-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl border border-gray-100 transition-shadow"
          >
            <motion.div
              initial={{ rotate: 180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-purple-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
            >
              <Award className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </motion.div>
            <h3 className="text-lg lg:text-xl font-heading text-gray-900 mb-2">{values[2].title}</h3>
            <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{values[2].description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60, y: 30 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.45, ease: "easeOut" }}
            whileHover={{ scale: 1.03, y: -5, transition: { duration: 0.3 } }}
            className="absolute bottom-0 right-0 w-[45%] h-[35%] bg-gradient-to-br from-orange-50 to-white rounded-3xl p-6 lg:p-8 shadow-xl hover:shadow-2xl border border-gray-100 transition-shadow"
          >
            <motion.div
              initial={{ rotate: 180, scale: 0 }}
              whileInView={{ rotate: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.75 }}
              className="w-12 h-12 lg:w-14 lg:h-14 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg mb-4"
            >
              <Globe className="w-6 h-6 lg:w-7 lg:h-7 text-white" strokeWidth={2.5} />
            </motion.div>
            <h3 className="text-lg lg:text-xl font-heading text-gray-900 mb-2">{values[3].title}</h3>
            <p className="text-gray-600 text-xs lg:text-sm leading-relaxed">{values[3].description}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
