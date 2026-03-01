import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { whaleTransactions } from '../../data/whaleData'
import { formatCurrency } from '../../utils/formatters'
import GlassCard from '../ui/GlassCard'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'

// Type badge config
const typeBadge = {
  accumulo: {
    bg: 'bg-neon-green/15',
    text: 'text-neon-green',
    border: 'border-neon-green/25',
    label: { it: 'Accumulo', en: 'Accumulation' },
  },
  distribuzione: {
    bg: 'bg-neon-red/15',
    text: 'text-neon-red',
    border: 'border-neon-red/25',
    label: { it: 'Distribuzione', en: 'Distribution' },
  },
  trasferimento: {
    bg: 'bg-neon-amber/15',
    text: 'text-neon-amber',
    border: 'border-neon-amber/25',
    label: { it: 'Trasferimento', en: 'Transfer' },
  },
  defi: {
    bg: 'bg-neon-cyan/15',
    text: 'text-neon-cyan',
    border: 'border-neon-cyan/25',
    label: { it: 'DeFi', en: 'DeFi' },
  },
}

function formatRelativeTime(timestamp, lang) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const hours = Math.floor(diff / 3600000)
  const minutes = Math.floor(diff / 60000)

  if (minutes < 60) {
    return `${minutes}m ${t('newsTimeAgo', lang)}`
  }
  if (hours < 24) {
    return `${hours}h ${t('newsTimeAgo', lang)}`
  }
  const days = Math.floor(hours / 24)
  return `${days}d ${t('newsTimeAgo', lang)}`
}

export default function WhalePanel({ coinId }) {
  const { lang } = useLanguage()

  // TODO: Replace with API call
  const transactions = whaleTransactions
    .filter((tx) => tx.asset === coinId)
    .slice(0, 5)

  const title = lang === 'it' ? 'WHALE TRACKER' : 'WHALE TRACKER'

  if (transactions.length === 0) {
    return (
      <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
        <h3 className="font-heading text-xs tracking-widest text-neon-amber mb-3 uppercase">
          {title}
        </h3>
        <p className="text-text-secondary text-sm">
          {lang === 'it'
            ? 'Nessun movimento whale recente'
            : 'No recent whale movements'}
        </p>
      </GlassCard>
    )
  }

  return (
    <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
      <h3 className="font-heading text-xs tracking-widest text-neon-amber mb-4 uppercase">
        {title}
      </h3>

      <motion.div
        className="space-y-2.5"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {transactions.map((tx) => {
          const badge = typeBadge[tx.type] || typeBadge.trasferimento
          return (
            <motion.div
              key={tx.id}
              className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] flex items-center gap-3"
              variants={fadeInUp}
            >
              {/* Wallet label */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary truncate">
                  {tx.walletLabel}
                </p>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-[10px] text-text-secondary font-mono">
                    {tx.amount.toLocaleString('en-US')} {tx.ticker}
                  </span>
                  <span className="text-[10px] text-text-secondary">
                    {'\u2192'} {l(tx.destination, lang)}
                  </span>
                </div>
              </div>

              {/* Value and meta */}
              <div className="flex flex-col items-end gap-1 flex-shrink-0">
                <span className="text-xs font-semibold text-text-primary">
                  {formatCurrency(tx.valueUsd, 0)}
                </span>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full border ${badge.bg} ${badge.text} ${badge.border}`}
                  >
                    {l(badge.label, lang)}
                  </span>
                  <span className="text-[9px] text-text-secondary">
                    {formatRelativeTime(tx.timestamp, lang)}
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </motion.div>
    </GlassCard>
  )
}
