import { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { regulationCountries, regulationById } from '../../data/regulationData'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import RegulationMap from './RegulationMap'
import CountryPanel from './CountryPanel'
import RegulationFilters from './RegulationFilters'
import CountryCompare from './CountryCompare'
import RegulationHotBadge from './RegulationHotBadge'

const statusConfig = {
  favorable: {
    label: { it: 'Favorevole', en: 'Favorable' },
    dot: 'bg-neon-green',
  },
  neutral: {
    label: { it: 'Neutrale', en: 'Neutral' },
    dot: 'bg-neon-amber',
  },
  restrictive: {
    label: { it: 'Restrittivo', en: 'Restrictive' },
    dot: 'bg-orange-400',
  },
  ban: {
    label: { it: 'Vietato', en: 'Banned' },
    dot: 'bg-neon-red',
  },
}

export default function RegulationSection() {
  const { lang } = useLanguage()
  const [filterRegion, setFilterRegion] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [compareList, setCompareList] = useState([])

  // Filtered countries
  const filtered = useMemo(() => {
    return regulationCountries.filter(c => {
      if (filterRegion !== 'all' && c.region !== filterRegion) return false
      if (filterStatus !== 'all' && c.status !== filterStatus) return false
      return true
    })
  }, [filterRegion, filterStatus])

  const filteredIds = useMemo(() => filtered.map(c => c.id), [filtered])

  // Select a country — opens the detail panel
  const handleSelectCountry = useCallback((id) => {
    setSelectedCountry(prev => prev === id ? null : id)
  }, [])

  // Close the country panel
  const handleClosePanel = useCallback(() => {
    setSelectedCountry(null)
  }, [])

  // Toggle country in compare list (max 3)
  const handleToggleCompare = useCallback((id) => {
    setCompareList(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id)
      if (prev.length >= 3) return prev // max 3
      return [...prev, id]
    })
  }, [])

  const handleRemoveCompare = useCallback((id) => {
    setCompareList(prev => prev.filter(x => x !== id))
  }, [])

  return (
    <SectionWrapper id="regulation">
      <SectionHeading
        title={t('regulationTitle', lang)}
        subtitle={t('regulationSubtitle', lang)}
        glowColor="amber"
      />

      {/* Filters */}
      <RegulationFilters
        region={filterRegion}
        onRegionChange={setFilterRegion}
        status={filterStatus}
        onStatusChange={setFilterStatus}
      />

      {/* Main content: map (desktop) or list (mobile) + detail panel */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Map / List — takes 3 cols on desktop */}
        <div className="lg:col-span-3 space-y-4">
          {/* Desktop: SVG map */}
          <div className="hidden md:block">
            <RegulationMap
              onSelectCountry={handleSelectCountry}
              selectedCountryId={selectedCountry}
              filteredIds={filteredIds}
            />
          </div>

          {/* Mobile: scrollable list */}
          <div className="md:hidden space-y-2">
            <AnimatePresence>
              {filtered.length === 0 ? (
                <motion.div
                  className="panel p-8 text-center"
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <p className="text-text-secondary text-sm">
                    {lang === 'it'
                      ? 'Nessun paese trovato con i filtri selezionati'
                      : 'No countries found with selected filters'}
                  </p>
                </motion.div>
              ) : (
                filtered.map(c => (
                  <MobileCountryRow
                    key={c.id}
                    country={c}
                    lang={lang}
                    isSelected={selectedCountry === c.id}
                    isComparing={compareList.includes(c.id)}
                    onSelect={handleSelectCountry}
                    onToggleCompare={handleToggleCompare}
                    compareDisabled={compareList.length >= 3 && !compareList.includes(c.id)}
                  />
                ))
              )}
            </AnimatePresence>
          </div>

          {/* Desktop: country list below map for selection */}
          <div className="hidden md:block">
            <motion.div
              className="grid grid-cols-2 xl:grid-cols-3 gap-2"
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {filtered.map(c => (
                <DesktopCountryChip
                  key={c.id}
                  country={c}
                  lang={lang}
                  isSelected={selectedCountry === c.id}
                  isComparing={compareList.includes(c.id)}
                  onSelect={handleSelectCountry}
                  onToggleCompare={handleToggleCompare}
                  compareDisabled={compareList.length >= 3 && !compareList.includes(c.id)}
                />
              ))}
            </motion.div>
          </div>
        </div>

        {/* Detail panel — takes 2 cols on desktop */}
        <div className="lg:col-span-2">
          {selectedCountry ? (
            <CountryPanel
              countryId={selectedCountry}
              onClose={handleClosePanel}
            />
          ) : (
            <motion.div
              className="panel panel-dark p-8 md:p-10 flex flex-col items-center justify-center text-center h-full min-h-[300px]"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <svg className="w-12 h-12 text-text-tertiary mb-4 opacity-40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10A15.3 15.3 0 0112 2z" />
              </svg>
              <p className="text-text-secondary text-sm">
                {lang === 'it'
                  ? 'Seleziona un paese dalla mappa o dalla lista per vedere i dettagli regolamentari'
                  : 'Select a country from the map or list to view regulatory details'}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Compare panel */}
      {compareList.length >= 2 && (
        <div className="mt-8">
          <CountryCompare
            selectedCountries={compareList}
            onRemoveCountry={handleRemoveCompare}
          />
        </div>
      )}
    </SectionWrapper>
  )
}

