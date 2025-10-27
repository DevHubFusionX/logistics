import { motion } from 'framer-motion'
import { Truck, Users, Target, Award, MapPin, TrendingUp } from 'lucide-react'
import Badge from './ui/Badge'
import Button from './ui/Button'
import { fadeInUp, fadeInLeft, fadeInRight, rotateIn, hoverLift } from '../utils/animations'

export default function DaraAbout() {
  return (
    <section id="about" className="py-24 relative" style={{ backgroundColor: 'var(--bg-secondary)' }}>
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Our Journey</span>
          </Badge>
          
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-6"
          >
            <motion.span
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Transforming Nigeria's
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-sky-600"
            >
              Logistics Landscape
            </motion.span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
          >
            From a bold vision to Nigeria's most trusted logistics network—discover how we're revolutionizing the way businesses move, ship, and scale across Africa.
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
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.4, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-12 h-12 bg-sky-500 rounded-full flex items-center justify-center"
                >
                  <Target className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">The Vision (2020)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    We saw Nigerian businesses struggling with unreliable logistics—delayed shipments, 
                    poor tracking, and limited coverage. We knew technology could bridge this gap.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
                >
                  <Truck className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.7 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">The Foundation (2021)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Starting with 5 vehicles and a dream, we built our first logistics hub in Lagos. 
                    Our focus: real-time tracking, transparent pricing, and exceptional service.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.6 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="flex-shrink-0 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center"
                >
                  <TrendingUp className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-2">The Growth (2022-2024)</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Today, we operate across 36 states with 200+ vehicles, serving 1000+ businesses. 
                    From startups to enterprises, we're the logistics backbone of Nigeria's economy.
                  </p>
                </motion.div>
              </motion.div>
            </div>

            <motion.div
              {...fadeInUp}
              transition={{ ...fadeInUp.transition, delay: 1.0 }}
              viewport={{ once: true }}
              className="flex gap-4"
            >
              <Button className="bg-sky-500 hover:shadow-lg">
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
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
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
                  "We don't just move packages—we move dreams, ambitions, and the future of Nigerian commerce."
                </motion.blockquote>
                <motion.cite
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                  viewport={{ once: true }}
                  className="text-sm opacity-90 font-semibold"
                >
                  — Dara Leadership Team
                </motion.cite>
              </motion.div>
            </motion.div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-sky-50 p-6 rounded-2xl border border-sky-100 cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="text-3xl font-black text-sky-600 mb-1"
                >
                  1000+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 }}
                  viewport={{ once: true }}
                  className="text-sm font-semibold text-gray-700"
                >
                  Happy Businesses
                </motion.div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8, type: "spring", stiffness: 100 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-green-50 p-6 rounded-2xl border border-green-100 cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.0, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="text-3xl font-black text-green-600 mb-1"
                >
                  50K+
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 1.2 }}
                  viewport={{ once: true }}
                  className="text-sm font-semibold text-gray-700"
                >
                  Deliveries Made
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Core Values & Impact */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-50 rounded-3xl p-12"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-gray-900 mb-4"
            >
              What Drives Us Forward
            </motion.h3>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Our core values aren't just words on a wall—they're the foundation of every delivery, every partnership, and every innovation.
            </motion.p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Users,
                title: 'Customer-First',
                metric: '98%',
                label: 'Satisfaction Rate',
                description: 'Every decision starts with our customers. Their success is our success, and we never compromise on service quality.'
              },
              {
                icon: Award,
                title: 'Excellence',
                metric: '99.2%',
                label: 'On-Time Delivery',
                description: 'We set the gold standard for logistics in Nigeria. Precision, reliability, and continuous improvement drive everything we do.'
              },
              {
                icon: MapPin,
                title: 'Innovation',
                metric: '36',
                label: 'States Covered',
                description: 'Technology and innovation aren\'t just tools—they\'re how we\'re building the future of African logistics.'
              }
            ].map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.6 + index * 0.2, type: "spring", stiffness: 100 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="text-center group cursor-pointer"
                >
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 + index * 0.2, type: "spring", stiffness: 200 }}
                    viewport={{ once: true }}
                    whileHover={{ rotate: 5, scale: 1.1 }}
                    className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-all"
                  >
                    <IconComponent className="w-8 h-8 text-white" />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.0 + index * 0.1, type: "spring", stiffness: 150 }}
                    viewport={{ once: true }}
                    className="text-4xl font-black text-gray-900 mb-2"
                  >
                    {item.metric}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-lg font-bold text-gray-800 mb-2"
                  >
                    {item.label}
                  </motion.div>
                  <motion.h4
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-xl font-bold text-sky-600 mb-4"
                  >
                    {item.title}
                  </motion.h4>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="text-gray-600 leading-relaxed text-sm"
                  >
                    {item.description}
                  </motion.p>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}