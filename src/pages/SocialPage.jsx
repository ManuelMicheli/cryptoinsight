import { useLanguage } from '../contexts/LanguageContext'
import { t } from '../i18n/translations'
import PageTransition from '../components/layout/PageTransition'
import PageHero from '../components/heroes/PageHero'
import SocialSection from '../components/social/SocialSection'

export default function SocialPage() {
  const { lang } = useLanguage()

  return (
    <PageTransition>
      <PageHero
        theme="social"
        title={t('socialHeroTitle', lang)}
        highlightedWord={t('socialHeroHighlight', lang)}
        subtitle={t('socialHeroSubtitle', lang)}
      />
      <SocialSection />

      {/* Disclaimer */}
      <div className="px-6 md:px-12 lg:px-16 xl:px-20 2xl:px-24 pb-12 md:pb-16">
        <div className="p-4 rounded-2xl bg-neon-rose/5 border border-neon-rose/10">
          <p className="typo-ui-sm text-text-secondary text-center">
            <span className="text-neon-rose font-semibold">{t('disclaimerNote', lang)}</span>{' '}
            {t('socialDisclaimer', lang)}
          </p>
        </div>
      </div>
    </PageTransition>
  )
}
