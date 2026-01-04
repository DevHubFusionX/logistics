import { AboutStats, AboutValues, AboutTimeline, AboutAchievements, AboutCTA } from '../components/landing/about'
import { motion } from "framer-motion"
import { Thermometer, Shield, Zap, Users } from 'lucide-react'
import { aboutData } from './AboutData'

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
              {aboutData.hero.title.main} <span className="text-blue-600">{aboutData.hero.title.highlight}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {aboutData.hero.description}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-xl p-8 sm:p-10 border border-blue-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                  <Thermometer className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{aboutData.whoWeAre.title}</h3>
              </div>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                {aboutData.whoWeAre.description1}
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                {aboutData.whoWeAre.description2}
              </p>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{aboutData.trustAndPrecision.title}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {aboutData.trustAndPrecision.description}
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
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{aboutData.advancedTech.title}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {aboutData.advancedTech.description}
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
                    <h4 className="text-lg font-bold text-gray-900 mb-2">{aboutData.gitInsurance.title}</h4>
                    <p className="text-gray-700 leading-relaxed">
                      {aboutData.gitInsurance.description}
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
            {aboutData.coreValues.map((value, index) => {
              const Icon = value.icon === "Shield" ? Shield :
                value.icon === "Thermometer" ? Thermometer :
                  value.icon === "Zap" ? Zap : Users;
              const bgColor = value.color === "blue" ? "bg-blue-100" :
                value.color === "green" ? "bg-green-100" :
                  value.color === "purple" ? "bg-purple-100" : "bg-orange-100";
              const textColor = value.color === "blue" ? "text-blue-600" :
                value.color === "green" ? "text-green-600" :
                  value.color === "purple" ? "text-purple-600" : "text-orange-600";
              return (
                <motion.div key={index} whileHover={{ y: -5 }} className="bg-white rounded-xl p-8 shadow-lg">
                  <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center mb-6`}>
                    <Icon className={`w-8 h-8 ${textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              );
            })}
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
