import { motion } from 'framer-motion'
import { aboutData } from '../../../pages/AboutData'

export default function AboutTimeline() {
  const timeline = aboutData.timeline

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
            Our Journey
          </h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Milestones that shaped Dara Logistics into the trusted partner we are today
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-primary rounded-full"></div>

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100">
                      <div className="text-2xl md:text-3xl font-heading text-primary mb-2 md:mb-3">{item.year}</div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 md:mb-3">{item.title}</h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                  <div className="hidden md:block absolute left-1/2 w-6 h-6 bg-primary rounded-full border-4 border-white shadow-lg transform -translate-x-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
