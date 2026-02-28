import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchFearGreedIndex } from '../services/feargreed'
import { POLLING_INTERVALS } from '../utils/constants'

export function useFearGreed() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const staleData = useRef(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchFearGreedIndex()
      setData(result)
      staleData.current = result
      setError(null)
    } catch (err) {
      setError(err.message)
      if (staleData.current) setData(staleData.current)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
    const interval = setInterval(load, POLLING_INTERVALS.FEAR_GREED)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error }
}
