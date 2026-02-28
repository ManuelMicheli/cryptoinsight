import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import NewsSection from '../components/news/NewsSection'

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
      <NewsSection />
    </PageTransition>
  )
}
