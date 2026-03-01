import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'

const pages = [
  { path: '/', label: { it: 'Home', en: 'Home' } },
  { path: '/crypto', label: { it: 'Crypto Assets', en: 'Crypto Assets' } },
  { path: '/mercato', label: { it: 'Mercato', en: 'Market' } },
  { path: '/eventi', label: { it: 'Eventi', en: 'Events' } },
  { path: '/news', label: { it: 'News', en: 'News' } },
  { path: '/intelligence', label: { it: 'Intelligence', en: 'Intelligence' } },
  { path: '/strumenti', label: { it: 'Strumenti', en: 'Tools' } },
  { path: '/regolamentazione', label: { it: 'Regolamentazione', en: 'Regulation' } },
]

export default function CommandPalette({ isOpen, onClose }) {
  const { lang } = useLanguage()
  const navigate = useNavigate()
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setSelectedIndex(0)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const results = useMemo(() => {
    const q = query.toLowerCase().trim()
    if (!q) return pages.map(p => ({ type: 'page', ...p }))

    const items = []

    // Search pages
    pages.forEach(p => {
      const label = p.label[lang].toLowerCase()
      if (label.includes(q)) items.push({ type: 'page', ...p })
    })

    // Search crypto
    Object.entries(cryptoMeta).forEach(([id, meta]) => {
      if (meta.name.toLowerCase().includes(q) || meta.ticker.toLowerCase().includes(q)) {
        items.push({ type: 'crypto', path: '/crypto', label: { it: meta.name, en: meta.name }, ticker: meta.ticker })
      }
    })

    return items.slice(0, 8)
  }, [query, lang])

  const handleSelect = (item) => {
    navigate(item.path)
    onClose()
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(i => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(i => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      handleSelect(results[selectedIndex])
    } else if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Palette */}
          <motion.div
            className="fixed top-[20%] left-1/2 z-50 w-full max-w-[520px] -translate-x-1/2"
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="panel rounded-2xl overflow-hidden shadow-2xl">
              {/* Search input */}
              <div className="flex items-center gap-3 px-5 py-4 border-b border-white/10">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-text-secondary flex-shrink-0">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
                <input
                  ref={inputRef}
                  value={query}
                  onChange={e => { setQuery(e.target.value); setSelectedIndex(0) }}
                  onKeyDown={handleKeyDown}
                  placeholder={lang === 'it' ? 'Cerca crypto o pagina...' : 'Search crypto or page...'}
                  className="flex-1 bg-transparent text-text-primary text-sm outline-none placeholder:text-text-secondary"
                />
                <kbd className="text-[10px] text-text-secondary border border-white/10 rounded px-1.5 py-0.5">ESC</kbd>
              </div>

              {/* Results */}
              <div className="max-h-[300px] overflow-y-auto py-2">
                {results.map((item, i) => (
                  <button
                    key={`${item.path}-${item.label[lang]}-${i}`}
                    onClick={() => handleSelect(item)}
                    className={`w-full flex items-center gap-3 px-5 py-2.5 text-left transition-colors ${
                      i === selectedIndex ? 'bg-white/10 text-text-primary' : 'text-text-secondary hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xs opacity-50">{item.type === 'page' ? '📄' : '🪙'}</span>
                    <span className="text-sm">{item.label[lang]}</span>
                    {item.ticker && <span className="text-xs text-text-secondary">({item.ticker})</span>}
                  </button>
                ))}
                {results.length === 0 && (
                  <p className="text-text-secondary text-sm text-center py-8">
                    {lang === 'it' ? 'Nessun risultato' : 'No results'}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
