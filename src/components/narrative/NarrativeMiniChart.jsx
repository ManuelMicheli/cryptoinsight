export default function NarrativeMiniChart({ sparkline, events, priceChange }) {
  if (!sparkline || sparkline.length === 0) return null

  const width = 280
  const height = 60
  const padding = 4
  const min = Math.min(...sparkline)
  const max = Math.max(...sparkline)
  const range = max - min || 1

  const points = sparkline.map((v, i) => {
    const x = padding + (i / (sparkline.length - 1)) * (width - padding * 2)
    const y = height - padding - ((v - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const lineColor = priceChange >= 0 ? '#00ff88' : '#ef4444'
  const gradientId = `chart-grad-${Math.random().toString(36).slice(2, 8)}`

  // Place event dots along the sparkline
  const eventPositions = events
    ? events.slice(0, 4).map((_, i) => {
        const idx = Math.floor((sparkline.length - 1) * ((i + 1) / (events.length + 1)))
        const x = padding + (idx / (sparkline.length - 1)) * (width - padding * 2)
        const y = height - padding - ((sparkline[idx] - min) / range) * (height - padding * 2)
        return { x, y, type: events[i]?.type }
      })
    : []

  const dotColors = {
    tweet: '#00f0ff',
    regolamentazione: '#f59e0b',
    unlock: '#00ff88',
    whale: '#8b5cf6',
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-[60px]">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={lineColor} stopOpacity="0.3" />
          <stop offset="100%" stopColor={lineColor} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon
        points={`${padding},${height - padding} ${points.join(' ')} ${width - padding},${height - padding}`}
        fill={`url(#${gradientId})`}
      />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={lineColor}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {eventPositions.map((pos, i) => (
        <circle
          key={i}
          cx={pos.x}
          cy={pos.y}
          r="4"
          fill={dotColors[pos.type] || '#00f0ff'}
          stroke="#0a0a0f"
          strokeWidth="1.5"
        />
      ))}
    </svg>
  )
}
