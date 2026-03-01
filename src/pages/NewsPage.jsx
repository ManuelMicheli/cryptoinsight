import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import WeeklyBriefBanner from '../components/news/WeeklyBriefBanner'
import NewsSection from '../components/news/NewsSection'
import ActionInsights from '../components/news/ActionInsights'

export default function NewsPage() {
  const { lang } = useLanguage()

  return (
    <PageTransition>
      <PageHero
        theme="news"
        title={t('newsHeroTitle', lang)}
        highlightedWord={t('newsHeroHighlight', lang)}
        subtitle={t('newsHeroSubtitle', lang)}
      />
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 py-12 md:py-16">
        <WeeklyBriefBanner />
      </div>
      <NewsSection />
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pb-12 md:pb-16">
        <ActionInsights />
      </div>
    </PageTransition>
  )
}
