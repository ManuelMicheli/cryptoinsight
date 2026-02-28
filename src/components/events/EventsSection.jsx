import SectionWrapper from '../layout/SectionWrapper'
import SectionHeading from '../ui/SectionHeading'
import EventTimeline from './EventTimeline'
import { events } from '../../data/events'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function EventsSection() {
  const { lang } = useLanguage()

  return (
    <SectionWrapper id="events" className="bg-bg-secondary/30">
      <SectionHeading
        title={t('eventsTitle', lang)}
        subtitle={t('eventsSubtitle', lang)}
        glowColor="amber"
      />
      <div className="w-full">
        <EventTimeline events={events} />
      </div>
    </SectionWrapper>
  )
}
