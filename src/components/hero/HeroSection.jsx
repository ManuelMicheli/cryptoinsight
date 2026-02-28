import { motion } from 'motion/react'
import ShaderBackground from './ShaderBackground'
import GlowTitle from './GlowTitle'
import PriceTicker from './PriceTicker'
import CTAButton from './CTAButton'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePaletteCycle } from '../../contexts/PaletteCycleContext'
import { t } from '../../i18n/translations'

export default function HeroSection({ coins }) {
  const { lang } = useLanguage()
  const { cssVars, shaderColorsRef } = usePaletteCycle()

  return (
    <section
      className="relative h-dvh flex flex-col justify-center overflow-hidden hero-transition"
      style={cssVars}
    >
      <ShaderBackground shaderColorsRef={shaderColorsRef} />

      <div
        className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pt-20 pb-8"
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
      </div>

      <div className="relative z-10 mt-auto">
        <PriceTicker coins={coins} />
      </div>
    </section>
  )
}
