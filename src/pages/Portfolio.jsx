import { motion } from 'framer-motion'
import { ArrowRight, MapPin, Calendar, Package } from 'lucide-react'
import { useState } from 'react'

const projects = [
  {
    id: 1,
    title: 'Nationwide Vaccine Distribution',
    category: 'Pharmaceutical',
    location: 'Lagos to 36 States',
    date: '2024',
    image: '/src/assets/img/portfolio/ca-portfoli3.1.png',
    description: 'Successfully distributed temperature-sensitive vaccines across Nigeria with 99.9% integrity.'
  },
  {
    id: 2,
    title: 'Hospital Supply Chain',
    category: 'Healthcare',
    location: 'Abuja Medical Centers',
    date: '2024',
    image: '/src/assets/img/portfolio/ca-portfolio3.2.png',
    description: 'Established reliable cold chain network for major hospital groups.'
  },
  {
    id: 3,
    title: 'Pharmaceutical Warehousing',
    category: 'Storage',
    location: 'Port Harcourt',
    date: '2023',
    image: '/src/assets/img/portfolio/ca-portfoli3.3.png',
    description: 'Built state-of-the-art temperature-controlled warehouse facility.'
  },
  {
    id: 4,
    title: 'Clinical Trial Logistics',
    category: 'Research',
    location: 'Multi-State',
    date: '2023',
    image: '/src/assets/img/portfolio/ca-project3.4.png',
    description: 'Managed sensitive biological samples for international clinical trials.'
  },
  {
    id: 5,
    title: 'Retail Pharmacy Network',
    category: 'Distribution',
    location: 'Nationwide',
    date: '2024',
    image: '/src/assets/img/portfolio/ca-portfolio-3.5.png',
    description: 'Connected 500+ pharmacies with reliable cold chain delivery.'
  },
  {
    id: 6,
    title: 'Emergency Medical Response',
    category: 'Emergency',
    location: 'Lagos State',
    date: '2024',
    image: '/src/assets/img/portfolio/portfolio-big-1.1.png',
    description: 'Rapid deployment of temperature-controlled medical supplies during health crisis.'
  }
]

const categories = ['All', 'Pharmaceutical', 'Healthcare', 'Storage', 'Research', 'Distribution', 'Emergency']

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === selectedCategory)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100">
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full mb-6"
          >
            <Package className="w-4 h-4" />
            <span className="text-sm font-semibold">Our Success Stories</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6"
          >
            Delivering Excellence
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Across Nigeria
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Explore our portfolio of successful cold chain logistics projects, 
            from vaccine distribution to pharmaceutical warehousing.
          </motion.p>
        </div>
      </section>

      {/* Filter Categories */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden h-64">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <MapPin className="w-4 h-4" />
                      <span>{project.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                      <Calendar className="w-4 h-4" />
                      <span>{project.date}</span>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 text-blue-600 font-semibold group-hover:gap-3 transition-all">
                    View Details
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Let's discuss how our cold chain expertise can support your pharmaceutical logistics needs.
            </p>
            <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
              Get in Touch
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
