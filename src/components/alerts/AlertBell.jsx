import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useAlerts } from '../../contexts/AlertContext'
import AlertPanel from './AlertPanel'

export default function AlertBell() {
  const { unreadCount } = useAlerts()
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // Close on outside click
  useEffect(() => {
    if (!isOpen) return
    const handleClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [isOpen])

  return (
    <div ref={containerRef} className="relative">
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="relative p-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-sm hover:border-white/20 transition-colors"
        aria-label="Notifications"
      >
        {/* Bell icon SVG */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-text-secondary"
        >
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 0 1-3.46 0" />
        </svg>

        {/* Unread badge */}
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-neon-red text-white text-[10px] font-bold px-1"
              style={{
                boxShadow: '0 0 8px rgba(239,68,68,0.5), 0 0 20px rgba(239,68,68,0.2)',
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <AlertPanel onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  )
}
