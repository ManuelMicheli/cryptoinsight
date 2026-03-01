import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'

const TABS = [
  { key: 'all', label: { it: 'Tutti', en: 'All' } },
  { key: 'events', label: { it: 'Eventi', en: 'Events' } },
  { key: 'unlocks', label: { it: 'Unlock', en: 'Unlocks' } },
  { key: 'regulation', label: { it: 'Regolamentazione', en: 'Regulation' } },
]

export default function EventCategoryTabs({ active, onChange }) {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {TABS.map(({ key, label }) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`relative px-6 py-2.5 rounded-xl typo-ui font-medium transition-colors ${
            active === key ? 'text-neon-amber' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {active === key && (
            <motion.div
              layoutId="eventCategoryTab"
              className="absolute inset-0 glass rounded-xl glow-amber"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label[lang] || label.it}</span>
        </button>
      ))}
    </div>
  )
}
