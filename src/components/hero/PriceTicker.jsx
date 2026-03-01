import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'

export default function PriceTicker({ coins }) {
  const { currency } = useCurrency()
  if (!coins || coins.length === 0) return null

  const items = [...coins, ...coins]

  return (
    <div className="w-full overflow-hidden py-4 border-y border-white/5 bg-bg-secondary/30 backdrop-blur-sm">
      <div className="animate-marquee flex gap-8 whitespace-nowrap">
        {items.map((coin, i) => (
          <div key={`${coin.id}-${i}`} className="flex items-center gap-3 px-4">
            <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
            <span className="typo-stat-micro font-medium text-text-primary">{coin.symbol?.toUpperCase()}</span>
            <span className="typo-stat-micro" style={{ color: 'var(--hero-primary)' }}>{formatCurrency(coin.current_price, 2, currency)}</span>
            <span className={`typo-micro font-medium ${
              coin.price_change_percentage_24h >= 0 ? 'text-neon-green' : 'text-neon-red'
            }`}>
              {formatPercentage(coin.price_change_percentage_24h)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
