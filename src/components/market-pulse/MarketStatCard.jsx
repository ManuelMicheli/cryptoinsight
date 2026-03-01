import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'

export default function MarketStatCard({ label, value, change, icon }) {
  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant="dark" className="text-center h-full">
        {icon && <div className="text-3xl mb-4">{icon}</div>}
        <div className="text-text-secondary typo-ui-sm uppercase tracking-widest mb-3 font-semibold">{label}</div>
        <div className="font-heading typo-stat font-bold text-neon-green py-2">{value}</div>
        {change && (
          <div className={`typo-body-sm font-medium mt-3 ${change >= 0 ? 'text-neon-green' : 'text-neon-red'}`}>
            {change >= 0 ? '▲' : '▼'} {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </GlassCard>
    </motion.div>
  )
}
