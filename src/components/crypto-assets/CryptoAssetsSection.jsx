import { useState } from 'react'
import { AnimatePresence } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import CategoryTabs from './CategoryTabs'
import CryptoCard from './CryptoCard'
import DisclaimerBanner from './DisclaimerBanner'
import { cryptoMeta } from '../../data/cryptoMeta'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function CryptoAssetsSection({ coins, loading }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const { lang } = useLanguage()

  const filtered = coins
    ? coins.filter((coin) => {
        if (activeCategory === 'all') return true
        const meta = cryptoMeta[coin.id]
        return meta?.category === activeCategory
      })
    : []

  return (
    <section id="crypto" className="w-full bg-bg-secondary/30">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 pt-12 md:pt-16 lg:pt-20 pb-6">
        <SectionHeading
          title={t('cryptoAssetsTitle', lang)}
          subtitle={t('cryptoAssetsSubtitle', lang)}
          glowColor="cyan"
        />
        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="panel">
                <SkeletonLoader lines={4} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((coin) => (
                <CryptoCard key={coin.id} coin={coin} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <p className="text-center text-text-secondary py-12">{t('cryptoNoCategory', lang)}</p>
        )}

        <div className="max-w-[1280px] mx-auto px-2 md:px-6 lg:px-8">
          <DisclaimerBanner />
        </div>
      </div>
    </section>
  )
}
