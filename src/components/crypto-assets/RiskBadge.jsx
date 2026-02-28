import { riskColors } from '../../data/cryptoMeta'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'

export default function RiskBadge({ risk }) {
  const { lang } = useLanguage()
  const style = riskColors[risk] || riskColors.medium
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${style.bg} ${style.text}`}>
      {t(style.labelKey, lang)}
    </span>
  )
}
