import { useLanguage } from '../../contexts/LanguageContext'

export default function DilutionBar({ percentSupply }) {
  const { lang } = useLanguage()
  const unlocked = 100 - percentSupply - 15 // mock: 15% still locked beyond this unlock
  const locked = 15

  return (
    <div>
      <div className="flex h-3 rounded-full overflow-hidden bg-white/5">
        <div
          className="bg-neon-green/60"
          style={{ width: `${unlocked}%` }}
          title={lang === 'it' ? 'Gia\' sbloccato' : 'Already unlocked'}
        />
        <div
          className="bg-neon-amber animate-glow-pulse"
          style={{ width: `${percentSupply}%` }}
          title={lang === 'it' ? 'Questo unlock' : 'This unlock'}
        />
        <div
          className="bg-text-secondary/30"
          style={{ width: `${locked}%` }}
          title={lang === 'it' ? 'Locked' : 'Locked'}
        />
      </div>
      <div className="flex justify-between mt-1.5 text-[10px] text-text-secondary">
        <span>{lang === 'it' ? 'Sbloccato' : 'Unlocked'}</span>
        <span className="text-neon-amber">{lang === 'it' ? 'Questo unlock' : 'This unlock'}</span>
        <span>{lang === 'it' ? 'Locked' : 'Locked'}</span>
      </div>
    </div>
  )
}
