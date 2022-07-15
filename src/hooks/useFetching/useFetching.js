import { useState, useCallback } from 'react'

export function useFetching(callback) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetching = useCallback(async (...args) => {
    try {
      setLoading(true)
      callback.apply(null, args)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [callback])

  return [fetching, loading, error]
}
