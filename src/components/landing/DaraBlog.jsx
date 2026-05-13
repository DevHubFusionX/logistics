import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight, Calendar, User, Clock, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { wordpressApi, stripHtml, formatDate, calculateReadTime } from '../../services/wordpressService'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
}

const cardAnim = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease },
  },
}

const headerAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
}

// Fallback blog data for when WordPress is unavailable
const fallbackPosts = [
  {
    id: 1,
    title: "Cold Chain Best Practices for Nigerian Businesses",
    excerpt: "Essential guidelines for maintaining temperature-controlled logistics across Nigeria's diverse climate zones...",
    featured_image: "/assets/img/service-1.jpg",
    date: "2024-01-15T10:00:00",
    author: { name: "Dara Logistics Team", avatar: "" },
    slug: "cold-chain-best-practices-nigeria",
    categories: ["Cold Chain"],
    content: "",
  },
  {
    id: 2,
    title: "Pharmaceutical Transport: Ensuring Drug Safety",
    excerpt: "How proper cold chain logistics protects pharmaceutical integrity from Lagos to remote Nigerian communities...",
    featured_image: "/assets/img/pharmaceutical.jpg",
    date: "2024-01-10T14:30:00",
    author: { name: "Dr. Sarah Adebayo", avatar: "" },
    slug: "pharmaceutical-transport-drug-safety",
    categories: ["Pharmaceuticals"],
    content: "",
  },
  {
    id: 3,
    title: "The Future of Logistics Technology in Africa",
    excerpt: "Exploring how IoT, AI, and blockchain are revolutionizing supply chain management across African markets...",
    featured_image: "/assets/img/enterprise.jpg",
    date: "2024-01-05T09:15:00",
    author: { name: "Tech Innovation Team", avatar: "" },
    slug: "future-logistics-technology-africa",
    categories: ["Technology"],
    content: "",
  }
]

export default function DaraBlog() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchPosts() {
      try {
        const { posts: wpPosts } = await wordpressApi.getPosts({ number: 3 })
        
        if (wpPosts.length > 0) {
          setPosts(wpPosts)
        } else {
          // No posts published yet — use fallback
          setPosts(fallbackPosts)
          setError('No posts yet')
        }
      } catch (err) {
        console.warn('WordPress API failed, using fallback posts:', err.message)
        setPosts(fallbackPosts)
        setError('Using demo content')
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">
          <div className="text-center mb-16">
            <div className="h-6 bg-gray-200 rounded w-32 mx-auto mb-4 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded w-96 mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-gray-100 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-20 bg-gray-200 rounded" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={ref} className="bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 sm:px-14 lg:px-20">

        {/* Header */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="text-center mb-16"
        >
          <motion.div variants={headerAnim}>
            <p className="text-blue-600 font-bold text-sm tracking-[0.2em] uppercase mb-3">
              Industry Insights
            </p>
            <h2 className="font-heading font-black text-sky-900 text-3xl sm:text-4xl lg:text-5xl leading-tight mb-6">
              Latest from{' '}
              <motion.span
                className="text-blue-500 inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5, ease }}
              >
                our blog
              </motion.span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Stay updated with the latest trends, insights, and best practices in cold chain logistics and supply chain management.
            </p>
          </motion.div>

          <motion.div variants={headerAnim} className="mt-8">
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
            >
              View all articles
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Blog Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.article
              key={post.id}
              variants={cardAnim}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500"
            >
              {/* Featured Image */}
              <div className="relative h-48 overflow-hidden">
                {post.featured_image ? (
                  <img
                    src={post.featured_image}
                    alt={stripHtml(post.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      e.target.src = '/assets/img/service-1.jpg'
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-sky-600 flex items-center justify-center">
                    <span className="text-white/80 text-5xl font-black">
                      {stripHtml(post.title).charAt(0)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                
                {/* Category Badge */}
                {post.categories && post.categories[0] && post.categories[0] !== 'Uncategorized' && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-lg text-xs font-bold text-sky-900 tracking-wider uppercase">
                    {post.categories[0]}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta */}
                <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(post.date)}
                  </span>
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {post.author.name}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {calculateReadTime(post.content || post.excerpt)} min read
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-heading font-bold text-sky-900 text-lg leading-tight mb-3 group-hover:text-blue-600 transition-colors">
                  {stripHtml(post.title)}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                  {stripHtml(post.excerpt).substring(0, 120)}...
                </p>

                {/* Read More */}
                <Link
                  to={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
                >
                  Read more
                  <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </Link>
              </div>

              {/* Hover accent line */}
              <motion.div
                className="h-1 bg-gradient-to-r from-blue-500 to-sky-500 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.article>
          ))}
        </motion.div>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 text-center"
          >
            <p className="text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-lg inline-block">
              Demo content shown • Connect your WordPress site to display live articles
            </p>
          </motion.div>
        )}

      </div>
    </section>
  )
}