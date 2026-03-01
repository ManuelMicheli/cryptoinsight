import { motion, useSpring, useTransform } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import TechTerm from '../ui/TechTerm'

const getColor = (value) => {
  if (value <= 25) return '#ef4444'
  if (value <= 45) return '#f59e0b'
  if (value <= 55) return '#eab308'
  if (value <= 75) return '#84cc16'
  return '#00ff88'
}

const classificationMap = {
  'Extreme Fear': 'fearExtreme',
  'Fear': 'fear',
  'Neutral': 'neutral',
  'Greed': 'greed',
  'Extreme Greed': 'greedExtreme',
}

export default function FearGreedGauge({ value = 50, classification = 'Neutral' }) {
  const { lang } = useLanguage()
  const springValue = useSpring(0, { stiffness: 50, damping: 20 })
  const rotation = useTransform(springValue, [0, 100], [-90, 90])

  if (typeof window !== 'undefined') {
    springValue.set(value)
  }

  const color = getColor(value)
  const labelKey = classificationMap[classification] || 'neutral'

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full max-w-48 h-28 overflow-hidden mx-auto">
        <svg viewBox="0 0 200 110" className="w-full h-full">
          {/* Background arc */}
          <path
            d="M 20 100 A 80 80 0 0 1 180 100"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Colored segments */}
          <path d="M 20 100 A 80 80 0 0 1 56 38" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
          <path d="M 56 38 A 80 80 0 0 1 100 20" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
          <path d="M 100 20 A 80 80 0 0 1 144 38" fill="none" stroke="#84cc16" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
          <path d="M 144 38 A 80 80 0 0 1 180 100" fill="none" stroke="#00ff88" strokeWidth="12" strokeLinecap="round" opacity="0.3" />
        </svg>
        {/* Needle */}
        <motion.div
          className="absolute bottom-0 left-1/2 origin-bottom"
          style={{ rotate: rotation, width: 2, height: 70, marginLeft: -1 }}
        >
          <div className="w-full h-full rounded-full" style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
        </motion.div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/20 border-2" style={{ borderColor: color }} />
      </div>
      <div className="text-center mt-3">
        <div className="font-heading typo-stat font-bold" style={{ color }}>{value}</div>
        <div className="text-text-secondary typo-body-sm mt-1">{t(labelKey, lang)}</div>
        <div className="text-text-secondary typo-ui-sm mt-0.5"><TechTerm term="fear_greed">{t('fearGreedIndex', lang)}</TechTerm></div>
      </div>
    </div>
  )
}
