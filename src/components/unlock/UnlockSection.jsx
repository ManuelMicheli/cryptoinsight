import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { COIN_IDS } from '../../utils/constants'
import { cryptoMeta } from '../../data/cryptoMeta'
import { unlockEvents } from '../../data/unlockData'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import UnlockCalendar from './UnlockCalendar'

export default function UnlockSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false) // TODO: Replace with API call
  const [view, setView] = useState('list')
  const [filterToken, setFilterToken] = useState('all')

  const filtered = useMemo(() => {
    if (filterToken === 'all') return unlockEvents
    return unlockEvents.filter(e => e.coinId === filterToken)
  }, [filterToken])

  return (
    <SectionWrapper id="unlock">
      <SectionHeading
        title={t('unlockTitle', lang)}
        subtitle={t('unlockSubtitle', lang)}
        glowColor="amber"
      />

      {/* Controls */}
      <motion.div
        className="flex flex-wrap items-center justify-between gap-3 mb-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <select
          value={filterToken}
          onChange={e => setFilterToken(e.target.value)}
          className="panel px-3 py-2 text-sm text-text-primary bg-transparent border border-glass-border rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-neon-amber/40"
        >
          <option value="all">{lang === 'it' ? 'Tutti i token' : 'All tokens'}</option>
          {COIN_IDS.map(id => (
            <option key={id} value={id}>{cryptoMeta[id]?.name || id}</option>
          ))}
        </select>

        <div className="flex gap-2">
          {['calendar', 'list'].map(v => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all ${
                view === v
                  ? 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber'
                  : 'border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
            >
              {v === 'calendar' ? (lang === 'it' ? 'Calendario' : 'Calendar') : (lang === 'it' ? 'Lista' : 'List')}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="panel p-8">
          <SkeletonLoader lines={8} />
        </div>
      ) : (
        <UnlockCalendar events={filtered} view={view} />
      )}
    </SectionWrapper>
  )
}
