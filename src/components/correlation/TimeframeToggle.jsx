import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'

const timeframes = ['7d', '30d', '90d', '1y']

export default function TimeframeToggle({ value, onChange }) {
  return (
    <motion.div
      className="flex justify-center gap-2 mb-8"
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {timeframes.map(tf => (
        <button
          key={tf}
          onClick={() => onChange(tf)}
          className={`px-4 py-1.5 text-xs font-medium rounded-full border transition-all ${
            value === tf
              ? 'border-neon-amber/40 bg-neon-amber/10 text-neon-amber'
              : 'border-white/10 text-text-secondary hover:text-text-primary hover:border-white/20'
          }`}
        >
          {tf}
        </button>
      ))}
    </motion.div>
  )
}
