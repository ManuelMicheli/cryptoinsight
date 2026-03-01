import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { formatCurrency } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function WhaleAlert({ transaction }) {
  const { lang } = useLanguage()
  const { currency } = useCurrency()

  return (
    <motion.div
      className="panel panel-purple animate-glow-pulse mb-6 p-4 flex items-center gap-4"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-2xl">🚨</span>
      <div className="flex-1">
        <p className="text-text-primary font-medium text-sm">
          {t('whaleAlertLabel', lang)}
        </p>
        <p className="text-text-secondary text-xs mt-0.5">
          {transaction.walletLabel} — {transaction.amount.toLocaleString()} {transaction.ticker} ({formatCurrency(transaction.valueUsd, 0, currency)})
        </p>
      </div>
      <div className="w-3 h-3 rounded-full bg-neon-red animate-glow-pulse" />
    </motion.div>
  )
}
