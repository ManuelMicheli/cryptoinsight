import { useState, useEffect, useMemo, lazy, Suspense } from 'react'
import { useSearchParams } from 'react-router'
import { AnimatePresence } from 'motion/react'
import SkeletonLoader from '../ui/SkeletonLoader'
import CategoryTabs from './CategoryTabs'
import CryptoCard from './CryptoCard'
import CryptoListItem from './CryptoListItem'
import DisclaimerBanner from './DisclaimerBanner'
import { cryptoMeta } from '../../data/cryptoMeta'
import { getCurrentFeatured } from '../../data/featuredRotation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

// Lazy imports — VaporizeTextCycle is heavy canvas work, skip on mobile
const TokenDetailModal = lazy(() => import('../crypto-detail/TokenDetailModal'))
const VaporizeTextCycle = lazy(() => import('../ui/vapour-text-effect'))

// Pin order: ETH first, then BTC, then by market cap
const PIN_ORDER = ['ethereum', 'bitcoin']

export default function CryptoAssetsSection({ coins, loading }) {
  const [activeCategory, setActiveCategory] = useState('all')
  const [selectedCoin, setSelectedCoin] = useState(null)
  const [search, setSearch] = useState('')
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

  // VaporizeTextCycle is canvas-heavy (particles from pixel data) — skip on small screens
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const featuredIds = getCurrentFeatured()

  const filtered = useMemo(() => {
    if (!coins) return []

    let list = coins.filter((coin) => {
      if (activeCategory === 'all') return true
      if (activeCategory === 'featured') return featuredIds.includes(coin.id)
      const meta = cryptoMeta[coin.id]
      return meta?.category === activeCategory
    })

    // Search filter
    const q = search.trim().toLowerCase()
    if (q) {
      list = list.filter(coin =>
        coin.name?.toLowerCase().includes(q) ||
        coin.symbol?.toLowerCase().includes(q)
      )
    }

    // Pin ETH first, BTC second, rest by market cap
    list.sort((a, b) => {
      const aPin = PIN_ORDER.indexOf(a.id)
      const bPin = PIN_ORDER.indexOf(b.id)
      if (aPin !== -1 && bPin !== -1) return aPin - bPin
      if (aPin !== -1) return -1
      if (bPin !== -1) return 1
      return (a.market_cap_rank ?? 999) - (b.market_cap_rank ?? 999)
    })

    return list
  }, [coins, activeCategory, featuredIds, search])

  return (
    <section id="crypto" className="w-full bg-bg-secondary/30">
      <div className="w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pt-12 md:pt-16 lg:pt-20 pb-6">
        <div className="w-full text-center mb-10 md:mb-12">
          <h2 className="w-full font-heading font-bold text-glow-cyan text-neon-cyan">
            {isMobile ? (
              <span className="typo-h1">Crypto is Cool</span>
            ) : (
              <div className="h-[80px] lg:h-[90px]">
                <Suspense fallback={<span className="typo-h1">Crypto is Cool</span>}>
                  <VaporizeTextCycle
                    texts={["Crypto", "is", "Cool"]}
                    font={{
                      fontFamily: '"Orbitron", sans-serif',
                      fontSize: window.innerWidth < 1024 ? '48px' : '64px',
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
                  />
                </Suspense>
              </div>
            )}
          </h2>
          <p className="text-text-secondary typo-body-lg max-w-3xl mx-auto">
            {t('cryptoAssetsSubtitle', lang)}
          </p>
        </div>

        <CategoryTabs active={activeCategory} onChange={setActiveCategory} />

        {/* Search */}
        <div className="max-w-md mx-auto mt-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder={lang === 'it' ? 'Cerca crypto...' : 'Search crypto...'}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-text-primary typo-body-sm placeholder:text-text-secondary/40 focus:outline-none focus:border-neon-cyan/40 transition-colors"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary/50 hover:text-text-primary transition-colors"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
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
          <>
            {/* Mobile: compact list */}
            <div className="flex flex-col gap-2 sm:hidden">
              <AnimatePresence mode="popLayout">
                {filtered.map((coin) => (
                  <CryptoListItem key={coin.id} coin={coin} onClick={() => handleOpenDetail(coin)} />
                ))}
              </AnimatePresence>
            </div>

            {/* Tablet+: card grid */}
            <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 lg:gap-5">
              <AnimatePresence mode="popLayout">
                {filtered.map((coin) => (
                  <CryptoCard key={coin.id} coin={coin} onClick={() => handleOpenDetail(coin)} />
                ))}
              </AnimatePresence>
            </div>
          </>
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
