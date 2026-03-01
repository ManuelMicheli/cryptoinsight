import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'
import PlatformIcon from './PlatformIcon'
import CreatorBadge from './CreatorBadge'
import { creators } from '../../data/socialData'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'

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
  if (hours < 24) return `${hours}h ${t('newsTimeAgo', lang)}`
  const days = Math.floor(hours / 24)
  if (days === 1) return lang === 'it' ? '1 giorno fa' : '1 day ago'
  return `${days} ${lang === 'it' ? 'giorni fa' : 'days ago'}`
}

const platformColors = {
  youtube: '#ef4444',
  x: '#ffffff',
  tiktok: '#00f2ea',
}

export default function VideoCard({ video }) {
  const { lang } = useLanguage()
  const creator = creators.find(c => c.id === video.creatorId)
  const duration = formatDuration(video.durationSeconds)
  const isTrending = video.trendingVelocity >= 80

  return (
    <motion.div variants={fadeInUp}>
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer" className="block h-full">
      <GlassCard variant="dark" className="flex flex-col h-full relative overflow-hidden group cursor-pointer">
        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-rose/30 to-transparent" />

        {/* Thumbnail */}
        <div className="relative -mx-6 -mt-6 mb-4 overflow-hidden rounded-t-[32px]">
          <div className="aspect-video bg-bg-secondary relative">
            <img
              src={video.thumbnailUrl}
              alt={l(video.title, lang)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
              onError={(e) => {
                if (e.target.src.includes('maxresdefault')) {
                  e.target.src = e.target.src.replace('maxresdefault', 'hqdefault')
                } else if (e.target.src.includes('hqdefault')) {
                  e.target.src = e.target.src.replace('hqdefault', 'mqdefault')
                }
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Duration badge */}
            {duration && (
              <span className="absolute bottom-2 right-2 bg-black/80 text-white typo-micro font-mono px-1.5 py-0.5 rounded">
                {duration}
              </span>
            )}

            {/* Platform badge */}
            <span className="absolute top-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-2 py-1 rounded-lg">
              <PlatformIcon platform={video.platform} size={14} className="opacity-90" style={{ color: platformColors[video.platform] }} />
              <span className="typo-micro font-medium text-white/80">
                {video.platform === 'youtube' ? 'YouTube' : video.platform === 'x' ? 'X' : 'TikTok'}
              </span>
            </span>

            {/* Trending badge */}
            {isTrending && (
              <span className="absolute top-2 right-2">
                <CreatorBadge type="trending" />
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <h4 className="typo-body font-bold text-text-primary mb-3 line-clamp-2 group-hover:text-neon-rose transition-colors">
          {l(video.title, lang)}
        </h4>

        {/* Creator info */}
        {creator && (
          <div className="flex items-center gap-2 mb-3">
            <img
              src={creator.avatar}
              alt={creator.name}
              className="w-6 h-6 rounded-full"
            />
            <span className="typo-ui-sm text-text-secondary font-medium">{creator.name}</span>
            <CreatorBadge type="tier" value={creator.tier} />
          </div>
        )}

        {/* Stats row */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-white/5 text-text-secondary typo-micro">
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            {formatCount(video.viewCount)}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            {formatCount(video.likeCount)}
          </span>
          <span className="flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            {formatCount(video.commentCount)}
          </span>
          <span className="ml-auto text-text-secondary/70">
            {timeAgo(video.publishedAt, lang)}
          </span>
        </div>
      </GlassCard>
      </a>
    </motion.div>
  )
}
