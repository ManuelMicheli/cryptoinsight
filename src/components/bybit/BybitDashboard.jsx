import { useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import GlassCard from '../ui/GlassCard'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { usePortfolio } from '../../contexts/PortfolioContext'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { t } from '../../i18n/translations'

const EXCHANGE_BADGES = {
  'bybit-eu': { label: 'Bybit EU', bg: 'bg-blue-500/10 border-blue-400/30 text-blue-400' },
  'bybit-global': { label: 'Bybit Global', bg: 'bg-amber-500/10 border-amber-400/30 text-amber-400' },
  'binance': { label: 'Binance', bg: 'bg-yellow-500/10 border-yellow-400/30 text-yellow-400' },
  'coinbase': { label: 'Coinbase', bg: 'bg-blue-500/10 border-blue-300/30 text-blue-300' },
  'kraken': { label: 'Kraken', bg: 'bg-purple-500/10 border-purple-400/30 text-purple-400' },
  'other': { label: 'Other', bg: 'bg-white/5 border-white/10 text-text-secondary' },
}

export default function BybitDashboard() {
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const { holdings, removeHolding, clearPortfolio } = usePortfolio()
  const { coins } = useCryptoData()

  // Map CoinGecko data to holdings
  const enriched = useMemo(() => {
    if (!coins || !holdings.length) return []
    const coinMap = new Map(coins.map(c => [c.id, c]))
    return holdings.map(h => {
      const live = coinMap.get(h.coinId)
      const price = live?.current_price ?? 0
      const change24h = live?.price_change_percentage_24h ?? 0
      const value = price * h.quantity
      return {
        ...h,
        live,
        price,
        change24h,
        value,
        image: live?.image,
        name: live?.name ?? h.symbol,
      }
    }).sort((a, b) => b.value - a.value)
  }, [coins, holdings])

  const totalValue = useMemo(() => enriched.reduce((sum, h) => sum + h.value, 0), [enriched])

  // Weighted average 24h change
  const weightedChange = useMemo(() => {
    if (totalValue === 0) return 0
    return enriched.reduce((sum, h) => sum + (h.change24h * h.value), 0) / totalValue
  }, [enriched, totalValue])

  if (!holdings.length) return null

  return (
    <div className="space-y-6">
      {/* Portfolio summary header */}
      <GlassCard hover={false} variant="green">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="font-heading typo-ui text-neon-green">
              {enriched.length} asset{enriched.length !== 1 ? 's' : ''}
            </span>
          </div>
          <button
            onClick={clearPortfolio}
            className="text-text-secondary typo-ui-sm hover:text-neon-red transition-colors"
          >
            {t('portfolioClearAll', lang)}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <div className="text-text-secondary typo-ui-sm mb-1">{t('portfolioTotal', lang)}</div>
            <div className="font-heading typo-stat-sm font-bold text-neon-cyan">
              {formatCurrency(totalValue, 2, currency)}
            </div>
          </div>
          <div>
            <div className="text-text-secondary typo-ui-sm mb-1">{t('portfolioChange24h', lang)}</div>
            <div className={`font-heading typo-stat-sm font-bold ${weightedChange >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
              {formatPercentage(weightedChange)}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Asset list */}
      <GlassCard hover={false}>
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading typo-ui text-text-primary">{t('portfolioAssets', lang)}</h4>
        </div>
        <div className="space-y-1">
          <AnimatePresence>
            {enriched.map((asset) => {
              const badge = EXCHANGE_BADGES[asset.exchange] || EXCHANGE_BADGES.other
              return (
                <motion.div
                  key={`${asset.coinId}-${asset.exchange}`}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20, height: 0 }}
                  className="flex items-center justify-between py-3 px-3 rounded-xl hover:bg-white/[0.03] transition-colors border-b border-white/5 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                      {asset.image ? (
                        <img src={asset.image} alt="" className="w-9 h-9 rounded-full" />
                      ) : (
                        <span className="typo-ui-sm font-bold text-text-primary">{asset.symbol.slice(0, 2)}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="typo-body-sm font-medium text-text-primary">{asset.name}</span>
                        <span className={`typo-micro px-1.5 py-0.5 rounded font-semibold border ${badge.bg}`}>
                          {badge.label}
                        </span>
                      </div>
                      <span className="text-text-secondary typo-ui-sm">
                        {asset.quantity.toFixed(asset.quantity < 1 ? 6 : 4)} {asset.symbol}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <div className="typo-body-sm font-medium text-neon-cyan">
                        {formatCurrency(asset.value, 2, currency)}
                      </div>
                      <div className={`typo-ui-sm ${asset.change24h >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                        {formatPercentage(asset.change24h)}
                      </div>
                    </div>
                    <button
                      onClick={() => removeHolding(asset.coinId, asset.exchange)}
                      className="p-1.5 rounded-lg hover:bg-neon-red/10 text-text-secondary hover:text-neon-red transition-colors flex-shrink-0"
                      title={t('portfolioRemove', lang)}
                    >
                      <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </GlassCard>
    </div>
  )
}
