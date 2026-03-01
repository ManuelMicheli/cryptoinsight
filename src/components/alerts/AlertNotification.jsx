import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { useAlerts } from '../../contexts/AlertContext'
import { alertTypeConfig } from '../../data/alertMockData'
import { l } from '../../i18n/translations'

// TODO: Push notifications integration

const AUTO_DISMISS_MS = 4000

function Toast({ notification, onDismiss }) {
  const { lang } = useLanguage()
  const typeConf = alertTypeConfig[notification.type] || {}

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss(notification.id)
    }, AUTO_DISMISS_MS)
    return () => clearTimeout(timer)
  }, [notification.id, onDismiss])

  const borderColorMap = {
    'neon-cyan': 'border-l-neon-cyan',
    'neon-purple': 'border-l-neon-purple',
    'neon-amber': 'border-l-neon-amber',
    'neon-green': 'border-l-neon-green',
    'neon-red': 'border-l-neon-red',
  }
  const borderClass = borderColorMap[typeConf.color] || 'border-l-neon-purple'

  return (
    <motion.div
      className={`max-w-sm w-full bg-bg-primary/95 backdrop-blur-xl rounded-xl border border-white/[0.08] ${borderClass} border-l-2 p-4 shadow-2xl`}
      style={{
        boxShadow: '0 8px 40px rgba(0,0,0,0.5), 0 0 40px rgba(139,92,246,0.05)',
      }}
      initial={{ opacity: 0, x: 60, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      exit={{ opacity: 0, x: 60, scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      layout
    >
      <div className="flex items-start gap-3">
        <span className="text-xl flex-shrink-0">{typeConf.icon || '🔔'}</span>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-heading font-semibold uppercase tracking-wider text-text-primary mb-1">
            {l(typeConf.label, lang)}
          </p>
          <p className="text-xs text-text-secondary leading-relaxed">
            {l(notification.message, lang)}
          </p>
        </div>
        <button
          onClick={() => onDismiss(notification.id)}
          className="flex-shrink-0 text-text-secondary/40 hover:text-text-primary transition-colors p-0.5"
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Auto-dismiss progress bar */}
      <motion.div
        className="mt-3 h-[2px] rounded-full bg-neon-purple/30 origin-left"
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: AUTO_DISMISS_MS / 1000, ease: 'linear' }}
      />
    </motion.div>
  )
}

export default function AlertNotification() {
  const { notifications, dismissNotification } = useAlerts()
  const [visibleToasts, setVisibleToasts] = useState([])

  // Watch for new unread notifications and show them as toasts
  useEffect(() => {
    const unread = notifications.filter(n => !n.read)
    const newUnread = unread.filter(
      n => !visibleToasts.some(t => t.id === n.id)
    )
    if (newUnread.length > 0) {
      setVisibleToasts(prev => [...newUnread.slice(0, 3), ...prev].slice(0, 3))
    }
  }, [notifications]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleDismiss = (notifId) => {
    setVisibleToasts(prev => prev.filter(t => t.id !== notifId))
    dismissNotification(notifId)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col-reverse gap-3">
      <AnimatePresence mode="popLayout">
        {visibleToasts.map(notif => (
          <Toast
            key={notif.id}
            notification={notif}
            onDismiss={handleDismiss}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
