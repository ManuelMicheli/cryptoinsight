import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import EventsSection from '../components/events/EventsSection'

export default function EventsPage() {
  const { lang } = useLanguage()

  return (
    <PageTransition>
      <PageHero
        theme="events"
        title={t('eventsHeroTitle', lang)}
        highlightedWord={t('eventsHeroHighlight', lang)}
        subtitle={t('eventsHeroSubtitle', lang)}
      />
      <EventsSection />
    </PageTransition>
  )
}
