import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

const styles = {
  bullish: { bg: 'bg-neon-green/10', text: 'text-neon-green', labelKey: 'impactBullish' },
  bearish: { bg: 'bg-neon-red/10', text: 'text-neon-red', labelKey: 'impactBearish' },
  neutral: { bg: 'bg-neon-amber/10', text: 'text-neon-amber', labelKey: 'impactNeutral' },
}

export default function ImpactBadge({ impact }) {
  const { lang } = useLanguage()
  const s = styles[impact] || styles.neutral
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${s.bg} ${s.text}`}>
      {t(s.labelKey, lang)}
    </span>
  )
}
