import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'

const regionLabels = {
  all: { it: 'Tutte', en: 'All' },
  europe: { it: 'Europa', en: 'Europe' },
  asia: { it: 'Asia', en: 'Asia' },
  americas: { it: 'Americhe', en: 'Americas' },
  africa: { it: 'Africa', en: 'Africa' },
  oceania: { it: 'Oceania', en: 'Oceania' },
}

const statusLabels = {
  all: { it: 'Tutti', en: 'All' },
  favorable: { it: 'Favorevole', en: 'Favorable' },
  neutral: { it: 'Neutrale', en: 'Neutral' },
  restrictive: { it: 'Restrittivo', en: 'Restrictive' },
  ban: { it: 'Vietato', en: 'Banned' },
}

const statusAccent = {
  all: 'neon-cyan',
  favorable: 'neon-green',
  neutral: 'neon-amber',
  restrictive: 'orange-400',
  ban: 'neon-red',
}

export default function RegulationFilters({
  region,
  onRegionChange,
  status,
  onStatusChange,
}) {
  const { lang } = useLanguage()

  return (
    <motion.div
      className="flex flex-col sm:flex-row flex-wrap items-start sm:items-center gap-4 mb-6"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Region filters */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-text-tertiary text-xs font-semibold uppercase tracking-wider self-center mr-1">
          {lang === 'it' ? 'Regione' : 'Region'}
        </span>
        {Object.entries(regionLabels).map(([key, label]) => (
          <button
            key={key}
            onClick={() => onRegionChange(key)}
            className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
              region === key
                ? 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber'
                : 'border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
            }`}
          >
            {label[lang]}
          </button>
        ))}
      </div>

      {/* Divider (desktop) */}
      <div className="hidden sm:block w-px h-6 bg-white/10" />

      {/* Status filters */}
      <div className="flex gap-2 flex-wrap">
        <span className="text-text-tertiary text-xs font-semibold uppercase tracking-wider self-center mr-1">
          {lang === 'it' ? 'Stato' : 'Status'}
        </span>
        {Object.entries(statusLabels).map(([key, label]) => {
          const accent = statusAccent[key]
          const isActive = status === key

          // Build dynamic class strings for each accent color
          const activeClasses = {
            'neon-cyan': 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan',
            'neon-green': 'border-neon-green/40 bg-neon-green/10 text-neon-green',
            'neon-amber': 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber',
            'orange-400': 'border-orange-400/40 bg-orange-400/10 text-orange-400',
            'neon-red': 'border-neon-red/40 bg-neon-red/10 text-neon-red',
          }

          return (
            <button
              key={key}
              onClick={() => onStatusChange(key)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                isActive
                  ? activeClasses[accent]
                  : 'border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
            >
              {label[lang]}
            </button>
          )
        })}
      </div>
    </motion.div>
  )
}
