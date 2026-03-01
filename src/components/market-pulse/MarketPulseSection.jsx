import { useMemo } from 'react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import FearGreedGauge from './FearGreedGauge'
import MarketStatCard from './MarketStatCard'
import GainersLosers from './GainersLosers'
import { formatCurrency, formatLargeNumber } from '../../utils/formatters'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { whaleTransactions } from '../../data/whaleData'
import TechTerm from '../ui/TechTerm'

export default function MarketPulseSection({ globalData, globalLoading, fearGreed, fearGreedLoading, coins }) {
  const { currency } = useCurrency()
  const { lang } = useLanguage()

  // Count whale movements in last 24h
  const whaleStats = useMemo(() => {
    const now = Date.now()
    const recent = whaleTransactions.filter(tx =>
      (now - new Date(tx.timestamp).getTime()) < 86400000
    )
    const totalValue = recent.reduce((sum, tx) => sum + (tx.valueUsd || 0), 0)
    return { count: recent.length, totalValue }
  }, [])

  return (
    <SectionWrapper id="market">
      <SectionHeading
        title={t('marketPulseTitle', lang)}
        subtitle={t('marketPulseSubtitle', lang)}
        glowColor="green"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 mb-12">
        {/* Fear & Greed */}
        <div className="panel panel-dark flex items-center justify-center">
          {fearGreedLoading ? (
            <SkeletonLoader lines={3} />
          ) : (
            <FearGreedGauge
              value={fearGreed?.value ?? 50}
              classification={fearGreed?.classification ?? 'Neutral'}
            />
          )}
        </div>

        {/* Stats */}
        {globalLoading ? (
          Array.from({ length: 4 }, (_, i) => (
            <div key={i} className="panel panel-dark">
              <SkeletonLoader lines={2} />
            </div>
          ))
        ) : (
          <>
            <MarketStatCard
              label={<TechTerm term="market_cap">{t('marketTotalCap', lang)}</TechTerm>}
              value={formatCurrency(globalData?.total_market_cap?.[currency], 2, currency)}
              change={globalData?.market_cap_change_percentage_24h_usd}
            />
            <MarketStatCard
              label={<TechTerm term="btc_dominance">{t('marketBtcDominance', lang)}</TechTerm>}
              value={`${globalData?.market_cap_percentage?.btc?.toFixed(1) ?? '—'}%`}
            />
            <MarketStatCard
              label={<TechTerm term="trading_volume">{t('marketVolume24h', lang)}</TechTerm>}
              value={formatCurrency(globalData?.total_volume?.[currency], 2, currency)}
            />
            <MarketStatCard
              label={<TechTerm term="whale">{t('activeWhales24h', lang)}</TechTerm>}
              value={`${whaleStats.count}`}
              icon="🐋"
            />
          </>
        )}
      </div>

      <GainersLosers coins={coins} />
    </SectionWrapper>
  )
}
