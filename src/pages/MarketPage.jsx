import { useCryptoData } from '../contexts/CryptoDataContext'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import MarketPulseSection from '../components/market-pulse/MarketPulseSection'
import WhaleActivityFeedSection from '../components/market-pulse/WhaleActivityFeed'
import CorrelationSection from '../components/correlation/CorrelationSection'
import PortfolioSection from '../components/portfolio/PortfolioSection'
import ScenarioSection from '../components/scenario/ScenarioSection'

export default function MarketPage() {
  const { lang } = useLanguage()
  const { coins, globalData, globalLoading, fearGreed, fearGreedLoading } = useCryptoData()

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
      <WhaleActivityFeedSection />
      <CorrelationSection />
      <PortfolioSection />
      <ScenarioSection />
    </PageTransition>
  )
}
