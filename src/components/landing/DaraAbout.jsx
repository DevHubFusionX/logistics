import { motion } from 'framer-motion'
import { Truck, Users, Target, Award, MapPin, TrendingUp } from 'lucide-react'
import { Badge, Button } from '../ui'
import { fadeInUp, fadeInLeft, fadeInRight, rotateIn, hoverLift } from '../../utils'

export default function DaraAbout() {
  return (
    <section id="about" className="py-24 relative bg-white">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6">
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
            <span className="text-sm font-semibold text-gray-700">Our Journey</span>
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
              Transforming Nigeria's
            </motion.span>
            <br />
            <motion.span
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              className="text-primary"
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
                  className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
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
                  className="flex-shrink-0 w-12 h-12 bg-primary rounded-full flex items-center justify-center"
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
                  className="flex-shrink-0 w-12 h-12 bg-accent rounded-full flex items-center justify-center"
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
                className="bg-blue-50 p-6 rounded-2xl border border-blue-100 cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8, type: "spring", stiffness: 200 }}
                  viewport={{ once: true }}
                  className="text-3xl font-black text-primary mb-1"
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
                  className="text-3xl font-black text-accent mb-1"
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


      </div>
    </section>
  )
}