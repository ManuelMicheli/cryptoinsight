import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { healthData, gradeColors, badgeConfig } from '../../data/healthData'
import { formatLargeNumber } from '../../utils/formatters'
import GlassCard from '../ui/GlassCard'
import { fadeInUp } from '../../hooks/useInViewAnimation'

// Grade background colors
const gradeBgMap = {
  'A+': 'bg-neon-green/15',
  'A': 'bg-neon-green/15',
  'A-': 'bg-neon-green/15',
  'B+': 'bg-neon-cyan/15',
  'B': 'bg-neon-cyan/15',
  'B-': 'bg-neon-amber/15',
  'C+': 'bg-neon-amber/15',
  'C': 'bg-neon-amber/15',
  'D': 'bg-neon-red/15',
  'F': 'bg-red-500/15',
}

/**
 * Mini commits sparkline for GitHub activity.
 */
function CommitsSparkline({ data }) {
  if (!data || data.length === 0) return null
  const max = Math.max(...data)

  return (
    <div className="flex items-end gap-0.5 h-6">
      {data.map((val, i) => (
        <motion.div
          key={i}
          className="w-1.5 rounded-sm bg-neon-cyan/60"
          initial={{ height: 0 }}
          animate={{ height: `${Math.max((val / max) * 100, 8)}%` }}
          transition={{ duration: 0.4, delay: i * 0.04 }}
        />
      ))}
    </div>
  )
}

export default function HealthPanel({ coinId }) {
  const { lang } = useLanguage()

  // TODO: Replace with API call
  const health = healthData[coinId]

  const title = lang === 'it' ? 'HEALTH SCORE' : 'HEALTH SCORE'

  if (!health) {
    return (
      <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
        <h3 className="font-heading text-xs tracking-widest text-neon-green mb-3 uppercase">
          {title}
        </h3>
        <p className="text-text-secondary text-sm">
          {lang === 'it' ? 'Dati health non disponibili' : 'Health data not available'}
        </p>
      </GlassCard>
    )
  }

  const gradeTextColor = gradeColors[health.grade] || 'text-text-secondary'
  const gradeBg = gradeBgMap[health.grade] || 'bg-white/10'

  return (
    <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
      {/* Header with grade */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading text-xs tracking-widest text-neon-green uppercase">
          {title}
        </h3>
        <div
          className={`flex items-center justify-center w-11 h-11 rounded-full ${gradeBg} ${gradeTextColor} font-heading font-bold text-lg`}
        >
          {health.grade}
        </div>
      </div>

      {/* GitHub section */}
      <div className="mb-4">
        <h4 className="text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-semibold">
          GitHub
        </h4>
        <CommitsSparkline data={health.github.commits90d} />
        <div className="flex items-center gap-4 mt-2">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'Contributori' : 'Contributors'}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {health.github.contributorsActive}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'Issue Ratio' : 'Issues Ratio'}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {(health.github.issuesRatio * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      </div>

      {/* Security section */}
      <div className="mb-4">
        <h4 className="text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-semibold">
          {lang === 'it' ? 'Sicurezza' : 'Security'}
        </h4>
        <div className="space-y-1.5">
          {health.security.audits.map((audit, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-text-primary">{audit.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-text-secondary">{audit.auditor}</span>
                <span className="text-text-secondary text-[10px]">{audit.date}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-xs text-text-secondary">
            {lang === 'it' ? 'Vulnerabilita\':' : 'Vulnerabilities:'}
          </span>
          <span
            className={`text-xs font-semibold ${
              health.security.vulnerabilities === 0 ? 'text-neon-green' : 'text-neon-red'
            }`}
          >
            {health.security.vulnerabilities}
          </span>
        </div>
      </div>

      {/* On-chain section */}
      <div className="mb-4">
        <h4 className="text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-semibold">
          On-chain
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'TX giornaliere' : 'Daily TX'}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {formatLargeNumber(health.onchain.dailyTx)}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'Indirizzi attivi' : 'Active Addresses'}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {formatLargeNumber(health.onchain.activeAddresses)}
            </span>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div>
        <h4 className="text-[10px] text-text-secondary uppercase tracking-wider mb-2 font-semibold">
          Team
        </h4>
        <div className="flex items-center gap-4 mb-2">
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'Dimensione' : 'Size'}
            </span>
            <span className="text-sm font-semibold text-text-primary">{health.team.size}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'Ultimo aggiornamento' : 'Last Roadmap Update'}
            </span>
            <span className="text-sm font-semibold text-text-primary">
              {health.team.lastRoadmapUpdate}
            </span>
          </div>
        </div>

        {/* Delivery rate progress bar */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-text-secondary">
              {lang === 'it' ? 'Tasso consegna' : 'Delivery Rate'}
            </span>
            <span className="text-xs font-semibold text-text-primary">
              {health.team.deliveryRate}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-neon-green"
              initial={{ width: 0 }}
              animate={{ width: `${health.team.deliveryRate}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            />
          </div>
        </div>
      </div>

      {/* Badges */}
      {health.badges && health.badges.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-white/[0.06]">
          {health.badges.map((key) => {
            const badge = badgeConfig[key]
            if (!badge) return null
            return (
              <span
                key={key}
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${badge.bg} ${badge.color} ${badge.border}`}
              >
                {l(badge.label, lang)}
              </span>
            )
          })}
        </div>
      )}
    </GlassCard>
  )
}
