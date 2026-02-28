import { Link } from 'react-router'
import { motion } from 'motion/react'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

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

const pages = [
  {
    path: '/crypto',
    icon: 'crypto',
    titleKey: 'previewCryptoTitle',
    descKey: 'previewCryptoDesc',
  },
  {
    path: '/mercato',
    icon: 'market',
    titleKey: 'previewMarketTitle',
    descKey: 'previewMarketDesc',
  },
  {
    path: '/eventi',
    icon: 'events',
    titleKey: 'previewEventsTitle',
    descKey: 'previewEventsDesc',
  },
  {
    path: '/news',
    icon: 'news',
    titleKey: 'previewNewsTitle',
    descKey: 'previewNewsDesc',
  },
]

export default function HomePreviewsGrid() {
  const { lang } = useLanguage()

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
        {pages.map((page) => (
          <motion.div key={page.path} variants={fadeInUp}>
            <Link to={page.path} className="block group h-full">
              <div className={`panel ${panelVariant[page.icon] !== 'cyan' ? `panel-${panelVariant[page.icon]}` : ''} h-full transition-all duration-300 hover:translate-y-[-4px]`}>
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center ${colorMap[page.icon]}`}>
                    {icons[page.icon]}
                  </div>
                  <svg
                    className={`w-5 h-5 text-text-secondary group-hover:${colorMap[page.icon]} group-hover:translate-x-1 transition-all duration-300`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
                <h3 className={`font-heading text-lg md:text-xl font-bold text-text-primary mb-3 group-hover:${colorMap[page.icon]} transition-colors`}>
                  {t(page.titleKey, lang)}
                </h3>
                <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                  {t(page.descKey, lang)}
                </p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
