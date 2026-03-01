import { useMemo } from 'react'
import { Link } from 'react-router'
import { motion } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import GlassCard from '../ui/GlassCard'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { useCurrency } from '../../contexts/CurrencyContext'
import { useCryptoData } from '../../contexts/CryptoDataContext'
import { t } from '../../i18n/translations'
import { formatCurrency, formatPercentage } from '../../utils/formatters'
import { cryptoMeta } from '../../data/cryptoMeta'
import { events } from '../../data/events'
import { news } from '../../data/news'

const icons = {
  crypto: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="9" />
      <path d="M14.5 9.5c-.5-1-1.5-1.5-3-1.5s-3 1-3 2.5 1.5 2 3 2.5 3 1 3 2.5-1.5 2.5-3 2.5-2.5-.5-3-1.5" />
      <path d="M12 6v2m0 8v2" />
    </svg>
  ),
  market: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
      <polyline points="16,7 22,7 22,13" />
    </svg>
  ),
  events: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  ),
  news: (
    <svg viewBox="0 0 24 24" className="w-8 h-8" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V9a2 2 0 012-2h2a2 2 0 012 2v9a2 2 0 01-2 2h-2z" />
      <line x1="5" y1="10" x2="13" y2="10" />
      <line x1="5" y1="14" x2="11" y2="14" />
    </svg>
  ),
}

const panelVariant = {
  crypto: 'purple',
  market: 'green',
  events: 'amber',
  news: 'cyan',
}

const colorMap = {
  crypto: 'text-neon-purple',
  market: 'text-neon-green',
  events: 'text-neon-amber',
  news: 'text-neon-cyan',
}

