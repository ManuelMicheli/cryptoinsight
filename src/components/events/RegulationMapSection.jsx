import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { regulationCountries } from '../../data/regulationData'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'

/* ── Country flags by id ── */
const FLAGS = {
  us: '\u{1F1FA}\u{1F1F8}', de: '\u{1F1E9}\u{1F1EA}', fr: '\u{1F1EB}\u{1F1F7}', it: '\u{1F1EE}\u{1F1F9}',
  es: '\u{1F1EA}\u{1F1F8}', nl: '\u{1F1F3}\u{1F1F1}', gb: '\u{1F1EC}\u{1F1E7}', ch: '\u{1F1E8}\u{1F1ED}',
  jp: '\u{1F1EF}\u{1F1F5}', kr: '\u{1F1F0}\u{1F1F7}', sg: '\u{1F1F8}\u{1F1EC}', au: '\u{1F1E6}\u{1F1FA}',
  ca: '\u{1F1E8}\u{1F1E6}', br: '\u{1F1E7}\u{1F1F7}', ar: '\u{1F1E6}\u{1F1F7}', in: '\u{1F1EE}\u{1F1F3}',
  cn: '\u{1F1E8}\u{1F1F3}', ru: '\u{1F1F7}\u{1F1FA}', ae: '\u{1F1E6}\u{1F1EA}', sv: '\u{1F1F8}\u{1F1FB}',
  ng: '\u{1F1F3}\u{1F1EC}', tr: '\u{1F1F9}\u{1F1F7}', th: '\u{1F1F9}\u{1F1ED}', hk: '\u{1F1ED}\u{1F1F0}',
  pt: '\u{1F1F5}\u{1F1F9}', mt: '\u{1F1F2}\u{1F1F9}', ee: '\u{1F1EA}\u{1F1EA}',
}

/* ── Region labels ── */
const REGIONS = {
  americas: { it: 'Americhe', en: 'Americas' },
  europe:   { it: 'Europa', en: 'Europe' },
  asia:     { it: 'Asia-Pacifico', en: 'Asia-Pacific' },
  oceania:  { it: 'Asia-Pacifico', en: 'Asia-Pacific' },
  africa:   { it: 'Africa e Medio Oriente', en: 'Africa & Middle East' },
}

/* ── Status styles ── */
const STATUS_STYLES = {
  favorable:   { color: 'text-neon-green',  bg: 'bg-neon-green/10',  border: 'border-neon-green/20',  dot: 'bg-neon-green',  label: { it: 'Favorevole', en: 'Favorable' } },
  neutral:     { color: 'text-neon-amber',  bg: 'bg-neon-amber/10',  border: 'border-neon-amber/20',  dot: 'bg-neon-amber',  label: { it: 'Neutrale', en: 'Neutral' } },
  restrictive: { color: 'text-orange-400',  bg: 'bg-orange-500/10',  border: 'border-orange-500/20',  dot: 'bg-orange-500',  label: { it: 'Restrittivo', en: 'Restrictive' } },
  ban:         { color: 'text-neon-red',    bg: 'bg-neon-red/10',    border: 'border-neon-red/20',    dot: 'bg-neon-red',    label: { it: 'Vietato', en: 'Banned' } },
}

/* ── Regulation field labels ── */
const FIELD_LABELS = {
  taxation:         { it: 'Tassazione', en: 'Taxation' },
  etf:              { it: 'ETF', en: 'ETFs' },
  stablecoinReg:    { it: 'Stablecoin', en: 'Stablecoins' },
  mining:           { it: 'Mining', en: 'Mining' },
  exchangeLicensing:{ it: 'Licenze Exchange', en: 'Exchange Licensing' },
}

const FIELDS = ['taxation', 'etf', 'stablecoinReg', 'mining', 'exchangeLicensing']

/* ── Merge oceania into asia for display grouping ── */
function getDisplayRegion(region) {
  if (region === 'oceania') return 'asia'
  return region
}

