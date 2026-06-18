import { useState, useCallback, useRef } from 'react'
import { withRetry } from '../utils/retryHandler'

/**
 * Hook that wraps withRetry with React state for UI feedback.
 *
 * NOTE: For server-state fetching, prefer TanStack Query's built-in retry
 * (configured in lib/queryClient.js). Reserve this hook for imperative
 * operations that happen outside the query lifecycle (e.g. payment
 * initialisation, file uploads, form submissions).
 *
 * @param {object} config - withRetry options (maxRetries, initialDelay, …)
 */
export const useRetry = (config = {}) => {
  const [isRetrying, setIsRetrying]   = useState(false)
  const [retryCount, setRetryCount]   = useState(0)
  const [retryDelay, setRetryDelay]   = useState(0)

  // Stabilise config with a ref so it never re-creates executeWithRetry
  // even when the caller passes a new object literal on every render.
  const configRef = useRef(config)
  configRef.current = config

  const executeWithRetry = useCallback(async (fn) => {
    setIsRetrying(false)
    setRetryCount(0)

    try {
      const result = await withRetry(fn, {
        ...configRef.current,
        onRetry: (attempt, delay, error) => {
          setIsRetrying(true)
          setRetryCount(attempt)
          setRetryDelay(delay)
          configRef.current.onRetry?.(attempt, delay, error)
        }
      })

      setIsRetrying(false)
      return result
    } catch (error) {
      setIsRetrying(false)
      throw error
    }
  }, []) // stable — reads config through configRef

  const reset = useCallback(() => {
    setIsRetrying(false)
    setRetryCount(0)
    setRetryDelay(0)
  }, [])

  return { executeWithRetry, isRetrying, retryCount, retryDelay, reset }
}
