import { useMemo } from 'react'
import { motion } from 'motion/react'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { cryptoMeta } from '../../data/cryptoMeta'
import { formatCurrency, formatPercentage } from '../../utils/formatters'

export default function TrendingBar() {
  const { coins } = useCryptoData()
  const { currency } = useCurrency()
  const { lang } = useLanguage()

  const trending = useMemo(() => {
    if (!coins || coins.length === 0) return []
    return [...coins]
      .sort((a, b) => Math.abs(b.price_change_percentage_24h_in_currency || 0) - Math.abs(a.price_change_percentage_24h_in_currency || 0))
      .slice(0, 5)
  }, [coins])

  if (trending.length === 0) return null

  // Double for marquee effect
  const doubled = [...trending, ...trending]

  return (
    <div className="overflow-hidden py-4">
      <p className="text-center text-text-secondary text-xs uppercase tracking-wider mb-3">
        {lang === 'it' ? '🔥 Trending 24h' : '🔥 Trending 24h'}
      </p>
      <motion.div
        className="flex gap-6 whitespace-nowrap"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((coin, i) => {
          const meta = cryptoMeta[coin.id]
          const change = coin.price_change_percentage_24h_in_currency || 0
          const isUp = change >= 0

          return (
            <div key={`${coin.id}-${i}`} className="flex items-center gap-3 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/5">
              {coin.image && <img src={coin.image} alt="" className="w-5 h-5 rounded-full" />}
              <span className="text-text-primary text-sm font-medium">{meta?.ticker || coin.symbol?.toUpperCase()}</span>
              <span className="text-text-secondary text-sm">{formatCurrency(coin.current_price, 2, currency)}</span>
              <span className={`text-sm font-medium ${isUp ? 'text-neon-green' : 'text-neon-red'}`}>
                {formatPercentage(change)}
              </span>
            </div>
          )
        })}
      </motion.div>
    </div>
  )
}