/* ─── Mobile Country Row ─── */
function MobileCountryRow({ country, lang, isSelected, isComparing, onSelect, onToggleCompare, compareDisabled }) {
  const sc = statusConfig[country.status]

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      exit="hidden"
      className={`panel p-3 flex items-center gap-3 cursor-pointer transition-all ${
        isSelected ? 'border-neon-amber/40 bg-neon-amber/5' : ''
      }`}
      onClick={() => onSelect(country.id)}
    >
      {/* Status dot */}
      <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${sc.dot}`} />

      {/* Country name + status */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-text-primary truncate">
            {l(country.name, lang)}
          </span>
          <RegulationHotBadge lastUpdated={country.lastUpdated} />
        </div>
        <span className="text-xs text-text-tertiary">
          {l(sc.label, lang)}
        </span>
      </div>

      {/* Compare toggle */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleCompare(country.id)
        }}
        disabled={compareDisabled}
        className={`px-2 py-1 text-[10px] font-semibold rounded-md border transition-all shrink-0 ${
          isComparing
            ? 'border-neon-purple/40 bg-neon-purple/10 text-neon-purple'
            : compareDisabled
              ? 'border-white/5 text-text-tertiary opacity-40 cursor-not-allowed'
              : 'border-white/10 text-text-secondary hover:border-white/20'
        }`}
        title={lang === 'it' ? 'Confronta' : 'Compare'}
      >
        {isComparing ? 'VS' : '+VS'}
      </button>
    </motion.div>
  )
}

/* ─── Desktop Country Chip ─── */
function DesktopCountryChip({ country, lang, isSelected, isComparing, onSelect, onToggleCompare, compareDisabled }) {
  const sc = statusConfig[country.status]

  return (
    <motion.div
      variants={fadeInUp}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-xl border cursor-pointer transition-all ${
        isSelected
          ? 'border-neon-amber/40 bg-neon-amber/8'
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
      }`}
      onClick={() => onSelect(country.id)}
    >
      <span className={`w-2 h-2 rounded-full shrink-0 ${sc.dot}`} />

      <span className="text-xs font-medium text-text-primary truncate flex-1">
        {l(country.name, lang)}
      </span>

      <RegulationHotBadge lastUpdated={country.lastUpdated} />

      <button
        onClick={(e) => {
          e.stopPropagation()
          onToggleCompare(country.id)
        }}
        disabled={compareDisabled}
        className={`px-1.5 py-0.5 text-[9px] font-bold rounded border transition-all shrink-0 ${
          isComparing
            ? 'border-neon-purple/40 bg-neon-purple/10 text-neon-purple'
            : compareDisabled
              ? 'border-white/5 text-text-tertiary opacity-30 cursor-not-allowed'
              : 'border-white/10 text-text-tertiary hover:text-text-secondary hover:border-white/20'
        }`}
      >
        {isComparing ? 'VS' : '+'}
      </button>
    </motion.div>
  )
}
