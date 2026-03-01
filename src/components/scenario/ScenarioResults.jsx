import { useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { useCurrency } from '../../contexts/CurrencyContext'
import { usePortfolio } from '../../contexts/PortfolioContext'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { cryptoMeta } from '../../data/cryptoMeta'
import { scenarioBetas } from '../../data/scenarioData'
import { COIN_IDS } from '../../utils/constants'
import { formatCurrency, formatPercentage } from '../../utils/formatters'

export default function ScenarioResults({ params, baseline }) {
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const { holdings } = usePortfolio()
  const { coins } = useCryptoData()

  // Build a map of live prices from CoinGecko data
  const livePriceMap = useMemo(() => {
    if (!coins) return new Map()
    return new Map(coins.map(c => [c.id, c.current_price]))
  }, [coins])

  const results = useMemo(() => {
    if (!baseline.btcPrice) return []

    const btcChange = (params.btcTarget - baseline.btcPrice) / baseline.btcPrice
    const mcapChange = (params.totalMarketCap - baseline.totalMarketCap) / baseline.totalMarketCap
    const domChange = (params.btcDominance - baseline.btcDominance) / baseline.btcDominance

    // Altcoin multiplier: if BTC dominance drops, alts gain more
    const altMultiplier = domChange < 0 ? 1 + Math.abs(domChange) * 0.5 : 1 - domChange * 0.3

    const tokenList = holdings.length > 0
      ? holdings.map(h => h.coinId)
      : COIN_IDS.slice(0, 10)

    return tokenList.map(coinId => {
      const beta = scenarioBetas[coinId]
      const meta = cryptoMeta[coinId]
      const currentPrice = livePriceMap.get(coinId)
      if (beta == null || !meta || !currentPrice) return null

      let estimatedChange
      if (coinId === 'ethereum') {
        const ethPrice = params.btcTarget * params.ethBtcRatio
        estimatedChange = (ethPrice - currentPrice) / currentPrice
      } else {
        estimatedChange = btcChange * beta * altMultiplier
        // Add market cap growth effect
        estimatedChange += mcapChange * 0.3
      }

      const estimatedPrice = currentPrice * (1 + estimatedChange)

      return {
        coinId,
        name: meta.name,
        ticker: meta.ticker,
        currentPrice,
        estimatedPrice,
        change: estimatedChange * 100,
      }
    }).filter(Boolean)
  }, [params, baseline, holdings, livePriceMap])

  return (
    <div className="panel rounded-2xl overflow-x-auto" style={{ minHeight: 'auto' }} data-lenis-prevent>
      <div className="min-w-[420px]">
      {/* Table header */}
      <div className="grid grid-cols-4 gap-2 px-4 py-3 border-b border-white/10 text-text-secondary text-xs font-medium">
        <span>Token</span>
        <span className="text-right">{lang === 'it' ? 'Prezzo Attuale' : 'Current Price'}</span>
        <span className="text-right">{lang === 'it' ? 'Prezzo Stimato' : 'Est. Price'}</span>
        <span className="text-right">{lang === 'it' ? 'Variazione' : 'Change'}</span>
      </div>

      {/* Table rows */}
      <AnimatePresence mode="popLayout">
        {results.map(row => (
          <motion.div
            key={row.coinId}
            className="grid grid-cols-4 gap-2 px-4 py-3 border-b border-white/5 last:border-0"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <span className="text-text-primary text-sm font-medium">{row.ticker}</span>
            </div>
            <span className="text-right text-text-secondary text-sm">
              {formatCurrency(row.currentPrice, 2, currency)}
            </span>
            <span className="text-right text-text-primary text-sm font-medium">
              {formatCurrency(row.estimatedPrice, 2, currency)}
            </span>
            <span className={`text-right text-sm font-medium ${row.change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
              {formatPercentage(row.change)}
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
      </div>
    </div>
  )
}
