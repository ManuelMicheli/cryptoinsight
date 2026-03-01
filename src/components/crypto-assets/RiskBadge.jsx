import { riskColors } from '../../data/cryptoMeta'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import TechTerm from '../ui/TechTerm'

export default function RiskBadge({ risk }) {
  const { lang } = useLanguage()
  const style = riskColors[risk] || riskColors.medium
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full typo-ui-sm font-semibold ${style.bg} ${style.text}`}>
      <TechTerm term="risk">{t(style.labelKey, lang)}</TechTerm>
    </span>
  )
}
