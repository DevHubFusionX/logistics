import { useState, useEffect, useCallback } from 'react'

export function useApi(apiFunction, params = null, immediate = true) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const execute = useCallback(async (executeParams = params) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiFunction(executeParams)
      setData(response.data || response)
      return response
    } catch (err) {
      setError(err.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunction, params])

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [immediate, execute])

  const refetch = useCallback(() => execute(), [execute])

  return { data, loading, error, execute, refetch }
}

export function useMutation(apiFunction) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const mutate = useCallback(async (data) => {
    try {
      setLoading(true)
      setError(null)
      const response = await apiFunction(data)
      return response
    } catch (err) {
      setError(err.message || 'An error occurred')
      throw err
    } finally {
      setLoading(false)
    }
  }, [apiFunction])

  return { mutate, loading, error }
}
