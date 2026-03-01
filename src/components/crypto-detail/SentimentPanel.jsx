import { motion } from 'motion/react'
import { useLanguage } from '../../contexts/LanguageContext'
import { l } from '../../i18n/translations'
import { sentimentData, factorLabels } from '../../data/sentimentData'
import GlassCard from '../ui/GlassCard'
import { fadeInUp } from '../../hooks/useInViewAnimation'

/**
 * Returns the gauge color based on sentiment score (0-100).
 * red(0-25) -> amber(25-50) -> yellow(50-55) -> green(55-75) -> neon-green(75-100)
 */
function getScoreColor(score) {
  if (score < 25) return '#ef4444'
  if (score < 50) return '#f59e0b'
  if (score < 55) return '#eab308'
  if (score < 75) return '#22c55e'
  return '#00ff88'
}

/**
 * Returns a bar color for individual factor values.
 */
function getBarColor(value) {
  if (value < 30) return '#ef4444'
  if (value < 50) return '#f59e0b'
  if (value < 65) return '#eab308'
  return '#00ff88'
}

/**
 * Semicircular SVG gauge component.
 */
function SentimentGauge({ score }) {
  const radius = 80
  const strokeWidth = 12
  const cx = 100
  const cy = 95
  // Semicircle arc from 180 to 0 degrees (left to right, top half)
  const circumference = Math.PI * radius
  const progress = (score / 100) * circumference
  const dashOffset = circumference - progress
  const color = getScoreColor(score)

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" width="200" height="110" className="overflow-visible">
        {/* Background arc */}
        <path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Animated progress arc */}
        <motion.path
          d={`M ${cx - radius} ${cy} A ${radius} ${radius} 0 0 1 ${cx + radius} ${cy}`}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: dashOffset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{ filter: `drop-shadow(0 0 8px ${color}40)` }}
        />
        {/* Score text */}
        <text
          x={cx}
          y={cy - 16}
          textAnchor="middle"
          className="font-heading font-bold"
          fill={color}
          fontSize="32"
        >
          {score}
        </text>
        <text
          x={cx}
          y={cy + 2}
          textAnchor="middle"
          fill="rgba(255,255,255,0.4)"
          fontSize="10"
          className="font-body"
        >
          / 100
        </text>
      </svg>
    </div>
  )
}

/**
 * Mini inline sparkline for trends.
 */
function MiniSparkline({ data, height = 24, width = 80 }) {
  if (!data || data.length === 0) return null
  const min = Math.min(...data)
  const max = Math.max(...data)
  const range = max - min || 1
  const isPositive = data[data.length - 1] >= data[0]
  const color = isPositive ? '#00ff88' : '#ef4444'

  const points = data
    .map((val, i) => {
      const x = (i / (data.length - 1)) * width
      const y = height - ((val - min) / range) * (height - 2) - 1
      return `${x},${y}`
    })
    .join(' ')

  return (
    <svg viewBox={`0 0 ${width} ${height}`} width={width} height={height} className="flex-shrink-0">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function SentimentPanel({ coinId }) {
  const { lang } = useLanguage()

  // TODO: Replace with API call
  const sentiment = sentimentData[coinId]

  const title = lang === 'it' ? 'SENTIMENT' : 'SENTIMENT'

  if (!sentiment) {
    return (
      <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
        <h3 className="font-heading text-xs tracking-widest text-neon-purple mb-3 uppercase">
          {title}
        </h3>
        <p className="text-text-secondary text-sm">
          {lang === 'it' ? 'Dati sentiment non disponibili' : 'Sentiment data not available'}
        </p>
      </GlassCard>
    )
  }

  const factorKeys = Object.keys(sentiment.factors)

  return (
    <GlassCard variant="dark" hover={false} className="!min-h-0 p-5">
      <h3 className="font-heading text-xs tracking-widest text-neon-purple mb-4 uppercase">
        {title}
      </h3>

      {/* Gauge */}
      <SentimentGauge score={sentiment.score} />

      {/* Factor breakdown */}
      <div className="space-y-2.5 mt-4">
        {factorKeys.map((key) => {
          const value = sentiment.factors[key]
          const label = factorLabels[key]
          const barColor = getBarColor(value)

          return (
            <motion.div
              key={key}
              className="flex items-center gap-3"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <span className="text-[11px] text-text-secondary w-24 flex-shrink-0 truncate">
                {l(label, lang)}
              </span>
              <div className="flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: barColor }}
                  initial={{ width: 0 }}
                  animate={{ width: `${value}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
              <span className="text-[11px] text-text-secondary w-8 text-right font-mono">
                {value}
              </span>
            </motion.div>
          )
        })}
      </div>

      {/* Trend sparklines */}
      <div className="flex items-center gap-6 mt-5 pt-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider">7d</span>
          <MiniSparkline data={sentiment.trend7d} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-text-secondary uppercase tracking-wider">30d</span>
          <MiniSparkline data={sentiment.trend30d} />
        </div>
      </div>
    </GlassCard>
  )
}
