import { useState } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { factorDescriptions, factorLabels } from '../../data/sentimentData'

function getBarColor(value) {
  if (value <= 30) return 'bg-neon-red'
  if (value <= 50) return 'bg-neon-amber'
  return 'bg-neon-green'
}

export default function SentimentFactorBar({ factorKey, value }) {
  const { lang } = useLanguage()
  const [showTooltip, setShowTooltip] = useState(false)
  const label = factorLabels[factorKey] ? l(factorLabels[factorKey], lang) : factorKey
  const description = factorDescriptions[factorKey] ? l(factorDescriptions[factorKey], lang) : ''

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className="flex items-center justify-between mb-1">
        <span className="text-text-secondary text-xs">{label}</span>
        <span className="text-text-primary text-xs font-medium">{value}</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${getBarColor(value)}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>

      {/* Tooltip */}
      {showTooltip && description && (
        <div className="absolute z-20 bottom-full left-0 mb-2 p-3 panel text-xs text-text-secondary max-w-[250px] rounded-xl">
          {description}
        </div>
      )}
    </div>
  )
}
