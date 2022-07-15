import { useState, useCallback } from 'react'

type returnedValues = [(...args: any[]) => Promise<void>, boolean, string | null]

export function useFetching(callback: (...args: any[]) => void): returnedValues {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetching = useCallback(async (...args: any[]) => {
    try {
      setLoading(true)
      callback.apply(args)
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setLoading(false)
    }
  }, [callback])

  return [fetching, loading, error]
}

// TODO: remove any type signature