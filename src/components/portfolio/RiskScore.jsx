import { useMemo } from 'react'
import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { cryptoMeta } from '../../data/cryptoMeta'

function calculateRiskScore(holdings) {
  if (holdings.length === 0) return 0

  const total = holdings.reduce((sum, h) => sum + h.quantity, 0)
  if (total === 0) return 0

  // Herfindahl index (concentration)
  const shares = holdings.map(h => h.quantity / total)
  const hhi = shares.reduce((sum, s) => sum + s * s, 0)

  // Category diversity
  const categories = new Set(holdings.map(h => cryptoMeta[h.coinId]?.category).filter(Boolean))
  const catDiversity = categories.size

  // Number of assets
  const numAssets = holdings.length

  // Score: more concentrated = higher risk, more diverse = lower risk
  let score = hhi * 10 // 0-10 base from concentration
  if (numAssets < 3) score += 2
  if (catDiversity < 2) score += 2
  if (catDiversity >= 4) score -= 1

  return Math.max(1, Math.min(10, Math.round(score)))
}

function getRiskLabel(score, lang) {
  if (score <= 3) return lang === 'it' ? 'Basso' : 'Low'
  if (score <= 6) return lang === 'it' ? 'Moderato' : 'Moderate'
  return lang === 'it' ? 'Alto' : 'High'
}

function getRiskColor(score) {
  if (score <= 3) return '#00ff88'
  if (score <= 6) return '#f59e0b'
  return '#ef4444'
}

export default function RiskScore({ holdings }) {
  const { lang } = useLanguage()
  const score = useMemo(() => calculateRiskScore(holdings), [holdings])
  const color = getRiskColor(score)

  return (
    <div className="text-center">
      <p className="text-text-secondary text-xs mb-2">
        {lang === 'it' ? 'Rischio Portfolio' : 'Portfolio Risk'}
      </p>
      <div className="flex items-center justify-center gap-1">
        {Array.from({ length: 10 }, (_, i) => (
          <motion.div
            key={i}
            className="w-4 h-6 rounded-sm"
            style={{
              backgroundColor: i < score ? color : 'rgba(255,255,255,0.05)',
              boxShadow: i < score ? `0 0 6px ${color}40` : 'none',
            }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          />
        ))}
      </div>
      <p className="text-xs mt-2 font-medium" style={{ color }}>
        {score}/10 — {getRiskLabel(score, lang)}
      </p>
    </div>
  )
}
