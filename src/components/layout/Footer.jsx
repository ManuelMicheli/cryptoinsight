import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function Footer() {
  const { lang } = useLanguage()

  return (
    <footer className="border-t border-white/5 bg-bg-secondary/50">
      <div className="w-full max-w-[1280px] mx-auto px-6 md:px-12 lg:px-16 py-12 md:py-16 lg:py-20">
        <div className="panel panel-amber mb-8">
          <div className="flex items-start gap-4">
            <span className="text-neon-amber text-2xl flex-shrink-0">&#9888;</span>
            <div>
              <h4 className="font-heading text-neon-amber text-sm md:text-base font-semibold mb-2">{t('footerDisclaimer', lang)}</h4>
              <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                {t('footerDisclaimerText', lang)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-text-secondary text-sm">
          <div className="flex items-center gap-2">
            <span className="font-heading text-neon-cyan text-xs">CRYPTO INSIGHTS</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>
          <p>{t('footerDataBy', lang)}</p>
        </div>
      </div>
    </footer>
  )
}
