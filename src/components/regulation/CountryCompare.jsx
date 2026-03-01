import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { regulationById } from '../../data/regulationData'
import GlassCard from '../ui/GlassCard'

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

const compareFields = [
  { key: 'status', label: { it: 'Stato', en: 'Status' }, isStatus: true },
  { key: 'taxation', label: { it: 'Tassazione', en: 'Taxation' } },
  { key: 'etf', label: { it: 'ETF & Prodotti', en: 'ETFs & Products' } },
  { key: 'stablecoinReg', label: { it: 'Stablecoin', en: 'Stablecoins' } },
  { key: 'mining', label: { it: 'Mining', en: 'Mining' } },
  { key: 'exchangeLicensing', label: { it: 'Exchange & Licenze', en: 'Exchange & Licensing' } },
]

export default function CountryCompare({ selectedCountries = [], onRemoveCountry }) {
  const { lang } = useLanguage()

  const countries = selectedCountries
    .map(id => regulationById[id])
    .filter(Boolean)

  if (countries.length < 2) return null

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-heading font-bold text-text-primary">
          {lang === 'it' ? 'Confronto Paesi' : 'Country Comparison'}
        </h3>
        <span className="text-xs text-text-tertiary">
          {countries.length}/3 {lang === 'it' ? 'selezionati' : 'selected'}
        </span>
      </div>

      <GlassCard variant="dark" hover={false} className="overflow-x-auto">
        <table className="w-full min-w-[600px]">
          {/* Column headers = country names */}
          <thead>
            <tr className="border-b border-white/[0.06]">
              <th className="p-3 md:p-4 text-left text-xs font-semibold uppercase tracking-wider text-text-tertiary w-[140px]">
                {lang === 'it' ? 'Metrica' : 'Metric'}
              </th>
              {countries.map(c => (
                <th key={c.id} className="p-3 md:p-4 text-left">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-sm font-heading font-bold text-text-primary">
                      {l(c.name, lang)}
                    </span>
                    {onRemoveCountry && (
                      <button
                        onClick={() => onRemoveCountry(c.id)}
                        className="w-5 h-5 flex items-center justify-center rounded-full border border-white/10 text-text-tertiary hover:text-neon-red hover:border-neon-red/30 transition-colors shrink-0"
                        aria-label={`Remove ${c.name.en}`}
                      >
                        <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
                        </svg>
                      </button>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {compareFields.map((field, i) => (
              <tr
                key={field.key}
                className={i < compareFields.length - 1 ? 'border-b border-white/[0.04]' : ''}
              >
                <td className="p-3 md:p-4 text-xs font-semibold uppercase tracking-wider text-text-secondary align-top">
                  {l(field.label, lang)}
                </td>
                {countries.map(c => (
                  <td key={c.id} className="p-3 md:p-4 align-top">
                    {field.isStatus ? (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusConfig[c.status]?.class}`}>
                        {l(statusConfig[c.status]?.label, lang)}
                      </span>
                    ) : (
                      <p className="text-sm text-text-primary leading-relaxed">
                        {l(c[field.key], lang)}
                      </p>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </GlassCard>
    </motion.div>
  )
}
