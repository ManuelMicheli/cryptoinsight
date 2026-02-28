import { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react'
import { fetchCryptoMarkets, fetchGlobalData } from '../services/coingecko'
import { fetchFearGreedIndex } from '../services/feargreed'
import { useCurrency } from './CurrencyContext'
import { POLLING_INTERVALS } from '../utils/constants'
import { mockCoins, mockGlobalData, mockFearGreed } from '../data/mockCryptoData'

const CryptoDataContext = createContext()

export function CryptoDataProvider({ children }) {
  const { currency } = useCurrency()

  const [coins, setCoins] = useState(null)
  const [coinsLoading, setCoinsLoading] = useState(true)
  const [coinsError, setCoinsError] = useState(null)

  const [globalData, setGlobalData] = useState(null)
  const [globalLoading, setGlobalLoading] = useState(true)

  const [fearGreed, setFearGreed] = useState(null)
  const [fearGreedLoading, setFearGreedLoading] = useState(true)

  const [lastUpdated, setLastUpdated] = useState(null)

  const staleCoins = useRef(null)
  const staleGlobal = useRef(null)
  const staleFearGreed = useRef(null)
  const isFirstFetch = useRef(true)

  // --- Coins + Global (depend on currency) ---
  const loadCoinsAndGlobal = useCallback(async () => {
    const isFirst = isFirstFetch.current
    if (isFirst) {
      setCoinsLoading(true)
      setGlobalLoading(true)
    }

    // Fetch both in parallel
    const [coinsResult, globalResult] = await Promise.allSettled([
      fetchCryptoMarkets(currency),
      fetchGlobalData(),
    ])

    // Handle coins
    if (coinsResult.status === 'fulfilled') {
      setCoins(coinsResult.value)
      staleCoins.current = coinsResult.value
      setCoinsError(null)
      setLastUpdated(new Date())
    } else {
      setCoinsError(coinsResult.reason?.message || 'Failed to fetch crypto data')
      setCoins(staleCoins.current || mockCoins)
    }

    // Handle global
    if (globalResult.status === 'fulfilled') {
      setGlobalData(globalResult.value)
      staleGlobal.current = globalResult.value
    } else {
      setGlobalData(staleGlobal.current || mockGlobalData)
    }

    if (isFirst) {
      setCoinsLoading(false)
      setGlobalLoading(false)
      isFirstFetch.current = false
    }
  }, [currency])

  // --- Fear & Greed (independent from currency) ---
  const loadFearGreed = useCallback(async () => {
    try {
      const result = await fetchFearGreedIndex()
      setFearGreed(result)
      staleFearGreed.current = result
    } catch {
      setFearGreed(staleFearGreed.current || mockFearGreed)
    } finally {
      setFearGreedLoading(false)
    }
  }, [])

  // Coins + Global: fetch on mount + poll every 2min + refetch on currency change
  useEffect(() => {
    isFirstFetch.current = true
    loadCoinsAndGlobal()
    const interval = setInterval(loadCoinsAndGlobal, POLLING_INTERVALS.CRYPTO_MARKETS)
    return () => clearInterval(interval)
  }, [loadCoinsAndGlobal])

  // Fear & Greed: fetch on mount + poll every 5min (no currency dependency)
  useEffect(() => {
    loadFearGreed()
    const interval = setInterval(loadFearGreed, POLLING_INTERVALS.FEAR_GREED)
    return () => clearInterval(interval)
  }, [loadFearGreed])

  const value = {
    coins,
    coinsLoading,
    coinsError,
    globalData,
    globalLoading,
    fearGreed,
    fearGreedLoading,
    lastUpdated,
  }

  return (
    <CryptoDataContext.Provider value={value}>
      {children}
    </CryptoDataContext.Provider>
  )
}

export function useCryptoData() {
  const ctx = useContext(CryptoDataContext)
  if (!ctx) throw new Error('useCryptoData must be used within CryptoDataProvider')
  return ctx
}
