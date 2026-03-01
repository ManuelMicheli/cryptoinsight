import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAlerts } from '../../contexts/AlertContext'
import { l } from '../../i18n/translations'
import { alertTypeConfig } from '../../data/alertMockData'
import AlertCard from './AlertCard'
import AlertCreateForm from './AlertCreateForm'

export default function AlertPanel({ onClose }) {
  const { lang } = useLanguage()
  const { alerts, notifications, dismissNotification } = useAlerts()
  const [activeTab, setActiveTab] = useState('alerts')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const tabs = [
    { id: 'alerts', label: lang === 'it' ? 'Alert Attivi' : 'Active Alerts' },
    { id: 'history', label: lang === 'it' ? 'Cronologia' : 'History' },
  ]

  const formatTimeAgo = (timestamp) => {
    const now = new Date()
    const date = new Date(timestamp)
    const diffMs = now - date
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 60) return `${diffMins}m ${lang === 'it' ? 'fa' : 'ago'}`
    if (diffHours < 24) return `${diffHours}h ${lang === 'it' ? 'fa' : 'ago'}`
    return `${diffDays}d ${lang === 'it' ? 'fa' : 'ago'}`
  }

  return (
    <motion.div
      className="absolute right-0 top-full mt-3 w-[380px] max-w-[calc(100vw-2rem)] max-h-[520px] rounded-2xl border border-white/[0.08] bg-bg-primary/95 backdrop-blur-xl shadow-2xl overflow-hidden z-50"
      style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(139,92,246,0.05)',
      }}
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
        <h3 className="font-heading font-semibold text-text-primary text-sm uppercase tracking-wider">
          {lang === 'it' ? 'Centro Notifiche' : 'Notification Center'}
        </h3>
        <button
          onClick={onClose}
          className="text-text-secondary hover:text-text-primary transition-colors p-1"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/[0.06]">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 text-xs font-medium uppercase tracking-wider transition-colors relative ${
              activeTab === tab.id
                ? 'text-neon-purple'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-purple"
                layoutId="alertTabIndicator"
                style={{ boxShadow: '0 0 8px rgba(139,92,246,0.4)' }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto max-h-[380px] scrollbar-hide">
        {activeTab === 'alerts' ? (
          <div className="p-4 space-y-3">
            {/* Create new alert toggle */}
            {showCreateForm ? (
              <AlertCreateForm onClose={() => setShowCreateForm(false)} />
            ) : (
              <button
                onClick={() => setShowCreateForm(true)}
                className="w-full py-3 rounded-xl border border-dashed border-neon-purple/30 text-neon-purple text-xs font-medium uppercase tracking-wider hover:bg-neon-purple/5 transition-colors"
              >
                + {lang === 'it' ? 'Nuovo Alert' : 'New Alert'}
              </button>
            )}

            {/* Alert list */}
            {alerts.length === 0 ? (
              <p className="text-text-secondary text-sm text-center py-6">
                {lang === 'it' ? 'Nessun alert configurato' : 'No alerts configured'}
              </p>
            ) : (
              alerts.map(alert => (
                <AlertCard key={alert.id} alert={alert} />
              ))
            )}
          </div>
        ) : (
          <div className="p-4 space-y-2">
            {notifications.length === 0 ? (
              <p className="text-text-secondary text-sm text-center py-6">
                {lang === 'it' ? 'Nessuna notifica' : 'No notifications'}
              </p>
            ) : (
              notifications.map(notif => {
                const typeConf = alertTypeConfig[notif.type] || {}
                return (
                  <motion.div
                    key={notif.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      notif.read
                        ? 'bg-white/[0.01] border-white/[0.04]'
                        : 'bg-white/[0.03] border-white/[0.08]'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => !notif.read && dismissNotification(notif.id)}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-lg flex-shrink-0">{typeConf.icon || '🔔'}</span>
                      <div className="flex-1 min-w-0">
                        <p className={`text-xs leading-relaxed ${notif.read ? 'text-text-secondary/70' : 'text-text-secondary'}`}>
                          {l(notif.message, lang)}
                        </p>
                        <p className="text-[10px] text-text-secondary/40 mt-1">
                          {formatTimeAgo(notif.timestamp)}
                        </p>
                      </div>
                      {!notif.read && (
                        <span className="w-2 h-2 rounded-full bg-neon-purple flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </motion.div>
                )
              })
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}
