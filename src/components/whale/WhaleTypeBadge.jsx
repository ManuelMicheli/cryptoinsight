import { useLanguage } from '../../contexts/LanguageContext'

const typeConfig = {
  accumulo: {
    color: 'text-neon-green',
    bg: 'bg-neon-green/10',
    border: 'border-neon-green/20',
    label: { it: 'Accumulo', en: 'Accumulation' },
  },
  distribuzione: {
    color: 'text-neon-red',
    bg: 'bg-neon-red/10',
    border: 'border-neon-red/20',
    label: { it: 'Distribuzione', en: 'Distribution' },
  },
  trasferimento: {
    color: 'text-neon-amber',
    bg: 'bg-neon-amber/10',
    border: 'border-neon-amber/20',
    label: { it: 'Trasferimento', en: 'Transfer' },
  },
  defi: {
    color: 'text-neon-cyan',
    bg: 'bg-neon-cyan/10',
    border: 'border-neon-cyan/20',
    label: { it: 'DeFi', en: 'DeFi' },
  },
}

export default function WhaleTypeBadge({ type }) {
  const { lang } = useLanguage()
  const cfg = typeConfig[type] || typeConfig.trasferimento

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.bg} ${cfg.color} ${cfg.border}`}>
      {cfg.label[lang]}
    </span>
  )
}
