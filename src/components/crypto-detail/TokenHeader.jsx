import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { t, l } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import { healthData, gradeColors } from '../../data/healthData'
import { formatCurrency, formatPercentage, formatMarketCapRank } from '../../utils/formatters'
import RiskBadge from '../crypto-assets/RiskBadge'
import { fadeInUp } from '../../hooks/useInViewAnimation'

// Grade background color mapping for the circle badge
const gradeBgColors = {
  'A+': 'bg-neon-green/15 border-neon-green/30',
  'A': 'bg-neon-green/15 border-neon-green/30',
  'A-': 'bg-neon-green/15 border-neon-green/30',
  'B+': 'bg-neon-cyan/15 border-neon-cyan/30',
  'B': 'bg-neon-cyan/15 border-neon-cyan/30',
  'B-': 'bg-neon-amber/15 border-neon-amber/30',
  'C+': 'bg-neon-amber/15 border-neon-amber/30',
  'C': 'bg-neon-amber/15 border-neon-amber/30',
  'D': 'bg-neon-red/15 border-neon-red/30',
  'F': 'bg-red-500/15 border-red-500/30',
}

export default function TokenHeader({ coin, coinMeta }) {
  const { lang } = useLanguage()
  const { currency } = useCurrency()

  if (!coin) return null

  const meta = coinMeta || cryptoMeta[coin.id]
  const health = healthData[coin.id]
  const grade = health?.grade
  const gradeTextColor = grade ? gradeColors[grade] : ''
  const gradeBgColor = grade ? gradeBgColors[grade] : ''

  const changes = [
    { label: t('priceToday', lang), value: coin.price_change_percentage_24h },
    { label: t('price7d', lang), value: coin.price_change_percentage_7d_in_currency },
    { label: t('price30d', lang), value: coin.price_change_percentage_30d_in_currency },
  ]

  return (
    <motion.header
      className="flex flex-col gap-4"
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
    >
      {/* Top row: logo, name, rank, grade */}
      <div className="flex items-center gap-4 flex-wrap">
        {coin.image && (
          <img
            src={coin.image}
            alt={coin.name}
            className="w-12 h-12 rounded-full ring-2 ring-white/10"
            loading="lazy"
          />
        )}

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="font-heading font-bold typo-h2 text-text-primary">
              {coin.name}
            </h2>
            <span className="text-text-secondary text-sm font-medium uppercase">
              {coin.symbol}
            </span>
            {coin.market_cap_rank && (
              <span className="text-xs text-text-secondary bg-white/5 px-2 py-0.5 rounded-full border border-white/10">
                {formatMarketCapRank(coin.market_cap_rank)}
              </span>
            )}
          </div>

          {meta && (
            <p className="text-text-secondary text-xs mt-0.5 max-w-md line-clamp-1">
              {l(meta.description, lang)}
            </p>
          )}
        </div>

        {/* Health grade badge */}
        {grade && (
          <div
            className={`ml-auto flex items-center justify-center w-10 h-10 rounded-full border text-sm font-heading font-bold ${gradeTextColor} ${gradeBgColor}`}
            title={`Health Grade: ${grade}`}
          >
            {grade}
          </div>
        )}
      </div>

      {/* Price row */}
      <div className="flex items-end gap-4 flex-wrap">
        <span className="font-heading font-bold typo-stat text-text-primary">
          {formatCurrency(coin.current_price, 2, currency)}
        </span>

        <div className="flex items-center gap-3 flex-wrap">
          {changes.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <span className="text-[10px] text-text-secondary uppercase tracking-wider">
                {label}
              </span>
              <span
                className={`text-sm font-semibold ${
                  value >= 0 ? 'text-neon-green' : 'text-neon-red'
                }`}
              >
                {formatPercentage(value)}
              </span>
            </div>
          ))}
        </div>

        {/* Risk badge */}
        {meta?.risk && (
          <div className="ml-auto">
            <RiskBadge risk={meta.risk} />
          </div>
        )}
      </div>
    </motion.header>
  )
}
