import { motion } from 'motion/react'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'
import { cryptoMeta } from '../../data/cryptoMeta'
import SparklineChart from './SparklineChart'

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return [r, g, b]
}

export default function CryptoListItem({ coin, onClick }) {
  const { currency } = useCurrency()
  const meta = cryptoMeta[coin.id] || {}
  const change24h = coin.price_change_percentage_24h
  const isPositive = (change24h ?? 0) >= 0
  const sparklineData = coin.sparkline_in_7d?.price || []
  const is7dPositive = (coin.price_change_percentage_7d_in_currency ?? 0) >= 0

  const colors = meta.brandColors || ['#00f0ff', '#00f0ff']
  const [r1, g1, b1] = hexToRgb(colors[0])
  const [r2, g2, b2] = hexToRgb(colors[1])

  const brandStyle = {
    background: `linear-gradient(135deg, rgba(${r1},${g1},${b1}, 0.12), rgba(${r2},${g2},${b2}, 0.04))`,
    borderColor: `rgba(${r2},${g2},${b2}, 0.15)`,
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      layout
      onClick={onClick}
      className="flex items-center gap-3 px-3 py-3 rounded-xl border active:brightness-125 transition-all cursor-pointer"
      style={brandStyle}
    >
      {/* Rank */}
      <span className="text-text-secondary/50 typo-micro w-5 text-right flex-shrink-0">
        {coin.market_cap_rank}
      </span>

      {/* Icon */}
      <img
        src={coin.image}
        alt={coin.name}
        className="w-8 h-8 rounded-full ring-1 ring-white/10 flex-shrink-0"
      />

      {/* Name + symbol */}
      <div className="min-w-0 flex-1">
        <span className="font-heading typo-ui-sm font-semibold text-text-primary truncate block">
          {coin.name}
        </span>
        <span className="text-text-secondary/70 typo-micro uppercase">
          {coin.symbol?.toUpperCase()}
        </span>
      </div>

      {/* Mini sparkline */}
      <div className="w-16 h-6 flex-shrink-0 opacity-60">
        <SparklineChart data={sparklineData} positive={is7dPositive} height={24} />
      </div>

      {/* Price + change */}
      <div className="text-right flex-shrink-0">
        <div className="typo-ui-sm font-semibold text-text-primary">
          {formatCurrency(coin.current_price, 2, currency)}
        </div>
        <div className={`typo-micro font-medium ${isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
          {isPositive ? '▲' : '▼'} {formatPercentage(change24h)}
        </div>
      </div>
    </motion.div>
  )
}
