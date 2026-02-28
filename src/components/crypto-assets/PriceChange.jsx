import { formatPercentage } from '../../utils/formatters'

export default function PriceChange({ value, label }) {
  if (value == null) return <span className="text-text-secondary text-xs">—</span>

  const isPositive = value >= 0

  return (
    <div className="text-center bg-white/[0.03] rounded-lg px-3 py-2">
      <div className={`text-sm md:text-base font-semibold flex items-center justify-center gap-1 ${
        isPositive ? 'text-neon-green' : 'text-neon-red'
      }`}>
        <span className="text-xs">{isPositive ? '▲' : '▼'}</span>
        {formatPercentage(value)}
      </div>
      {label && <div className="text-xs text-text-secondary mt-1">{label}</div>}
    </div>
  )
}
