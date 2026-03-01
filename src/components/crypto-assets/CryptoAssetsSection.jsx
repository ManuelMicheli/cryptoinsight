import { useState, useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SkeletonLoader from '../ui/SkeletonLoader'
import VaporizeTextCycle, { Tag } from '../ui/vapour-text-effect'
import CategoryTabs from './CategoryTabs'
import CryptoCard from './CryptoCard'
import DisclaimerBanner from './DisclaimerBanner'
import { cryptoMeta } from '../../data/cryptoMeta'
import { getCurrentFeatured } from '../../data/featuredRotation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

// Lazy import TokenDetailModal to avoid circular deps
import { lazy, Suspense } from 'react'
const TokenDetailModal = lazy(() => import('../crypto-detail/TokenDetailModal'))

export default function CryptoAssetsSection({ coins, loading }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const { lang } = useLanguage()
  const [searchParams, setSearchParams] = useSearchParams()

  // Deep link support: ?detail=ethereum opens modal automatically
  useEffect(() => {
    const detailId = searchParams.get('detail')
    if (detailId && coins) {
      const coin = coins.find(c => c.id === detailId)
      if (coin) setSelectedCoin(coin)
    }
  }, [searchParams, coins])

  const handleOpenDetail = (coin) => {
    setSelectedCoin(coin)
    setSearchParams({ detail: coin.id }, { replace: true })
  }

  const handleCloseDetail = () => {
    setSelectedCoin(null)
    setSearchParams({}, { replace: true })
  }

  // VaporizeTextCycle is canvas-based and needs a pixel value (can't use CSS clamp)
  const [vaporFontSize, setVaporFontSize] = useState(() => {
    const w = typeof window !== 'undefined' ? window.innerWidth : 1024
    return w < 640 ? '32px' : w < 1024 ? '48px' : '64px'
  })

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth
      setVaporFontSize(w < 640 ? '32px' : w < 1024 ? '48px' : '64px')
    }
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const featuredIds = getCurrentFeatured()

  const filtered = coins
    ? coins.filter((coin) => {
        if (activeCategory === 'all') return true
        if (activeCategory === 'featured') return featuredIds.includes(coin.id)
        const meta = cryptoMeta[coin.id]
        return meta?.category === activeCategory
      })
    : []

  return (
    <section id="crypto" className="w-full bg-bg-secondary/30">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-12 md:pt-16 lg:pt-20 pb-6">
        <div className="w-full text-center mb-10 md:mb-12">
          <h2 className="w-full h-[60px] sm:h-[70px] md:h-[80px] lg:h-[90px] font-heading font-bold text-glow-cyan text-neon-cyan">
            <VaporizeTextCycle
              texts={["Crypto", "is", "Cool"]}
              font={{
                fontFamily: '"Orbitron", sans-serif',
                fontSize: vaporFontSize,
                fontWeight: 700,
              }}
              color="rgb(0, 240, 255)"
              spread={5}
              density={5}
              animation={{
                vaporizeDuration: 2,
                fadeInDuration: 1,
                waitDuration: 0.5,
              }}
              direction="left-to-right"
              alignment="center"
              tag={Tag.P}
            />
          </h2>
          <p className="text-text-secondary typo-body-lg max-w-3xl mx-auto">
            {t('cryptoAssetsSubtitle', lang)}
          </p>
        </div>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />
      </div>

      <div className="w-full px-4 md:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
            {Array.from({ length: 6 }, (_, i) => (
              <div key={i} className="panel">
                <SkeletonLoader lines={4} />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((coin) => (
                <CryptoCard key={coin.id} coin={coin} onClick={() => handleOpenDetail(coin)} />
              ))}
            </AnimatePresence>
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <p className="text-center text-text-secondary py-12">{t('cryptoNoCategory', lang)}</p>
        )}

        <div className="px-2 md:px-6 lg:px-8 xl:px-12 2xl:px-16">
          <DisclaimerBanner />
        </div>
      </div>

      {/* Token Detail Modal */}
      <Suspense fallback={null}>
        <TokenDetailModal
          coin={selectedCoin}
          isOpen={!!selectedCoin}
          onClose={handleCloseDetail}
        />
      </Suspense>
    </section>
  )
}
