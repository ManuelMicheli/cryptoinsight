import { Link } from 'react-router'
import { motion } from 'motion/react'
import PageTransition from '../components/layout/PageTransition'
import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'

export default function NotFoundPage() {
  const { lang } = useLanguage()

  return (
    <PageTransition>
      <section className="min-h-screen flex flex-col items-center justify-center px-6">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-heading text-8xl md:text-9xl font-black text-glow-cyan text-neon-cyan mb-6">
            404
          </h1>
          <p className="text-text-secondary text-lg md:text-xl mb-10 max-w-md mx-auto">
            {t('notFoundText', lang)}
          </p>
          <Link
            to="/"
            className="inline-block px-8 py-4 rounded-xl font-heading text-sm font-semibold tracking-wider text-bg-primary bg-neon-cyan glow-cyan hover:bg-neon-cyan/80 transition-colors"
          >
            {t('notFoundCta', lang)}
          </Link>
        </motion.div>
      </section>
    </PageTransition>
  )
}
