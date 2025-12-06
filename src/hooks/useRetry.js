import { useState, useCallback } from 'react'
import { withRetry } from '../utils/retryHandler'
import { isRetryableError } from '../utils/errorCodes'

export const useRetry = (config = {}) => {
  const [isRetrying, setIsRetrying] = useState(false)
  const [retryCount, setRetryCount] = useState(0)
  const [retryDelay, setRetryDelay] = useState(0)

  const executeWithRetry = useCallback(async (fn) => {
    setIsRetrying(false)
    setRetryCount(0)
    
    try {
      const result = await withRetry(fn, {
        ...config,
        onRetry: (attempt, delay, error) => {
          setIsRetrying(true)
          setRetryCount(attempt)
          setRetryDelay(delay)
          
          if (config.onRetry) {
            config.onRetry(attempt, delay, error)
          }
        }
      })
      
      setIsRetrying(false)
      return result
    } catch (error) {
      setIsRetrying(false)
      throw error
    }
  }, [config])

  const reset = useCallback(() => {
    setIsRetrying(false)
    setRetryCount(0)
    setRetryDelay(0)
  }, [])

  return {
    executeWithRetry,
    isRetrying,
    retryCount,
    retryDelay,
    reset
  }
}
