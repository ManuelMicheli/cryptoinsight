import { useLanguage } from '../../contexts/LanguageContext'
import { t, l } from '../../i18n/translations'

export default function CorrelationTooltip({ value, assetA, assetB, timeframe, position }) {
  const { lang } = useLanguage()
  if (value === null) return null

  const labelA = typeof assetA === 'string' ? assetA : l(assetA, lang)
  const labelB = typeof assetB === 'string' ? assetB : l(assetB, lang)

  return (
    <div
      className="fixed z-50 panel p-3 rounded-xl pointer-events-none"
      style={{
        left: position.x + 12,
        top: position.y - 10,
      }}
    >
      <p className="text-text-primary text-xs font-medium mb-1">
        {labelA} / {labelB}
      </p>
      <p className="font-heading text-sm font-bold" style={{ color: value > 0 ? '#00f0ff' : value < 0 ? '#ef4444' : '#8a8a9a' }}>
        {value.toFixed(2)}
      </p>
      <p className="text-text-secondary text-xs mt-0.5">{t('correlationPeriod', lang)}: {timeframe}</p>
    </div>
  )
}
