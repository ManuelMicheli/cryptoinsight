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
        <div className="font-heading typo-stat font-bold text-neon-amber">{day}</div>
        <div className="typo-ui-sm text-text-secondary mt-1 tracking-widest">{month}</div>
      </div>

      {/* Content */}
      <div className="panel panel-dark flex-1 border-l-2 border-neon-amber/30" style={{ minHeight: 'auto' }}>
        <div className="flex items-start justify-between gap-4 mb-3">
          <h4 className="typo-h3 font-semibold text-text-primary">{l(event.title, lang)}</h4>
          <ImpactBadge impact={event.impact} />
        </div>
        <div className="flex items-center gap-3 mb-4 typo-body-sm text-text-secondary">
          <span className="px-3 py-1.5 rounded-full bg-white/5 typo-ui-sm">{l(event.crypto, lang)}</span>
          <span>{l(event.type, lang)}</span>
        </div>
        <p className="text-text-secondary typo-body">{l(event.description, lang)}</p>
      </div>
    </motion.div>
  )
}
