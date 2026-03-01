import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { l } from '../../i18n/translations'
import { formatCurrency } from '../../utils/formatters'
import { cryptoMeta } from '../../data/cryptoMeta'
import GlassCard from '../ui/GlassCard'
import WhaleTypeBadge from './WhaleTypeBadge'

function timeAgo(timestamp, lang) {
  const diff = Date.now() - new Date(timestamp).getTime()
  const hours = Math.floor(diff / 3600000)
  const mins = Math.floor(diff / 60000)
  if (hours > 24) {
    const days = Math.floor(hours / 24)
    return lang === 'it' ? `${days}g fa` : `${days}d ago`
  }
  if (hours > 0) return lang === 'it' ? `${hours}h fa` : `${hours}h ago`
  return lang === 'it' ? `${mins}m fa` : `${mins}m ago`
}

export default function WhaleTransactionCard({ tx }) {
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const meta = cryptoMeta[tx.asset]

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant="dark" hover={true} className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="text-text-primary text-sm font-medium">{tx.walletLabel}</span>
            <WhaleTypeBadge type={tx.type} />
          </div>
          <span className="text-text-secondary text-xs">{timeAgo(tx.timestamp, lang)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-heading text-sm font-bold text-text-primary">
              {tx.amount.toLocaleString()} {tx.ticker}
            </span>
            {meta && (
              <span className="text-text-secondary text-xs">({meta.name})</span>
            )}
          </div>
          <span className="text-neon-cyan font-medium text-sm">
            {formatCurrency(tx.valueUsd, 0, currency)}
          </span>
        </div>
        <div className="mt-2 text-text-secondary text-xs">
          → {l(tx.destination, lang)}
        </div>
      </GlassCard>
    </motion.div>
  )
}
