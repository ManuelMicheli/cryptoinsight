import { useLanguage } from '../../contexts/LanguageContext'
import { badgeConfig } from '../../data/healthData'

export default function HealthBadge({ type }) {
  const { lang } = useLanguage()
  const cfg = badgeConfig[type]
  if (!cfg) return null

  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
      {cfg.label[lang]}
    </span>
  )
}
