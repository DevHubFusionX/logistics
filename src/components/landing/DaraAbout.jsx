import { motion } from 'framer-motion'
import { Truck, Users, Target, Award, MapPin, TrendingUp } from 'lucide-react'
import { Badge, Button } from '../ui'
import { aboutData } from './Data'
import { fadeInUp, fadeInLeft, fadeInRight, rotateIn, hoverLift } from '../../utils'

export default function DaraAbout() {
  return (
    <section id="about" className="py-24 relative bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">{aboutData.badge}</span>
          </Badge>

          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              {aboutData.title.prefix}
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-primary"
            >
              {aboutData.title.highlight}
            </motion.span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            {aboutData.description}
          </motion.p>
        </div>

        {/* Main Story Content */}
        <div className="grid lg:grid-cols-2 gap-20 items-center mb-24">
          {/* Story Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Timeline Points */}
            <div className="space-y-8">
              {aboutData.timeline.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7, delay: 0.2 + (index * 0.2) }}
                    viewport={{ once: true }}
                    className="flex gap-4"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 + (index * 0.2), type: "spring", stiffness: 200 }}
                      viewport={{ once: true }}
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center`}
                      style={{ backgroundColor: item.color === 'bg-primary' ? '#0056B8' : '#00843D' }} // Assuming variable colors handled or inline
                    >
                      <IconComponent className="w-6 h-6 text-white" />
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
                      viewport={{ once: true }}
                    >
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </motion.div>
                  </motion.div>
                )
              })}
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 1.0 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <Button className="bg-accent hover:shadow-lg">
                Our Mission & Values
              </Button>
              <Button variant="outline">
                Join Our Team
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual Story & Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Hero Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl"
            >
              <motion.img
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2, delay: 0.5 }}
                viewport={{ once: true }}
                src={aboutData.image}
                alt="Dara logistics operations center"
                className="w-full h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 right-8 text-white"
              >
                <motion.blockquote
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="text-lg font-medium italic mb-3"
                >
                  "{aboutData.quote.text}"
                </motion.blockquote>
                <motion.cite
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                  className="text-sm opacity-90 font-semibold"
                >
                  {aboutData.quote.author}
                </motion.cite>
              </motion.div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {aboutData.stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 + (index * 0.2), type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className={`${stat.color === 'blue' ? 'bg-blue-50 border-blue-100' : 'bg-green-50 border-green-100'} p-6 rounded-2xl border cursor-pointer`}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + (index * 0.2), type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    className={`text-3xl font-black ${stat.color === 'blue' ? 'text-primary' : 'text-accent'} mb-1 flex items-center gap-2`}
                  >
                    {stat.value === 'TrendingUp' ? <TrendingUp className="w-8 h-8" /> : stat.value}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: index === 0 ? -10 : 10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + (index * 0.2) }}
                    viewport={{ once: true }}
                    className="text-sm font-semibold text-gray-700"
                  >
                    {stat.label}
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>


      </div>
    </section>
  )
}