export default function HomePreviewsGrid() {
  const { lang } = useLanguage()
  const { currency } = useCurrency()
  const { coins, fearGreed, globalData } = useCryptoData()

  // Top 3 crypto by market cap
  const topCrypto = useMemo(() => {
    if (!coins) return []
    return coins.slice(0, 3)
  }, [coins])

  // Next 2 upcoming events
  const upcomingEvents = useMemo(() => {
    const now = new Date()
    return events
      .filter(e => new Date(e.date) >= now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 2)
  }, [])

  // Latest news
  const latestNews = news[0]

  const impactIcons = { bullish: '🟢', bearish: '🔴', neutral: '🟡' }

  return (
    <SectionWrapper>
      <SectionHeading
        title={t('previewSectionTitle', lang)}
        subtitle={t('previewSectionSubtitle', lang)}
      />

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Crypto Preview */}
        <motion.div variants={fadeInUp}>
          <Link to="/crypto" className="block group h-full">
            <div className="panel panel-purple h-full transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center ${colorMap.crypto}`}>
                  {icons.crypto}
                </div>
                <svg className="w-5 h-5 text-text-secondary group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="font-heading typo-h3 font-bold text-text-primary mb-3">{t('previewCryptoTitle', lang)}</h3>

              {/* Top 3 crypto mini cards */}
              {topCrypto.length > 0 && (
                <div className="space-y-2 mb-4">
                  {topCrypto.map(coin => {
                    const change = coin.price_change_percentage_24h_in_currency ?? 0
                    return (
                      <div key={coin.id} className="flex items-center justify-between py-1.5 px-2 rounded-lg bg-white/[0.03]">
                        <div className="flex items-center gap-2">
                          {coin.image && <img src={coin.image} alt="" className="w-5 h-5 rounded-full" />}
                          <span className="text-text-primary text-sm font-medium">{coin.symbol?.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-text-secondary text-sm">{formatCurrency(coin.current_price, 2, currency)}</span>
                          <span className={`text-xs font-medium ${change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
                            {formatPercentage(change)}
                          </span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <p className="text-neon-purple text-sm font-medium">
                {lang === 'it' ? 'Esplora tutte →' : 'Explore all →'}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Market Preview */}
        <motion.div variants={fadeInUp}>
          <Link to="/mercato" className="block group h-full">
            <div className="panel panel-green h-full transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center ${colorMap.market}`}>
                  {icons.market}
                </div>
                <svg className="w-5 h-5 text-text-secondary group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="font-heading typo-h3 font-bold text-text-primary mb-3">{t('previewMarketTitle', lang)}</h3>

              {/* Fear & Greed + Market Cap mini */}
              <div className="flex items-center gap-4 mb-4 py-2 px-3 rounded-lg bg-white/[0.03]">
                <div className="text-center">
                  <div className="text-[10px] text-text-secondary uppercase tracking-wider">{t('fearGreedIndex', lang)}</div>
                  <div className="font-heading text-xl font-bold text-neon-green mt-1">{fearGreed?.value ?? '—'}</div>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="text-center">
                  <div className="text-[10px] text-text-secondary uppercase tracking-wider">{t('marketBtcDominance', lang)}</div>
                  <div className="font-heading text-xl font-bold text-text-primary mt-1">{globalData?.market_cap_percentage?.btc?.toFixed(1) ?? '—'}%</div>
                </div>
              </div>

              <p className="text-neon-green text-sm font-medium">
                {lang === 'it' ? 'Analizza il mercato →' : 'Analyze the market →'}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* Events Preview */}
        <motion.div variants={fadeInUp}>
          <Link to="/eventi" className="block group h-full">
            <div className="panel panel-amber h-full transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center ${colorMap.events}`}>
                  {icons.events}
                </div>
                <svg className="w-5 h-5 text-text-secondary group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="font-heading typo-h3 font-bold text-text-primary mb-3">{t('previewEventsTitle', lang)}</h3>

              {/* Next 2 events */}
              {upcomingEvents.length > 0 && (
                <div className="space-y-2 mb-4">
                  {upcomingEvents.map(ev => {
                    const date = new Date(ev.date)
                    const daysUntil = Math.ceil((date - new Date()) / 86400000)
                    return (
                      <div key={ev.id} className="flex items-center gap-3 py-1.5 px-2 rounded-lg bg-white/[0.03]">
                        <div className="font-heading text-lg font-bold text-neon-amber">{date.getDate()}</div>
                        <div className="flex-1 min-w-0">
                          <p className="text-text-primary text-sm truncate">{typeof ev.title === 'string' ? ev.title : ev.title[lang]}</p>
                          <p className="text-text-secondary text-[10px]">
                            {lang === 'it' ? `tra ${daysUntil} giorni` : `in ${daysUntil} days`}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              <p className="text-neon-amber text-sm font-medium">
                {lang === 'it' ? 'Vedi tutti gli eventi →' : 'View all events →'}
              </p>
            </div>
          </Link>
        </motion.div>

        {/* News Preview */}
        <motion.div variants={fadeInUp}>
          <Link to="/news" className="block group h-full">
            <div className="panel h-full transition-all duration-300 hover:translate-y-[-4px]">
              <div className="flex items-start justify-between mb-6">
                <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center ${colorMap.news}`}>
                  {icons.news}
                </div>
                <svg className="w-5 h-5 text-text-secondary group-hover:translate-x-1 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
              <h3 className="font-heading typo-h3 font-bold text-text-primary mb-3">{t('previewNewsTitle', lang)}</h3>

              {/* Latest news */}
              {latestNews && (
                <div className="mb-4 py-2 px-3 rounded-lg bg-white/[0.03]">
                  <div className="flex items-center gap-2 mb-1">
                    {latestNews.impact && <span className="text-xs">{impactIcons[latestNews.impact]}</span>}
                    <span className="text-text-secondary text-[10px]">{typeof latestNews.time === 'string' ? latestNews.time : latestNews.time[lang]}</span>
                  </div>
                  <p className="text-text-primary text-sm line-clamp-2">
                    {typeof latestNews.title === 'string' ? latestNews.title : latestNews.title[lang]}
                  </p>
                </div>
              )}

              <p className="text-neon-cyan text-sm font-medium">
                {lang === 'it' ? 'Leggi le news →' : 'Read the news →'}
              </p>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  )
}
