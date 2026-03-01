import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'

export default function BriefHeader({ weekNumber, dateRange, isLatest }) {
  const { lang } = useLanguage()

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <motion.div
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      variants={fadeInUp}
    >
      <div className="space-y-2">
        <div className="flex items-center gap-4">
          <h3
            className="font-heading font-bold text-neon-amber text-glow-amber typo-h2"
          >
            {lang === 'it' ? 'SETTIMANA' : 'WEEK'} {weekNumber}
          </h3>
          {isLatest && (
            <span
              className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neon-amber/20 text-neon-amber border border-neon-amber/30"
              style={{
                boxShadow: '0 0 12px rgba(245,158,11,0.3), 0 0 30px rgba(245,158,11,0.1)',
              }}
            >
              {lang === 'it' ? 'Ultimo' : 'Latest'}
            </span>
          )}
        </div>
        <p className="text-text-secondary font-body text-sm tracking-wide">
          {formatDate(dateRange.start)} — {formatDate(dateRange.end)}, 2026
        </p>
      </div>

      <div className="text-text-secondary/50 text-xs font-body">
        {lang === 'it' ? 'Aggiornamento settimanale' : 'Weekly update'}
      </div>
    </motion.div>
  )
}
