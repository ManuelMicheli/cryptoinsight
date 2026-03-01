import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import ImpactBadge from './ImpactBadge'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'

export default function RegulationEventCard({ regulation }) {
  const { lang } = useLanguage()

  // Parse date — supports "YYYY-MM" or "YYYY-MM-DD"
  const dateParts = regulation.date.split('-')
  const dateObj = new Date(
    parseInt(dateParts[0]),
    parseInt(dateParts[1]) - 1,
    dateParts[2] ? parseInt(dateParts[2]) : 1
  )
  const day = dateParts[2] ? dateObj.getDate() : null
  const month = dateObj
    .toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { month: 'short' })
    .toUpperCase()
  const year = dateObj.getFullYear()

  return (
    <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6">
      {/* Date */}
      <div className="flex-shrink-0 w-20 md:w-24 text-center pt-2">
        {day ? (
          <div className="font-heading typo-stat font-bold text-neon-cyan">
            {day}
          </div>
        ) : (
          <div className="font-heading typo-h2 font-bold text-neon-cyan">
            {month}
          </div>
        )}
        <div className="typo-ui-sm text-text-secondary mt-1 tracking-widest">
          {day ? month : year}
        </div>
      </div>

      {/* Content */}
      <div
        className="panel panel-dark flex-1 border-l-2 border-neon-cyan/30"
        style={{ minHeight: 'auto' }}
      >
        {/* Header: Flag + Country + Impact */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            {regulation.flag && (
              <span className="text-xl" role="img" aria-label={l(regulation.countryName, lang)}>
                {regulation.flag}
              </span>
            )}
            <h4 className="typo-h3 font-semibold text-text-primary">
              {l(regulation.countryName, lang)}
            </h4>
          </div>
          <ImpactBadge impact={regulation.impact} />
        </div>

        {/* Type badge */}
        {regulation.type && (
          <div className="mb-3">
            <span className="px-3 py-1.5 rounded-full bg-neon-cyan/10 text-neon-cyan typo-ui-sm font-medium">
              {l(regulation.type, lang)}
            </span>
          </div>
        )}

        {/* Description */}
        <p className="text-text-secondary typo-body mb-4">
          {l(regulation.description, lang)}
        </p>

        {/* Affected tokens */}
        {regulation.affectedTokens && regulation.affectedTokens.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {regulation.affectedTokens.map((token) => (
              <span
                key={token}
                className="px-2 py-0.5 rounded-full bg-white/5 text-text-secondary text-xs font-medium border border-white/10"
              >
                {token}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}
