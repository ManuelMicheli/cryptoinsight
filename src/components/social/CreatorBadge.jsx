import PlatformIcon from './PlatformIcon'

const tierConfig = {
  1: { label: 'Tier 1', className: 'bg-neon-rose/20 text-neon-rose border-neon-rose/30' },
  2: { label: 'Tier 2', className: 'bg-neon-purple/20 text-neon-purple border-neon-purple/30' },
  3: { label: 'Tier 3', className: 'bg-white/10 text-text-secondary border-white/20' },
}

export default function CreatorBadge({ type, value, className = '' }) {
  if (type === 'tier') {
    const config = tierConfig[value] || tierConfig[3]
    return (
      <span className={`inline-flex items-center px-2 py-0.5 rounded-full typo-micro font-semibold border ${config.className} ${className}`}>
        {config.label}
      </span>
    )
  }

  if (type === 'trending') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full typo-micro font-semibold bg-neon-rose/20 text-neon-rose border border-neon-rose/30 ${className}`}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        Trending
      </span>
    )
  }

  if (type === 'top-predictor') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full typo-micro font-semibold bg-neon-green/20 text-neon-green border border-neon-green/30 ${className}`}>
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
          <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
        Top Predictor
      </span>
    )
  }

  if (type === 'platform') {
    const colors = {
      youtube: 'bg-red-500/20 text-red-400 border-red-500/30',
      x: 'bg-white/10 text-text-primary border-white/20',
      tiktok: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    }
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full typo-micro font-semibold border ${colors[value] || colors.x} ${className}`}>
        <PlatformIcon platform={value} size={10} />
        {value === 'x' ? 'X' : value === 'youtube' ? 'YouTube' : 'TikTok'}
      </span>
    )
  }

  return null
}
