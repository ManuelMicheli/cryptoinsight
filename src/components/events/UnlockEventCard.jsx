import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import { recipientColors } from '../../data/unlockData'
import { formatLargeNumber } from '../../utils/formatters'
import TechTerm from '../ui/TechTerm'

const severityConfig = {
  high: {
    label: { it: 'Alto Impatto', en: 'High Impact' },
    bg: 'bg-neon-red/10',
    text: 'text-neon-red',
    barColor: '#ef4444',
  },
  medium: {
    label: { it: 'Medio', en: 'Medium' },
    bg: 'bg-neon-amber/10',
    text: 'text-neon-amber',
    barColor: '#f59e0b',
  },
  low: {
    label: { it: 'Basso', en: 'Low' },
    bg: 'bg-neon-green/10',
    text: 'text-neon-green',
    barColor: '#00ff88',
  },
}

function getSeverity(percentSupply) {
  if (percentSupply > 5) return 'high'
  if (percentSupply >= 2) return 'medium'
  return 'low'
}

const impactLabels = {
  minus7d: '-7d',
  minus1d: '-1d',
  day0: 'D0',
  plus1d: '+1d',
  plus7d: '+7d',
  plus30d: '+30d',
}

function DilutionBar({ percentSupply, severity }) {
  const config = severityConfig[severity]
  // Simplified model: locked portion = 100 - percentSupply * 3 (capped), this unlock, already unlocked
  const alreadyUnlocked = Math.min(percentSupply * 2, 30)
  const thisUnlock = percentSupply
  const locked = 100 - alreadyUnlocked - thisUnlock

  return (
    <svg width="100%" height="8" className="rounded-full overflow-hidden">
      <rect x="0" y="0" width={`${locked}%`} height="8" fill="rgba(255,255,255,0.08)" rx="4" />
      <rect x={`${locked}%`} y="0" width={`${thisUnlock}%`} height="8" fill={config.barColor} rx="0" />
      <rect x={`${locked + thisUnlock}%`} y="0" width={`${alreadyUnlocked}%`} height="8" fill="rgba(255,255,255,0.03)" rx="0" />
    </svg>
  )
}

function MiniImpactChart({ historicalImpact }) {
  const entries = Object.entries(historicalImpact)
  const values = entries.map(([, v]) => v)
  const maxAbs = Math.max(...values.map(Math.abs), 1)
  const chartH = 40
  const midY = chartH / 2
  const barW = 14
  const gap = 4

  return (
    <div className="mt-3">
      <svg
        width={entries.length * (barW + gap) - gap}
        height={chartH + 16}
        className="block"
      >
        {/* Zero line */}
        <line
          x1="0"
          y1={midY}
          x2={entries.length * (barW + gap)}
          y2={midY}
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="1"
        />
        {entries.map(([key, val], i) => {
          const x = i * (barW + gap)
          const barH = (Math.abs(val) / maxAbs) * midY
          const isNeg = val < 0
          const y = isNeg ? midY : midY - barH
          const fill = isNeg ? 'rgba(239,68,68,0.6)' : 'rgba(0,255,136,0.6)'

          return (
            <g key={key}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={Math.max(barH, 1)}
                rx="2"
                fill={fill}
              />
              <text
                x={x + barW / 2}
                y={chartH + 12}
                textAnchor="middle"
                fill="rgba(255,255,255,0.35)"
                fontSize="7"
                fontFamily="monospace"
              >
                {impactLabels[key]}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

export default function UnlockEventCard({ unlock }) {
  const { lang } = useLanguage()

  const meta = cryptoMeta[unlock.coinId]
  const tokenName = meta?.name || unlock.coinId
  const ticker = meta?.ticker || unlock.coinId.toUpperCase()
  const severity = getSeverity(unlock.percentSupply)
  const sevConfig = severityConfig[severity]
  const recColors = recipientColors[unlock.recipient] || recipientColors.ecosystem

  const date = new Date(unlock.date)
  const day = date.getDate()
  const month = date
    .toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { month: 'short' })
    .toUpperCase()

  const title =
    lang === 'it'
      ? `${tokenName} Token Unlock`
      : `${tokenName} Token Unlock`

  return (
    <motion.div variants={fadeInUp} className="flex gap-4 md:gap-6">
      {/* Date */}
      <div className="flex-shrink-0 w-20 md:w-24 text-center pt-2">
        <div className="font-heading typo-stat font-bold text-neon-purple">
          {day}
        </div>
        <div className="typo-ui-sm text-text-secondary mt-1 tracking-widest">
          {month}
        </div>
      </div>

      {/* Content */}
      <div
        className="panel panel-dark flex-1 border-l-2 border-neon-purple/30"
        style={{ minHeight: 'auto' }}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h4 className="typo-h3 font-semibold text-text-primary">
              <TechTerm term="token_unlock">{title}</TechTerm>
            </h4>
            <span className="text-xs text-text-secondary mt-0.5 inline-block">
              {ticker}
            </span>
          </div>
          <span
            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${sevConfig.bg} ${sevConfig.text}`}
          >
            {l(sevConfig.label, lang)}
          </span>
        </div>

        {/* Amount + Supply + Recipient */}
        <div className="flex flex-wrap items-center gap-3 mb-4 text-sm">
          <span className="text-text-primary font-mono font-medium">
            {formatLargeNumber(unlock.amount)} {ticker}
          </span>
          <span className="text-text-secondary">
            ({unlock.percentSupply}%{' '}
            {lang === 'it' ? 'della supply' : 'of supply'})
          </span>
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${recColors.bg} ${recColors.text} ${recColors.border}`}
          >
            {l(recColors.label, lang)}: {l(unlock.recipientLabel, lang)}
          </span>
        </div>

        {/* Dilution bar */}
        <div className="mb-1">
          <DilutionBar
            percentSupply={unlock.percentSupply}
            severity={severity}
          />
          <div className="flex justify-between text-[10px] text-text-secondary mt-1">
            <span>{lang === 'it' ? 'Bloccati' : 'Locked'}</span>
            <span>{lang === 'it' ? 'Questo unlock' : 'This unlock'}</span>
            <span>{lang === 'it' ? 'Gia\' sbloccati' : 'Already unlocked'}</span>
          </div>
        </div>

        {/* Mini historical impact chart */}
        <div className="mt-3 pt-3 border-t border-white/5">
          <p className="text-[11px] text-text-secondary mb-1">
            {lang === 'it'
              ? 'Impatto storico sul prezzo'
              : 'Historical price impact'}
          </p>
          <MiniImpactChart historicalImpact={unlock.historicalImpact} />
        </div>
      </div>
    </motion.div>
  )
}
