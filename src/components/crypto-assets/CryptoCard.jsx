import { motion } from 'motion/react'
import { formatCurrency, formatMarketCapRank } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import { sentimentData } from '../../data/sentimentData'
import { healthData, gradeColors } from '../../data/healthData'
import { whaleTransactions } from '../../data/whaleData'
import GlassCard from '../ui/GlassCard'
import TechTerm from '../ui/TechTerm'
import SparklineChart from './SparklineChart'
import RiskBadge from './RiskBadge'
import PriceChange from './PriceChange'

function MiniSentimentGauge({ score }) {
  const radius = 14
  const circumference = Math.PI * radius
  const offset = circumference - (score / 100) * circumference
  const color = score >= 75 ? '#00ff88' : score >= 55 ? '#84cc16' : score >= 45 ? '#eab308' : score >= 25 ? '#f59e0b' : '#ef4444'

  return (
    <div className="flex flex-col items-center gap-0.5">
      <svg width="36" height="36" viewBox="0 0 36 36">
        <circle cx="18" cy="18" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" />
        <circle
          cx="18" cy="18" r={radius} fill="none"
          stroke={color} strokeWidth="3" strokeLinecap="round"
          strokeDasharray={circumference} strokeDashoffset={offset}
          transform="rotate(-90 18 18)"
          style={{ filter: `drop-shadow(0 0 4px ${color})` }}
        />
        <text x="18" y="20" textAnchor="middle" fill={color} fontSize="9" fontWeight="700" fontFamily="'Orbitron', sans-serif">
          {score}
        </text>
      </svg>
      <span className="text-text-secondary text-[8px] uppercase tracking-wider"><TechTerm term="sentiment">Sentiment</TechTerm></span>
    </div>
  )
}

function HealthGradeBadge({ grade }) {
  const colorClass = gradeColors[grade] || 'text-text-secondary'
  return (
    <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[9px] font-bold border border-white/10 bg-white/5 ${colorClass}`}>
      {grade}
    </span>
  )
}

export default function CryptoCard({ coin, onClick }) {
  const { currency } = useCurrency()
  const { lang } = useLanguage()
  const meta = cryptoMeta[coin.id] || {}
  const sparklineData = coin.sparkline_in_7d?.price || []
  const is7dPositive = (coin.price_change_percentage_7d_in_currency ?? 0) >= 0
  const colors = meta.brandColors || ['#00f0ff', '#00f0ff']
  const accentColor = colors[1]

  const sentiment = sentimentData[coin.id]
  const health = healthData[coin.id]

  // Check for recent whale movements (<24h)
  const now = Date.now()
  const hasRecentWhale = whaleTransactions.some(tx =>
    tx.asset === coin.id && (now - new Date(tx.timestamp).getTime()) < 86400000
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      layout
      onClick={onClick}
      className="cursor-pointer"
    >
      <GlassCard
        brandColors={colors}
        className="flex flex-col gap-3 h-full !p-4 !min-h-0 !rounded-2xl"
      >
        {/* Header */}
        <div className="flex items-center gap-2.5">
          <img src={coin.image} alt={coin.name} className="w-9 h-9 rounded-full ring-1 ring-white/10 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <h3 className="font-heading typo-ui font-semibold text-text-primary tracking-tight truncate">{coin.name}</h3>
              <span className="text-text-secondary/80 typo-ui-sm font-medium flex-shrink-0">{coin.symbol?.toUpperCase()}</span>
              {hasRecentWhale && <span className="text-[12px] flex-shrink-0" title="Whale activity">🐋</span>}
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-text-secondary typo-micro">{formatMarketCapRank(coin.market_cap_rank)}</span>
              <RiskBadge risk={meta.risk} />
              {health && <HealthGradeBadge grade={health.grade} />}
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="font-heading typo-stat-sm font-bold text-white">{formatCurrency(coin.current_price, 2, currency)}</div>

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
          <p className="text-text-secondary typo-ui-sm border-t border-white/5 pt-3 mt-auto line-clamp-3">
            {l(meta.description, lang)}
          </p>
        )}

        {/* Mini sentiment gauge */}
        {sentiment && (
          <div className="flex items-center justify-center border-t border-white/5 pt-3">
            <MiniSentimentGauge score={sentiment.score} />
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
