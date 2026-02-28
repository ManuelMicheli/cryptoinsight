import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'
import CategoryTag from './CategoryTag'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'

export default function NewsCard({ article }) {
  const { lang } = useLanguage()

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard className="flex flex-col h-full relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-cyan/30 to-transparent" />
        <div className="flex items-start justify-between gap-3 mb-4">
          <CategoryTag category={l(article.category, lang)} />
          <span className="text-text-secondary text-sm flex-shrink-0">{l(article.time, lang)}</span>
        </div>
        <h4 className="text-lg md:text-xl font-bold text-text-primary mb-4 leading-snug">{l(article.title, lang)}</h4>
        <p className="text-text-secondary/90 text-sm md:text-base leading-relaxed mb-auto flex-grow">{l(article.summary, lang)}</p>
        <div className="text-text-secondary text-xs md:text-sm mt-auto py-3 border-t border-white/5">{t('newsSource', lang)}: <span className="text-text-primary">{article.source}</span></div>
      </GlassCard>
    </motion.div>
  )
}
