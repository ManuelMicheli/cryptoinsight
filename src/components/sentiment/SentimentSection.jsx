import { useState } from 'react'
import { motion } from 'motion/react'
import { staggerContainer, fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { COIN_IDS } from '../../utils/constants'
import { cryptoMeta } from '../../data/cryptoMeta'
import { sentimentData } from '../../data/sentimentData'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import GlassCard from '../ui/GlassCard'
import TechTerm from '../ui/TechTerm'
import TokenSentimentGauge from './TokenSentimentGauge'
import SentimentFactorBar from './SentimentFactorBar'
import SentimentSparkline from './SentimentSparkline'

function getSentimentLabel(score, lang) {
  if (score <= 20) return lang === 'it' ? 'Paura Estrema' : 'Extreme Fear'
  if (score <= 40) return lang === 'it' ? 'Paura' : 'Fear'
  if (score <= 60) return lang === 'it' ? 'Neutro' : 'Neutral'
  if (score <= 80) return lang === 'it' ? 'Avidita\'' : 'Greed'
  return lang === 'it' ? 'Avidita\' Estrema' : 'Extreme Greed'
}

export default function SentimentSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false) // TODO: Replace with API call
  const [timeframe, setTimeframe] = useState('7d')

  return (
    <SectionWrapper id="sentiment">
      <SectionHeading
        title={t('sentimentTitle', lang)}
        subtitle={t('sentimentSubtitle', lang)}
        glowColor="green"
      />

      {/* Timeframe toggle */}
      <motion.div
        className="flex justify-center gap-2 mb-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {['7d', '30d'].map(tf => (
          <button
            key={tf}
            onClick={() => setTimeframe(tf)}
            className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all ${
              timeframe === tf
                ? 'border-neon-green/40 bg-neon-green/10 text-neon-green'
                : 'border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
            }`}
          >
            {tf === '7d' ? (lang === 'it' ? '7 giorni' : '7 days') : (lang === 'it' ? '30 giorni' : '30 days')}
          </button>
        ))}
      </motion.div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="panel p-6">
              <SkeletonLoader lines={6} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {COIN_IDS.map(coinId => {
            const data = sentimentData[coinId]
            const meta = cryptoMeta[coinId]
            if (!data || !meta) return null

            const trendData = timeframe === '7d' ? data.trend7d : data.trend30d

            return (
              <motion.div key={coinId} variants={fadeInUp}>
                <GlassCard variant="dark" hover={true} className="p-5">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <span className="font-heading text-sm font-bold text-text-primary">{meta.name}</span>
                      <span className="text-text-secondary text-xs ml-2">{meta.ticker}</span>
                    </div>
                    <span className="text-text-secondary text-xs">
                      {getSentimentLabel(data.score, lang)}
                    </span>
                  </div>

                  {/* Gauge + Sparkline */}
                  <div className="flex items-end justify-between mb-4">
                    <TokenSentimentGauge score={data.score} size={100} />
                    <SentimentSparkline data={trendData} className="w-[100px]" />
                  </div>

                  {/* Factor bars */}
                  <div className="space-y-2.5">
                    {Object.entries(data.factors).map(([key, value]) => (
                      <SentimentFactorBar key={key} factorKey={key} value={value} />
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            )
          })}
        </motion.div>
      )}
    </SectionWrapper>
  )
}
