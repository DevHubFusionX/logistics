import { AboutStats, AboutValues, AboutTimeline, AboutAchievements, AboutCTA } from '../components/landing/about'
import { motion } from "framer-motion"
import { Thermometer, Shield, Zap, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-white to-blue-50"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-sky-200 rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
            animate={{
              y: [-15, 15, -15],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
          />
        ))}
      </div>
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-blue-600">Dara Cold Chain Logistics</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Technology-driven cold chain logistics for Nigeria's pharmaceutical, healthcare, and perishable goods industries
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 sm:p-10 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Who We Are</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Dara Cold Chain Logistics is a <span className="font-semibold text-blue-600">technology-driven logistics company</span> focused on delivering reliable, temperature-controlled transportation for Nigeria's pharmaceutical, healthcare, and perishable goods industries.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We ensure that sensitive products — from <span className="font-semibold">vaccines and medical supplies</span> to <span className="font-semibold">frozen foods and fresh produce</span> — are moved safely, efficiently, and in perfect condition from source to destination.
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Trust & Precision</h4>
                    <p className="text-gray-700 leading-relaxed">
                      At Dara, we understand that cold-chain logistics isn't just about transportation; it's about <span className="font-semibold text-green-600">trust, precision, and product integrity</span>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Advanced Technology</h4>
                    <p className="text-gray-700 leading-relaxed">
                      Our fleet of well-maintained refrigerated trucks, equipped with <span className="font-semibold text-purple-600">real-time GPS and temperature monitoring systems</span>, ensures every shipment maintains optimal conditions throughout the journey.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl shadow-xl p-8 border border-orange-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">GIT Insurance</h4>
                    <p className="text-gray-700 leading-relaxed">
                      We provide <span className="font-semibold text-orange-600">Goods-in-Transit (GIT) insurance</span>, giving our clients peace of mind and full confidence in the security of their products.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600">The principles that guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Reliability</h3>
              <p className="text-gray-600">Delivering safely and on time, every time.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center mb-6">
                <Thermometer className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Integrity</h3>
              <p className="text-gray-600">Upholding quality and transparency in every operation.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">Leveraging technology to improve logistics performance.</p>
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="w-14 h-14 bg-orange-100 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Customer Focus</h3>
              <p className="text-gray-600">Tailoring every solution to fit client needs.</p>
            </motion.div>
          </div>
        </div>
      </section>

      <AboutStats />
      <AboutTimeline />
      <AboutAchievements />
      <AboutCTA />
    </div>
  )
}
