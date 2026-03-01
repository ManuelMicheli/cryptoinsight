import { useEffect } from 'react'
import { motion } from 'motion/react'

export default function Toast({ message, type = 'info', onDismiss, duration = 4000 }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, duration)
    return () => clearTimeout(timer)
  }, [onDismiss, duration])

  const colors = {
    info: 'border-neon-cyan',
    success: 'border-neon-green',
    warning: 'border-neon-amber',
    error: 'border-neon-red',
  }

  return (
    <motion.div
      className={`panel p-4 rounded-xl border-l-4 ${colors[type] || colors.info} max-w-[360px] shadow-xl`}
      initial={{ opacity: 0, x: 60, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 60, scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <p className="text-text-primary text-sm">{message}</p>
    </motion.div>
  )
}
