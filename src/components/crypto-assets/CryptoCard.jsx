import { motion } from 'motion/react'
import { formatCurrency, formatMarketCapRank } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import GlassCard from '../ui/GlassCard'
import SparklineChart from './SparklineChart'
import RiskBadge from './RiskBadge'
import PriceChange from './PriceChange'

export default function CryptoCard({ coin }) {
  const { currency } = useCurrency()
  const { lang } = useLanguage()
  const meta = cryptoMeta[coin.id] || {}
  const sparklineData = coin.sparkline_in_7d?.price || []
  const is7dPositive = (coin.price_change_percentage_7d_in_currency ?? 0) >= 0
  const colors = meta.brandColors || ['#00f0ff', '#00f0ff']
  const accentColor = colors[1]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <GlassCard brandColors={colors} className="flex flex-col gap-3 h-full !p-4 !min-h-0 !rounded-2xl">
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full ring-1 ring-white/10 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading text-sm font-semibold text-text-primary tracking-tight truncate">{coin.name}</h3>
              <span className="text-text-secondary/80 text-xs font-medium flex-shrink-0">{coin.symbol?.toUpperCase()}</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-text-secondary text-[10px]">{formatMarketCapRank(coin.market_cap_rank)}</span>
              <RiskBadge risk={meta.risk} />
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="font-heading text-lg md:text-xl font-bold" style={{ color: accentColor }}>{formatCurrency(coin.current_price, 2, currency)}</div>

        {/* Sparkline */}
        <div className="flex items-center justify-center">
          <SparklineChart data={sparklineData} positive={is7dPositive} height={40} />
        </div>

        {/* Price changes */}
        <div className="grid grid-cols-3 gap-2">
          <PriceChange value={coin.price_change_percentage_24h_in_currency} label={t('priceToday', lang)} />
          <PriceChange value={coin.price_change_percentage_7d_in_currency} label={t('price7d', lang)} />
          <PriceChange value={coin.price_change_percentage_30d_in_currency} label={t('price30d', lang)} />
        </div>

        {/* Description */}
        {meta.description && (
          <p className="text-text-secondary text-xs leading-relaxed border-t border-white/5 pt-3 mt-auto line-clamp-3">
            {l(meta.description, lang)}
          </p>
        )}
      </GlassCard>
    </motion.div>
  )
}
