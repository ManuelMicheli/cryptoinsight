import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { COIN_IDS } from '../../utils/constants'
import { cryptoMeta } from '../../data/cryptoMeta'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import WhaleActivityFeed from './WhaleActivityFeed'
import WhaleAlert from './WhaleAlert'
import { whaleTransactions, WHALE_ALERT_THRESHOLD } from '../../data/whaleData'

const TYPES = ['all', 'accumulo', 'distribuzione', 'trasferimento', 'defi']
const typeLabels = {
  all: { it: 'Tutti', en: 'All' },
  accumulo: { it: 'Accumulo', en: 'Accumulation' },
  distribuzione: { it: 'Distribuzione', en: 'Distribution' },
  trasferimento: { it: 'Trasferimento', en: 'Transfer' },
  defi: { it: 'DeFi', en: 'DeFi' },
}

export default function WhaleSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false) // TODO: Replace with API call
  const [filterCrypto, setFilterCrypto] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [minSize] = useState(0)

  const alertTx = whaleTransactions.find(tx => tx.valueUsd >= WHALE_ALERT_THRESHOLD)

  const filtered = useMemo(() => {
    return whaleTransactions.filter(tx => {
      if (filterCrypto !== 'all' && tx.asset !== filterCrypto) return false
      if (filterType !== 'all' && tx.type !== filterType) return false
      if (tx.valueUsd < minSize) return false
      return true
    })
  }, [filterCrypto, filterType, minSize])

  return (
    <SectionWrapper id="whale-tracker">
      <SectionHeading
        title={t('whaleTitle', lang)}
        subtitle={t('whaleSubtitle', lang)}
        glowColor="cyan"
      />

      {alertTx && <WhaleAlert transaction={alertTx} />}

      {/* Filters */}
      <motion.div
        className="flex flex-wrap items-center gap-3 mb-6"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Crypto filter */}
        <select
          value={filterCrypto}
          onChange={e => setFilterCrypto(e.target.value)}
          className="panel px-3 py-2 text-sm text-text-primary bg-transparent border border-glass-border rounded-xl appearance-none cursor-pointer focus:outline-none focus:border-neon-cyan/40"
        >
          <option value="all">{t('whaleFilterAll', lang)}</option>
          {COIN_IDS.map(id => (
            <option key={id} value={id}>{cryptoMeta[id]?.name || id}</option>
          ))}
        </select>

        {/* Type filter */}
        <div className="flex gap-2 flex-wrap">
          {TYPES.map(type => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${
                filterType === type
                  ? 'border-neon-cyan/40 bg-neon-cyan/10 text-neon-cyan'
                  : 'border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
              }`}
            >
              {typeLabels[type][lang]}
            </button>
          ))}
        </div>
      </motion.div>

      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="panel p-4">
              <SkeletonLoader lines={3} />
            </div>
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <motion.div
          className="panel p-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-text-secondary text-lg">{t('whaleEmpty', lang)}</p>
        </motion.div>
      ) : (
        <WhaleActivityFeed transactions={filtered} />
      )}
    </SectionWrapper>
  )
}
