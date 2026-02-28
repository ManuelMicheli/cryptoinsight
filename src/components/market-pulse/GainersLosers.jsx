import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function GainersLosers({ coins }) {
  const { currency } = useCurrency()
  const { lang } = useLanguage()

  if (!coins || coins.length === 0) return null

  const sorted = [...coins].sort((a, b) => (b.price_change_percentage_24h || 0) - (a.price_change_percentage_24h || 0))
  const gainers = sorted.slice(0, 5)
  const losers = sorted.slice(-5).reverse()

  const CoinRow = ({ coin, colorClass }) => (
    <div className="flex items-center justify-between py-3 border-b border-white/[0.04] last:border-b-0">
      <div className="flex items-center gap-3">
        <img src={coin.image} alt={coin.name} className="w-7 h-7 rounded-full ring-1 ring-white/10" />
        <span className="text-sm font-semibold text-text-primary">{coin.symbol?.toUpperCase()}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm text-text-secondary">{formatCurrency(coin.current_price, 2, currency)}</span>
        <span className={`text-sm font-bold ${colorClass}`}>{formatPercentage(coin.price_change_percentage_24h)}</span>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
      <div className="panel panel-green">
        <h4 className="font-heading text-base text-neon-green mb-4 flex items-center gap-2">
          <span>▲</span> {t('gainersTitle', lang)}
        </h4>
        <div>
          {gainers.map((coin) => (
            <CoinRow key={coin.id} coin={coin} colorClass="text-neon-green" />
          ))}
        </div>
      </div>

      <div className="panel" style={{ background: 'linear-gradient(145deg, rgba(100, 0, 0, 0.8), rgba(239, 68, 68, 0.2))', borderColor: 'rgba(239, 68, 68, 0.15)', boxShadow: '0 8px 32px rgba(239, 68, 68, 0.1)' }}>
        <h4 className="font-heading text-base text-neon-red mb-4 flex items-center gap-2">
          <span>▼</span> {t('losersTitle', lang)}
        </h4>
        <div>
          {losers.map((coin) => (
            <CoinRow key={coin.id} coin={coin} colorClass="text-neon-red" />
          ))}
        </div>
      </div>
    </div>
  )
}
