import { motion } from 'motion/react'
import { CATEGORIES } from '../../utils/constants'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function CategoryTabs({ active, onChange }) {
  const { lang } = useLanguage()

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-10">
      {Object.entries(CATEGORIES).map(([key, labelKey]) => (
        <button
          key={key}
          onClick={() => onChange(key)}
          className={`relative px-6 py-2.5 rounded-xl typo-ui font-medium transition-colors ${
            active === key ? 'text-neon-cyan' : 'text-text-secondary hover:text-text-primary'
          }`}
        >
          {active === key && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 glass rounded-xl glow-cyan"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{t(labelKey, lang)}</span>
        </button>
      ))}
    </div>
  )
}
