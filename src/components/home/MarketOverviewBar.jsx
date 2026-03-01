import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { t } from '../../i18n/translations'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import AnimatedNumber from '../ui/AnimatedNumber'

export default function MarketOverviewBar() {
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const { globalData, globalLoading, fearGreed } = useCryptoData()

  if (globalLoading || !globalData) return null

  const totalMcap = globalData.total_market_cap?.[currency] || 0
  const btcDom = globalData.market_cap_percentage?.btc || 0
  const change24h = globalData.market_cap_change_percentage_24h_usd || 0
  const fgValue = fearGreed?.value || 0

  const items = [
    {
      label: t('marketTotalCap', lang),
      value: totalMcap,
      format: v => formatCurrency(v, 0, currency),
    },
    {
      label: t('marketBtcDominance', lang),
      value: btcDom,
      format: v => `${v.toFixed(1)}%`,
    },
    {
      label: lang === 'it' ? 'Variazione 24h' : '24h Change',
      value: change24h,
      format: v => formatPercentage(v),
      isChange: true,
    },
    {
      label: t('fearGreedIndex', lang),
      value: fgValue,
      format: v => Math.round(v).toString(),
    },
  ]

  return (
    <motion.div
      className="glass mx-4 md:mx-8 lg:mx-16 -mt-8 relative z-20 rounded-2xl"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="px-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 py-4 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {items.map((item, i) => (
          <div key={i} className="text-center">
            <p className="text-text-secondary text-[10px] md:text-xs uppercase tracking-wider mb-1">{item.label}</p>
            <AnimatedNumber
              value={item.value}
              formatFn={item.format}
              className={`font-heading typo-ui font-bold ${
                item.isChange
                  ? item.value >= 0 ? 'text-neon-green' : 'text-neon-red'
                  : 'text-text-primary'
              }`}
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}
