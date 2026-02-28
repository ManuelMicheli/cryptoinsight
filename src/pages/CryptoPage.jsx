import { useCryptoMarkets } from '../hooks/useCryptoMarkets'
import { useCurrency } from '../contexts/CurrencyContext'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import CryptoAssetsSection from '../components/crypto-assets/CryptoAssetsSection'
import BybitSection from '../components/bybit/BybitSection'

export default function CryptoPage() {
  const { currency } = useCurrency()
  const { lang } = useLanguage()
  const { data: coins, loading } = useCryptoMarkets(currency)

  return (
    <PageTransition>
      <PageHero
        theme="crypto"
        title={t('cryptoHeroTitle', lang)}
        highlightedWord={t('cryptoHeroHighlight', lang)}
        subtitle={t('cryptoHeroSubtitle', lang)}
      />
      <CryptoAssetsSection coins={coins} loading={loading} />
      <BybitSection />
    </PageTransition>
  )
}
