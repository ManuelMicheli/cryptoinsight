import { useState, useMemo } from 'react'
import { motion } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import VideoCard from './VideoCard'
import CreatorCard from './CreatorCard'
import PredictionCard from './PredictionCard'
import PredictionLeaderboard from './PredictionLeaderboard'
import { creators, videos, predictions } from '../../data/socialData'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { staggerContainer } from '../../hooks/useInViewAnimation'

const tabs = [
  { id: 'all', labelKey: 'socialTabAll' },
  { id: 'most-viewed', labelKey: 'socialTabMostViewed' },
  { id: 'most-influential', labelKey: 'socialTabMostInfluential' },
  { id: 'best-predictors', labelKey: 'socialTabBestPredictors' },
]

const platforms = ['all', 'youtube', 'x', 'tiktok']

export default function SocialSection() {
  const { lang } = useLanguage()
  const [activeTab, setActiveTab] = useState('all')
  const [platformFilter, setPlatformFilter] = useState('all')

  // ── Tab: All (chronological feed) ──
  const filteredVideos = useMemo(() => {
    let result = [...videos]
    if (platformFilter !== 'all') {
      result = result.filter(v => v.platform === platformFilter)
    }
    result.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    return result
  }, [platformFilter])

  // ── Tab: Most Viewed ──
  const mostViewed = useMemo(() => {
    let result = [...videos]
    if (platformFilter !== 'all') {
      result = result.filter(v => v.platform === platformFilter)
    }
    result.sort((a, b) => b.viewCount - a.viewCount)
    return result.slice(0, 12)
  }, [platformFilter])

  // ── Tab: Most Influential (creators sorted by influence) ──
  const topCreators = useMemo(() => {
    return [...creators].sort((a, b) => b.influenceScore - a.influenceScore)
  }, [])

  // ── Tab: Best Predictors (predictions + leaderboard) ──
  const topPredictions = useMemo(() => {
    return [...predictions].sort((a, b) => {
      // Show resolved first, then pending
      if (a.outcome === 'pending' && b.outcome !== 'pending') return 1
      if (a.outcome !== 'pending' && b.outcome === 'pending') return -1
      return new Date(b.createdAt) - new Date(a.createdAt)
    })
  }, [])

  return (
    <SectionWrapper id="social-feed">
      <SectionHeading
        title={t('socialTitle', lang)}
        subtitle={t('socialSubtitle', lang)}
        glowColor="rose"
      />

      {/* Tab bar */}
      <div className="flex items-center justify-center gap-2 mb-6 flex-wrap">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full typo-ui font-medium transition-all ${
                isActive
                  ? 'bg-neon-rose/20 text-neon-rose border border-neon-rose/30'
                  : 'text-text-secondary border border-white/10 hover:border-white/20 hover:text-text-primary'
              }`}
              style={isActive ? { boxShadow: '0 0 10px rgba(236,72,153,0.2)' } : undefined}
            >
              {t(tab.labelKey, lang)}
            </button>
          )
        })}
      </div>

      {/* Platform filter (for video tabs) */}
      {(activeTab === 'all' || activeTab === 'most-viewed') && (
        <div className="flex items-center justify-center gap-2 mb-8">
          {platforms.map(p => {
            const isActive = platformFilter === p
            const label = p === 'all' ? t('socialFilterAll', lang) : p === 'youtube' ? 'YouTube' : p === 'x' ? 'X' : 'TikTok'
            return (
              <button
                key={p}
                onClick={() => setPlatformFilter(p)}
                className={`px-3 py-1 rounded-full typo-micro font-medium transition-all ${
                  isActive
                    ? 'bg-white/10 text-text-primary border border-white/20'
                    : 'text-text-secondary border border-white/5 hover:border-white/15'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
      )}

      {/* ═══ Tab Content ═══ */}

      {/* All — Chronological video feed */}
      {activeTab === 'all' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {filteredVideos.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </motion.div>
      )}

      {/* Most Viewed */}
      {activeTab === 'most-viewed' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {mostViewed.map(video => (
            <VideoCard key={video.id} video={video} />
          ))}
        </motion.div>
      )}

      {/* Most Influential (Creator cards) */}
      {activeTab === 'most-influential' && (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {topCreators.map(creator => (
            <CreatorCard key={creator.id} creator={creator} />
          ))}
        </motion.div>
      )}

      {/* Best Predictors — Leaderboard + Prediction cards */}
      {activeTab === 'best-predictors' && (
        <div className="space-y-8">
          <PredictionLeaderboard />

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {topPredictions.map(prediction => (
              <PredictionCard key={prediction.id} prediction={prediction} />
            ))}
          </motion.div>
        </div>
      )}
    </SectionWrapper>
  )
}
