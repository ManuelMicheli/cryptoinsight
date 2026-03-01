import { useState } from 'react'
import { motion } from 'motion/react'
import { staggerContainer } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { COIN_IDS } from '../../utils/constants'
import { healthData } from '../../data/healthData'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import ProjectHealthCard from './ProjectHealthCard'

export default function HealthSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false) // TODO: Replace with API call

  return (
    <SectionWrapper id="health">
      <SectionHeading
        title={t('healthTitle', lang)}
        subtitle={t('healthSubtitle', lang)}
        glowColor="green"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="panel p-6">
              <SkeletonLoader lines={6} />
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {COIN_IDS.map(coinId => {
            const data = healthData[coinId]
            if (!data) return null
            return <ProjectHealthCard key={coinId} coinId={coinId} data={data} />
          })}
        </motion.div>
      )}
    </SectionWrapper>
  )
}
