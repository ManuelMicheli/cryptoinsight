import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { l } from '../../i18n/translations'
import { useLanguage } from '../../contexts/LanguageContext'

const typeConfig = {
  tweet: { icon: '𝕏', color: 'text-neon-cyan', bg: 'bg-neon-cyan/10' },
  regolamentazione: { icon: '⚖️', color: 'text-neon-amber', bg: 'bg-neon-amber/10' },
  unlock: { icon: '🔓', color: 'text-neon-green', bg: 'bg-neon-green/10' },
  whale: { icon: '🐋', color: 'text-neon-purple', bg: 'bg-neon-purple/10' },
}

const impactConfig = {
  high: { color: 'text-neon-red', bg: 'bg-neon-red/10', label: { it: 'Alto', en: 'High' } },
  medium: { color: 'text-neon-amber', bg: 'bg-neon-amber/10', label: { it: 'Medio', en: 'Medium' } },
  low: { color: 'text-neon-green', bg: 'bg-neon-green/10', label: { it: 'Basso', en: 'Low' } },
}

function timeAgo(timestamp, lang) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const hours = Math.floor(diff / 3600000)
  const mins = Math.floor(diff / 60000)
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return lang === 'it' ? `${days}g fa` : `${days}d ago`
  }
  if (hours > 0) return lang === 'it' ? `${hours}h fa` : `${hours}h ago`
  return lang === 'it' ? `${mins}m fa` : `${mins}m ago`
}

export default function NarrativeEvent({ event }) {
  const { lang } = useLanguage()
  const tCfg = typeConfig[event.type] || typeConfig.tweet
  const iCfg = impactConfig[event.impactScore] || impactConfig.medium

  return (
    <motion.div
      className="flex items-start gap-3 py-3 border-b border-white/5 last:border-0"
      variants={fadeInUp}
    >
      <span className={`flex-shrink-0 w-8 h-8 rounded-lg ${tCfg.bg} flex items-center justify-center text-sm`}>
        {tCfg.icon}
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-sm font-medium leading-snug">
          {l(event.title, lang)}
        </p>
        <div className="flex items-center gap-3 mt-1.5">
          <span className="text-text-secondary text-xs">{event.source}</span>
          <span className="text-text-secondary text-xs">{timeAgo(event.timestamp, lang)}</span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${iCfg.bg} ${iCfg.color}`}>
            {l(iCfg.label, lang)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
