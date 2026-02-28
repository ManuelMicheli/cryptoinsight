const SYMBOLS = { usd: '$', eur: '€' }

export function formatCurrency(value, decimals = 2, currency = 'usd') {
  if (value == null) return '—'
  const s = SYMBOLS[currency] || '$'
  if (value >= 1_000_000_000_000) return `${s}${(value / 1_000_000_000_000).toFixed(2)}T`
  if (value >= 1_000_000_000) return `${s}${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `${s}${(value / 1_000_000).toFixed(2)}M`
  if (value >= 1) return `${s}${value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}`
  return `${s}${value.toFixed(Math.max(decimals, 4))}`
}

export function formatPercentage(value) {
  if (value == null) return '—'
  const sign = value >= 0 ? '+' : ''
  return `${sign}${value.toFixed(2)}%`
}

export function formatLargeNumber(value) {
  if (value == null) return '—'
  if (value >= 1_000_000_000_000) return `${(value / 1_000_000_000_000).toFixed(2)}T`
  if (value >= 1_000_000_000) return `${(value / 1_000_000_000).toFixed(2)}B`
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(2)}M`
  return value.toLocaleString('en-US')
}

export function formatMarketCapRank(rank) {
  if (rank == null) return ''
  return `#${rank}`
}
