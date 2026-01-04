import { motion } from 'framer-motion'
import { Truck, Warehouse, Globe, Users, CheckCircle, Thermometer, Shield, MapPin, Clock, Package, TrendingUp } from 'lucide-react'
import { servicesData } from './ServicesData'

export default function Services() {
  const services = servicesData.services;

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 via-white to-cyan-50">
        <div className="max-w-7xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              {servicesData.hero.title} <span className="text-blue-600">{servicesData.hero.highlight}</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              {servicesData.hero.description}
            </p>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-4">
              {servicesData.hero.subDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto space-y-24">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              {/* Service Number Badge */}
              <div className="absolute -top-6 left-8 z-10">
                <div className={`w-12 h-12 ${service.iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
              </div>

              <div className={`bg-gradient-to-br ${service.gradient} rounded-3xl shadow-2xl border border-gray-100 overflow-hidden`}>
                <div className={`grid lg:grid-cols-5 gap-0`}>
                  {/* Content Side */}
                  <div className={`lg:col-span-3 p-8 sm:p-12 ${index % 2 === 1 ? 'lg:order-2' : ''}`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 ${service.iconBg} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">{service.title}</h2>
                    </div>

                    <p className="text-lg text-gray-700 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    <div className="bg-white/50 rounded-xl p-6 backdrop-blur-sm">
                      <p className="text-gray-700 leading-relaxed">
                        {service.highlight}
                      </p>
                    </div>
                  </div>

                  {/* Features Side */}
                  <div className={`lg:col-span-2 bg-white p-8 sm:p-10 ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <div className="sticky top-8">
                      <div className="flex items-center gap-3 mb-8">
                        <div className={`w-2 h-8 ${service.iconBg} rounded-full`}></div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {service.guarantee}
                        </h3>
                      </div>
                      <ul className="space-y-5">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 group">
                            <div className={`w-6 h-6 ${service.iconBg} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                              <CheckCircle className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-gray-700 leading-relaxed">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Service Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Trusted by Leading Businesses</h2>
            <p className="text-xl text-blue-200">Delivering excellence across Nigeria</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {servicesData.stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl sm:text-5xl font-bold text-white mb-2 flex justify-center items-center">
                  {stat.value === 'TrendingUp' ? <TrendingUp className="w-12 h-12" /> : stat.value}
                </div>
                <div className="text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Why Choose Dara?</h2>
            <p className="text-xl text-gray-600">We combine technology, reliability, and experience</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {servicesData.whyChooseUs.map((item, idx) => {
              const borderColors = {
                blue: 'border-blue-600',
                green: 'border-green-600',
                purple: 'border-purple-600'
              };
              const gradients = {
                blue: 'from-blue-500 to-blue-600',
                green: 'from-green-500 to-green-600',
                purple: 'from-purple-500 to-purple-600'
              };
              return (
                <motion.div key={idx} whileHover={{ y: -10, scale: 1.02 }} className={`bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all text-center border-t-4 ${borderColors[item.color]}`}>
                  <div className={`w-20 h-20 bg-gradient-to-br ${gradients[item.color]} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                    <item.icon className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600">Specialized cold chain solutions for critical sectors</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicesData.industries.map((industry, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6 border border-gray-200 text-center">
                <industry.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h4 className="font-bold text-gray-900 mb-2">{industry.name}</h4>
                <p className="text-sm text-gray-600">{industry.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-blue-700 to-cyan-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
              animate={{ y: [-20, 20, -20], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
            />
          ))}
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-block px-4 py-2 bg-white/20 rounded-full text-white text-sm font-semibold mb-6 backdrop-blur-sm">
              {servicesData.cta.badge}
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
              {servicesData.cta.title}
            </h2>
            <p className="text-xl text-blue-100 mb-10 leading-relaxed">
              {servicesData.cta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={servicesData.cta.primaryBtn.link} className="px-10 py-4 bg-white text-blue-600 rounded-xl hover:bg-gray-100 transition-all font-bold shadow-2xl hover:shadow-xl text-lg">
                {servicesData.cta.primaryBtn.text}
              </a>
              <a href={servicesData.cta.secondaryBtn.link} className="px-10 py-4 bg-transparent text-white rounded-xl hover:bg-white/10 transition-all font-bold border-2 border-white text-lg">
                {servicesData.cta.secondaryBtn.text}
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
