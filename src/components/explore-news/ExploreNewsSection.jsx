import { motion } from 'motion/react'
import { Link } from 'react-router'
import { MeshGradient } from '@paper-design/shaders-react'
import { fadeInUp, staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'
import { news } from '../../data/news'

const topNews = news.slice(0, 4)

const circleColors = [
  { border: 'rgba(0, 240, 255, 0.3)', glow: 'rgba(0, 240, 255, 0.15)', text: 'text-neon-cyan' },
  { border: 'rgba(139, 92, 246, 0.3)', glow: 'rgba(139, 92, 246, 0.15)', text: 'text-neon-purple' },
  { border: 'rgba(0, 255, 136, 0.3)', glow: 'rgba(0, 255, 136, 0.15)', text: 'text-neon-green' },
  { border: 'rgba(245, 158, 11, 0.3)', glow: 'rgba(245, 158, 11, 0.15)', text: 'text-neon-amber' },
]

function CircleNewsCard({ article, index, lang }) {
  const color = circleColors[index % circleColors.length]

  return (
    <motion.div variants={fadeInUp}>
      <div
        className="circle-card group cursor-pointer"
        style={{
          borderColor: color.border,
          boxShadow: `0 0 20px ${color.glow}, 0 0 60px ${color.glow}`,
        }}
      >
        <span className={`font-heading typo-stat-sm font-bold ${color.text} mb-2`}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <span className="font-heading typo-micro font-semibold tracking-wider text-neon-purple uppercase mb-1">
          {l(article.category, lang)}
        </span>
        <h4 className="typo-ui-sm font-bold text-text-primary line-clamp-3 group-hover:text-neon-cyan transition-colors duration-300">
          {l(article.title, lang)}
        </h4>
      </div>
    </motion.div>
  )
}

export default function ExploreNewsSection() {
  const { lang } = useLanguage()

  return (
    <section className="relative py-16 md:py-20 overflow-hidden">
      <MeshGradient
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        colors={['#0e2a3a', '#1a0d2e', '#00f0ff', '#8b5cf6']}
        speed={0.4}
        distortion={0.6}
        swirl={0.15}
      />

      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-bg-primary/80 via-bg-primary/30 to-bg-primary/80" />

      <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-[15%] w-40 h-40 bg-neon-cyan/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-[18%] w-32 h-32 bg-neon-purple/5 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />
      </div>

      <motion.div
        className="relative z-10 w-full px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16 lg:py-20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Header */}
        <motion.div variants={fadeInUp} className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-neon-cyan opacity-75" style={{ animation: 'live-pulse 2s ease-in-out infinite' }} />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-cyan" />
            </span>
            <span className="font-heading typo-micro font-semibold text-neon-cyan tracking-[0.2em] uppercase">
              {t('exploreNewsLive', lang)}
            </span>
          </div>

          <h2
            className="font-heading typo-h1 font-bold text-text-primary mb-4"
          >
            {t('exploreNewsHeading', lang)}{' '}
            <span className="text-glow-cyan text-neon-cyan">NEWS</span>
          </h2>

          <p className="text-text-secondary typo-body-lg max-w-2xl mx-auto mb-8">
            {t('exploreNewsDesc', lang)}
          </p>

          <Link to="/news">
            <motion.div
              className="relative inline-block px-8 py-3 rounded-xl font-heading typo-ui-sm font-semibold tracking-wider text-bg-primary bg-neon-cyan overflow-hidden group"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              animate={{
                boxShadow: [
                  '0 0 15px rgba(0,240,255,0.2), 0 0 40px rgba(0,240,255,0.08)',
                  '0 0 25px rgba(0,240,255,0.4), 0 0 60px rgba(0,240,255,0.15)',
                  '0 0 15px rgba(0,240,255,0.2), 0 0 40px rgba(0,240,255,0.08)',
                ],
              }}
              transition={{ boxShadow: { duration: 2.5, repeat: Infinity }, scale: { type: 'spring', stiffness: 400 } }}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t('exploreNewsCta', lang)}
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
          </Link>
        </motion.div>

        {/* Circular news cards - 2x2 grid */}
        <div className="flex flex-wrap justify-center gap-5">
          {topNews.map((article, index) => (
            <CircleNewsCard key={article.id} article={article} index={index} lang={lang} />
          ))}
        </div>
      </motion.div>
    </section>
  )
}
