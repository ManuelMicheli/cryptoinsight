import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function DisclaimerBanner() {
  const { lang } = useLanguage()

  return (
    <div className="mt-12 panel panel-amber text-center" style={{ minHeight: 'auto' }}>
      <p className="text-text-secondary typo-body-sm">
        <span className="text-neon-amber font-semibold typo-body-sm tracking-wide">{t('disclaimerNote', lang)}</span>{' '}
        <span dangerouslySetInnerHTML={{ __html: t('disclaimerText', lang) }} />
      </p>
    </div>
  )
}
