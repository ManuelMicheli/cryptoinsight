import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { unlockEvents, recipientColors } from '../../data/unlockData'
import { formatLargeNumber } from '../../utils/formatters'
import GlassCard from '../ui/GlassCard'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'

/**
 * Severity classification based on % of supply.
 */
function getSeverity(percentSupply, lang) {
  if (percentSupply > 5) {
    return {
      label: lang === 'it' ? 'Alto Impatto' : 'High Impact',
      bg: 'bg-neon-red/15',
      text: 'text-neon-red',
      border: 'border-neon-red/25',
    }
  }
  if (percentSupply >= 2) {
    return {
      label: lang === 'it' ? 'Medio' : 'Medium',
      bg: 'bg-neon-amber/15',
      text: 'text-neon-amber',
      border: 'border-neon-amber/25',
    }
  }
  return {
    label: lang === 'it' ? 'Basso' : 'Low',
    bg: 'bg-neon-green/15',
    text: 'text-neon-green',
    border: 'border-neon-green/25',
  }
}

/**
 * Horizontal dilution bar: locked (remaining) | this-unlock | already-unlocked.
 * Simplified: we show percentSupply as the unlock portion vs the rest.
 */
function DilutionBar({ percentSupply, lang }) {
  // Simplified model: assume ~30% already unlocked (mock), this unlock, rest locked
  const alreadyUnlocked = 30
  const thisUnlock = percentSupply
  const locked = Math.max(0, 100 - alreadyUnlocked - thisUnlock)

  return (
    <div className="w-full">
      <div className="flex items-center h-3 rounded-full overflow-hidden bg-white/[0.04]">
        {/* Locked */}
        <motion.div
          className="h-full bg-neon-cyan/30"
          initial={{ width: 0 }}
          animate={{ width: `${locked}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          title={`Locked: ${locked.toFixed(1)}%`}
        />
        {/* This unlock */}
        <motion.div
          className="h-full bg-neon-amber"
          initial={{ width: 0 }}
          animate={{ width: `${thisUnlock}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          title={`This Unlock: ${thisUnlock}%`}
          style={{ boxShadow: '0 0 8px rgba(245,158,11,0.4)' }}
        />
        {/* Already unlocked */}
        <motion.div
          className="h-full bg-white/10"
          initial={{ width: 0 }}
          animate={{ width: `${alreadyUnlocked}%` }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
          title={`Already Unlocked: ${alreadyUnlocked}%`}
        />
      </div>
      <div className="flex items-center justify-between mt-1">
        <span className="text-[9px] text-neon-cyan/60">
          {lang === 'it' ? 'Bloccato' : 'Locked'}
        </span>
        <span className="text-[9px] text-neon-amber">
          Unlock {percentSupply}%
        </span>
        <span className="text-[9px] text-white/30">
          {lang === 'it' ? 'Sbloccato' : 'Unlocked'}
        </span>
      </div>
    </div>
  )
}

/**
 * Historical impact mini bar chart.
 */
function ImpactChart({ impact }) {
  const labels = ['-7d', '-1d', 'D0', '+1d', '+7d', '+30d']
  const values = [
    impact.minus7d,
    impact.minus1d,
    impact.day0,
    impact.plus1d,
    impact.plus7d,
    impact.plus30d,
  ]
  const maxAbs = Math.max(...values.map(Math.abs), 1)

  return (
    <div className="flex items-end justify-between gap-1.5 h-12">
      {values.map((val, i) => {
        const isPositive = val >= 0
        const height = Math.max((Math.abs(val) / maxAbs) * 100, 5)
        const color = isPositive ? '#00ff88' : '#ef4444'

        return (
          <div key={i} className="flex flex-col items-center gap-0.5 flex-1">
            <div className="relative h-10 w-full flex items-end justify-center">
              <motion.div
                className="w-full max-w-[10px] rounded-sm"
                style={{ backgroundColor: color }}
                initial={{ height: 0 }}
                animate={{ height: `${height}%` }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
              />
            </div>
            <span className="text-[8px] text-text-secondary">{labels[i]}</span>
            <span className={`text-[8px] font-mono ${isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
              {val > 0 ? '+' : ''}{val}%
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default function UnlockPanel({ coinId }) {
  const { lang } = useLanguage()

  // TODO: Replace with API call
  const unlocks = unlockEvents.filter((e) => e.coinId === coinId)

  const title = lang === 'it' ? 'UNLOCK PROGRAMMATI' : 'SCHEDULED UNLOCKS'

  if (unlocks.length === 0) {
    return (
      <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
        <h3 className="font-heading text-xs tracking-widest text-neon-cyan mb-3 uppercase">
          {title}
        </h3>
        <p className="text-text-secondary text-sm">
          {lang === 'it'
            ? 'Nessun unlock programmato'
            : 'No scheduled unlocks'}
        </p>
      </GlassCard>
    )
  }

  return (
    <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
      <h3 className="font-heading text-xs tracking-widest text-neon-cyan mb-4 uppercase">
        {title}
      </h3>

      <motion.div
        className="space-y-4"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {unlocks.map((unlock) => {
          const severity = getSeverity(unlock.percentSupply, lang)
          const recipient = recipientColors[unlock.recipient]

          return (
            <motion.div
              key={unlock.id}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04]"
              variants={fadeInUp}
            >
              {/* Top row: date, amount, recipient badge, severity */}
              <div className="flex items-center justify-between mb-2 flex-wrap gap-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    {unlock.date}
                  </span>
                  {recipient && (
                    <span
                      className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${recipient.bg} ${recipient.text} ${recipient.border}`}
                    >
                      {l(recipient.label, lang)}
                    </span>
                  )}
                </div>
                <span
                  className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${severity.bg} ${severity.text} ${severity.border}`}
                >
                  {severity.label}
                </span>
              </div>

              {/* Amount and percent */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-text-secondary">
                  {formatLargeNumber(unlock.amount)} {lang === 'it' ? 'token' : 'tokens'}
                </span>
                <span className="text-xs font-semibold text-neon-amber">
                  {unlock.percentSupply}% supply
                </span>
              </div>

              {/* Recipient label */}
              <p className="text-[11px] text-text-secondary mb-3">
                {l(unlock.recipientLabel, lang)}
              </p>

              {/* Dilution bar */}
              <div className="mb-3">
                <DilutionBar percentSupply={unlock.percentSupply} lang={lang} />
              </div>

              {/* Historical impact chart */}
              <div>
                <h5 className="text-[9px] text-text-secondary uppercase tracking-wider mb-2">
                  {lang === 'it' ? 'Impatto Storico' : 'Historical Impact'}
                </h5>
                <ImpactChart impact={unlock.historicalImpact} />
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </GlassCard>
  )
}
