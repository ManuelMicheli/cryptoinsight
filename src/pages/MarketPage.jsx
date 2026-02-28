import { useCryptoMarkets } from '../hooks/useCryptoMarkets'
import { useGlobalData } from '../hooks/useGlobalData'
import { useFearGreed } from '../hooks/useFearGreed'
import { useCurrency } from '../contexts/CurrencyContext'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import MarketPulseSection from '../components/market-pulse/MarketPulseSection'

export default function MarketPage() {
  const { currency } = useCurrency()
  const { lang } = useLanguage()
  const { data: coins } = useCryptoMarkets(currency)
  const { data: globalData, loading: globalLoading } = useGlobalData()
  const { data: fearGreed, loading: fearGreedLoading } = useFearGreed()

  return (
    <PageTransition>
      <PageHero
        theme="market"
        title={t('marketHeroTitle', lang)}
        highlightedWord={t('marketHeroHighlight', lang)}
        subtitle={t('marketHeroSubtitle', lang)}
      />
      <MarketPulseSection
        globalData={globalData}
        globalLoading={globalLoading}
        fearGreed={fearGreed}
        fearGreedLoading={fearGreedLoading}
        coins={coins}
      />
    </PageTransition>
  )
}
