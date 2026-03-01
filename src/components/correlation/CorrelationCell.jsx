function getCellColor(value) {
  if (value === 1) return 'rgba(0, 240, 255, 0.3)'
  if (value > 0.7) return `rgba(0, 240, 255, ${0.1 + value * 0.25})`
  if (value > 0.3) return `rgba(0, 240, 255, ${value * 0.15})`
  if (value > 0) return `rgba(0, 240, 255, ${value * 0.08})`
  if (value === 0) return 'rgba(255, 255, 255, 0.02)'
  if (value > -0.3) return `rgba(239, 68, 68, ${Math.abs(value) * 0.08})`
  if (value > -0.7) return `rgba(239, 68, 68, ${Math.abs(value) * 0.15})`
  return `rgba(239, 68, 68, ${0.1 + Math.abs(value) * 0.25})`
}

export default function CorrelationCell({ value, isAnomaly, onMouseEnter, onMouseLeave }) {
  const bgColor = getCellColor(value)

  return (
    <div
      className={`w-full aspect-square flex items-center justify-center text-[9px] sm:text-[10px] font-medium cursor-default transition-all ${
        isAnomaly ? 'ring-1 ring-neon-amber/60' : ''
      }`}
      style={{ backgroundColor: bgColor }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value !== undefined ? (value === 1 ? '' : value.toFixed(1)) : ''}
    </div>
  )
}
