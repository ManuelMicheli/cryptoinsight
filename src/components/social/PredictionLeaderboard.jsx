import { useMemo } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'
import CreatorBadge from './CreatorBadge'
import { creators, predictions } from '../../data/socialData'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'

function MiniAccuracyBar({ correct, incorrect, pending }) {
  const total = correct + incorrect + pending
  if (total === 0) return null
  const cPct = (correct / total) * 100
  const iPct = (incorrect / total) * 100

  return (
    <div className="flex h-1.5 w-full rounded-full overflow-hidden bg-white/5">
      {cPct > 0 && <div className="bg-neon-green" style={{ width: `${cPct}%` }} />}
      {iPct > 0 && <div className="bg-neon-red" style={{ width: `${iPct}%` }} />}
      {/* remaining is pending (amber implied by gap) */}
    </div>
  )
}

export default function PredictionLeaderboard() {
  const { lang } = useLanguage()

  const leaderboard = useMemo(() => {
    return creators
      .map(creator => {
        const preds = predictions.filter(p => p.creatorId === creator.id)
        const resolved = preds.filter(p => p.outcome !== 'pending')
        const correct = resolved.filter(p => p.outcome === 'correct').length
        const incorrect = resolved.filter(p => p.outcome === 'incorrect').length
        const pending = preds.filter(p => p.outcome === 'pending').length
        const accuracy = resolved.length > 0 ? (correct / resolved.length) * 100 : 0
        return {
          ...creator,
          totalPredictions: preds.length,
          correct,
          incorrect,
          pending,
          accuracy,
          resolved: resolved.length,
        }
      })
      .filter(c => c.totalPredictions > 0)
      .sort((a, b) => {
        // Sort by accuracy first, then by number of resolved predictions
        if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy
        return b.resolved - a.resolved
      })
  }, [])

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant="dark" hover={false} className="relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-rose/30 to-transparent" />

        <h3 className="typo-h4 font-heading font-bold text-neon-rose text-glow-rose mb-1">
          {t('socialLeaderboard', lang)}
        </h3>
        <p className="typo-ui-sm text-text-secondary mb-6">{t('socialLeaderboardDesc', lang)}</p>

        <div className="space-y-3">
          {leaderboard.map((creator, index) => (
            <div
              key={creator.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-neon-rose/20 transition-colors"
            >
              {/* Rank */}
              <div className={`w-7 h-7 rounded-full flex items-center justify-center typo-micro font-bold flex-shrink-0 ${
                index === 0 ? 'bg-neon-rose/20 text-neon-rose' :
                index === 1 ? 'bg-neon-purple/20 text-neon-purple' :
                index === 2 ? 'bg-neon-amber/20 text-neon-amber' :
                'bg-white/5 text-text-secondary'
              }`}>
                {index + 1}
              </div>

              {/* Avatar + name */}
              <img src={creator.avatar} alt={creator.name} className="w-8 h-8 rounded-full flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="typo-ui-sm font-medium text-text-primary truncate">{creator.name}</span>
                  <CreatorBadge type="tier" value={creator.tier} />
                </div>
                <MiniAccuracyBar correct={creator.correct} incorrect={creator.incorrect} pending={creator.pending} />
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div className={`typo-body-sm font-bold ${creator.accuracy >= 70 ? 'text-neon-green' : creator.accuracy >= 50 ? 'text-neon-amber' : 'text-neon-red'}`}>
                  {creator.accuracy.toFixed(0)}%
                </div>
                <div className="typo-micro text-text-secondary">
                  {creator.correct}/{creator.resolved}
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  )
}
