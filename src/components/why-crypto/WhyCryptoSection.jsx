import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import FeatureCard from './FeatureCard'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function WhyCryptoSection() {
  const { lang } = useLanguage()

  const features = [
    {
      icon: 'decentralization',
      title: t('featureDecentralizationTitle', lang),
      description: t('featureDecentralizationDesc', lang),
      color: 'cyan',
    },
    {
      icon: 'growth',
      title: t('featureGrowthTitle', lang),
      description: t('featureGrowthDesc', lang),
      color: 'purple',
    },
    {
      icon: 'innovation',
      title: t('featureInnovationTitle', lang),
      description: t('featureInnovationDesc', lang),
      color: 'green',
    },
  ]

  return (
    <SectionWrapper id="why-crypto">
      <SectionHeading
        title={t('whyCryptoTitle', lang)}
        subtitle={t('whyCryptoSubtitle', lang)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((f) => (
          <FeatureCard key={f.icon} {...f} />
        ))}
      </div>
    </SectionWrapper>
  )
}
