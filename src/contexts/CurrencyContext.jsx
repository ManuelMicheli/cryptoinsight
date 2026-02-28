import { createContext, useContext, useState } from 'react'

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState('usd')

  const toggleCurrency = () => setCurrency(prev => prev === 'usd' ? 'eur' : 'usd')

  return (
    <CurrencyContext.Provider value={{ currency, toggleCurrency }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}
