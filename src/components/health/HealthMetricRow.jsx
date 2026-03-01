import { motion } from 'motion/react'

export default function HealthMetricRow({ label, value, sparkline, average }) {
  const isAboveAvg = typeof value === 'number' && typeof average === 'number' && value >= average

  // Mini sparkline inline
  const renderSparkline = () => {
    if (!sparkline || sparkline.length < 2) return null
    const w = 60, h = 16, pad = 1
    const min = Math.min(...sparkline)
    const max = Math.max(...sparkline)
    const range = max - min || 1
    const pts = sparkline.map((v, i) => {
      const x = pad + (i / (sparkline.length - 1)) * (w - pad * 2)
      const y = h - pad - ((v - min) / range) * (h - pad * 2)
      return `${x},${y}`
    })
    const trending = sparkline[sparkline.length - 1] >= sparkline[0]
    return (
      <svg viewBox={`0 0 ${w} ${h}`} className="w-[60px] h-[16px]">
        <polyline points={pts.join(' ')} fill="none" stroke={trending ? '#00ff88' : '#ef4444'} strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    )
  }

  return (
    <div className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
      <span className="text-text-secondary text-xs flex-shrink-0">{label}</span>
      <div className="flex items-center gap-3">
        {renderSparkline()}
        <span className="text-text-primary text-xs font-medium min-w-[50px] text-right">{value}</span>
        {average !== undefined && (
          <span className={`text-[10px] ${isAboveAvg ? 'text-neon-green' : 'text-neon-red'}`}>
            vs {average}
          </span>
        )}
      </div>
    </div>
  )
}
