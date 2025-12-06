// Retry mechanism for failed requests

const DEFAULT_RETRY_CONFIG = {
  maxRetries: 3,
  initialDelay: 1000,
  maxDelay: 10000,
  backoffMultiplier: 2,
  timeout: 30000
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const calculateDelay = (attempt, config = DEFAULT_RETRY_CONFIG) => {
  const delay = config.initialDelay * Math.pow(config.backoffMultiplier, attempt - 1)
  return Math.min(delay, config.maxDelay)
}

export const withRetry = async (fn, config = {}) => {
  const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...config }
  let lastError
  
  for (let attempt = 1; attempt <= retryConfig.maxRetries; attempt++) {
    try {
      // Add timeout wrapper
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Request timeout')), retryConfig.timeout)
      )
      
      const result = await Promise.race([fn(), timeoutPromise])
      return result
    } catch (error) {
      lastError = error
      
      // Don't retry on last attempt
      if (attempt === retryConfig.maxRetries) break
      
      // Check if error is retryable
      const isRetryable = shouldRetry(error)
      if (!isRetryable) break
      
      // Calculate delay and wait
      const delay = calculateDelay(attempt, retryConfig)
      await sleep(delay)
      
      // Call onRetry callback if provided
      if (config.onRetry) {
        config.onRetry(attempt, delay, error)
      }
    }
  }
  
  throw lastError
}

export const shouldRetry = (error) => {
  // Network errors
  if (!navigator.onLine) return true
  if (error.name === 'TypeError' && error.message.includes('fetch')) return true
  if (error.message?.includes('timeout')) return true
  if (error.message?.includes('network')) return true
  
  // HTTP status codes that should be retried
  const status = error.status || error.response?.status
  if (status === 408) return true // Request Timeout
  if (status === 429) return true // Too Many Requests
  if (status >= 500 && status < 600) return true // Server errors
  
  return false
}

export const createRetryableRequest = (requestFn, config = {}) => {
  return (...args) => withRetry(() => requestFn(...args), config)
}
