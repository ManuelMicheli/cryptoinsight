import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import WeeklyBrief from './WeeklyBrief'

export default function BriefSection() {
  const { lang } = useLanguage()

  return (
    <SectionWrapper id="brief">
      <SectionHeading
        title={t('briefTitle', lang)}
        subtitle={t('briefSubtitle', lang)}
        glowColor="amber"
      />
      <WeeklyBrief />
    </SectionWrapper>
  )
}
