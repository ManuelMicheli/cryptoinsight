import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import UnlockEventCard from './UnlockEventCard'

const DAYS_IT = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']
const DAYS_EN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function UnlockCalendar({ events, view, onViewChange }) {
  const { lang } = useLanguage()
  const [currentMonth, setCurrentMonth] = useState(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), 1)
  })

  const dayNames = lang === 'it' ? DAYS_IT : DAYS_EN

  const calendarDays = useMemo(() => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startPad = (firstDay.getDay() + 6) % 7 // Monday start

    const days = []
    for (let i = 0; i < startPad; i++) days.push(null)
    for (let d = 1; d <= lastDay.getDate(); d++) {
      const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
      const dayEvents = events.filter(e => e.date === dateStr)
      days.push({ day: d, date: dateStr, events: dayEvents })
    }
    return days
  }, [currentMonth, events])

  const monthLabel = currentMonth.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { month: 'long', year: 'numeric' })

  if (view === 'list') {
    return (
      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {events.map(event => (
          <UnlockEventCard key={event.id} event={event} />
        ))}
      </motion.div>
    )
  }

  return (
    <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
      {/* Month navigation */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
          className="text-text-secondary hover:text-text-primary text-sm px-3 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
        >
          ←
        </button>
        <span className="font-heading text-sm font-bold text-text-primary capitalize">{monthLabel}</span>
        <button
          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
          className="text-text-secondary hover:text-text-primary text-sm px-3 py-1 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
        >
          →
        </button>
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {dayNames.map(d => (
          <div key={d} className="text-center text-text-secondary text-xs py-2 font-medium">{d}</div>
        ))}
        {calendarDays.map((cell, i) => (
          <div
            key={i}
            className={`aspect-square rounded-lg flex flex-col items-center justify-center text-xs transition-colors ${
              cell
                ? cell.events.length > 0
                  ? 'bg-neon-amber/10 border border-neon-amber/30 text-neon-amber cursor-pointer hover:bg-neon-amber/20'
                  : 'text-text-secondary hover:bg-white/5'
                : ''
            }`}
          >
            {cell && (
              <>
                <span>{cell.day}</span>
                {cell.events.length > 0 && (
                  <div className="flex gap-0.5 mt-0.5">
                    {cell.events.map((_, j) => (
                      <div key={j} className="w-1.5 h-1.5 rounded-full bg-neon-amber" />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </motion.div>
  )
}
