import { motion, useScroll, useTransform } from 'motion/react'
import ShaderBackground from './ShaderBackground'
import GlowTitle from './GlowTitle'
import PriceTicker from './PriceTicker'
import CTAButton from './CTAButton'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function HeroSection({ coins }) {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 400], [1, 0])
  const y = useTransform(scrollY, [0, 400], [0, 100])
  const { lang } = useLanguage()

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      <ShaderBackground />

      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg-primary z-[1]" />

      <motion.div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-8"
        style={{ opacity, y }}
      >
        <GlowTitle />

        <motion.div
          className="mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <CTAButton to="/crypto">
            {t('heroCTA', lang)} &darr;
          </CTAButton>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mt-auto">
        <PriceTicker coins={coins} />
      </div>
    </section>
  )
}
