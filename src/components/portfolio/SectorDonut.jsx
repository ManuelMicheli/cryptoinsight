import { useMemo } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { cryptoMeta } from '../../data/cryptoMeta'

const sectorColors = {
  'layer-1': '#00f0ff',
  payments: '#00ff88',
  defi: '#8b5cf6',
  gaming: '#f59e0b',
  ai: '#ef4444',
}

const sectorLabels = {
  'layer-1': { it: 'Layer 1', en: 'Layer 1' },
  payments: { it: 'Pagamenti', en: 'Payments' },
  defi: { it: 'DeFi', en: 'DeFi' },
  gaming: { it: 'Gaming', en: 'Gaming' },
  ai: { it: 'AI', en: 'AI' },
}

export default function SectorDonut({ holdings }) {
  const { lang } = useLanguage()

  const sectors = useMemo(() => {
    const totals = {}
    let total = 0
    holdings.forEach(h => {
      const meta = cryptoMeta[h.coinId]
      if (!meta) return
      const cat = meta.category
      totals[cat] = (totals[cat] || 0) + h.quantity
      total += h.quantity
    })
    return Object.entries(totals).map(([cat, val]) => ({
      category: cat,
      percentage: total > 0 ? (val / total) * 100 : 0,
    }))
  }, [holdings])

  if (sectors.length === 0) return null

  // SVG donut chart
  const size = 160
  const strokeWidth = 24
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  let offset = 0

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {sectors.map(sector => {
          const dashLength = (sector.percentage / 100) * circumference
          const dashOffset = -offset
          offset += dashLength
          return (
            <circle
              key={sector.category}
              cx={size / 2}
              cy={size / 2}
              r={radius}
              fill="none"
              stroke={sectorColors[sector.category] || '#8a8a9a'}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${size / 2} ${size / 2})`}
              style={{ filter: `drop-shadow(0 0 4px ${sectorColors[sector.category]}40)` }}
            />
          )
        })}
      </svg>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-3">
        {sectors.map(sector => (
          <div key={sector.category} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: sectorColors[sector.category] }}
            />
            <span className="text-text-secondary text-xs">
              {sectorLabels[sector.category]?.[lang] || sector.category} {sector.percentage.toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
