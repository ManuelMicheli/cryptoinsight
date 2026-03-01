import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import { recipientColors } from '../../data/unlockData'
import { formatLargeNumber } from '../../utils/formatters'
import GlassCard from '../ui/GlassCard'
import UnlockAlertBadge from './UnlockAlertBadge'
import DilutionBar from './DilutionBar'
import HistoricalUnlockChart from './HistoricalUnlockChart'

export default function UnlockEventCard({ event }) {
  const { lang } = useLanguage()
  const meta = cryptoMeta[event.coinId]
  const rcfg = recipientColors[event.recipient] || recipientColors.ecosystem

  const daysUntil = Math.ceil((new Date(event.date) - Date.now()) / 86400000)
  const isUpcoming = daysUntil <= 7 && daysUntil >= 0

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard
        variant="amber"
        brandColors={meta?.brandColors}
        hover={true}
        className="p-5"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm font-bold text-text-primary">{meta?.name || event.coinId}</span>
            <span className="text-text-secondary text-xs">{meta?.ticker}</span>
            {isUpcoming && <UnlockAlertBadge percentSupply={event.percentSupply} />}
          </div>
          <span className="text-text-secondary text-xs">
            {new Date(event.date).toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
          </span>
        </div>

        {/* Amount & Recipient */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-text-primary text-sm font-medium">{formatLargeNumber(event.amount)} {meta?.ticker}</span>
            <span className="text-text-secondary text-xs ml-2">({event.percentSupply}% supply)</span>
          </div>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${rcfg.bg} ${rcfg.color} ${rcfg.border}`}>
            {l(event.recipientLabel, lang)}
          </span>
        </div>

        {/* Dilution bar */}
        <div className="mb-4">
          <DilutionBar percentSupply={event.percentSupply} />
        </div>

        {/* Historical impact chart */}
        <HistoricalUnlockChart historicalImpact={event.historicalImpact} />
      </GlassCard>
    </motion.div>
  )
}
