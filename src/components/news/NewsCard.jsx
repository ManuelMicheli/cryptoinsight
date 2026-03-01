import { useState } from 'react'
import { Link } from 'react-router'
import { motion, AnimatePresence } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'
import CategoryTag from './CategoryTag'
import { cryptoMeta } from '../../data/cryptoMeta'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import TechTerm from '../ui/TechTerm'

const impactIcons = {
  bullish: { icon: '🟢', label: { it: 'Positivo', en: 'Bullish' }, term: 'bullish' },
  bearish: { icon: '🔴', label: { it: 'Negativo', en: 'Bearish' }, term: 'bearish' },
  neutral: { icon: '🟡', label: { it: 'Neutro', en: 'Neutral' }, term: null },
}

export default function NewsCard({ article }) {
  const { lang } = useLanguage()
  const [showExcerpt, setShowExcerpt] = useState(false)
  const impact = impactIcons[article.impact]
  const hasExcerpt = !!article.sourceExcerpt

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant="dark" className="flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-purple/30 to-transparent" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-2">
            <CategoryTag category={l(article.category, lang)} />
            {impact && (
              <span className="typo-ui-sm flex items-center gap-1">
                {impact.term ? (
                  <TechTerm term={impact.term}>{impact.icon} {l(impact.label, lang)}</TechTerm>
                ) : (
                  <>{impact.icon} {l(impact.label, lang)}</>
                )}
              </span>
            )}
          </div>
          <span className="text-text-secondary typo-body-sm flex-shrink-0">{l(article.time, lang)}</span>
        </div>
        <h4 className="typo-h3 font-bold text-text-primary mb-4">{l(article.title, lang)}</h4>
        <p className="text-text-secondary/90 typo-body mb-4 flex-grow">{l(article.summary, lang)}</p>

        {/* Source excerpt toggle */}
        <AnimatePresence>
          {showExcerpt && hasExcerpt && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="news-excerpt mb-4">
                <div className="news-excerpt__header">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
                  </svg>
                  <span>{lang === 'it' ? 'Dalla fonte originale' : 'From original source'} — {article.source}</span>
                </div>
                <p className="news-excerpt__text">{l(article.sourceExcerpt, lang)}</p>
                {article.sourceUrl && (
                  <a
                    href={article.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="news-excerpt__link"
                  >
                    {lang === 'it' ? 'Leggi articolo completo' : 'Read full article'} &rarr;
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Related tokens */}
        {article.relatedCoins?.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {article.relatedCoins.map(coinId => {
              const meta = cryptoMeta[coinId]
              if (!meta) return null
              return (
                <Link
                  key={coinId}
                  to={`/crypto?detail=${coinId}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] text-text-secondary hover:text-text-primary hover:border-white/20 transition-colors"
                >
                  <span className="font-medium">{meta.ticker}</span>
                </Link>
              )
            })}
          </div>
        )}

        {/* Footer with source + excerpt toggle */}
        <div className="flex items-center justify-between mt-auto py-3 border-t border-white/5">
          <div className="text-text-secondary typo-body-sm">
            {t('newsSource', lang)}: <span className="text-text-primary">{article.source}</span>
          </div>
          {hasExcerpt && (
            <button
              onClick={() => setShowExcerpt(prev => !prev)}
              className="news-excerpt__toggle"
              aria-expanded={showExcerpt}
              aria-label={showExcerpt ? 'Hide source excerpt' : 'Show source excerpt'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
              <span>{lang === 'it' ? 'Fonte' : 'Source'}</span>
            </button>
          )}
        </div>
      </GlassCard>
    </motion.div>
  )
}
