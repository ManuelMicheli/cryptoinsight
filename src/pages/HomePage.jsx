import { useCryptoMarkets } from '../hooks/useCryptoMarkets'
import { useCurrency } from '../contexts/CurrencyContext'
import PageTransition from '../components/layout/PageTransition'
import HeroSection from '../components/hero/HeroSection'
import WhyCryptoSection from '../components/why-crypto/WhyCryptoSection'
import HomePreviewsGrid from '../components/home/HomePreviewsGrid'
import ExploreNewsSection from '../components/explore-news/ExploreNewsSection'

export default function HomePage() {
  const { currency } = useCurrency()
  const { data: coins } = useCryptoMarkets(currency)

  return (
    <PageTransition>
      <HeroSection coins={coins} />
      <WhyCryptoSection />
      <HomePreviewsGrid />
      <ExploreNewsSection />
    </PageTransition>
  )
}
