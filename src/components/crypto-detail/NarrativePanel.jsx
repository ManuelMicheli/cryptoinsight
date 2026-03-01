import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { narrativeData } from '../../data/narrativeData'
import GlassCard from '../ui/GlassCard'
import SparklineChart from '../crypto-assets/SparklineChart'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'

// Event type icons
const eventIcons = {
  tweet: '\u{1F4AC}',
  regolamentazione: '\u{2696}\u{FE0F}',
  regulation: '\u{2696}\u{FE0F}',
  unlock: '\u{1F513}',
  whale: '\u{1F40B}',
  partnership: '\u{1F91D}',
  technical: '\u{2699}\u{FE0F}',
}

// Impact score badge config
const impactConfig = {
  high: { bg: 'bg-neon-red/15', text: 'text-neon-red', border: 'border-neon-red/25', label: { it: 'Alto', en: 'High' } },
  medium: { bg: 'bg-neon-amber/15', text: 'text-neon-amber', border: 'border-neon-amber/25', label: { it: 'Medio', en: 'Medium' } },
  low: { bg: 'bg-neon-green/15', text: 'text-neon-green', border: 'border-neon-green/25', label: { it: 'Basso', en: 'Low' } },
}

function formatRelativeTime(timestamp, lang) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor(diff / 60000)

  if (minutes < 60) {
    return `${minutes}m ${t('newsTimeAgo', lang)}`
  }
  if (hours < 24) {
    return `${hours}h ${t('newsTimeAgo', lang)}`
  }
  const days = Math.floor(hours / 24)
  return `${days}d ${t('newsTimeAgo', lang)}`
}

export default function NarrativePanel({ coinId }) {
  const { lang } = useLanguage()

  // TODO: Replace with API call
  const narrative = narrativeData.find((n) => n.coinId === coinId)

  const title = lang === 'it' ? 'PERCHE\' SI MUOVE' : 'WHY IT MOVES'

  if (!narrative) {
    return (
      <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
        <h3 className="font-heading text-xs tracking-widest text-neon-cyan mb-3 uppercase">
          {title}
        </h3>
        <p className="text-text-secondary text-sm">
          {t('narrativeEmpty', lang)}
        </p>
      </GlassCard>
    )
  }

  const isPositive = narrative.priceChange >= 0

  return (
    <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
      <h3 className="font-heading text-xs tracking-widest text-neon-cyan mb-4 uppercase">
        {title}
      </h3>

      {/* Price change header */}
      <div className="flex items-center gap-2 mb-4">
        <span className={`text-2xl font-bold ${isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
          {isPositive ? '\u2191' : '\u2193'} {isPositive ? '+' : ''}{narrative.priceChange.toFixed(1)}%
        </span>
        <span className="text-text-secondary text-sm">
          ({narrative.timeframe})
        </span>
      </div>

      {/* Events list */}
      <motion.ul
        className="space-y-3 mb-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {narrative.events.map((event, i) => {
          const impact = impactConfig[event.impactScore] || impactConfig.low
          return (
            <motion.li
              key={i}
              className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              variants={fadeInUp}
            >
              <span className="text-lg flex-shrink-0 mt-0.5">
                {eventIcons[event.type] || '\u{1F4C4}'}
              </span>

              <div className="flex-1 min-w-0">
                <p className="text-sm text-text-primary font-medium leading-snug">
                  {l(event.title, lang)}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-text-secondary">
                    {event.source}
                  </span>
                  <span className="text-[10px] text-text-secondary">
                    {formatRelativeTime(event.timestamp, lang)}
                  </span>
                </div>
              </div>

              <span
                className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${impact.bg} ${impact.text} ${impact.border}`}
              >
                {l(impact.label, lang)}
              </span>
            </motion.li>
          )
        })}
      </motion.ul>

      {/* Sparkline */}
      {narrative.sparkline && narrative.sparkline.length > 0 && (
        <div className="mt-2">
          <SparklineChart
            data={narrative.sparkline}
            positive={isPositive}
            height={48}
          />
        </div>
      )}
    </GlassCard>
  )
}
