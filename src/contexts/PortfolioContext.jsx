import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const PortfolioContext = createContext()
const STORAGE_KEY = 'manual_portfolio'

function loadFromStorage() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY))
    if (Array.isArray(stored)) return stored
  } catch {}
  return []
}

function saveToStorage(holdings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(holdings))
}

export function PortfolioProvider({ children }) {
  const [holdings, setHoldings] = useState(loadFromStorage)

  useEffect(() => {
    saveToStorage(holdings)
  }, [holdings])

  const addHolding = useCallback((coinId, symbol, quantity, exchange) => {
    setHoldings(prev => {
      const existing = prev.find(h => h.coinId === coinId && h.exchange === exchange)
      if (existing) {
        return prev.map(h =>
          h.coinId === coinId && h.exchange === exchange
            ? { ...h, quantity: h.quantity + quantity }
            : h
        )
      }
      return [...prev, { coinId, symbol, quantity, exchange, addedAt: Date.now() }]
    })
  }, [])

  const removeHolding = useCallback((coinId, exchange) => {
    setHoldings(prev => prev.filter(h => !(h.coinId === coinId && h.exchange === exchange)))
  }, [])

  const updateHolding = useCallback((coinId, exchange, quantity) => {
    setHoldings(prev =>
      prev.map(h =>
        h.coinId === coinId && h.exchange === exchange ? { ...h, quantity } : h
      )
    )
  }, [])

  const clearPortfolio = useCallback(() => {
    setHoldings([])
  }, [])

  return (
    <PortfolioContext.Provider value={{ holdings, addHolding, removeHolding, updateHolding, clearPortfolio }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  const context = useContext(PortfolioContext)
  if (!context) throw new Error('usePortfolio must be used within a PortfolioProvider')
  return context
}
