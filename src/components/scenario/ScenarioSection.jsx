import { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import SkeletonLoader from '../ui/SkeletonLoader'
import ScenarioSimulator from './ScenarioSimulator'
import TechTerm from '../ui/TechTerm'

export default function ScenarioSection() {
  const { lang } = useLanguage()
  const [loading] = useState(false)

  return (
    <SectionWrapper id="scenario">
      <SectionHeading
        title={<TechTerm term="scenario_simulator">{t('scenarioTitle', lang)}</TechTerm>}
        subtitle={t('scenarioSubtitle', lang)}
        glowColor="cyan"
      />

      {loading ? (
        <div className="panel p-8">
          <SkeletonLoader lines={10} />
        </div>
      ) : (
        <ScenarioSimulator />
      )}
    </SectionWrapper>
  )
}
