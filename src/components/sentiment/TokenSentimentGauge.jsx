import { motion } from 'motion/react'

function getColor(score) {
  if (score <= 25) return '#ef4444' // neon-red
  if (score <= 40) return '#f97316' // orange
  if (score <= 60) return '#f59e0b' // neon-amber
  if (score <= 75) return '#84cc16' // lime
  return '#00ff88' // neon-green
}

export default function TokenSentimentGauge({ score, size = 120 }) {
  const radius = (size - 12) / 2
  const circumference = Math.PI * radius
  const progress = (score / 100) * circumference
  const color = getColor(score)

  return (
    <div className="relative flex flex-col items-center">
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        {/* Background arc */}
        <path
          d={`M 6 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 6} ${size / 2}`}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* Animated progress arc */}
        <motion.path
          d={`M 6 ${size / 2} A ${radius} ${radius} 0 0 1 ${size - 6} ${size / 2}`}
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference - progress }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            filter: `drop-shadow(0 0 6px ${color}60)`,
          }}
        />
      </svg>
      {/* Score text */}
      <motion.span
        className="absolute font-heading font-bold text-text-primary"
        style={{
          bottom: '4px',
          fontSize: size * 0.22,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        {score}
      </motion.span>
    </div>
  )
}
