import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import PlatformIcon from './PlatformIcon'
import CreatorBadge from './CreatorBadge'
import { creators } from '../../data/socialData'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'

function formatDuration(seconds) {
  if (!seconds) return null
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

function formatCount(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(n >= 10_000 ? 0 : 1)}K`
  return String(n)
}

function timeAgo(dateStr, lang) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const hours = Math.floor(diff / 3_600_000)
  if (hours < 1) return lang === 'it' ? 'adesso' : 'now'
  if (hours < 24) return `${hours}h`
  const days = Math.floor(hours / 24)
  if (days === 1) return lang === 'it' ? '1g' : '1d'
  return `${days}${lang === 'it' ? 'g' : 'd'}`
}

const platformLabels = {
  youtube: 'YouTube',
  x: 'X',
  tiktok: 'TikTok',
}

export default function FeedPost({ video }) {
  const { lang } = useLanguage()
  const creator = creators.find(c => c.id === video.creatorId)
  const duration = formatDuration(video.durationSeconds)
  const isTrending = video.trendingVelocity >= 80

  return (
    <motion.article
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <a
        href={video.videoUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block px-4 py-4 hover:bg-white/[0.02] transition-colors"
      >
        <div className="flex gap-3">
          {/* Avatar */}
          {creator && (
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-10 h-10 rounded-full flex-shrink-0"
            />
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Header: Name · @platform · time */}
            <div className="flex items-center gap-1.5 mb-1 flex-wrap">
              {creator && (
                <span className="typo-body font-bold text-text-primary truncate">
                  {creator.name}
                </span>
              )}
              <span className="text-text-secondary/50">·</span>
              <span className="flex items-center gap-1 text-text-secondary typo-ui-sm">
                <PlatformIcon platform={video.platform} size={14} />
                {platformLabels[video.platform]}
              </span>
              <span className="text-text-secondary/50">·</span>
              <span className="typo-ui-sm text-text-secondary">
                {timeAgo(video.publishedAt, lang)}
              </span>
            </div>

            {/* Title / post text */}
            <p className="typo-body text-text-primary mb-3 leading-relaxed">
              {l(video.title, lang)}
            </p>

            {/* Media thumbnail */}
            <div className="relative rounded-2xl overflow-hidden mb-3 border border-white/10">
              <div className="aspect-video bg-bg-secondary relative">
                <img
                  src={video.thumbnailUrl}
                  alt={l(video.title, lang)}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    if (e.target.src.includes('maxresdefault')) {
                      e.target.src = e.target.src.replace('maxresdefault', 'hqdefault')
                    } else if (e.target.src.includes('hqdefault')) {
                      e.target.src = e.target.src.replace('hqdefault', 'mqdefault')
                    }
                  }}
                />
                {/* Duration badge */}
                {duration && (
                  <span className="absolute bottom-2 right-2 bg-black/80 text-white typo-micro font-mono px-1.5 py-0.5 rounded">
                    {duration}
                  </span>
                )}
                {/* Trending badge */}
                {isTrending && (
                  <span className="absolute top-2 right-2">
                    <CreatorBadge type="trending" />
                  </span>
                )}
              </div>
            </div>

            {/* Engagement bar */}
            <div className="flex items-center justify-between max-w-md typo-ui-sm text-text-secondary">
              {/* Reply / Comments */}
              <button
                type="button"
                className="flex items-center gap-1.5 group/btn hover:text-neon-cyan transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <span className="p-1.5 rounded-full group-hover/btn:bg-neon-cyan/10 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </span>
                <span>{formatCount(video.commentCount)}</span>
              </button>

              {/* Repost */}
              <button
                type="button"
                className="flex items-center gap-1.5 group/btn hover:text-neon-green transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <span className="p-1.5 rounded-full group-hover/btn:bg-neon-green/10 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17 1l4 4-4 4" />
                    <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                    <path d="M7 23l-4-4 4-4" />
                    <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                  </svg>
                </span>
                <span>{formatCount(0)}</span>
              </button>

              {/* Like */}
              <button
                type="button"
                className="flex items-center gap-1.5 group/btn hover:text-neon-rose transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <span className="p-1.5 rounded-full group-hover/btn:bg-neon-rose/10 transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </span>
                <span>{formatCount(video.likeCount)}</span>
              </button>

              {/* Views */}
              <span className="flex items-center gap-1.5">
                <span className="p-1.5">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </span>
                <span>{formatCount(video.viewCount)}</span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </motion.article>
  )
}
