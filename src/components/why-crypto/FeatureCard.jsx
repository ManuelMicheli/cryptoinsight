import { motion } from 'motion/react'
import { fadeInUp } from '../../hooks/useInViewAnimation'
import GlassCard from '../ui/GlassCard'

const icons = {
  decentralization: (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5">
      <circle cx="12" cy="12" r="3" />
      <circle cx="4" cy="4" r="2" />
      <circle cx="20" cy="4" r="2" />
      <circle cx="4" cy="20" r="2" />
      <circle cx="20" cy="20" r="2" />
      <line x1="9.5" y1="9.5" x2="5.5" y2="5.5" />
      <line x1="14.5" y1="9.5" x2="18.5" y2="5.5" />
      <line x1="9.5" y1="14.5" x2="5.5" y2="18.5" />
      <line x1="14.5" y1="14.5" x2="18.5" y2="18.5" />
    </svg>
  ),
  growth: (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5">
      <polyline points="22,7 13.5,15.5 8.5,10.5 2,17" />
      <polyline points="16,7 22,7 22,13" />
    </svg>
  ),
  innovation: (
    <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
    </svg>
  ),
}

export default function FeatureCard({ icon, title, description, color = 'cyan' }) {
  const colorMap = {
    cyan: 'text-neon-cyan',
    purple: 'text-neon-purple',
    green: 'text-neon-green',
  }

  return (
    <motion.div variants={fadeInUp}>
      <GlassCard variant={color} className="text-center h-full !bg-black !bg-none !backdrop-blur-none transition-transform duration-300">
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 ${colorMap[color]} mb-6`}>
          {icons[icon]}
        </div>
        <h3 className={`font-heading text-lg md:text-xl font-bold mb-4 ${colorMap[color]}`}>{title}</h3>
        <p className={`text-sm md:text-base leading-relaxed ${colorMap[color]} opacity-80`}>{description}</p>
      </GlassCard>
    </motion.div>
  )
}
