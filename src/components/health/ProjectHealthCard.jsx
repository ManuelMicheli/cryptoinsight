import { useState } from 'react'
import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import { useLanguage } from '../../contexts/LanguageContext'
import { t } from '../../i18n/translations'
import { cryptoMeta } from '../../data/cryptoMeta'
import { gradeColors } from '../../data/healthData'
import GlassCard from '../ui/GlassCard'
import HealthBadge from './HealthBadge'
import HealthDetailPanel from './HealthDetailPanel'

export default function ProjectHealthCard({ coinId, data }) {
  const { lang } = useLanguage()
  const [expanded, setExpanded] = useState(false)
  const meta = cryptoMeta[coinId]
  if (!meta || !data) return null

  const gradeColor = gradeColors[data.grade] || 'text-text-secondary'

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard
        variant="green"
        brandColors={meta.brandColors}
        hover={true}
        className="p-5"
      >
        {/* Header with grade */}
        <div className="flex items-start justify-between mb-3">
          <div>
            <span className="font-heading text-sm font-bold text-text-primary">{meta.name}</span>
            <span className="text-text-secondary text-xs ml-2">{meta.ticker}</span>
          </div>
          <span className={`font-heading text-3xl font-black ${gradeColor}`}>
            {data.grade}
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {data.badges.map(badge => (
            <HealthBadge key={badge} type={badge} />
          ))}
        </div>

        {/* Quick metrics */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="text-center">
            <p className="text-text-secondary text-[10px]">{lang === 'it' ? 'Contributori' : 'Contributors'}</p>
            <p className="text-text-primary text-sm font-medium">{data.github.contributorsActive}</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-[10px]">{lang === 'it' ? 'Audit' : 'Audits'}</p>
            <p className="text-text-primary text-sm font-medium">{data.security.audits.length}</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-[10px]">{lang === 'it' ? 'Tx/giorno' : 'Tx/day'}</p>
            <p className="text-text-primary text-sm font-medium">{(data.onchain.dailyTx / 1000).toFixed(0)}K</p>
          </div>
          <div className="text-center">
            <p className="text-text-secondary text-[10px]">{lang === 'it' ? 'Consegna' : 'Delivery'}</p>
            <p className="text-text-primary text-sm font-medium">{data.team.deliveryRate}%</p>
          </div>
        </div>

        {/* Expand button */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-center text-xs text-text-secondary hover:text-text-primary transition-colors py-1"
        >
          {expanded
            ? (lang === 'it' ? '▲ Chiudi dettagli' : '▲ Close details')
            : (lang === 'it' ? '▼ Vedi dettagli' : '▼ View details')
          }
        </button>

        <HealthDetailPanel isOpen={expanded} data={data} />
      </GlassCard>
    </motion.div>
  )
}
