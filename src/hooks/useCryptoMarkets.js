import { useState, useEffect, useCallback, useRef } from 'react'
import { fetchCryptoMarkets } from '../services/coingecko'
import { POLLING_INTERVALS } from '../utils/constants'

export function useCryptoMarkets(currency = 'usd') {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const staleData = useRef(null)

  const load = useCallback(async () => {
    try {
      const result = await fetchCryptoMarkets(currency)
      setData(result)
      staleData.current = result
      setError(null)
    } catch (err) {
      setError(err.message)
      if (staleData.current) setData(staleData.current)
    } finally {
      setLoading(false)
    }
  }, [currency])

  useEffect(() => {
    setLoading(true)
    load()
    const interval = setInterval(load, POLLING_INTERVALS.CRYPTO_MARKETS)
    return () => clearInterval(interval)
  }, [load])

  return { data, loading, error }
}
