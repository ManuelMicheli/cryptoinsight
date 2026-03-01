import SectionWrapper from '../layout/SectionWrapper'
import LiveIndicator from './LiveIndicator'
import NewsCard from './NewsCard'
import { news } from '../../data/news'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function NewsSection() {
  const { lang } = useLanguage()

  return (
    <SectionWrapper id="news">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 md:mb-10">
        <div className="min-w-0">
          <h2
            className="font-heading typo-h1 font-bold text-glow-purple text-neon-purple mb-2"
          >
            {t('newsTitle1', lang)} {t('newsTitle2', lang)}
          </h2>
          <p className="text-text-secondary typo-body-lg">{t('newsSubtitle', lang)}</p>
        </div>
        <LiveIndicator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </SectionWrapper>
  )
}
