import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
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

  return (
    <motion.div variants={fadeInUp} layout>
      <GlassCard variant="purple" className="flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <img src={coin.image} alt={coin.name} className="w-11 h-11 rounded-full ring-1 ring-white/10" />
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-heading text-base md:text-lg font-semibold text-text-primary tracking-tight">{coin.name}</h3>
                <span className="text-text-secondary/80 text-sm font-medium">{coin.symbol?.toUpperCase()}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-text-secondary text-xs">{formatMarketCapRank(coin.market_cap_rank)}</span>
                <RiskBadge risk={meta.risk} />
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="font-heading text-2xl md:text-3xl font-bold text-neon-cyan">{formatCurrency(coin.current_price, 2, currency)}</div>
          </div>
        </div>

        {/* Sparkline */}
        <div className="flex items-center justify-center py-1">
          <SparklineChart data={sparklineData} positive={is7dPositive} />
        </div>

        {/* Price changes */}
        <div className="grid grid-cols-3 gap-4">
          <PriceChange value={coin.price_change_percentage_24h_in_currency} label={t('priceToday', lang)} />
          <PriceChange value={coin.price_change_percentage_7d_in_currency} label={t('price7d', lang)} />
          <PriceChange value={coin.price_change_percentage_30d_in_currency} label={t('price30d', lang)} />
        </div>

        {/* Description */}
        {meta.description && (
          <p className="text-text-secondary text-sm md:text-base leading-loose border-t border-white/5 pt-4 mt-auto">
            {l(meta.description, lang)}
          </p>
        )}
      </GlassCard>
    </motion.div>
  )
}