/* ── Country Card ── */
function CountryCard({ country, isSelected, isCompare, onClick }) {
  const { lang } = useLanguage()
  const s = STATUS_STYLES[country.status] || STATUS_STYLES.neutral

  return (
    <motion.button
      variants={fadeInUp}
      onClick={onClick}
      className={`relative w-full text-left px-4 py-3 rounded-xl border transition-all duration-200
        ${isSelected
          ? `${s.bg} ${s.border} border`
          : isCompare
            ? 'bg-neon-purple/8 border-neon-purple/20 border'
            : 'bg-white/[0.03] border-white/[0.06] hover:bg-white/[0.06] hover:border-white/10'
        }
      `}
    >
      <div className="flex items-center gap-3">
        <span className="text-lg">{FLAGS[country.id] || ''}</span>
        <span className="text-sm font-medium text-text-primary truncate flex-1">
          {l(country.name, lang)}
        </span>
        <span className={`w-2 h-2 rounded-full ${s.dot} flex-shrink-0`} />
      </div>
    </motion.button>
  )
}

/* ── Detail Panel ── */
function DetailPanel({ country, onClose }) {
  const { lang } = useLanguage()
  const s = STATUS_STYLES[country.status] || STATUS_STYLES.neutral

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="panel panel-dark border-l-2 border-neon-cyan/30 overflow-y-auto"
      data-lenis-prevent
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{FLAGS[country.id] || ''}</span>
          <div>
            <h3 className="text-xl font-bold text-text-primary">
              {l(country.name, lang)}
            </h3>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${s.color} mt-1`}>
              <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`} />
              {l(s.label, lang)}
            </span>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        {FIELDS.map((field) => (
          <div key={field}>
            <h4 className="text-xs font-semibold text-neon-cyan uppercase tracking-wider mb-2">
              {l(FIELD_LABELS[field], lang)}
            </h4>
            <p className="text-sm text-text-secondary leading-relaxed">
              {l(country[field], lang)}
            </p>
          </div>
        ))}
      </div>

      {/* Recent changes */}
      {country.recentChanges && country.recentChanges.length > 0 && (
        <div className="mt-6 pt-5 border-t border-white/5">
          <h4 className="text-xs font-semibold text-neon-amber uppercase tracking-wider mb-3">
            {lang === 'it' ? 'Cambiamenti recenti' : 'Recent Changes'}
          </h4>
          <div className="space-y-2">
            {country.recentChanges.map((change, i) => (
              <div key={i} className="flex gap-3 text-sm">
                <span className="text-text-secondary font-mono text-xs mt-0.5 flex-shrink-0">
                  {change.date}
                </span>
                <span className="text-text-secondary leading-relaxed">
                  {l(change.description, lang)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  )
}

/* ── Compare Panel ── */
function ComparePanel({ countries, onClose }) {
  const { lang } = useLanguage()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="panel panel-dark border border-neon-purple/20"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-text-primary">
          {lang === 'it' ? 'Confronto' : 'Comparison'}
        </h3>
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {/* Comparison table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left py-3 pr-4 text-text-secondary font-medium text-xs uppercase tracking-wider" />
              {countries.map((c) => {
                const s = STATUS_STYLES[c.status] || STATUS_STYLES.neutral
                return (
                  <th key={c.id} className="text-left py-3 px-3 min-w-[200px]">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{FLAGS[c.id]}</span>
                      <div>
                        <span className="text-text-primary font-semibold block">
                          {l(c.name, lang)}
                        </span>
                        <span className={`text-xs ${s.color}`}>{l(s.label, lang)}</span>
                      </div>
                    </div>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {FIELDS.map((field) => (
              <tr key={field} className="border-b border-white/5">
                <td className="py-3 pr-4 text-neon-cyan text-xs font-semibold uppercase tracking-wider whitespace-nowrap align-top">
                  {l(FIELD_LABELS[field], lang)}
                </td>
                {countries.map((c) => (
                  <td key={c.id} className="py-3 px-3 text-text-secondary leading-relaxed align-top">
                    {l(c[field], lang)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}

/* ── Status Legend ── */
function StatusLegend() {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-8">
      {Object.entries(STATUS_STYLES).map(([key, s]) => (
        <div key={key} className="flex items-center gap-2 typo-ui-sm text-text-secondary">
          <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
          {l(s.label, lang)}
        </div>
      ))}
    </div>

  )
}

/* ── Main Component ── */
export default function RegulationMapSection() {
  const { lang } = useLanguage()
  const [selected, setSelected] = useState(null)
  const [compareList, setCompareList] = useState([])
  const [compareMode, setCompareMode] = useState(false)

  const title = lang === 'it' ? 'MAPPA REGOLAMENTAZIONE' : 'REGULATION MAP'
  const subtitle =
    lang === 'it'
      ? 'Esplora le normative crypto di 27 paesi raggruppati per regione'
      : 'Explore crypto regulations across 27 countries grouped by region'

  // Group by display region
  const grouped = useMemo(() => {
    const regionOrder = ['americas', 'europe', 'asia', 'africa']
    const groups = {}
    regionOrder.forEach((r) => (groups[r] = []))

    regulationCountries.forEach((c) => {
      const dr = getDisplayRegion(c.region)
      if (!groups[dr]) groups[dr] = []
      groups[dr].push(c)
    })

    return regionOrder
      .filter((r) => groups[r] && groups[r].length > 0)
      .map((r) => ({ region: r, countries: groups[r] }))
  }, [])

  const regionLabels = {
    americas: REGIONS.americas,
    europe:   REGIONS.europe,
    asia:     REGIONS.asia,
    africa:   REGIONS.africa,
  }

  function handleCountryClick(country) {
    if (compareMode) {
      setCompareList((prev) => {
        const exists = prev.find((c) => c.id === country.id)
        if (exists) return prev.filter((c) => c.id !== country.id)
        if (prev.length >= 2) return [prev[1], country]
        return [...prev, country]
      })
    } else {
      setSelected((prev) => (prev?.id === country.id ? null : country))
    }
  }

  function handleCompareToggle() {
    if (compareMode) {
      setCompareMode(false)
      setCompareList([])
    } else {
      setCompareMode(true)
      setSelected(null)
    }
  }

  return (
    <SectionWrapper id="regulation-map">
      <SectionHeading title={title} subtitle={subtitle} glowColor="cyan" />
      <StatusLegend />

      {/* Compare button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={handleCompareToggle}
          className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
            compareMode
              ? 'glass glow-purple text-neon-purple'
              : 'bg-white/5 text-text-secondary hover:text-text-primary hover:bg-white/10'
          }`}
        >
          {compareMode
            ? lang === 'it'
              ? `Confronto attivo (${compareList.length}/2)`
              : `Compare active (${compareList.length}/2)`
            : lang === 'it'
              ? 'Confronta paesi'
              : 'Compare countries'}
        </button>
      </div>

      {/* Grid of regions + detail */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Country grid — takes 2 cols on large */}
        <div className={`${selected && !compareMode ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-8`}>
          {grouped.map(({ region, countries }) => (
            <motion.div
              key={region}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <h3 className="text-sm font-semibold text-text-secondary uppercase tracking-wider mb-4">
                {l(regionLabels[region], lang)}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-2.5">
                {countries.map((country) => (
                  <CountryCard
                    key={country.id}
                    country={country}
                    isSelected={selected?.id === country.id}
                    isCompare={compareList.some((c) => c.id === country.id)}
                    onClick={() => handleCountryClick(country)}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Detail panel (slide in) */}
        {!compareMode && (
          <AnimatePresence mode="wait">
            {selected && (
              <div className="lg:col-span-1">
                <div className="lg:sticky lg:top-24">
                  <DetailPanel
                    key={selected.id}
                    country={selected}
                    onClose={() => setSelected(null)}
                  />
                </div>
              </div>
            )}
          </AnimatePresence>
        )}
      </div>

      {/* Compare panel (below) */}
      <AnimatePresence>
        {compareMode && compareList.length === 2 && (
          <div className="mt-8">
            <ComparePanel
              countries={compareList}
              onClose={() => {
                setCompareMode(false)
                setCompareList([])
              }}
            />
          </div>
        )}
      </AnimatePresence>
    </SectionWrapper>
  )
}
