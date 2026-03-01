import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAlerts } from '../../contexts/AlertContext'
import { cryptoMeta } from '../../data/cryptoMeta'
import { alertTypeConfig } from '../../data/alertMockData'
import { l } from '../../i18n/translations'

export default function AlertCard({ alert }) {
  const { lang } = useLanguage()
  const { toggleAlert, removeAlert } = useAlerts()

  const typeConf = alertTypeConfig[alert.type] || {}
  const meta = alert.coinId ? cryptoMeta[alert.coinId] : null

  const getDescription = () => {
    const coinLabel = meta ? `${meta.name} (${meta.ticker})` : ''

    switch (alert.type) {
      case 'price': {
        const dir = alert.params.direction === 'above'
          ? (lang === 'it' ? 'sopra' : 'above')
          : (lang === 'it' ? 'sotto' : 'below')
        return `${coinLabel} ${dir} $${alert.params.threshold?.toLocaleString()}`
      }
      case 'whale': {
        const val = (alert.params.minValueUsd / 1000000).toFixed(0)
        return `${coinLabel} — ${lang === 'it' ? 'movimenti' : 'movements'} > $${val}M`
      }
      case 'unlock':
        return `${coinLabel} — ${alert.params.daysBeforeUnlock}${lang === 'it' ? 'g prima dell\'unlock' : 'd before unlock'}`
      case 'sentiment': {
        const dir = alert.params.direction === 'below'
          ? (lang === 'it' ? 'sotto' : 'below')
          : (lang === 'it' ? 'sopra' : 'above')
        return `${coinLabel} sentiment ${dir} ${alert.params.threshold}`
      }
      case 'regulation':
        return `${lang === 'it' ? 'Regioni' : 'Regions'}: ${alert.params.regions?.join(', ')}`
      default:
        return ''
    }
  }

  return (
    <motion.div
      className={`flex items-center gap-3 p-3 rounded-lg border transition-all ${
        alert.active
          ? 'bg-white/[0.02] border-white/[0.08]'
          : 'bg-white/[0.01] border-white/[0.04] opacity-50'
      }`}
      layout
    >
      {/* Type icon */}
      <span className="text-lg flex-shrink-0">{typeConf.icon || '🔔'}</span>

      {/* Description */}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-primary truncate">
          {l(typeConf.label, lang)}
        </p>
        <p className="text-[10px] text-text-secondary/70 truncate mt-0.5">
          {getDescription()}
        </p>
      </div>

      {/* Toggle */}
      <button
        onClick={() => toggleAlert(alert.id)}
        className="flex-shrink-0"
        aria-label={alert.active ? 'Disable alert' : 'Enable alert'}
      >
        <div
          className={`relative w-9 h-5 rounded-full transition-colors ${
            alert.active ? 'bg-neon-purple/30' : 'bg-white/10'
          }`}
        >
          <motion.div
            className={`absolute top-0.5 w-4 h-4 rounded-full ${
              alert.active ? 'bg-neon-purple' : 'bg-text-secondary/50'
            }`}
            animate={{ left: alert.active ? 18 : 2 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            style={alert.active ? {
              boxShadow: '0 0 8px rgba(139,92,246,0.5)',
            } : undefined}
          />
        </div>
      </button>

      {/* Delete */}
      <button
        onClick={() => removeAlert(alert.id)}
        className="flex-shrink-0 p-1 text-text-secondary/40 hover:text-neon-red transition-colors"
        aria-label="Delete alert"
      >
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
          <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2" />
        </svg>
      </button>
    </motion.div>
  )
}
