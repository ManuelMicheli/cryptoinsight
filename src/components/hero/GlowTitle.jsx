import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function GlowTitle() {
  const { lang } = useLanguage()

  return (
    <motion.div
      className="text-center relative z-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <motion.h1
        className="font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-glow-cyan text-neon-cyan mb-4 tracking-wider"
        animate={{ textShadow: [
          '0 0 10px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.2), 0 0 80px rgba(0,240,255,0.1)',
          '0 0 20px rgba(0,240,255,0.7), 0 0 60px rgba(0,240,255,0.3), 0 0 100px rgba(0,240,255,0.15)',
          '0 0 10px rgba(0,240,255,0.5), 0 0 40px rgba(0,240,255,0.2), 0 0 80px rgba(0,240,255,0.1)',
        ]}}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        CRYPTO
        <br />
        <span className="text-glow-purple text-neon-purple">INSIGHTS</span>
      </motion.h1>
      <motion.p
        className="text-text-secondary text-lg sm:text-xl md:text-2xl max-w-xl mx-auto font-light"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {t('heroSubtitle', lang)}
      </motion.p>
    </motion.div>
  )
}
