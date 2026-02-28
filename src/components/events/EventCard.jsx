import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import ImpactBadge from './ImpactBadge'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'

export default function EventCard({ event }) {
  const { lang } = useLanguage()
  const date = new Date(event.date)
  const day = date.getDate()
  const month = date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { month: 'short' }).toUpperCase()

  return (
    <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6">
      {/* Date */}
      <div className="flex-shrink-0 w-20 md:w-24 text-center pt-2">
        <div className="font-heading text-3xl md:text-4xl font-bold text-neon-amber">{day}</div>
        <div className="text-xs md:text-sm text-text-secondary mt-1 tracking-widest">{month}</div>
      </div>

      {/* Content */}
      <div className="panel panel-dark flex-1 border-l-2 border-neon-amber/30" style={{ minHeight: 'auto' }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h4 className="text-lg md:text-xl font-semibold text-text-primary">{l(event.title, lang)}</h4>
          <ImpactBadge impact={event.impact} />
        </div>
        <div className="flex items-center gap-3 mb-4 text-sm text-text-secondary">
          <span className="px-3 py-1.5 rounded-full bg-white/5 text-xs md:text-sm">{l(event.crypto, lang)}</span>
          <span>{l(event.type, lang)}</span>
        </div>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">{l(event.description, lang)}</p>
      </div>
    </motion.div>
  )
}
