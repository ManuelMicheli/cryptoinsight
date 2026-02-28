import { useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
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
    <SectionWrapper id="crypto" className="bg-bg-secondary/30">
      <SectionHeading
        title={t('cryptoAssetsTitle', lang)}
        subtitle={t('cryptoAssetsSubtitle', lang)}
        glowColor="purple"
      />

      <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="panel">
              <SkeletonLoader lines={4} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((coin) => (
              <CryptoCard key={coin.id} coin={coin} />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {filtered.length === 0 && !loading && (
        <p className="text-center text-text-secondary py-12">{t('cryptoNoCategory', lang)}</p>
      )}

      <DisclaimerBanner />
    </SectionWrapper>
  )
}
