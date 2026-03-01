import { motion } from 'motion/react'
import { useNavigate } from 'react-router'
import ShaderBackground from './ShaderBackground'
import GlowTitle from './GlowTitle'
import PriceTicker from './PriceTicker'
import { ShimmerButton } from '../ui/shimmer-button'
import { useLanguage } from '../../contexts/LanguageContext'
import { usePaletteCycle } from '../../contexts/PaletteCycleContext'
import { t } from '../../i18n/translations'

export default function HeroSection({ coins }) {
  const { lang } = useLanguage()
  const { cssVars, shaderColorsRef } = usePaletteCycle()
  const navigate = useNavigate()

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
          className="mt-10 rounded-xl cta-glow"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          transition={{ delay: 0.8, duration: 0.6, scale: { type: 'spring', stiffness: 400, damping: 25 } }}
        >
          <ShimmerButton
            shimmerColor="var(--hero-primary)"
            background="var(--hero-secondary)"
            shimmerSize="2px"
            shimmerDuration="3s"
            borderRadius="12px"
            className="px-8 py-4 font-heading typo-ui font-semibold tracking-wider shadow-2xl"
            onClick={() => navigate('/crypto')}
          >
            {/* Hover gradient overlay */}
            <div
              className="absolute inset-0 z-[1] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"
              style={{ background: 'linear-gradient(to right, var(--hero-secondary), var(--hero-primary), var(--hero-secondary))' }}
            />
            <span className="relative z-10 text-bg-primary">
              {t('heroCTA', lang)} &darr;
            </span>
          </ShimmerButton>
        </motion.div>
      </div>

      <div className="relative z-10 mt-auto">
        <PriceTicker coins={coins} />
      </div>
    </section>
  )
}
