import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight, Clock, Search, Loader2 } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { wordpressApi, stripHtml, formatDate, calculateReadTime } from '@/services/wordpressService'
import SEO from '@/components/common/SEO'

// Fallback data for when WordPress API is unavailable
const fallbackPosts = [
  {
    id: 1,
    title: 'Best Practices for Pharmaceutical Cold Chain Management',
    excerpt: 'Learn essential strategies for maintaining temperature integrity throughout the pharmaceutical supply chain.',
    featured_image: '/assets/img/service-1.jpg',
    author: { name: 'Dr. Adebayo Okonkwo', avatar: '' },
    date: '2024-01-15T10:00:00',
    content: 'Learn essential strategies for maintaining temperature integrity throughout the pharmaceutical supply chain in Nigeria.',
    slug: 'pharmaceutical-cold-chain',
    categories: ['Best Practices'],
  },
  {
    id: 2,
    title: 'Understanding WHO Guidelines for Cold Chain Logistics',
    excerpt: 'A comprehensive guide to World Health Organization standards for temperature-controlled distribution.',
    featured_image: '/assets/img/pharmaceutical.jpg',
    author: { name: 'Chioma Nwosu', avatar: '' },
    date: '2024-01-12T14:30:00',
    content: 'A comprehensive guide to World Health Organization standards for temperature-controlled distribution.',
    slug: 'who-guidelines-cold-chain',
    categories: ['Compliance'],
  },
  {
    id: 3,
    title: 'The Future of Cold Chain Technology in Nigeria',
    excerpt: 'Exploring emerging technologies transforming pharmaceutical logistics across Africa.',
    featured_image: '/assets/img/enterprise.jpg',
    author: { name: 'Ibrahim Yusuf', avatar: '' },
    date: '2024-01-10T09:15:00',
    content: 'Exploring emerging technologies transforming pharmaceutical logistics across Africa.',
    slug: 'cold-chain-technology-nigeria',
    categories: ['Technology'],
  },
]

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email.trim()) return
    setStatus('loading')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY,
          subject: 'New Newsletter Subscriber — Dara Resources',
          from_name: 'Dara Resources Newsletter',
          message: `New subscriber: ${email}`,
        }),
      })
      const data = await res.json()
      if (!data.success) throw new Error('Failed')
      setStatus('success')
      setEmail('')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className="font-body-unique text-white/80 text-sm font-semibold">
        ✓ You're subscribed. Expect your first edition soon.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="font-body-unique flex-1 px-5 py-3 rounded-sm bg-white text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="font-body-unique px-6 py-3 bg-white/15 hover:bg-white/25 border border-white/30 text-white text-sm font-bold rounded-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
      >
        {status === 'loading' ? 'Sending…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="font-body-unique text-white/60 text-xs mt-1">Something went wrong. Try again.</p>
      )}
    </form>
  )
}

