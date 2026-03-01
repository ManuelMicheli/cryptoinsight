import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'

export default function BriefMetricsTable({ metrics, lang }) {
  const rows = [
    {
      label: lang === 'it' ? 'Dominanza BTC' : 'BTC Dominance',
      value: `${metrics.btcDominance}%`,
      color: 'text-neon-cyan',
    },
    {
      label: lang === 'it' ? 'Market Cap Totale' : 'Total Market Cap',
      value: `$${metrics.totalMarketCap}`,
      color: 'text-neon-green',
    },
    {
      label: 'DeFi TVL',
      value: `$${metrics.defiTvl}`,
      color: 'text-neon-amber',
    },
    {
      label: 'Fear & Greed',
      value: metrics.fearGreed,
      color: metrics.fearGreed >= 60
        ? 'text-neon-green'
        : metrics.fearGreed >= 40
          ? 'text-neon-amber'
          : 'text-neon-red',
    },
  ]

  return (
    <motion.div className="space-y-4" variants={fadeInUp}>
      <h4
        className="font-heading font-semibold text-text-primary text-sm uppercase tracking-widest"
        style={{ letterSpacing: '0.15em' }}
      >
        {lang === 'it' ? 'Metriche Chiave' : 'Key Metrics'}
      </h4>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {rows.map((row) => (
          <div
            key={row.label}
            className="panel panel-dark p-4 text-center space-y-2"
            style={{ minHeight: 'auto' }}
          >
            <p className="text-text-secondary/60 text-xs font-body uppercase tracking-wider">
              {row.label}
            </p>
            <p className={`font-heading font-bold text-xl ${row.color}`}>
              {row.value}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}
