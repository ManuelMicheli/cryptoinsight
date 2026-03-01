import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'
import PlatformIcon from './PlatformIcon'
import CreatorBadge from './CreatorBadge'
import { videos, predictions } from '../../data/socialData'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'

function formatFollowers(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return String(n)
}

export default function CreatorCard({ creator }) {
  const { lang } = useLanguage()
  const creatorVideos = videos.filter(v => v.creatorId === creator.id).slice(0, 2)
  const creatorPredictions = predictions.filter(p => p.creatorId === creator.id)
  const resolved = creatorPredictions.filter(p => p.outcome !== 'pending')
  const correct = resolved.filter(p => p.outcome === 'correct').length
  const accuracy = resolved.length > 0 ? Math.round((correct / resolved.length) * 100) : null

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant="dark" className="flex flex-col h-full relative overflow-hidden group">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-rose/30 to-transparent" />

        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <img
            src={creator.avatar}
            alt={creator.name}
            className="w-12 h-12 rounded-full ring-2 ring-neon-rose/20"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className="typo-body font-bold text-text-primary truncate">{creator.name}</h4>
              <CreatorBadge type="tier" value={creator.tier} />
              {accuracy >= 70 && <CreatorBadge type="top-predictor" />}
            </div>
            <p className="typo-micro text-neon-rose/80 font-medium">{l(creator.focus, lang)}</p>
          </div>
        </div>

        {/* Bio */}
        <p className="typo-ui-sm text-text-secondary mb-4 line-clamp-2">{l(creator.bio, lang)}</p>

        {/* Platforms */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {creator.platforms.map(p => (
            <CreatorBadge key={p} type="platform" value={p} />
          ))}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="text-center">
            <div className="typo-stat-micro font-bold text-text-primary">{formatFollowers(creator.followers)}</div>
            <div className="typo-micro text-text-secondary">{t('socialFollowers', lang)}</div>
          </div>
          <div className="text-center">
            <div className="typo-stat-micro font-bold text-neon-rose">{creator.influenceScore}</div>
            <div className="typo-micro text-text-secondary">Influence</div>
          </div>
          <div className="text-center">
            <div className="typo-stat-micro font-bold text-neon-green">{accuracy !== null ? `${accuracy}%` : '—'}</div>
            <div className="typo-micro text-text-secondary">{t('socialAccuracy', lang)}</div>
          </div>
        </div>

        {/* Recent videos */}
        {creatorVideos.length > 0 && (
          <div className="mt-auto pt-3 border-t border-white/5 space-y-2">
            {creatorVideos.map(v => (
              <a key={v.id} href={v.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group/vid">
                <PlatformIcon platform={v.platform} size={12} className="text-text-secondary flex-shrink-0" />
                <span className="typo-micro text-text-secondary truncate group-hover/vid:text-text-primary transition-colors">
                  {l(v.title, lang)}
                </span>
              </a>
            ))}
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
