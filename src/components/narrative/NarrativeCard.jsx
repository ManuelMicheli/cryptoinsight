import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import { formatPercentage } from '../../utils/formatters'
import GlassCard from '../ui/GlassCard'
import NarrativeEvent from './NarrativeEvent'
import NarrativeMiniChart from './NarrativeMiniChart'

export default function NarrativeCard({ narrative }) {
  const { lang } = useLanguage()
  const meta = cryptoMeta[narrative.coinId]
  if (!meta) return null

  const isPositive = narrative.priceChange >= 0

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard
        variant="purple"
        brandColors={meta.brandColors}
        hover={true}
        className="p-6"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="font-heading text-lg font-bold text-text-primary">{meta.name}</span>
            <span className="text-text-secondary text-sm">{meta.ticker}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className={`font-heading text-lg font-bold ${isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
              {formatPercentage(narrative.priceChange)}
            </span>
            <span className="text-text-secondary text-xs">{narrative.timeframe}</span>
          </div>
        </div>

        {/* Mini chart with event overlays */}
        <div className="mb-4">
          <NarrativeMiniChart
            sparkline={narrative.sparkline}
            events={narrative.events}
            priceChange={narrative.priceChange}
          />
        </div>

        {/* Events */}
        <div>
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-2 font-medium">
            {t('narrativeEventsLabel', lang)}
          </p>
          {narrative.events.map((event, i) => (
            <NarrativeEvent key={i} event={event} />
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
