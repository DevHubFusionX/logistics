import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { useState } from 'react'

const posts = [
  {
    id: 1,
    title: 'Best Practices for Pharmaceutical Cold Chain Management',
    excerpt: 'Learn essential strategies for maintaining temperature integrity throughout the pharmaceutical supply chain.',
    image: '/src/assets/img/blog/ca-blog-1.1.png',
    author: 'Dr. Adebayo Okonkwo',
    authorImage: '/src/assets/img/blog/ca-author-1.1.png',
    date: 'Jan 15, 2024',
    readTime: '5 min read',
    category: 'Best Practices'
  },
  {
    id: 2,
    title: 'Understanding WHO Guidelines for Cold Chain Logistics',
    excerpt: 'A comprehensive guide to World Health Organization standards for temperature-controlled distribution.',
    image: '/src/assets/img/blog/ca-blog-1.2.png',
    author: 'Chioma Nwosu',
    authorImage: '/src/assets/img/blog/ca-author-1.2.png',
    date: 'Jan 12, 2024',
    readTime: '7 min read',
    category: 'Compliance'
  },
  {
    id: 3,
    title: 'The Future of Cold Chain Technology in Nigeria',
    excerpt: 'Exploring emerging technologies transforming pharmaceutical logistics across Africa.',
    image: '/src/assets/img/blog/ca-blog-1.3.png',
    author: 'Ibrahim Yusuf',
    authorImage: '/src/assets/img/blog/ca-author-1.3.png',
    date: 'Jan 10, 2024',
    readTime: '6 min read',
    category: 'Technology'
  },
  {
    id: 4,
    title: 'Temperature Monitoring: Real-Time Solutions',
    excerpt: 'How IoT and real-time monitoring systems ensure product integrity during transportation.',
    image: '/src/assets/img/blog/ca-blog-1.4.png',
    author: 'Ngozi Eze',
    authorImage: '/src/assets/img/blog/ca-author-1.4.png',
    date: 'Jan 8, 2024',
    readTime: '4 min read',
    category: 'Technology'
  },
  {
    id: 5,
    title: 'Vaccine Distribution Challenges in Nigeria',
    excerpt: 'Addressing infrastructure and logistics challenges in nationwide vaccine campaigns.',
    image: '/src/assets/img/blog/ca-blog-1.5.png',
    author: 'Dr. Adebayo Okonkwo',
    authorImage: '/src/assets/img/blog/ca-author-1.1.png',
    date: 'Jan 5, 2024',
    readTime: '8 min read',
    category: 'Case Study'
  },
  {
    id: 6,
    title: 'Cold Chain Packaging: Materials and Methods',
    excerpt: 'Selecting the right packaging solutions for different pharmaceutical products.',
    image: '/src/assets/img/blog/ca-blog-1.6.png',
    author: 'Chioma Nwosu',
    authorImage: '/src/assets/img/blog/ca-author-1.2.png',
    date: 'Jan 3, 2024',
    readTime: '5 min read',
    category: 'Best Practices'
  }
]

const categories = ['All', 'Best Practices', 'Compliance', 'Technology', 'Case Study']

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(p => p.category === selectedCategory)

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
            <span className="text-sm font-semibold">Insights & Updates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6"
          >
            Cold Chain
            <span className="block mt-2 bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              Knowledge Hub
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-600 max-w-3xl mx-auto"
          >
            Expert insights, industry trends, and best practices in pharmaceutical 
            cold chain logistics from our team of specialists.
          </motion.p>
        </div>
      </section>

      {/* Categories */}
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

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <section className="pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-6 left-6 px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-full">
                    Featured
                  </div>
                </div>
                <div className="p-12 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-semibold mb-4 w-fit">
                    {filteredPosts[0].category}
                  </div>
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    {filteredPosts[0].title}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    {filteredPosts[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={filteredPosts[0].authorImage}
                      alt={filteredPosts[0].author}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{filteredPosts[0].author}</div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {filteredPosts[0].date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {filteredPosts[0].readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.slice(1).map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
              >
                <div className="relative overflow-hidden h-56">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-full">
                    {post.category}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                    <img
                      src={post.authorImage}
                      alt={post.author}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm text-slate-900 truncate">{post.author}</div>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <button className="flex items-center gap-2 text-blue-600 font-semibold text-sm group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <h2 className="text-4xl font-bold mb-4">Stay Updated</h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our newsletter for the latest insights on cold chain logistics and pharmaceutical distribution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full text-slate-900 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <button className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
