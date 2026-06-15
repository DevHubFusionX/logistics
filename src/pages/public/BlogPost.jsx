import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Calendar, User, Clock, ArrowLeft, Tag, MessageCircle, Heart, Share2 } from 'lucide-react'
import { wordpressApi, stripHtml, formatDate, calculateReadTime } from '../../services/wordpressService'

export default function BlogPost() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [relatedPosts, setRelatedPosts] = useState([])

  useEffect(() => {
    async function fetchPost() {
      setLoading(true)
      setError(null)
      try {
        const data = await wordpressApi.getPostBySlug(slug)
        if (data) {
          setPost(data)
          // Fetch related posts (latest excluding current)
          try {
            const { posts } = await wordpressApi.getPosts({ number: 3 })
            setRelatedPosts(posts.filter(p => p.id !== data.id).slice(0, 3))
          } catch {
            // Silently fail for related posts
          }
        } else {
          setError('Post not found')
        }
      } catch (err) {
        console.error('Failed to fetch post:', err)
        setError('Failed to load article')
      } finally {
        setLoading(false)
      }
    }

    fetchPost()
    window.scrollTo(0, 0)
  }, [slug])

  // Loading skeleton
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl">
            <div className="animate-pulse space-y-6">
              <div className="h-4 bg-slate-200 rounded w-32" />
              <div className="h-12 bg-slate-200 rounded w-3/4" />
              <div className="flex gap-4">
                <div className="h-4 bg-slate-200 rounded w-24" />
                <div className="h-4 bg-slate-200 rounded w-24" />
                <div className="h-4 bg-slate-200 rounded w-24" />
              </div>
              <div className="h-80 bg-slate-200 rounded-3xl" />
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-5/6" />
                <div className="h-4 bg-slate-200 rounded w-4/6" />
                <div className="h-4 bg-slate-200 rounded w-full" />
                <div className="h-4 bg-slate-200 rounded w-3/4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Error state
  if (error || !post) {
    return (
      <div className="min-h-screen bg-slate-50">
        <div className="pt-32 pb-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-7xl mb-6">📄</div>
              <h1 className="text-4xl font-bold text-slate-900 mb-4">
                {error === 'Post not found' ? 'Article Not Found' : 'Something Went Wrong'}
              </h1>
              <p className="text-lg text-slate-600 mb-8">
                {error === 'Post not found'
                  ? "The article you're looking for doesn't exist or has been removed."
                  : 'We had trouble loading this article. Please try again later.'}
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#0056B8] text-white rounded-sm font-bold hover:bg-[#004cba] transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  const readTime = calculateReadTime(post.content || post.excerpt)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Article Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-4xl">
          {/* Back link */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="mb-8"
          >
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-[#0056B8] transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Categories */}
          {post.categories.length > 0 && post.categories[0] !== 'Uncategorized' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-wrap gap-2 mb-6"
            >
              {post.categories.map(cat => (
                <span
                  key={cat}
                  className="px-3 py-1 bg-blue-100 text-[#0056B8] text-xs font-bold rounded-sm uppercase tracking-wider"
                >
                  {cat}
                </span>
              ))}
            </motion.div>
          )}

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6"
          >
            {stripHtml(post.title)}
          </motion.h1>

          {/* Meta */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap items-center gap-6 mb-8"
          >
            {/* Author */}
            <div className="flex items-center gap-3">
              {post.author.avatar ? (
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-12 h-12 rounded-full object-cover ring-2 ring-white shadow-md"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center ring-2 ring-white shadow-md">
                  <User className="w-6 h-6 text-[#0056B8]" />
                </div>
              )}
              <div>
                <div className="font-bold text-slate-900">{post.author.name}</div>
                <div className="text-sm text-slate-500">Author</div>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-slate-200" />

            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Calendar className="w-4 h-4" />
              {formatDate(post.date)}
            </div>

            <div className="flex items-center gap-1.5 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              {readTime} min read
            </div>

            {post.likeCount > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <Heart className="w-4 h-4" />
                {post.likeCount} likes
              </div>
            )}

            {post.commentCount > 0 && (
              <div className="flex items-center gap-1.5 text-sm text-slate-500">
                <MessageCircle className="w-4 h-4" />
                {post.commentCount} comments
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Featured Image */}
      {post.featured_image && (
        <section className="pb-12 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                src={post.featured_image}
                alt={stripHtml(post.title)}
                className="w-full h-auto max-h-[500px] object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="pb-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl shadow-xl p-8 sm:p-12 lg:p-16"
          >
            {/* WordPress content rendered as HTML */}
            <div
              className="prose prose-lg prose-slate max-w-none
                prose-headings:font-extrabold prose-headings:text-slate-900
                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-4
                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-[#0056B8] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                prose-blockquote:border-l-[#0056B8] prose-blockquote:bg-blue-50 prose-blockquote:rounded-r-xl prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic
                prose-code:bg-slate-100 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm
                prose-pre:bg-slate-900 prose-pre:rounded-2xl
                prose-ul:space-y-2 prose-ol:space-y-2
                prose-li:text-slate-700
                prose-strong:text-slate-900
                prose-hr:border-slate-200"
              dangerouslySetInnerHTML={{ __html: post.content || '<p>This article has no content yet.</p>' }}
            />

            {/* Tags */}
            {post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-semibold text-slate-500">Tags</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-3 py-1.5 bg-slate-100 text-slate-600 text-sm font-medium rounded-sm hover:bg-slate-200 transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Share + Original link */}
            <div className="mt-8 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#0056B8] hover:text-[#004cba] transition-colors"
              >
                <Share2 className="w-4 h-4" />
                View on WordPress
              </a>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href)
                  alert('Link copied to clipboard!')
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 rounded-sm text-sm font-semibold hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                Copy Link
              </button>
            </div>
          </motion.article>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="pb-20 px-6">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-8 text-center">
              More Articles
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((rp, index) => (
                <motion.article
                  key={rp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  <div className="relative overflow-hidden h-48">
                    {rp.featured_image ? (
                      <img
                        src={rp.featured_image}
                        alt={stripHtml(rp.title)}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-400 to-sky-600 flex items-center justify-center">
                        <span className="text-white/30 text-[80px] font-black leading-none">
                          {stripHtml(rp.title).charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-[#0056B8] transition-colors line-clamp-2">
                      {stripHtml(rp.title)}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                      {stripHtml(rp.excerpt).substring(0, 120)}
                    </p>
                    <Link
                      to={`/blog/${rp.slug}`}
                      className="text-[#0056B8] text-sm font-semibold hover:text-[#004cba] transition-colors"
                    >
                      Read More →
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
