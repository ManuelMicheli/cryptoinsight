import { motion, AnimatePresence } from 'motion/react'
import { slideInRight } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { regulationById } from '../../data/regulationData'
import GlassCard from '../ui/GlassCard'
import RegulationHotBadge from './RegulationHotBadge'

const statusConfig = {
  favorable: {
    label: { it: 'Favorevole', en: 'Favorable' },
    class: 'bg-neon-green/15 text-neon-green border-neon-green/30',
  },
  neutral: {
    label: { it: 'Neutrale', en: 'Neutral' },
    class: 'bg-neon-amber/15 text-neon-amber border-neon-amber/30',
  },
  restrictive: {
    label: { it: 'Restrittivo', en: 'Restrictive' },
    class: 'bg-orange-400/15 text-orange-400 border-orange-400/30',
  },
  ban: {
    label: { it: 'Vietato', en: 'Banned' },
    class: 'bg-neon-red/15 text-neon-red border-neon-red/30',
  },
}

const sectionLabels = {
  taxation: { it: 'Tassazione', en: 'Taxation' },
  etf: { it: 'ETF & Prodotti', en: 'ETFs & Products' },
  stablecoinReg: { it: 'Stablecoin', en: 'Stablecoins' },
  mining: { it: 'Mining', en: 'Mining' },
  exchangeLicensing: { it: 'Exchange & Licenze', en: 'Exchange & Licensing' },
}

const sectionIcons = {
  taxation: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  etf: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 16l4-8 4 4 6-8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  stablecoinReg: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v12M8 10h8M8 14h8" strokeLinecap="round" />
    </svg>
  ),
  mining: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 2v6h6M10 13l-2 2 2 2M14 13l2 2-2 2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  exchangeLicensing: (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" strokeLinecap="round" />
    </svg>
  ),
}

export default function CountryPanel({ countryId, onClose }) {
  const { lang } = useLanguage()

  return (
    <AnimatePresence mode="wait">
      {countryId && regulationById[countryId] ? (
        <motion.div
          key={countryId}
          variants={slideInRight}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="w-full"
        >
          <CountryPanelContent
            country={regulationById[countryId]}
            lang={lang}
            onClose={onClose}
          />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

function CountryPanelContent({ country, lang, onClose }) {
  const status = statusConfig[country.status]

  return (
    <GlassCard variant="dark" hover={false} className="relative p-5 md:p-6 space-y-5">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full border border-white/10 text-text-secondary hover:text-white hover:border-white/25 transition-colors"
        aria-label="Close"
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
        </svg>
      </button>

      {/* Header */}
      <div className="pr-10">
        <div className="flex items-center gap-3 mb-2">
          <h3 className="typo-h2 font-heading font-bold text-text-primary">
            {l(country.name, lang)}
          </h3>
          <RegulationHotBadge lastUpdated={country.lastUpdated} />
        </div>

        <div className="flex items-center gap-3">
          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${status.class}`}>
            {l(status.label, lang)}
          </span>
          <span className="text-text-tertiary text-xs">
            {lang === 'it' ? 'Aggiornato:' : 'Updated:'} {country.lastUpdated}
          </span>
        </div>
      </div>

      {/* Detail sections */}
      <div className="space-y-3">
        {Object.entries(sectionLabels).map(([key, label]) => (
          <div
            key={key}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
          >
            <div className="flex items-center gap-2 mb-1.5 text-text-secondary">
              {sectionIcons[key]}
              <span className="text-xs font-semibold uppercase tracking-wider">
                {l(label, lang)}
              </span>
            </div>
            <p className="text-sm text-text-primary leading-relaxed">
              {l(country[key], lang)}
            </p>
          </div>
        ))}
      </div>

      {/* Recent Changes Timeline */}
      {country.recentChanges?.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
            {lang === 'it' ? 'Aggiornamenti Recenti' : 'Recent Updates'}
          </h4>
          <div className="space-y-2.5 relative">
            {/* Timeline line */}
            <div className="absolute left-[5px] top-2 bottom-2 w-px bg-gradient-to-b from-neon-amber/40 to-transparent" />

            {country.recentChanges.map((change, i) => (
              <div key={i} className="flex items-start gap-3 pl-1">
                <span className="relative z-10 mt-1.5 w-2.5 h-2.5 rounded-full bg-neon-amber/60 border border-neon-amber/30 shrink-0" />
                <div>
                  <span className="text-[10px] font-mono text-neon-amber/80 block mb-0.5">
                    {change.date}
                  </span>
                  <p className="text-sm text-text-primary leading-snug">
                    {l(change.description, lang)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </GlassCard>
  )
}
