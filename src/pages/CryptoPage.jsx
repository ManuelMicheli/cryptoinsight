import { useCryptoData } from '../contexts/CryptoDataContext'
import PageTransition from '../components/layout/PageTransition'
import CryptoAssetsSection from '../components/crypto-assets/CryptoAssetsSection'
import BybitSection from '../components/bybit/BybitSection'

export default function CryptoPage() {
  const { coins, coinsLoading: loading } = useCryptoData()

  return (
    <PageTransition>
      <CryptoAssetsSection coins={coins} loading={loading} />
      <BybitSection />
    </PageTransition>
  )
}
