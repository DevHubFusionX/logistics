import { useState, useEffect, useRef } from 'react'

const cache = new Map()
const CACHE_TIME = 5 * 60 * 1000 // 5 minutes

export const useApiCache = (key, fetcher, options = {}) => {
  const { cacheTime = CACHE_TIME, enabled = true } = options
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const abortControllerRef = useRef(null)

  useEffect(() => {
    if (!enabled) return

    const fetchData = async () => {
      const cacheKey = JSON.stringify(key)
      const cached = cache.get(cacheKey)

      // Return cached data if valid
      if (cached && Date.now() - cached.timestamp < cacheTime) {
        setData(cached.data)
        setIsLoading(false)
        return
      }

      // Abort previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }

      abortControllerRef.current = new AbortController()
      setIsLoading(true)
      setError(null)

      try {
        const result = await fetcher()
        cache.set(cacheKey, { data: result, timestamp: Date.now() })
        setData(result)
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err)
        }
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort()
      }
    }
  }, [JSON.stringify(key), enabled, cacheTime])

  const refetch = () => {
    const cacheKey = JSON.stringify(key)
    cache.delete(cacheKey)
    setIsLoading(true)
  }

  const invalidate = () => {
    const cacheKey = JSON.stringify(key)
    cache.delete(cacheKey)
  }

  return { data, isLoading, error, refetch, invalidate }
}

export const clearCache = () => {
  cache.clear()
}
