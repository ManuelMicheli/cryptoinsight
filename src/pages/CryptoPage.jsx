import { useCryptoData } from '../contexts/CryptoDataContext'
import PageTransition from '../components/layout/PageTransition'
import WhyCryptoSection from '../components/why-crypto/WhyCryptoSection'
import HomePreviewsGrid from '../components/home/HomePreviewsGrid'
import ExploreNewsSection from '../components/explore-news/ExploreNewsSection'
import CryptoAssetsSection from '../components/crypto-assets/CryptoAssetsSection'
import BybitSection from '../components/bybit/BybitSection'

export default function CryptoPage() {
  const { coins, coinsLoading: loading } = useCryptoData()

  return (
    <PageTransition>
      <WhyCryptoSection />
      <HomePreviewsGrid />
      <ExploreNewsSection />
      <CryptoAssetsSection coins={coins} loading={loading} />
      <BybitSection />
    </PageTransition>
  )
}
