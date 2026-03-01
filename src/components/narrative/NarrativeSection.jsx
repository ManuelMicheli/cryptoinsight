import { useState } from 'react'
import { motion } from 'motion/react'
import { staggerContainer, fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import NarrativeCard from './NarrativeCard'
import { narrativeData } from '../../data/narrativeData'

export default function NarrativeSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false) // TODO: Replace with API call
  const data = narrativeData

  // Only show crypto with significant moves (>3%)
  const significantMoves = data.filter(n => Math.abs(n.priceChange) > 3)

  return (
    <SectionWrapper id="narrative">
      <SectionHeading
        title={t('narrativeTitle', lang)}
        subtitle={t('narrativeSubtitle', lang)}
        glowColor="purple"
      />

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="panel p-6">
              <SkeletonLoader lines={5} />
            </div>
          ))}
        </div>
      ) : significantMoves.length === 0 ? (
        <motion.div
          className="panel p-12 text-center"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-text-secondary text-lg">{t('narrativeEmpty', lang)}</p>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {significantMoves.map(narrative => (
            <NarrativeCard key={narrative.coinId} narrative={narrative} />
          ))}
        </motion.div>
      )}
    </SectionWrapper>
  )
}
