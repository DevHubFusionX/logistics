// WordPress Self-Hosted REST API v2 for resources.daraexpress.com
// Public endpoint — no authentication required for published posts

const API_BASE = 'https://resources.daraexpress.com/wp-json/wp/v2'

// Simple in-memory cache
const cache = new Map()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
const CACHE_MAX_SIZE = 100

function getCached(key) {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.timestamp < CACHE_DURATION) {
    return entry.data
  }
  cache.delete(key)
  return null
}

function setCache(key, data) {
  if (cache.size >= CACHE_MAX_SIZE) {
    const oldestKey = cache.keys().next().value
    cache.delete(oldestKey)
  }
  cache.set(key, { data, timestamp: Date.now() })
}

/**
 * Transform a WP REST API v2 post object into our normalized format.
 */
function transformPost(post, categoriesMap = {}) {
  const categoryNames = (post.categories || []).map(
    (id) => categoriesMap[id] || 'News'
  )

  return {
    id: post.id,
    title: post.title?.rendered || '',
    excerpt: post.excerpt?.rendered || '',
    content: post.content?.rendered || '',
    featured_image:
      post._embedded?.['wp:featuredmedia']?.[0]?.source_url ||
      post.jetpack_featured_media_url ||
      '',
    date: post.date,
    slug: post.slug,
    url: post.link,
    author: {
      name:
        post._embedded?.author?.[0]?.name ||
        'Dara Express',
      avatar:
        post._embedded?.author?.[0]?.avatar_urls?.['96'] || '',
    },
    categories: categoryNames.length ? categoryNames : ['News'],
    tags: [],
    likeCount: 0,
    commentCount: post.comment_count || 0,
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

// Fetch and cache category map: { id → name }
async function getCategoryMap() {
  const cacheKey = 'category-map'
  const cached = getCached(cacheKey)
  if (cached) return cached

  const res = await fetch(`${API_BASE}/categories?per_page=100`)
  if (!res.ok) return {}
  const data = await res.json()
  const map = {}
  for (const cat of data) {
    map[cat.id] = cat.name
  }
  setCache(cacheKey, map)
  return map
}

// WordPress API service
export const wordpressApi = {

  /**
   * Fetch published posts.
   */
  async getPosts({
    number = 6,
    page = 1,
    category,
    search,
  } = {}) {
    const params = new URLSearchParams({
      per_page: String(number),
      page: String(page),
      status: 'publish',
      _embed: '1',
    })

    if (search) params.set('search', search)

    // If filtering by category name, look up its ID first
    if (category && category !== 'All') {
      try {
        const catMap = await getCategoryMap()
        const catId = Object.entries(catMap).find(
          ([, name]) => name.toLowerCase() === category.toLowerCase()
        )?.[0]
        if (catId) params.set('categories', catId)
      } catch { /* ignore */ }
    }

    const cacheKey = `posts:${params.toString()}`
    const cached = getCached(cacheKey)
    if (cached) return cached

    const catMap = await getCategoryMap()
    const url = `${API_BASE}/posts?${params.toString()}`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    const totalPosts = parseInt(response.headers.get('X-WP-Total') || '0', 10)
    const data = await response.json()

    const result = {
      posts: (data || []).map((p) => transformPost(p, catMap)),
      total: totalPosts,
      hasMore: totalPosts > page * number,
    }

    setCache(cacheKey, result)
    return result
  },

  /**
   * Fetch a single post by slug.
   */
  async getPostBySlug(slug) {
    const cacheKey = `post:${slug}`
    const cached = getCached(cacheKey)
    if (cached) return cached

    const catMap = await getCategoryMap()
    const url = `${API_BASE}/posts?slug=${encodeURIComponent(slug)}&_embed=1`
    const response = await fetch(url)

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    if (!data || data.length === 0) return null

    const post = transformPost(data[0], catMap)
    setCache(cacheKey, post)
    return post
  },

  /**
   * Fetch all categories.
   */
  async getCategories() {
    const cacheKey = 'categories'
    const cached = getCached(cacheKey)
    if (cached) return cached

    const url = `${API_BASE}/categories?per_page=100`
    const response = await fetch(url)

    if (!response.ok) {
      throw new Error(`WordPress API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    const categories = (data || []).map((cat) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
      postCount: cat.count || 0,
    }))

    setCache(cacheKey, categories)
    return categories
  },

  clearCache() {
    cache.clear()
  },
}

export default wordpressApi