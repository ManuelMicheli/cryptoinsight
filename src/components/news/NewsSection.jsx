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
      <div className="flex items-center justify-between mb-10">
        <div>
          <h2
            className="font-heading font-bold text-glow-purple text-neon-purple mb-2"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)' }}
          >
            {t('newsTitle1', lang)} {t('newsTitle2', lang)}
          </h2>
          <p className="text-text-secondary text-base md:text-lg leading-relaxed">{t('newsSubtitle', lang)}</p>
        </div>
        <LiveIndicator />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {news.map((article) => (
          <NewsCard key={article.id} article={article} />
        ))}
      </div>
    </SectionWrapper>
  )
}
