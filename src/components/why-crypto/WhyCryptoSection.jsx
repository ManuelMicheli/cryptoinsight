import SectionWrapper from '../layout/SectionWrapper'
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
      <div className="text-center mb-16 md:mb-20">
        <h2 className="font-heading typo-h1 font-bold mb-6 tracking-tight">
          {t('whyCryptoTitle', lang)}
        </h2>
        <p className="text-text-secondary typo-body-lg max-w-3xl mx-auto">
          {t('whyCryptoSubtitle', lang)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {features.map((f) => (
          <FeatureCard key={f.icon} {...f} />
        ))}
      </div>
    </SectionWrapper>
  )
}
