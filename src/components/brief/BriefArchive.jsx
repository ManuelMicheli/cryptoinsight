import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'

export default function BriefArchive({ briefs, selectedWeek, onSelectWeek }) {
  const { lang } = useLanguage()

  const formatDateShort = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short',
    })
  }

  return (
    <motion.div variants={fadeInUp}>
      <div className="flex items-center gap-3 mb-4">
        <div className="w-2 h-2 rounded-full bg-neon-purple animate-glow-pulse" />
        <span className="text-text-secondary text-xs font-body uppercase tracking-widest">
          {lang === 'it' ? 'Archivio Brief' : 'Brief Archive'}
        </span>
      </div>

      <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
        {briefs.map((brief) => {
          const isSelected = brief.weekNumber === selectedWeek
          return (
            <button
              key={brief.weekNumber}
              onClick={() => onSelectWeek(brief.weekNumber)}
              className={`
                relative flex-shrink-0 px-5 py-3 rounded-xl border transition-all duration-300
                font-body text-sm
                ${isSelected
                  ? 'bg-neon-purple/15 border-neon-purple/40 text-neon-purple'
                  : 'bg-white/[0.02] border-white/[0.06] text-text-secondary hover:border-white/10 hover:text-text-primary'
                }
              `}
              style={isSelected ? {
                boxShadow: '0 0 20px rgba(139,92,246,0.15), 0 0 40px rgba(139,92,246,0.05)',
              } : undefined}
            >
              <span className="font-heading font-semibold block">
                {lang === 'it' ? 'Sett.' : 'Week'} {brief.weekNumber}
              </span>
              <span className="text-xs opacity-60 block mt-0.5">
                {formatDateShort(brief.dateRange.start)} — {formatDateShort(brief.dateRange.end)}
              </span>

              {brief.isLatest && (
                <span className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full bg-neon-purple"
                  style={{ boxShadow: '0 0 8px rgba(139,92,246,0.6)' }}
                />
              )}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
