import { useCryptoData } from '../contexts/CryptoDataContext'
import PageTransition from '../components/layout/PageTransition'
import HeroSection from '../components/hero/HeroSection'

export default function HomePage() {
  const { coins } = useCryptoData()

  return (
    <PageTransition>
      <HeroSection coins={coins} />
    </PageTransition>
  )
}
