import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import HealthMetricRow from './HealthMetricRow'

export default function HealthDetailPanel({ isOpen, data }) {
  const { lang } = useLanguage()
  if (!data) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className="pt-4 mt-4 border-t border-white/10 space-y-1">
            {/* GitHub */}
            <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 font-medium">GitHub</p>
            <HealthMetricRow
              label={lang === 'it' ? 'Contributori attivi' : 'Active contributors'}
              value={data.github.contributorsActive}
              sparkline={data.github.commits90d}
            />
            <HealthMetricRow
              label={lang === 'it' ? 'Issue resolution' : 'Issue resolution'}
              value={`${(data.github.issuesRatio * 100).toFixed(0)}%`}
            />

            {/* Security */}
            <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 mt-3 font-medium">
              {lang === 'it' ? 'Sicurezza' : 'Security'}
            </p>
            {data.security.audits.map((audit, i) => (
              <div key={i} className="flex items-center justify-between py-1">
                <span className="text-text-secondary text-xs">{audit.name}</span>
                <span className="text-text-primary text-xs">{audit.auditor} ({audit.date})</span>
              </div>
            ))}
            <HealthMetricRow
              label={lang === 'it' ? 'Vulnerabilita\' note' : 'Known vulnerabilities'}
              value={data.security.vulnerabilities}
            />

            {/* On-chain */}
            <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 mt-3 font-medium">On-Chain</p>
            <HealthMetricRow
              label={lang === 'it' ? 'Tx giornaliere' : 'Daily transactions'}
              value={data.onchain.dailyTx.toLocaleString()}
            />
            <HealthMetricRow
              label={lang === 'it' ? 'Indirizzi attivi' : 'Active addresses'}
              value={data.onchain.activeAddresses.toLocaleString()}
            />
            {data.onchain.tvl && (
              <HealthMetricRow
                label="TVL"
                value={`$${(data.onchain.tvl / 1e9).toFixed(1)}B`}
              />
            )}

            {/* Team */}
            <p className="text-text-secondary text-[10px] uppercase tracking-wider mb-1 mt-3 font-medium">Team</p>
            <HealthMetricRow
              label={lang === 'it' ? 'Dimensione team' : 'Team size'}
              value={data.team.size}
            />
            <HealthMetricRow
              label={lang === 'it' ? 'Tasso consegna' : 'Delivery rate'}
              value={`${data.team.deliveryRate}%`}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
