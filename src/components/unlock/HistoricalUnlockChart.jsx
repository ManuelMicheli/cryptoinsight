import { useLanguage } from '../../contexts/LanguageContext'

const LABELS = ['-7d', '-1d', 'D0', '+1d', '+7d', '+30d']
const KEYS = ['minus7d', 'minus1d', 'day0', 'plus1d', 'plus7d', 'plus30d']

export default function HistoricalUnlockChart({ historicalImpact }) {
  const { lang } = useLanguage()
  if (!historicalImpact) return null

  const values = KEYS.map(k => historicalImpact[k])
  const maxAbs = Math.max(...values.map(Math.abs), 1)

  return (
    <div>
      <p className="text-text-secondary text-xs mb-2">
        {lang === 'it' ? 'Impatto storico medio' : 'Avg historical impact'}
      </p>
      <div className="flex items-end gap-1.5 h-[60px]">
        {values.map((val, i) => {
          const height = (Math.abs(val) / maxAbs) * 100
          const isPositive = val >= 0
          return (
            <div key={i} className="flex-1 flex flex-col items-center">
              <div className="relative w-full h-[50px] flex items-end justify-center">
                <div
                  className={`w-full max-w-[20px] rounded-t-sm ${isPositive ? 'bg-neon-green/60' : 'bg-neon-red/60'}`}
                  style={{ height: `${Math.max(height, 4)}%` }}
                />
              </div>
              <span className={`text-[9px] mt-1 ${isPositive ? 'text-neon-green' : 'text-neon-red'}`}>
                {val > 0 ? '+' : ''}{val.toFixed(1)}%
              </span>
              <span className="text-[8px] text-text-secondary">{LABELS[i]}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