export default function Blog() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [categories, setCategories] = useState(['All'])
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [loadingMore, setLoadingMore] = useState(false)

  // Fetch categories on mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const cats = await wordpressApi.getCategories()
        const catNames = cats
          .filter(c => c.postCount > 0)
          .map(c => c.name)
        setCategories(['All', ...catNames])
      } catch {
        // Silently fail — categories from posts will be used
      }
    }
    fetchCategories()
  }, [])

  // Fetch posts
  useEffect(() => {
    async function fetchPosts() {
      setLoading(true)
      setError(null)
      try {
        const params = { number: 9, page: 1 }
        if (selectedCategory !== 'All') {
          params.category = selectedCategory
        }
        if (searchTerm.trim()) {
          params.search = searchTerm.trim()
        }

        const { posts: wpPosts, hasMore: more } = await wordpressApi.getPosts(params)

        if (wpPosts.length > 0) {
          setPosts(wpPosts)
          setHasMore(more)
        } else if (!searchTerm.trim() && selectedCategory === 'All') {
          // No posts at all — use fallback
          setPosts(fallbackPosts)
          setError('demo')
        } else {
          setPosts([])
        }
        setPage(1)
      } catch (err) {
        console.warn('WordPress API failed:', err.message)
        setPosts(fallbackPosts)
        setError('demo')
      } finally {
        setLoading(false)
      }
    }
    fetchPosts()
  }, [selectedCategory, searchTerm])

  // Load more posts
  async function loadMore() {
    setLoadingMore(true)
    try {
      const nextPage = page + 1
      const params = { number: 9, page: nextPage }
      if (selectedCategory !== 'All') params.category = selectedCategory
      if (searchTerm.trim()) params.search = searchTerm.trim()

      const { posts: morePosts, hasMore: more } = await wordpressApi.getPosts(params)
      setPosts(prev => [...prev, ...morePosts])
      setHasMore(more)
      setPage(nextPage)
    } catch (err) {
      console.warn('Failed to load more:', err.message)
    } finally {
      setLoadingMore(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <SEO
        title="Dara Resources — Cold Chain Logistics Insights Nigeria"
        description="Expert insights on cold chain logistics Nigeria, pharma transport, frozen food haulage, and refrigerated trucking from Darafort— Nigeria's #1 reefer truck company."
        keywords="cold chain logistics blog Nigeria, pharma logistics insights, frozen food transport blog, reefer trucks Nigeria news, logistics company Nigeria articles, cold chain best practices"
        canonical="/blog"
        breadcrumbs={[{ name: 'Resources', url: '/blog' }]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'Blog',
          'name': 'DarafortCold Chain Knowledge Hub',
          'description': 'Expert insights on cold chain logistics, pharma transport, frozen food haulage and reefer trucking across Nigeria.',
          'url': 'https://daraexpress.com/blog',
          'publisher': {
            '@type': 'Organization',
            'name': 'Dara Express',
            'logo': { '@type': 'ImageObject', 'url': 'https://daraexpress.com/og-image.png?v=2' }
          }
        }}
      />
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-6xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0056B8] text-white rounded-sm mb-6"
          >
            <span className="text-sm font-semibold">Insights & Updates</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl lg:text-6xl font-extrabold text-slate-900 mb-6"
          >
            Resources
            <span className="block mt-2 bg-gradient-to-r from-[#0056B8] to-cyan-600 bg-clip-text text-transparent">
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

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-lg mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white rounded-sm text-slate-900 border border-slate-200 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 shadow-sm transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-2.5 rounded-sm font-semibold transition-all cursor-pointer ${selectedCategory === cat
                    ? 'bg-[#0056B8] text-white shadow-lg'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Loading State */}
      {loading && (
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map(i => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-lg">
                  <div className="h-56 bg-slate-200" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 bg-slate-200 rounded w-3/4" />
                    <div className="h-4 bg-slate-200 rounded w-full" />
                    <div className="h-4 bg-slate-200 rounded w-2/3" />
                    <div className="flex items-center gap-3 mt-4">
                      <div className="w-10 h-10 bg-slate-200 rounded-full" />
                      <div className="space-y-1.5 flex-1">
                        <div className="h-3 bg-slate-200 rounded w-24" />
                        <div className="h-3 bg-slate-200 rounded w-32" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* No results */}
      {!loading && posts.length === 0 && (
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-6xl text-center py-20">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-600">
                {searchTerm ? `No results for "${searchTerm}"` : 'No posts in this category yet.'}
              </p>
              <button
                onClick={() => { setSearchTerm(''); setSelectedCategory('All') }}
                className="mt-6 px-6 py-3 bg-[#0056B8] text-white rounded-sm font-semibold hover:bg-[#004cba] transition-colors cursor-pointer"
              >
                View all articles
              </button>
            </motion.div>
          </div>
        </section>
      )}

      {/* Featured Post */}
      {!loading && posts.length > 0 && (
        <section className="pb-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-96 lg:h-auto">
                  {posts[0].featured_image ? (
                    <img
                      src={posts[0].featured_image}
                      alt={stripHtml(posts[0].title)}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/assets/img/service-1.jpg' }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500 to-sky-700 flex items-center justify-center min-h-[300px]">
                      <span className="text-white/30 text-[120px] font-black leading-none">
                        {stripHtml(posts[0].title).charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-[#0056B8] text-white text-sm font-bold rounded-sm">
                    Featured
                  </div>
                </div>
                <div className="p-12 flex flex-col justify-center">
                  {posts[0].categories[0] && posts[0].categories[0] !== 'Uncategorized' && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-[#0056B8] rounded-sm text-sm font-semibold mb-4 w-fit">
                      {posts[0].categories[0]}
                    </div>
                  )}
                  <h2 className="text-4xl font-bold text-slate-900 mb-4">
                    {stripHtml(posts[0].title)}
                  </h2>
                  <p className="text-lg text-slate-600 mb-6">
                    {stripHtml(posts[0].excerpt).substring(0, 200) || 'Read the full article...'}
                  </p>
                  <div className="flex items-center gap-4 mb-6">
                    {posts[0].author.avatar ? (
                      <img
                        src={posts[0].author.avatar}
                        alt={posts[0].author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        <User className="w-6 h-6 text-[#0056B8]" />
                      </div>
                    )}
                    <div>
                      <div className="font-semibold text-slate-900">{posts[0].author.name}</div>
                      <div className="flex items-center gap-3 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(posts[0].date)}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {calculateReadTime(posts[0].content || posts[0].excerpt)} min read
                        </span>
                      </div>
                    </div>
                  </div>
                  <Link
                    to={`/blog/${posts[0].slug}`}
                    className="flex items-center gap-2 text-[#0056B8] font-bold hover:gap-3 transition-all w-fit"
                  >
                    Read Full Article
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Blog Grid */}
      {!loading && posts.length > 1 && (
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.slice(1).map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative overflow-hidden h-56">
                    {post.featured_image ? (
                      <img
                        src={post.featured_image}
                        alt={stripHtml(post.title)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => { e.target.src = '/assets/img/service-1.jpg' }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-sky-600 flex items-center justify-center">
                        <span className="text-white/30 text-[80px] font-black leading-none">
                          {stripHtml(post.title).charAt(0)}
                        </span>
                      </div>
                    )}
                    {post.categories[0] && post.categories[0] !== 'Uncategorized' && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold rounded-sm">
                        {post.categories[0]}
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#0056B8] transition-colors line-clamp-2">
                      {stripHtml(post.title)}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {stripHtml(post.excerpt).substring(0, 150) || 'Read the full article...'}
                    </p>

                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-100">
                      {post.author.avatar ? (
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-[#0056B8]" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-slate-900 truncate">{post.author.name}</div>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>{formatDate(post.date)}</span>
                          <span>•</span>
                          <span>{calculateReadTime(post.content || post.excerpt)} min read</span>
                        </div>
                      </div>
                    </div>

                    <Link
                      to={`/blog/${post.slug}`}
                      className="flex items-center gap-2 text-[#0056B8] font-semibold text-sm group-hover:gap-3 transition-all"
                    >
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Load More */}
            {hasMore && (
              <div className="text-center mt-12">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="px-8 py-4 bg-[#0056B8] text-white rounded-sm font-bold hover:bg-[#004cba] transition-all shadow-lg hover:shadow-xl disabled:opacity-60 disabled:cursor-not-allowed inline-flex items-center gap-2 cursor-pointer"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Articles'
                  )}
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Demo notice */}
      {error === 'demo' && (
        <div className="text-center pb-8">
          <p className="text-xs text-slate-400 bg-slate-100 px-4 py-2 rounded-lg inline-block">
            Showing demo content • Publish posts on your WordPress blog to see them here
          </p>
        </div>
      )}

      {/* Newsletter CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#0056B8] rounded-3xl p-8 sm:p-12 lg:p-14 text-white text-left relative overflow-hidden shadow-xl"
          >
            <div className="max-w-xl">
              <p className="font-body-unique text-blue-300 font-bold text-xs tracking-[0.2em] uppercase mb-4">Newsletter</p>
              <h2 className="font-heading-unique font-extrabold text-white text-2xl sm:text-3xl mb-3 leading-tight">
                Stay ahead of the cold chain.
              </h2>
              <p className="font-body-unique text-white/70 text-sm leading-relaxed mb-8">
                Expert insights on pharma transport, reefer tech, and cold chain best practices — straight to your inbox.
              </p>
              <NewsletterForm />
            </div>

            {/* Decorative circle */}
            <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none scale-110 translate-x-12 translate-y-12">
              <svg className="w-80 h-80 text-white" viewBox="0 0 100 100" fill="none">
                <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="28" stroke="currentColor" strokeWidth="1" />
                <circle cx="50" cy="50" r="16" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
              </svg>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
