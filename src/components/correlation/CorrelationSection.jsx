import { useState } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import TimeframeToggle from './TimeframeToggle'
import CorrelationMatrix from './CorrelationMatrix'
import TechTerm from '../ui/TechTerm'

export default function CorrelationSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false)
  const [timeframe, setTimeframe] = useState('30d')

  return (
    <SectionWrapper id="correlation">
      <SectionHeading
        title={<TechTerm term="correlation">{t('correlationTitle', lang)}</TechTerm>}
        subtitle={t('correlationSubtitle', lang)}
        glowColor="amber"
      />

      {/* Explainer card */}
      <motion.div
        className="max-w-3xl mx-auto mb-8"
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="panel rounded-xl px-5 py-4 border border-white/5">
          <div className="flex gap-3 items-start">
            <span className="text-neon-amber text-lg leading-none mt-0.5">💡</span>
            <p className="text-text-secondary typo-body-sm leading-relaxed">
              {t('correlationExplainer', lang)}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Constrained matrix container — ~75% of section width */}
      <div className="max-w-5xl mx-auto">
        <TimeframeToggle value={timeframe} onChange={setTimeframe} />

        {loading ? (
          <div className="panel p-8">
            <SkeletonLoader lines={10} />
          </div>
        ) : (
          <CorrelationMatrix timeframe={timeframe} />
        )}
      </div>
    </SectionWrapper>
  )
}
