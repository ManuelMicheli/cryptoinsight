import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchGlobalData } from '../services/coingecko'
import { POLLING_INTERVALS } from '../utils/constants'

export function useGlobalData() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const staleData = useRef(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchGlobalData()
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
    const interval = setInterval(load, POLLING_INTERVALS.GLOBAL_DATA)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error }
}
