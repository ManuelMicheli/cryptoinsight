import { useState, useRef, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'motion/react'
import { glossary } from '../../data/glossary'
import { useLanguage } from '../../contexts/LanguageContext'

export default function TechTerm({ term, children }) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const triggerRef = useRef(null)
  const popoverRef = useRef(null)
  const { lang } = useLanguage()

  const entry = glossary[term]
  if (!entry) return children

  const description = entry[lang] || entry.it

  const toggle = useCallback((e) => {
    e.stopPropagation()
    setOpen(prev => !prev)
  }, [])

  // Compute fixed position relative to viewport
  useEffect(() => {
    if (!open || !triggerRef.current) return
    const update = () => {
      const rect = triggerRef.current.getBoundingClientRect()
      const popoverW = Math.min(340, window.innerWidth * 0.8)
      const spaceBelow = window.innerHeight - rect.bottom
      const above = spaceBelow < 180

      // Center horizontally on the trigger, clamp to viewport
      let left = rect.left + rect.width / 2 - popoverW / 2
      left = Math.max(8, Math.min(left, window.innerWidth - popoverW - 8))

      setCoords({
        above,
        left,
        width: popoverW,
        top: above ? undefined : rect.bottom + 8,
        bottom: above ? window.innerHeight - rect.top + 8 : undefined,
      })
    }
    update()
    window.addEventListener('scroll', update, true)
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update, true)
      window.removeEventListener('resize', update)
    }
  }, [open])

  // Close on click outside
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open])

  // Close on Escape
  useEffect(() => {
    if (!open) return
    const handler = (e) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [open])

  return (
    <span className="tech-term-wrapper">
      {children}
      <button
        ref={triggerRef}
        onClick={toggle}
        className="tech-term-bulb"
        aria-label={`Explain: ${typeof children === 'string' ? children : term}`}
        aria-expanded={open}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 21h6m-3-3v3m-4-7.4c-1.2-.9-2-2.4-2-4.1C6 6.5 8.7 4 12 4s6 2.5 6 5.5c0 1.7-.8 3.2-2 4.1-.5.4-.8.6-1 1.1-.1.5-.1 1-.1 1.8h-2c0-.8 0-1.3-.1-1.8-.2-.5-.5-.7-1-1.1z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <motion.div
              ref={popoverRef}
              className="tech-term-popover"
              style={{
                position: 'fixed',
                left: coords.left,
                width: coords.width,
                top: coords.top,
                bottom: coords.bottom,
              }}
              initial={{ opacity: 0, scale: 0.92, y: coords.above ? 6 : -6 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: coords.above ? 6 : -6 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="tech-term-popover__close"
                onClick={() => setOpen(false)}
                aria-label="Close"
              >
                &times;
              </button>
              <p className="tech-term-popover__text">{description}</p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </span>
  )
}
