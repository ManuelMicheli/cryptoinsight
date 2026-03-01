import { motion } from 'motion/react'
import { staggerContainer, fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { usePortfolio } from '../../contexts/PortfolioContext'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import PortfolioInput from './PortfolioInput'
import SectorDonut from './SectorDonut'
import RiskScore from './RiskScore'
import DiversificationTips from './DiversificationTips'

export default function PortfolioSection() {
  const { lang } = useLanguage()
  const { holdings } = usePortfolio()

  return (
    <SectionWrapper id="portfolio">
      <SectionHeading
        title={t('portfolioTitle', lang)}
        subtitle={t('portfolioSubtitle', lang)}
        glowColor="purple"
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        {/* Input */}
        <PortfolioInput />

        {/* Analysis - only show when holdings exist */}
        {holdings.length > 0 && (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8"
            variants={fadeInUp}
          >
            {/* Sector donut */}
            <div className="panel p-6 flex items-center justify-center">
              <SectorDonut holdings={holdings} />
            </div>

            {/* Risk score */}
            <div className="panel p-6 flex items-center justify-center">
              <RiskScore holdings={holdings} />
            </div>
          </motion.div>
        )}

        {holdings.length > 0 && (
          <motion.div className="mt-6" variants={fadeInUp}>
            <DiversificationTips holdings={holdings} />
          </motion.div>
        )}

        {holdings.length === 0 && (
          <motion.div
            className="panel p-12 text-center mt-6"
            variants={fadeInUp}
          >
            <p className="text-text-secondary text-lg">
              {t('portfolioEmpty', lang)}
            </p>
          </motion.div>
        )}
      </motion.div>
    </SectionWrapper>
  )
}
