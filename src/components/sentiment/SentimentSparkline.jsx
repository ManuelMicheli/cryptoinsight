export default function SentimentSparkline({ data, className = '' }) {
  if (!data || data.length < 2) return null

  const width = 120
  const height = 30
  const padding = 2
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2)
    const y = height - padding - ((v - min) / range) * (height - padding * 2)
    return `${x},${y}`
  })

  const last = data[data.length - 1]
  const first = data[0]
  const color = last >= first ? '#00ff88' : '#ef4444'

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={`h-[30px] ${className}`}>
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}
