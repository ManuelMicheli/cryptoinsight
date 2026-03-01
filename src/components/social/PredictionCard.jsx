import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'
import { creators } from '../../data/socialData'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'

const outcomeConfig = {
  correct: { icon: '\u2705', color: 'text-neon-green', bg: 'bg-neon-green/10 border-neon-green/20' },
  incorrect: { icon: '\u274C', color: 'text-neon-red', bg: 'bg-neon-red/10 border-neon-red/20' },
  pending: { icon: '\u23F3', color: 'text-neon-amber', bg: 'bg-neon-amber/10 border-neon-amber/20' },
}

const directionConfig = {
  bull: { icon: '\u2191', color: 'text-neon-green', label: { it: 'Rialzista', en: 'Bullish' } },
  bear: { icon: '\u2193', color: 'text-neon-red', label: { it: 'Ribassista', en: 'Bearish' } },
  neutral: { icon: '\u2194', color: 'text-neon-amber', label: { it: 'Neutro', en: 'Neutral' } },
}

export default function PredictionCard({ prediction }) {
  const { lang } = useLanguage()
  const creator = creators.find(c => c.id === prediction.creatorId)
  const outcome = outcomeConfig[prediction.outcome]
  const direction = directionConfig[prediction.direction]

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant="dark" className="flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-rose/30 to-transparent" />

        {/* Header row */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-2">
            {creator && (
              <>
                <img src={creator.avatar} alt={creator.name} className="w-6 h-6 rounded-full" />
                <span className="typo-ui-sm font-medium text-text-primary">{creator.name}</span>
              </>
            )}
          </div>
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full typo-micro font-semibold border ${outcome.bg}`}>
            {outcome.icon} {t(prediction.outcome === 'correct' ? 'socialCorrect' : prediction.outcome === 'incorrect' ? 'socialIncorrect' : 'socialPending', lang)}
          </span>
        </div>

        {/* Claim text */}
        <p className="typo-body-sm text-text-primary mb-4 font-medium">{l(prediction.claimText, lang)}</p>

        {/* Details grid */}
        <div className="grid grid-cols-3 gap-3 mb-3">
          <div>
            <div className="typo-micro text-text-secondary mb-0.5">{prediction.asset}</div>
            <div className={`typo-ui-sm font-bold ${direction.color}`}>
              {direction.icon} {l(direction.label, lang)}
            </div>
          </div>
          <div>
            <div className="typo-micro text-text-secondary mb-0.5">{t('socialTarget', lang)}</div>
            <div className="typo-ui-sm font-bold text-text-primary">
              ${prediction.targetPrice.toLocaleString()}
            </div>
          </div>
          <div>
            <div className="typo-micro text-text-secondary mb-0.5">{t('socialTimeframe', lang)}</div>
            <div className="typo-ui-sm font-bold text-text-primary">
              {prediction.timeframeDays} {t('socialDays', lang)}
            </div>
          </div>
        </div>

        {/* Actual price (if resolved) */}
        {prediction.actualPrice && (
          <div className="mt-auto pt-3 border-t border-white/5 flex items-center justify-between">
            <span className="typo-micro text-text-secondary">
              {lang === 'it' ? 'Prezzo effettivo' : 'Actual price'}
            </span>
            <span className={`typo-ui-sm font-bold ${prediction.outcome === 'correct' ? 'text-neon-green' : 'text-neon-red'}`}>
              ${prediction.actualPrice.toLocaleString()}
            </span>
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
