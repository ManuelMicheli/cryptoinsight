import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { weeklyBriefs } from '../../data/briefData'
import GlassCard from '../ui/GlassCard'

export default function WeeklyBriefBanner() {
  const { lang } = useLanguage()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [expanded, setExpanded] = useState(false)

  const brief = weeklyBriefs[currentIndex]
  if (!brief) return null

  const canGoLeft = currentIndex < weeklyBriefs.length - 1
  const canGoRight = currentIndex > 0

  const goLeft = () => canGoLeft && setCurrentIndex(i => i + 1)
  const goRight = () => canGoRight && setCurrentIndex(i => i - 1)

  const formatDate = (dateStr) => {
    const date = new Date(dateStr + 'T00:00:00')
    return date.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short',
    })
  }

  const narrativeText = l(brief.narrative, lang)
  const PREVIEW_LENGTH = 200
  const needsTruncation = narrativeText.length > PREVIEW_LENGTH
  const displayedNarrative = expanded || !needsTruncation
    ? narrativeText
    : narrativeText.slice(0, PREVIEW_LENGTH) + '...'

  const metricsItems = [
    {
      label: lang === 'it' ? 'Dominanza BTC' : 'BTC Dominance',
      value: `${brief.metrics.btcDominance}%`,
      color: 'text-neon-cyan',
    },
    {
      label: lang === 'it' ? 'Market Cap' : 'Market Cap',
      value: `$${brief.metrics.totalMarketCap}`,
      color: 'text-neon-green',
    },
    {
      label: 'DeFi TVL',
      value: `$${brief.metrics.defiTvl}`,
      color: 'text-neon-purple',
    },
    {
      label: 'Fear & Greed',
      value: brief.metrics.fearGreed,
      color: brief.metrics.fearGreed >= 60
        ? 'text-neon-green'
        : brief.metrics.fearGreed >= 40
          ? 'text-neon-amber'
          : 'text-neon-red',
    },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <GlassCard variant="purple" hover={false} className="relative overflow-hidden">
        {/* Top gradient accent line */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent" />

        {/* Header bar */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 pt-6 md:px-10 md:pt-8"
          variants={fadeInUp}
        >
          <div className="flex items-center gap-4 flex-wrap">
            <h3
              className="font-heading font-bold text-neon-purple text-glow-purple typo-h3"
            >
              {lang === 'it' ? 'Report Settimanale' : 'Weekly Report'} #{brief.weekNumber}
            </h3>
            {brief.isLatest && (
              <span
                className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-neon-purple/20 text-neon-purple border border-neon-purple/30"
                style={{
                  boxShadow: '0 0 12px rgba(139,92,246,0.3), 0 0 30px rgba(139,92,246,0.1)',
                }}
              >
                {lang === 'it' ? 'Ultimo' : 'Latest'}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <p className="text-text-secondary font-body text-sm tracking-wide">
              {formatDate(brief.dateRange.start)} — {formatDate(brief.dateRange.end)}
            </p>

            {/* Navigation arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={goLeft}
                disabled={!canGoLeft}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-neon-purple/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={lang === 'it' ? 'Settimana precedente' : 'Previous week'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                onClick={goRight}
                disabled={!canGoRight}
                className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-text-primary hover:border-neon-purple/40 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                aria-label={lang === 'it' ? 'Settimana successiva' : 'Next week'}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className="mx-6 md:mx-10 mt-5 mb-6 h-px bg-gradient-to-r from-transparent via-white/8 to-transparent" />

        <AnimatePresence mode="wait">
          <motion.div
            key={brief.weekNumber}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
            className="px-6 pb-6 md:px-10 md:pb-10 space-y-8"
          >
            {/* Executive Summary Grid */}
            <motion.div className="space-y-4" variants={fadeInUp}>
              <h4
                className="font-heading font-semibold text-text-primary text-sm uppercase tracking-widest"
                style={{ letterSpacing: '0.15em' }}
              >
                Executive Summary
              </h4>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4"
                variants={staggerContainer}
              >
                {brief.executiveSummary.map((item, index) => (
                  <motion.div
                    key={index}
                    className="panel panel-dark p-5 flex gap-4 items-start"
                    variants={fadeInUp}
                  >
                    <span
                      className="text-2xl flex-shrink-0 mt-0.5"
                      role="img"
                      aria-hidden="true"
                    >
                      {item.icon}
                    </span>
                    <p className="font-body text-text-secondary text-sm leading-relaxed">
                      {l(item.text, lang)}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Pull Quote */}
            {brief.pullQuote && (
              <motion.blockquote
                className="pl-6 border-l-2 border-neon-purple"
                style={{
                  boxShadow: '-2px 0 20px rgba(139,92,246,0.15)',
                }}
                variants={fadeInUp}
              >
                <p
                  className="font-body italic text-text-primary typo-body-lg"
                >
                  &ldquo;{l(brief.pullQuote, lang)}&rdquo;
                </p>
              </motion.blockquote>
            )}

            {/* Mini Metrics Row */}
            <motion.div
              className="grid grid-cols-2 md:grid-cols-4 gap-3"
              variants={fadeInUp}
            >
              {metricsItems.map((metric) => (
                <div
                  key={metric.label}
                  className="panel panel-dark p-4 text-center space-y-1.5"
                >
                  <p className="text-text-secondary/60 text-xs font-body uppercase tracking-wider">
                    {metric.label}
                  </p>
                  <p className={`font-heading font-bold text-lg ${metric.color}`}>
                    {metric.value}
                  </p>
                </div>
              ))}
            </motion.div>

            {/* Market Narrative - Collapsible */}
            <motion.div className="space-y-3" variants={fadeInUp}>
              <h4
                className="font-heading font-semibold text-text-primary text-sm uppercase tracking-widest"
                style={{ letterSpacing: '0.15em' }}
              >
                {lang === 'it' ? 'Narrativa di Mercato' : 'Market Narrative'}
              </h4>
              <div className="font-body text-text-secondary text-sm leading-[1.85] tracking-wide whitespace-pre-line">
                {displayedNarrative}
              </div>
              {needsTruncation && (
                <button
                  onClick={() => setExpanded(prev => !prev)}
                  className="inline-flex items-center gap-1.5 text-neon-purple text-sm font-body font-medium hover:underline transition-colors cursor-pointer"
                >
                  {expanded
                    ? (lang === 'it' ? 'Mostra meno' : 'Show less')
                    : (lang === 'it' ? 'Leggi tutto' : 'Read more')
                  }
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </GlassCard>
    </motion.div>
  )
}
