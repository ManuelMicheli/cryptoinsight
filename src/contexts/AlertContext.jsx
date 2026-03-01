import { createContext, useContext, useState, useCallback, useMemo } from 'react'
import { defaultAlerts, pastNotifications } from '../data/alertMockData'

const AlertContext = createContext()

export function AlertProvider({ children }) {
  const [alerts, setAlerts] = useState(defaultAlerts)
  const [notifications, setNotifications] = useState(pastNotifications)

  const addAlert = useCallback((alert) => {
    setAlerts(prev => [...prev, {
      ...alert,
      id: `alert-${Date.now()}`,
      createdAt: new Date().toISOString(),
    }])
  }, [])

  const removeAlert = useCallback((alertId) => {
    setAlerts(prev => prev.filter(a => a.id !== alertId))
  }, [])

  const toggleAlert = useCallback((alertId) => {
    setAlerts(prev => prev.map(a =>
      a.id === alertId ? { ...a, active: !a.active } : a
    ))
  }, [])

  const dismissNotification = useCallback((notifId) => {
    setNotifications(prev => prev.map(n =>
      n.id === notifId ? { ...n, read: true } : n
    ))
  }, [])

  // TODO: Push notifications integration
  const triggerNotification = useCallback((notification) => {
    setNotifications(prev => [{
      ...notification,
      id: `notif-${Date.now()}`,
      timestamp: new Date().toISOString(),
      read: false,
    }, ...prev])
  }, [])

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications]
  )

  return (
    <AlertContext.Provider value={{
      alerts,
      notifications,
      addAlert,
      removeAlert,
      toggleAlert,
      dismissNotification,
      triggerNotification,
      unreadCount,
    }}>
      {children}
    </AlertContext.Provider>
  )
}

export function useAlerts() {
  const context = useContext(AlertContext)
  if (!context) throw new Error('useAlerts must be used within an AlertProvider')
  return context
}
