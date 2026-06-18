// WordPress.com Public API Configuration for daraexpress.wordpress.com
// Uses the WordPress.com REST API v1.1 (public, no auth needed for published posts)

const SITE_DOMAIN = 'daraexpress.wordpress.com'
const API_BASE = `https://public-api.wordpress.com/rest/v1.1/sites/${SITE_DOMAIN}`

// Simple in-memory cache
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const CACHE_MAX_SIZE = 100            // max entries before LRU eviction

function getCached(key) {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data
  }
  cache.delete(key)
  return null
}

function setCache(key, data) {
  // Evict oldest entry when cap is reached
  if (cache.size >= CACHE_MAX_SIZE) {
    const oldestKey = cache.keys().next().value
    cache.delete(oldestKey)
  }
  cache.set(key, { data, timestamp: Date.now() })
}

/**
 * Transform a WordPress.com API post object into our normalized format.
 * The WP.com v1.1 API returns a different structure than the self-hosted WP REST API v2.
 */
function transformPost(post) {
  // Extract category names from the categories object
  const categories = post.categories
    ? Object.keys(post.categories)
    : ['Uncategorized']

  // Extract tag names
  const tags = post.tags
    ? Object.keys(post.tags)
    : []

  return {
    id: post.ID,
    title: post.title || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    featured_image: post.featured_image || post.post_thumbnail?.URL || '',
    date: post.date,
    slug: post.slug,
    url: post.URL,
    author: {
      name: post.author?.name || 'Dara Express',
      avatar: post.author?.avatar_URL || '',
      firstName: post.author?.first_name || '',
      lastName: post.author?.last_name || '',
    },
    categories,
    tags,
    likeCount: post.like_count || 0,
    commentCount: post.discussion?.comment_count || 0,
  }
}

/**
 * Strip HTML tags from a string
 */
export function stripHtml(html) {
  if (!html) return ''
  const tmp = document.createElement('div')
  tmp.innerHTML = html
  return tmp.textContent || tmp.innerText || ''
}

/**
 * Calculate estimated read time in minutes
 */
export function calculateReadTime(htmlContent) {
  const wordsPerMinute = 200
  const words = stripHtml(htmlContent).split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / wordsPerMinute))
}

/**
 * Format a date string for display
 */
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

// WordPress.com API service
export const wordpressApi = {

  /**
   * Fetch published posts.
   * @param {Object} options
   * @param {number} options.number - Number of posts to fetch (default 6)
   * @param {number} options.page - Page number for pagination (default 1)
   * @param {string} options.category - Filter by category slug
   * @param {string} options.tag - Filter by tag slug
   * @param {string} options.search - Search term
   * @param {string} options.order_by - Order by field (default 'date')
   * @returns {Promise<{ posts: Array, total: number, hasMore: boolean }>}
   */
  async getPosts({
    number = 6,
    page = 1,
    category,
    tag,
    search,
    order_by = 'date',
  } = {}) {
    const params = new URLSearchParams({
      number: String(number),
      page: String(page),
      order_by,
      status: 'publish',
    })

    if (category) params.set('category', category)
    if (tag) params.set('tag', tag)
    if (search) params.set('search', search)

    const cacheKey = `posts:${params.toString()}`
    const cached = getCached(cacheKey)
    if (cached) return cached

    const url = `${API_BASE}/posts/?${params.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    const result = {
      posts: (data.posts || []).map(transformPost),
      total: data.found || 0,
      hasMore: (data.found || 0) > page * number,
    }

    setCache(cacheKey, result)
    return result
  },

  /**
   * Fetch a single post by slug.
   * @param {string} slug
   * @returns {Promise<Object|null>}
   */
  async getPostBySlug(slug) {
    const cacheKey = `post:${slug}`
    const cached = getCached(cacheKey)
    if (cached) return cached

    const url = `${API_BASE}/posts/slug:${encodeURIComponent(slug)}`
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const post = transformPost(data)

    setCache(cacheKey, post)
    return post
  },

  /**
   * Fetch all categories for the site.
   * @returns {Promise<Array<{ id: number, name: string, slug: string, postCount: number }>>}
   */
  async getCategories() {
    const cacheKey = 'categories'
    const cached = getCached(cacheKey)
    if (cached) return cached

    const url = `${API_BASE}/categories/?number=100`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()

    const categories = (data.categories || []).map(cat => ({
      id: cat.ID,
      name: cat.name,
      slug: cat.slug,
      postCount: cat.post_count || 0,
    }))

    setCache(cacheKey, categories)
    return categories
  },

  /**
   * Clear all cached data.
   */
  clearCache() {
    cache.clear()
  },
}

export default wordpressApi